import { CreateContractModal } from '@/components/Modal/CreateContractModal'
import { useMutationUpdateContract } from '@/hooks/mutations/useMutationUpdateContract'
import { useQueryContract } from '@/hooks/queries/useQueryContract'
import {
  UpdateContractFormSchema,
  updateContractBodySchema,
  updateContractFormSchema,
} from '@/lib/zod/contracts/updateContractSchema'
import { ContractRule } from '@/types/serverTypes/Contract'
import { formatFloatToBRL } from '@/utils/formatFloatToBRL'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Heading,
  IconButton,
  Input,
  Spinner,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoRemove } from 'react-icons/io5'
import { MdEdit } from 'react-icons/md'

export function ContractSection() {
  const [contractRules, setContractRules] = useState<ContractRule[]>([])

  const [editingObj, setEditingObj] = useState({
    description: false,
    maxValue: false,
  })

  const [isCreateContractModalOpen, setIsCreateContractModalOpen] =
    useState(false)

  const { data, isError, isLoading } = useQueryContract()

  const { mutateAsync: updateContract } = useMutationUpdateContract()

  const { register, handleSubmit } = useForm<UpdateContractFormSchema>()

  async function handleUpdateContract(contractInfo: UpdateContractFormSchema) {
    try {
      if (!data) return

      const { description, maxValue } =
        updateContractFormSchema.parse(contractInfo)

      const updatedContractRules = contractRules.flatMap(({ id }) =>
        id ? { id } : [],
      )

      await updateContract({
        contractId: data.id,
        data: {
          description: description ?? data.description,
          maxValue,
          contractRules: updatedContractRules,
        },
      })
    } catch (error) {
      console.log(error.flatten())
    }
  }

  useEffect(() => {
    if (data?.ContractRule.length) {
      setContractRules(
        data.ContractRule.map((rule, index) =>
          rule.id ? rule : { ...rule, index },
        ),
      )
    }
  }, [data])

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
      <>
        <CreateContractModal
          isOpen={isCreateContractModalOpen}
          onClose={() => setIsCreateContractModalOpen(false)}
        />
        <Flex flex={1} w="full" alignItems="center" justifyContent="center">
          <Button
            colorScheme="blue"
            onClick={() => setIsCreateContractModalOpen(true)}
          >
            Criar contrato
          </Button>
        </Flex>
      </>
    )
  }

  if (data === undefined) return <></>

  return (
    <Flex w="full" flex={1} flexDir="column" justify="flex-start">
      <Heading size="xl">Contrato</Heading>
      <Flex flexDir="row" align="flex-end" gap={5}>
        <Grid w="50%" templateColumns="repeat(3, 1fr)" gap={5}>
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>Descrição</FormLabel>
              <Flex flexDir="row" gap={2}>
                <Input
                  defaultValue={data.description}
                  isDisabled={!editingObj.description}
                  {...register('description')}
                />
                <IconButton
                  aria-label="Edit contrat descriptg"
                  colorScheme="gray"
                  w="fit-content"
                  icon={<MdEdit />}
                  onClick={() =>
                    setEditingObj({
                      ...editingObj,
                      description: !editingObj.description,
                    })
                  }
                />
              </Flex>
            </FormControl>
          </GridItem>

          <GridItem colSpan={1}>
            <FormControl>
              <FormLabel>Valor</FormLabel>
              <Flex flexDir="row" gap={2}>
                <Input
                  type="number"
                  defaultValue={data.maxValue?.toString()}
                  isDisabled={!editingObj.maxValue}
                  {...register('maxValue')}
                />
                <IconButton
                  aria-label="Edit contrat descriptg"
                  colorScheme="gray"
                  w="fit-content"
                  icon={<MdEdit />}
                  onClick={() =>
                    setEditingObj({
                      ...editingObj,
                      maxValue: !editingObj.maxValue,
                    })
                  }
                />
              </Flex>
            </FormControl>
          </GridItem>
        </Grid>

        <Button
          colorScheme="green"
          onClick={handleSubmit(handleUpdateContract)}
        >
          Salvar alterações
        </Button>
      </Flex>

      <FormControl>
        <FormLabel>Regras</FormLabel>
        {contractRules.map(({ until, value }, index) => (
          <HStack gap={2} mb={5} key={`${until}-${value},${index}`}>
            <Flex w="full">
              <Grid w="full" templateColumns="repeat(2, 1fr)" gap={1}>
                <Input w="full" type="tel" value={until} isDisabled />
                <Input
                  w="full"
                  type="tel"
                  value={formatFloatToBRL(value)}
                  isDisabled
                />
              </Grid>
            </Flex>
          </HStack>
        ))}
      </FormControl>
    </Flex>
  )
}
