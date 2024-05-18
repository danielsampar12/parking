// import { Pagination } from '@/components/Pagination'
import { Pagination } from '@/components/Pagination'
import { ParkMovementsTable } from '@/components/Tables/ParkMovementsTable'
import { useQueryParked } from '@/hooks/queries/useQueryParked'
import { Flex, Input } from '@chakra-ui/react'
import { useState } from 'react'

export function DashboardSection() {
  const [plateOrCardId, setPlateOrCardId] = useState('')
  const [page, setPage] = useState(1)
  const [take] = useState(10)

  const { data, isError, isLoading } = useQueryParked({ page, take })

  return (
    <Flex w="full" flex={1} flexDir="column" justify="flex-start" p={2}>
      <Input
        w="30%"
        onChange={(e) => setPlateOrCardId(e.target.value)}
        placeholder="Insira a placa ou cartão do cliente"
      />

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
  )
}
