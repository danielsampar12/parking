import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
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
import {
  CreateVehicleBodySchema,
  createVehicleBodySchema,
} from '@/lib/zod/vehicles/createVehicleSchema'
import { useMutationCreateCar } from '@/hooks/mutations/useMutationCreateVehicle'
import { ZodError } from 'zod'
import { useState } from 'react'
import { AxiosError } from 'axios'

export function CreateVehicleModal({ isOpen, onClose }: DefaultModalProps) {
  const [plateInputError, setPlateInputError] = useState(false)

  const { register, handleSubmit, reset } = useForm<CreateVehicleBodySchema>()

  const { mutateAsync: createVehicle, isPending } = useMutationCreateCar()

  const toast = useToast()

  function handleCloseModal() {
    reset()

    setPlateInputError(false)

    onClose()
  }

  async function handleCreateVehicle(vehicle: CreateVehicleBodySchema) {
    try {
      setPlateInputError(false)

      const { plate, description, model } =
        createVehicleBodySchema.parse(vehicle)

      await createVehicle({
        plate,
        description: description ?? null,
        model: model ?? null,
      })

      handleCloseModal()
    } catch (error) {
      if (error instanceof ZodError) {
        return setPlateInputError(true)
      }

      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          return toast({
            status: 'error',
            description: 'Já existe um veículo cadastrado com a mesma placa.',
            isClosable: true,
          })
        }
      }

      console.log(error)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal}>
      <ModalOverlay />
      <ModalContent bg="white">
        <ModalCloseButton bg="gray.100" />
        <ModalHeader>Cadastrar veículo</ModalHeader>
        <ModalBody>
          <Flex flexDir="column" align="flex-start" gap={5}>
            <Grid templateColumns="repeat(2, 1fr)" gap={5}>
              <FormControl>
                <FormLabel>Placa</FormLabel>
                <Input isInvalid={plateInputError} {...register('plate')} />
              </FormControl>

              <FormControl>
                <FormLabel>Modelo</FormLabel>
                <Input {...register('model')} />
              </FormControl>
            </Grid>

            <FormControl>
              <FormLabel>Descrição</FormLabel>
              <Input {...register('description')} />
            </FormControl>
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
