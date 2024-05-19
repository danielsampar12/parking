import { CreateVehicleModal } from '@/components/Modal/CreateVehicleModal'
import { Pagination } from '@/components/Pagination'
import { VehiclesTable } from '@/components/Tables/VehiclesTable'
import { useQueryVehicles } from '@/hooks/queries/useQueryVehicles'
import { Flex, IconButton } from '@chakra-ui/react'
import { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'

export function VehiclesSection() {
  const [page, setPage] = useState(1)
  const take = 8

  const [isCreateVehicleModalOpen, setIsCreateVehicleModalOpen] =
    useState(false)

  const { data, isError, isLoading } = useQueryVehicles({ page, take })

  return (
    <>
      <CreateVehicleModal
        isOpen={isCreateVehicleModalOpen}
        onClose={() => setIsCreateVehicleModalOpen(false)}
      />

      <Flex w="full" flex={1} flexDir="column" justify="flex-start">
        <Flex w="full" flexDir="row" justify="flex-end">
          <IconButton
            aria-label="Add vehicle"
            icon={<IoMdAdd />}
            onClick={() => setIsCreateVehicleModalOpen(true)}
          />
        </Flex>

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
    </>
  )
}
