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
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

import { DefaultModalProps } from '../DefaultModalProps'

import { ZodError } from 'zod'
import { useState } from 'react'

import { FlattenErrorsType } from '@/lib/zod/FlattenErrorsType'
import {
  CreatePlanBodySchema,
  createPlanBodySchema,
} from '@/lib/zod/plans/createPlanSchema'
import { useMutationCreatePlan } from '@/hooks/mutations/useMutationCreatePlan'
import { BrazilianCurrencyInput } from '@/components/Input/BrazilianCurrencyInput'
import { parseBRLToFloat } from '@/utils/parseBRLToFloat'

export function CreatePlanModal({ isOpen, onClose }: DefaultModalProps) {
  const [zodFlattenErrors, setSetZodFlattenErrors] =
    useState<FlattenErrorsType>({})

  const { register, handleSubmit, reset } = useForm<CreatePlanBodySchema>()

  const { mutateAsync: createPlan, isPending } = useMutationCreatePlan()

  function handleCloseModal() {
    reset()

    setSetZodFlattenErrors({})

    onClose()
  }

  async function handleCreateVehicle(planData: CreatePlanBodySchema) {
    try {
      setSetZodFlattenErrors({})

      const plan = {
        ...planData,
        value: parseBRLToFloat(planData.value),
      }

      const body = createPlanBodySchema.parse(plan)

      await createPlan(body)

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
                  <Input
                    autoComplete="off"
                    isInvalid={!!zodFlattenErrors.description?.length}
                    {...register('description')}
                  />
                </FormControl>
              </GridItem>

              <GridItem colSpan={1}>
                <FormControl>
                  <FormLabel>Valor</FormLabel>
                  <BrazilianCurrencyInput
                    isInvalid={!!zodFlattenErrors.value?.length}
                    {...register('value')}
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
