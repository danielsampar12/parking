import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
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
import { useForm } from 'react-hook-form'

import { DefaultModalProps } from '../DefaultModalProps'

import { ZodError } from 'zod'
import { useState } from 'react'
import { Vehicle } from '@/types/serverTypes/Vehicle'
import { MdEdit } from 'react-icons/md'
import {
  UpdateVehicleBodySchema,
  UpdateVehicleFormSchema,
  updateVehicleFormSchema,
} from '@/lib/zod/vehicles/updateVehicleSchema'
import { useMutationUpdateVehicle } from '@/hooks/mutations/useMutationUpdateVehicle'
import { FlattenErrorsType } from '@/lib/zod/FlattenErrorsType'

interface UpdateVehicleModalProps extends DefaultModalProps {
  vehicle: Vehicle
}

export function UpdateVehicleModal({
  isOpen,
  onClose,
  vehicle,
}: UpdateVehicleModalProps) {
  const [editingObj, setEditingObj] = useState({
    plate: false,
    model: false,
    description: false,
  })

  const [zodFlattenErrors, setSetZodFlattenErrors] =
    useState<FlattenErrorsType>({})

  const { register, handleSubmit, reset } = useForm<UpdateVehicleFormSchema>()

  const { mutateAsync: updateVehicle, isPending } = useMutationUpdateVehicle()

  function handleCloseModal() {
    reset()

    setSetZodFlattenErrors({})

    onClose()
  }

  async function handleUpdateVehicle(vehicleData: UpdateVehicleFormSchema) {
    try {
      setSetZodFlattenErrors({})

      const data = updateVehicleFormSchema.parse({
        plate: vehicleData.plate ?? vehicle.plate,
        model: vehicleData.model ?? vehicle.model,
        description: vehicleData.description ?? vehicle.description,
      })

      const body: UpdateVehicleBodySchema = {
        vehicleId: vehicle.id,
        data,
      }

      await updateVehicle(body)

      handleCloseModal()
    } catch (error) {
      if (error instanceof ZodError) {
        const flattenErrors = error.flatten()

        return setSetZodFlattenErrors(flattenErrors.fieldErrors)
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
                <Flex flexDir="row" gap={2}>
                  <Input
                    defaultValue={vehicle.plate}
                    isDisabled={!editingObj.plate}
                    isInvalid={!!zodFlattenErrors?.plate?.length}
                    {...register('plate')}
                  />
                  <IconButton
                    aria-label="Edit vehicle plate"
                    colorScheme="gray"
                    w="fit-content"
                    icon={<MdEdit />}
                    onClick={() =>
                      setEditingObj({
                        ...editingObj,
                        plate: !editingObj.plate,
                      })
                    }
                  />
                </Flex>
              </FormControl>

              <FormControl>
                <FormLabel>Modelo</FormLabel>
                <Flex flexDir="row" gap={2}>
                  <Input
                    defaultValue={vehicle.model ?? ''}
                    isDisabled={!editingObj.model}
                    isInvalid={!!zodFlattenErrors?.model?.length}
                    {...register('model')}
                  />
                  <IconButton
                    aria-label="Edit vehicle model"
                    colorScheme="gray"
                    w="fit-content"
                    icon={<MdEdit />}
                    onClick={() =>
                      setEditingObj({
                        ...editingObj,
                        model: !editingObj.model,
                      })
                    }
                  />
                </Flex>
              </FormControl>
            </Grid>

            <FormControl>
              <FormLabel>Descrição</FormLabel>
              <Flex flexDir="row" gap={2}>
                <Input
                  defaultValue={vehicle.description ?? ''}
                  isDisabled={!editingObj.description}
                  isInvalid={!!zodFlattenErrors?.description?.length}
                  {...register('description')}
                />
                <IconButton
                  aria-label="Edit vehicle description"
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
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Flex flexDir="row" gap={2}>
            <Button colorScheme="red" onClick={handleCloseModal}>
              {isPending ? <Spinner color="white" /> : 'Cancelar'}
            </Button>

            <Button
              colorScheme="green"
              onClick={handleSubmit(handleUpdateVehicle)}
            >
              {isPending ? <Spinner color="white" /> : 'Salvar'}
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
