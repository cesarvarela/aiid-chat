import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { IconArrowRight } from '@/components/ui/icons'

const exampleMessages = [
  {
    heading: 'Ask about a specific Incident',
    message: `Fetch info about Incident 1`
  },
  {
    heading: 'List of Incidents involving cars',
    message: `Which Incidents involve cars?`
  },
  {
    heading: 'Extract report attributes from an article',
    message: `I have an article here and I would like you to extract potential 'report' attributes based on the schema we discussed earlier. Here is the article:`
  },
  {
    heading: 'Extract incident attributes from an article',
    message: `I have an article here and I would like you to extract potential 'incident' attributes based on the schema we discussed earlier. Here is the article:`
  }

]

export function EmptyScreen({ setInput }: Pick<UseChatHelpers, 'setInput'>) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-8">
        <h1 className="mb-2 text-lg font-semibold">
          AIID Chatbot!
        </h1>
        <p className="leading-normal text-muted-foreground">
          You can start a conversation here or try the following examples:
        </p>
        <div className="mt-4 flex flex-col items-start space-y-2">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              onClick={() => setInput(message.message)}
            >
              <IconArrowRight className="mr-2 text-muted-foreground" />
              {message.heading}
            </Button>
          ))}
        </div>
        <p className="leading-normal text-muted-foreground mt-2 text-sm">
          (Until semantic search is implemented, only the first 150 incidents are stored in the chatbot&apos;s context)
        </p>
      </div>
    </div>
  )
}
