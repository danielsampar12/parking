import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
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
import { useMutationCreateCustomer } from '@/hooks/mutations/useMutationCreateCustomer'
import {
  CreateCustomerBodySchema,
  createCustomerBodySchema,
} from '@/lib/zod/createCustomerSchema'
import { FlattenErrorsType } from '@/lib/zod/FlattenErrorsType'

export function CreateCustomerModal({ isOpen, onClose }: DefaultModalProps) {
  const [zodFlattenErrors, setSetZodFlattenErrors] =
    useState<FlattenErrorsType>({})

  const { register, handleSubmit, reset } = useForm<CreateCustomerBodySchema>()

  const { mutateAsync: createCustomer, isPending } = useMutationCreateCustomer()

  const toast = useToast()

  function handleCloseModal() {
    reset()

    setSetZodFlattenErrors({})

    onClose()
  }

  async function handleCreateVehicle(customer: CreateCustomerBodySchema) {
    try {
      setSetZodFlattenErrors({})

      const body = createCustomerBodySchema.parse(customer)

      await createCustomer(body)

      handleCloseModal()
    } catch (error) {
      if (error instanceof ZodError) {
        const flattenErrors = error.flatten()

        return setSetZodFlattenErrors(flattenErrors.fieldErrors)
      }

      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
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
                  <Input
                    autoComplete="off"
                    isInvalid={!!zodFlattenErrors.name?.length}
                    {...register('name')}
                  />
                </FormControl>
              </GridItem>

              <GridItem colSpan={1}>
                <FormControl>
                  <FormLabel>Cartão</FormLabel>
                  <Input
                    isInvalid={!!zodFlattenErrors.cardId?.length}
                    {...register('cardId')}
                  />
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
