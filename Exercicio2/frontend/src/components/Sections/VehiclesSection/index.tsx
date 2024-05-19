import { Pagination } from '@/components/Pagination'
import { VehiclesTable } from '@/components/Tables/VehiclesTable'
import { useQueryVehicles } from '@/hooks/queries/useQueryVehicles'
import { Flex } from '@chakra-ui/react'
import { useState } from 'react'

export function VehiclesSection() {
  const [page, setPage] = useState(1)
  const take = 10
  const { data, isError, isLoading } = useQueryVehicles({ page, take })

  console.log(data)

  return (
    <Flex w="full" flex={1} flexDir="column" justify="flex-start" p={2}>
      <VehiclesTable
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
