import { kv } from '@vercel/kv'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'

import { auth } from '@/auth'
import { nanoid } from '@/lib/utils'
import { initialMessages } from '@/lib/initialMessages'

export const runtime = 'edge'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

export async function POST(req: Request) {
  const json = await req.json()
  const { messages, previewToken } = json
  const userId = (await auth())?.user.id

  if (!userId) {
    return new Response('Unauthorized', {
      status: 401
    })
  }

  if (previewToken) {
    configuration.apiKey = previewToken
  }

  const res = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo-16k',
    messages: [...initialMessages.map(m => ({ role: m.role, content: m.content })), ...messages],
    temperature: 0.5, // have the model be more deterministic and less random
    stream: true,
    functions: [
      {
        name: 'incident',
        description: 'Retrieves comprehensive information about an incident, including associated parties, date, and metadata, when a user specifically requests details beyond the title and description.',
        parameters: {
          "type": "object",
          "properties": {
            "id": {
              "type": "integer",
              "description": "The incident ID"
            },
          },
          "required": ["id"]
        }
      }
    ]
  })

  // from : https://github.com/vercel-labs/ai/pull/163/files#diff-b4fc3cf85f3dc974899314160d4930248499e7e5c371f123d4d9a4948c6b3e62

  if (res.ok) {

    const stream = OpenAIStream(res, {
      async onCompletion(completion) {
        const title = json.messages[0].content.substring(0, 100)
        const id = json.id ?? nanoid()
        const createdAt = Date.now()
        const path = `/chat/${id}`
        const payload = {
          id,
          title,
          userId,
          createdAt,
          path,
          messages: [
            ...messages,
            {
              content: completion,
              role: 'assistant'
            }
          ]
        }
        await kv.hmset(`chat:${id}`, payload)
        await kv.zadd(`user:chat:${userId}`, {
          score: createdAt,
          member: `chat:${id}`
        })
      },

    })

    return new StreamingTextResponse(stream)
  }
  else {

    if (res.body) {
      const reader = res.body.getReader()
      return new ReadableStream({
        async start(controller) {
          const { done, value } = await reader.read()
          if (!done) {
            const errorText = new TextDecoder().decode(value)
            controller.error(new Error(`Response error: ${errorText}`))

            console.log(errorText);
          }
        }
      })
    } else {
      return new ReadableStream({
        start(controller) {
          controller.error(new Error('Response error: No response body'))
        }
      })
    }
  }
}
