'use client'

import { useChat, type Message } from 'ai/react'
import { ApolloClient, InMemoryCache, HttpLink, gql } from '@apollo/client';
import { cn, nanoid } from '@/lib/utils'
import { ChatList } from '@/components/chat-list'
import { ChatPanel } from '@/components/chat-panel'
import { EmptyScreen } from '@/components/empty-screen'
import { ChatScrollAnchor } from '@/components/chat-scroll-anchor'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { toast } from 'react-hot-toast'
import { ChatRequest, FunctionCallHandler } from 'ai'

const IS_PREVIEW = process.env.VERCEL_ENV === 'preview'
export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id?: string
}

const client = new ApolloClient({
  link: new HttpLink({
    uri: `https://incidentdatabase.ai/api/graphql`,
  }),
  cache: new InMemoryCache(),
});


export function Chat({ id, initialMessages, className }: ChatProps) {
  const [previewToken, setPreviewToken] = useLocalStorage<string | null>(
    'ai-token',
    null
  )
  const [previewTokenDialog, setPreviewTokenDialog] = useState(IS_PREVIEW)
  const [previewTokenInput, setPreviewTokenInput] = useState(previewToken ?? '')


  const functionCallHandler: FunctionCallHandler = async (chatMessages, functionCall) => {

    if (functionCall.name === 'incident') {

      if (functionCall.arguments) {
        const { id } = JSON.parse(functionCall.arguments);

        const result = await client.query({
          variables: {
            id,
          },
          query: gql`
          query boe($id:Int){
            incidents(limit: 999, query:{incident_id: $id}) {
              incident_id
              title
              description
              AllegedDeployerOfAISystem {
                _id
                entity_id
                name
              }
              AllegedDeveloperOfAISystem {
                _id
                entity_id
                name
              }
              editor_notes
              editors
              reports {
                report_number
                title
                description
                editor_notes
                is_incident_report
              }
            }
          }
          `,
        });

        const functionResponse: ChatRequest = {
          messages: [
            ...chatMessages,
            {
              id: nanoid(),
              name: 'incident',
              role: 'function' as const,
              content: JSON.stringify(result)
            }
          ]
        }

        return functionResponse
      }
    }
  }

  const { messages, append, reload, stop, isLoading, input, setInput } =
    useChat({
      initialMessages,
      id,
      experimental_onFunctionCall: functionCallHandler,
      body: {
        id,
        previewToken,
      },
      onResponse(response) {

        console.log(response.body, response.status, response.statusText);

        if (response.status === 401) {
          toast.error(response.statusText)
        }
      }
    })
  return (
    <>
      <div className={cn('pb-[200px] pt-4 md:pt-10', className)}>
        {messages.length ? (
          <>
            <ChatList messages={messages} />
            <ChatScrollAnchor trackVisibility={isLoading} />
          </>
        ) : (
          <EmptyScreen setInput={setInput} />
        )}
      </div>
      <ChatPanel
        id={id}
        isLoading={isLoading}
        stop={stop}
        append={append}
        reload={reload}
        messages={messages}
        input={input}
        setInput={setInput}
      />

      {`chatid: ${id}`}

      <Dialog open={previewTokenDialog} onOpenChange={setPreviewTokenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter your OpenAI Key</DialogTitle>
            <DialogDescription>
              If you have not obtained your OpenAI API key, you can do so by{' '}
              <a
                href="https://platform.openai.com/signup/"
                className="underline"
              >
                signing up
              </a>{' '}
              on the OpenAI website. This is only necessary for preview
              environments so that the open source community can test the app.
              The token will be saved to your browser&apos;s local storage under
              the name <code className="font-mono">ai-token</code>.
            </DialogDescription>
          </DialogHeader>
          <Input
            value={previewTokenInput}
            placeholder="OpenAI API key"
            onChange={e => setPreviewTokenInput(e.target.value)}
          />
          <DialogFooter className="items-center">
            <Button
              onClick={() => {
                setPreviewToken(previewTokenInput)
                setPreviewTokenDialog(false)
              }}
            >
              Save Token
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
