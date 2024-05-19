import { useQueryContract } from '@/hooks/queries/useQueryContract'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Flex,
  Spinner,
} from '@chakra-ui/react'

export function ContractSection() {
  const { data, isError, isLoading } = useQueryContract()

  if (isLoading) {
    return (
      <Flex flex={1} w="full" alignItems="center" justifyContent="center">
        <Spinner size="3xl" color="brand.blue" />
      </Flex>
    )
  }

  if (isError) {
    return (
      <Flex flex={1} w="full" alignItems="center" justifyContent="center">
        <Alert
          status="error"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="200px"
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            Ocorreu um erro!
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            Ocorreu um erro ao buscar a informação. Verifique sua conexão à
            internet. Caso o erro persista, contate o suporte.
          </AlertDescription>
        </Alert>
      </Flex>
    )
  }

  if (data === null) {
    return (
      <Flex flex={1} w="full" alignItems="center" justifyContent="center">
        <Button colorScheme="blue">Criar contrato</Button>
      </Flex>
    )
  }
  return (
    <Flex flex={1} w="full" alignItems="center" justifyContent="center">
      <Button colorScheme="blue">Criar contrato</Button>
    </Flex>
  )
}
