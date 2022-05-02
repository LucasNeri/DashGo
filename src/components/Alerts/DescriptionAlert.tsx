import { AlertDescription } from "@chakra-ui/react"

interface DescriptionAlertProps {
  messages: string[]
}

export function DescriptionAlert({ messages } : DescriptionAlertProps) {  
  if (!messages) {
    return (
      <>
      </>
    )
  }
  return (
    <>
      {
        Array.from(messages, (message, index) => (
          <AlertDescription>
              {message} 
              <br></br>
          </AlertDescription>
        ))
  }
    </>
  )
}