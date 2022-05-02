import { Alert, AlertIcon, Box, AlertTitle, AlertDescription, CloseButton, Button } from "@chakra-ui/react"
import { DescriptionAlert } from "./DescriptionAlert"

interface AlertMessageProps {
  isAlert: boolean
  setIsAlert: (isAlert: boolean) => void
  messages: string[]
  error: boolean
}

export function AlertMessage({ isAlert, setIsAlert, messages, error } : AlertMessageProps) {  
    function onClose() {
      setIsAlert(false)
    }

    if (!isAlert) {
      return null
    } else if (!error) {
      return (
        <Alert status="success" color={'black'}>
          <AlertIcon />
          <Box>
            <AlertTitle>{messages}</AlertTitle>
          </Box>
          <CloseButton
            ml={'auto'}
            onClick={onClose}
          />
        </Alert>
      )
    }
    return (
      <Alert status='error' color={'black'} bg={'#FEB2B2'}>
        <AlertIcon />
        <Box>
          <AlertTitle>Erro ao cadastrar advogado</AlertTitle>
          <DescriptionAlert messages={messages}/>
        </Box>
        <CloseButton
          ml={'auto'}
          onClick={onClose}
        />
      </Alert>
    )
  }