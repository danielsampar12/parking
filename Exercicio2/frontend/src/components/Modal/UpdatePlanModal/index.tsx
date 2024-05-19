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
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

import { DefaultModalProps } from '../DefaultModalProps'

import { ZodError } from 'zod'
import { useState } from 'react'

import { FlattenErrorsType } from '@/lib/zod/FlattenErrorsType'

import { Plan } from '@/types/serverTypes/Plan'
import { MdEdit } from 'react-icons/md'
import {
  UpdatePlanBodySchema,
  UpdatePlanFormSchema,
} from '@/lib/zod/plans/updatePlanSchema'
import { updateContractFormSchema } from '@/lib/zod/contracts/updateContractSchema'
import { useMutationUpdatePlan } from '@/hooks/mutations/useMutationUpdatePlan'

interface UpdatePlanModal extends DefaultModalProps {
  plan: Plan
}

export function UpdatePlanModal({ isOpen, onClose, plan }: UpdatePlanModal) {
  const [editingObj, setEditingObj] = useState({
    description: false,
    value: false,
  })

  const [zodFlattenErrors, setSetZodFlattenErrors] =
    useState<FlattenErrorsType>({})

  const { register, handleSubmit, reset } = useForm<UpdatePlanFormSchema>()

  const { mutateAsync: updatePlan, isPending } = useMutationUpdatePlan()

  function handleCloseModal() {
    reset()

    setSetZodFlattenErrors({})

    onClose()
  }

  async function handleUpdatePlan(planData: UpdatePlanFormSchema) {
    try {
      setSetZodFlattenErrors({})

      const data = updateContractFormSchema.parse({
        description: planData.description ?? plan.description,
        value: planData.value ?? plan.value,
      })

      const body: UpdatePlanBodySchema = {
        planId: plan.id,
        data,
      }

      await updatePlan(body)

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
                  <FormLabel>Descrição</FormLabel>
                  <Flex flexDir="row" gap={2}>
                    <Input
                      defaultValue={plan.description}
                      isDisabled={!editingObj.description}
                      isInvalid={!!zodFlattenErrors?.description?.length}
                      {...register('description')}
                    />
                    <IconButton
                      aria-label="Edit plan description"
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
                      defaultValue={plan.value}
                      isDisabled={!editingObj.value}
                      isInvalid={!!zodFlattenErrors?.value?.length}
                      {...register('value')}
                    />
                    <IconButton
                      aria-label="Edit plan value"
                      colorScheme="gray"
                      w="fit-content"
                      icon={<MdEdit />}
                      onClick={() =>
                        setEditingObj({
                          ...editingObj,
                          value: !editingObj.value,
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
              onClick={handleSubmit(handleUpdatePlan)}
            >
              {isPending ? <Spinner color="white" /> : 'Salvar'}
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
