import { CreateCustomerModal } from '@/components/Modal/CreateCustomerModal'
import { Pagination } from '@/components/Pagination'
import { CustomersTable } from '@/components/Tables/CustomersTable'
import { useQueryCustomers } from '@/hooks/queries/useQueryCustomers'
import { Flex, Heading, IconButton } from '@chakra-ui/react'
import { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'

export function CustomersSection() {
  const [page, setPage] = useState(1)
  const take = 8

  const [isCreateCustomerModalOpen, setIsCreateCustomerModalOpen] =
    useState(false)

  const { data, isError, isLoading } = useQueryCustomers({ page, take })

  return (
    <>
      <CreateCustomerModal
        isOpen={isCreateCustomerModalOpen}
        onClose={() => setIsCreateCustomerModalOpen(false)}
      />

      <Flex w="full" flex={1} flexDir="column" justify="flex-start">
        <Flex w="full" flexDir="row" justify="space-between">
          <Heading size="xl">Clientes</Heading>
          <IconButton
            aria-label="Add vehicle"
            icon={<IoMdAdd />}
            onClick={() => setIsCreateCustomerModalOpen(true)}
          />
        </Flex>

        <CustomersTable
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
