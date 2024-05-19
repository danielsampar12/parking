import { ExitCarModal } from '@/components/Modal/ExitCarModal'
import { Pagination } from '@/components/Pagination'
import { ParkMovementsTable } from '@/components/Tables/ParkMovementsTable'
import { useMutationEntryCar } from '@/hooks/mutations/useMutationEntryCar'
import { useMutationExitCar } from '@/hooks/mutations/useMutationExitCar'
import { useQueryIsVehicleParked } from '@/hooks/queries/useQueryIsVehicleParked'
import { useQueryParked } from '@/hooks/queries/useQueryParked'
import { ExitCarResponse } from '@/services/parkmovements/exitCar'
import {
  Button,
  Flex,
  Input,
  Select,
  Spinner,
  useBreakpoint,
} from '@chakra-ui/react'
import { useState } from 'react'

export function DashboardSection() {
  const [plateOrCardId, setPlateOrCardId] = useState('')
  const [entryInputType, setEntryInputType] = useState<'plate' | 'cardId'>(
    'plate',
  )
  const [exitCarData, setExitCarData] = useState<ExitCarResponse | null>(null)
  const [openExitCarModal, setOpenExitCarModal] = useState(false)
  const [page, setPage] = useState(1)
  const [take] = useState(10)

  const breakpoint = useBreakpoint()

  const { data: isExitButton } = useQueryIsVehicleParked({
    plate: entryInputType === 'plate' ? plateOrCardId : undefined,
    cardId: entryInputType === 'cardId' ? plateOrCardId : undefined,
  })

  const { data, isLoading, isError } = useQueryParked({ page, take })

  const { mutate: entryCar, isPending } = useMutationEntryCar()
  const { mutateAsync: exitCar } = useMutationExitCar()

  function handleSelectEntryInputType(value: string) {
    if (value !== 'plate' && value !== 'cardId') {
      throw new Error(
        `Select is not setting entryInputType properly. ${value} is not assignable to 'plate' | 'cardId'`,
      )
    }

    setEntryInputType(value)
  }

  function handleEntryCar() {
    try {
      if (entryInputType === 'plate') {
        entryCar({ plate: plateOrCardId.toUpperCase() })
      } else {
        entryCar({ cardId: plateOrCardId.toUpperCase() })
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function handleExitCar() {
    try {
      if (entryInputType === 'plate') {
        const data = await exitCar({ plate: plateOrCardId.toUpperCase() })

        setExitCarData(data)
        setOpenExitCarModal(true)
      } else {
        const data = await exitCar({ cardId: plateOrCardId.toUpperCase() })

        setExitCarData(data)
        setOpenExitCarModal(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  function onCloseExitCarModal() {
    setExitCarData(null)
    setOpenExitCarModal(false)
  }

  return (
    <>
      {exitCarData ? (
        <ExitCarModal
          exitCarData={exitCarData}
          isOpen={openExitCarModal}
          onClose={onCloseExitCarModal}
        />
      ) : (
        <></>
      )}
      <Flex w="full" flex={1} flexDir="column" justify="flex-start" p={2}>
        <Flex flexDir={breakpoint !== 'sm' ? 'row' : 'column'} gap={2}>
          <Select
            defaultValue="plate"
            size="md"
            w="fit-content"
            onChange={(e) => handleSelectEntryInputType(e.target.value)}
          >
            <option key="plate" value="plate">
              PLACA
            </option>
            <option key="cardId" value="cardId">
              CARTÃO
            </option>
          </Select>
          <Input
            w={breakpoint !== 'sm' ? '30%' : 'full'}
            onChange={(e) => setPlateOrCardId(e.target.value)}
            placeholder={
              entryInputType === 'plate'
                ? 'Insira a placa do veículo'
                : 'Insira o cartão do cliente'
            }
          />
          {isExitButton ? (
            <Button colorScheme="blue" onClick={handleExitCar}>
              Dar saída
            </Button>
          ) : (
            <Button colorScheme="blue" onClick={handleEntryCar}>
              {isPending ? <Spinner color="white" /> : 'Dar entrada'}
            </Button>
          )}
        </Flex>

        <ParkMovementsTable
          data={data ?? []}
          isError={isError}
          isLoading={isLoading}
        />

        <Pagination
          currentPage={page}
          isLastPage={!data || data.length < take}
          onNext={() => setPage(page + 1)}
          onPrevious={() => {
            if (page > 1) {
              setPage(page - 1)
            }
          }}
        />
      </Flex>
    </>
  )
}
