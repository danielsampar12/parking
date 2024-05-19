import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
} from '@chakra-ui/react'

import { DefaultModalProps } from '../DefaultModalProps'

import { useState } from 'react'

import { FlattenErrorsType } from '@/lib/zod/FlattenErrorsType'

import { BrazilianCurrencyInput } from '@/components/Input/BrazilianCurrencyInput'
import {
  CreateContractBodySchema,
  createContractBodySchema,
} from '@/lib/zod/contracts/createContractSchema'
import { parseBRLToFloat } from '@/utils/parseBRLToFloat'
import { IoMdAdd } from 'react-icons/io'
import { ContractRule } from '@/types/serverTypes/Contract'
import { IoRemove } from 'react-icons/io5'
import { formatFloatToBRL } from '@/utils/formatFloatToBRL'
import { useMutationCreateContract } from '@/hooks/mutations/useMutationCreateContract'
import { ZodError } from 'zod'

interface NewContractRule {
  until: number
  value: string
}

export function CreateContractModal({ isOpen, onClose }: DefaultModalProps) {
  const [newRule, setNewRule] = useState<NewContractRule>({
    until: 0,
    value: '',
  })
  const [contract, setContract] = useState<CreateContractBodySchema>({
    description: '',
    maxValue: 0,
    contractRules: [],
  })

  const [zodFlattenErrors, setSetZodFlattenErrors] =
    useState<FlattenErrorsType>({})

  const { mutateAsync: createContract, isPending } = useMutationCreateContract()

  function handleCloseModal() {
    setSetZodFlattenErrors({})

    setNewRule({
      until: 0,
      value: '',
    })

    setContract({
      description: '',
      maxValue: 0,
      contractRules: [],
    })

    onClose()
  }

  function handleAddRule() {
    if (newRule.until === 0 || newRule.value === '') return

    const parsedRule: ContractRule = {
      ...newRule,
      value: parseBRLToFloat(newRule.value),
    }

    setContract({
      ...contract,
      contractRules: [...contract.contractRules, parsedRule],
    })
  }

  function handleRemoveRule(index: number) {
    const array = [...contract.contractRules]
    array.splice(index, 1)

    setContract({
      ...contract,
      contractRules: array,
    })
  }

  async function handleCreateContract() {
    try {
      setSetZodFlattenErrors({})

      const body = createContractBodySchema.parse(contract)

      console.log(body)

      await createContract(body)

      handleCloseModal()
    } catch (error) {
      if (error instanceof ZodError) {
        const flatten = error.flatten()
        setSetZodFlattenErrors(flatten.fieldErrors)
      }

      console.log(error)
    }
  }

  return (
    <Modal size="xl" isOpen={isOpen} onClose={handleCloseModal}>
      <ModalOverlay />
      <ModalContent bg="white">
        <ModalCloseButton bg="gray.100" />
        <ModalHeader>Cadastrar contrato</ModalHeader>
        <ModalBody>
          <Flex flexDir="column" align="flex-start" gap={5}>
            <Grid w="full" templateColumns="repeat(3, 1fr)" gap={5}>
              <GridItem colSpan={2}>
                <FormControl>
                  <FormLabel>Descrição</FormLabel>
                  <Input
                    autoComplete="off"
                    isInvalid={!!zodFlattenErrors.description?.length}
                    value={contract.description}
                    onChange={(e) =>
                      setContract({ ...contract, description: e.target.value })
                    }
                  />
                </FormControl>
              </GridItem>

              <GridItem colSpan={1}>
                <FormControl>
                  <FormLabel>Valor diária</FormLabel>
                  <BrazilianCurrencyInput
                    isInvalid={!!zodFlattenErrors.maxValue?.length}
                    onChange={(e) => {
                      setContract({
                        ...contract,
                        maxValue: parseBRLToFloat(e.target.value),
                      })
                    }}
                  />
                </FormControl>
              </GridItem>
            </Grid>

            <FormControl>
              <FormLabel>Regras</FormLabel>
              {contract.contractRules.map(({ until, value }, index) => (
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
                    isInvalid={!!zodFlattenErrors.contractRules?.length}
                    onChange={(e) =>
                      setNewRule({
                        ...newRule,
                        until: +e.target.value,
                      })
                    }
                  />
                  <BrazilianCurrencyInput
                    placeholder="Valor"
                    isInvalid={!!zodFlattenErrors.contractRules?.length}
                    onChange={(e) => {
                      console.log(e.target.value)
                      setNewRule({
                        ...newRule,
                        value: e.target.value,
                      })
                    }}
                  />
                </Grid>
                <IconButton
                  aria-label="Add vehicle"
                  icon={<IoMdAdd />}
                  onClick={handleAddRule}
                />
                \
              </HStack>
            </FormControl>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Flex flexDir="row" gap={2}>
            <Button colorScheme="red" onClick={handleCloseModal}>
              {isPending ? <Spinner color="white" /> : 'Cancelar'}
            </Button>

            <Button colorScheme="green" onClick={handleCreateContract}>
              {isPending ? <Spinner color="white" /> : 'Salvar'}
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
