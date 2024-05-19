import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
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
  useToast,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

import { DefaultModalProps } from '../DefaultModalProps'

import { ZodError } from 'zod'
import { useState } from 'react'
import { AxiosError } from 'axios'
import { CreateCustomerBodySchema } from '@/lib/zod/customers/createCustomerSchema'
import { FlattenErrorsType } from '@/lib/zod/FlattenErrorsType'
import {
  UpdateCustomerBodySchema,
  UpdateCustomerFormSchema,
  updateCustomerFormSchema,
} from '@/lib/zod/customers/updateCustomerSchema'
import { useMutationUpdateCustomer } from '@/hooks/mutations/useMutationUpdateCustomer'
import { Customer } from '@/types/serverTypes/Customer'
import { MdEdit } from 'react-icons/md'

interface UpdateCustomerModal extends DefaultModalProps {
  customer: Customer
}

export function UpdateCustomerModal({
  isOpen,
  onClose,
  customer,
}: UpdateCustomerModal) {
  const [editingObj, setEditingObj] = useState({
    name: false,
    cardId: false,
  })

  const [zodFlattenErrors, setSetZodFlattenErrors] =
    useState<FlattenErrorsType>({})

  const { register, handleSubmit, reset } = useForm<UpdateCustomerFormSchema>()

  const { mutateAsync: updateCustomer, isPending } = useMutationUpdateCustomer()

  const toast = useToast()

  function handleCloseModal() {
    reset()

    setSetZodFlattenErrors({})

    onClose()
  }

  async function handleCreateVehicle(customerData: CreateCustomerBodySchema) {
    try {
      setSetZodFlattenErrors({})

      const data = updateCustomerFormSchema.parse({
        name: customerData.name ?? customer.name,
        cardId: customerData.cardId ?? customer.cardId,
      })

      const body: UpdateCustomerBodySchema = {
        customerId: customer.id,
        data,
      }

      await updateCustomer(body)

      handleCloseModal()
    } catch (error) {
      if (error instanceof ZodError) {
        const flattenErrors = error.flatten()

        return setSetZodFlattenErrors(flattenErrors.fieldErrors)
      }

      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          console.log(error)

          return toast({
            status: 'error',
            description: 'Já existe um cliente cadastrado com a mesmo cartão.',
            isClosable: true,
          })
        }
      }

      console.log(error)
    }
  }

  return (
    <Modal size="xl" isOpen={isOpen} onClose={handleCloseModal}>
      <ModalOverlay />
      <ModalContent bg="white">
        <ModalCloseButton bg="gray.100" />
        <ModalHeader>Cadastrar cliente</ModalHeader>
        <ModalBody>
          <Flex flexDir="column" align="flex-start" gap={5}>
            <Grid w="full" templateColumns="repeat(3, 1fr)" gap={5}>
              <GridItem colSpan={2}>
                <FormControl>
                  <FormLabel>Nome</FormLabel>
                  <Flex flexDir="row" gap={2}>
                    <Input
                      defaultValue={customer.name}
                      isDisabled={!editingObj.name}
                      isInvalid={!!zodFlattenErrors?.name?.length}
                      {...register('name')}
                    />
                    <IconButton
                      aria-label="Edit customer name"
                      colorScheme="gray"
                      w="fit-content"
                      icon={<MdEdit />}
                      onClick={() =>
                        setEditingObj({
                          ...editingObj,
                          name: !editingObj.name,
                        })
                      }
                    />
                  </Flex>
                </FormControl>
              </GridItem>

              <GridItem colSpan={1}>
                <FormControl>
                  <FormLabel>Cartão</FormLabel>
                  <Flex flexDir="row" gap={2}>
                    <Input
                      defaultValue={customer.cardId}
                      isDisabled={!editingObj.cardId}
                      isInvalid={!!zodFlattenErrors?.cardId?.length}
                      {...register('cardId')}
                    />
                    <IconButton
                      aria-label="Edit customer cardId"
                      colorScheme="gray"
                      w="fit-content"
                      icon={<MdEdit />}
                      onClick={() =>
                        setEditingObj({
                          ...editingObj,
                          cardId: !editingObj.cardId,
                        })
                      }
                    />
                  </Flex>
                </FormControl>
              </GridItem>
            </Grid>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Flex flexDir="row" gap={2}>
            <Button colorScheme="red" onClick={handleCloseModal}>
              {isPending ? <Spinner color="white" /> : 'Cancelar'}
            </Button>

            <Button
              colorScheme="green"
              onClick={handleSubmit(handleCreateVehicle)}
            >
              {isPending ? <Spinner color="white" /> : 'Salvar'}
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
