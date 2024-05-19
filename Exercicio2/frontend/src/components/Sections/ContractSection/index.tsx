import { CreateContractModal } from '@/components/Modal/CreateContractModal'
import { useQueryContract } from '@/hooks/queries/useQueryContract'
import { CreateContractBodySchema } from '@/lib/zod/contracts/createContractSchema'
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
import { IoMdAdd } from 'react-icons/io'
import { IoRemove } from 'react-icons/io5'
import { MdEdit } from 'react-icons/md'

export function ContractSection() {
  const [newRule, setNewRule] = useState<ContractRule>({
    until: 0,
    value: 0,
  })

  const [contractRules, setContractRules] = useState<ContractRule[]>([])

  const [editingObj, setEditingObj] = useState({
    description: false,
    maxValue: false,
  })

  const [isCreateContractModalOpen, setIsCreateContractModalOpen] =
    useState(false)

  const { data, isError, isLoading } = useQueryContract()

  const { register } = useForm<CreateContractBodySchema>()

  function handleRemoveRule(index: number) {
    const array = [...contractRules]
    array.splice(index, 1)

    setContractRules(array)
  }

  function handleAddRule() {
    setContractRules([...contractRules, newRule])
  }

  useEffect(() => {
    if (data?.ContractRule.length) {
      setContractRules(data.ContractRule)
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
                    description: true,
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
                    maxValue: true,
                  })
                }
              />
            </Flex>
          </FormControl>
        </GridItem>
      </Grid>

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
              <IconButton
                aria-label="Add vehicle"
                icon={<IoRemove />}
                onClick={() => handleRemoveRule(index)}
              />
            </Flex>
          </HStack>
        ))}
        <HStack gap={2} w="full">
          <Grid w="full" templateColumns="repeat(2, 1fr)" gap={1}>
            <Input
              type="number"
              placeholder="Limite horas"
              onChange={(e) =>
                setNewRule({
                  ...newRule,
                  until: +e.target.value,
                })
              }
            />
            <Input
              placeholder="Valor"
              type="number"
              onChange={(e) => {
                console.log(e.target.value)
                setNewRule({
                  ...newRule,
                  value: +e.target.value,
                })
              }}
            />
          </Grid>
          <IconButton
            aria-label="Add rule"
            icon={<IoMdAdd />}
            onClick={handleAddRule}
          />
          \
        </HStack>
      </FormControl>
    </Flex>
  )
}
