import { CreatePlanModal } from '@/components/Modal/CreatePlanModal'
import { Pagination } from '@/components/Pagination'
import { PlansTable } from '@/components/Tables/PlansTable'
import { useQueryPlans } from '@/hooks/queries/useQueryPlans'
import { Flex, Heading, IconButton } from '@chakra-ui/react'
import { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'

export function PlansSection() {
  const [page, setPage] = useState(1)
  const take = 8

  const [isCreatePlanModalOpen, setIsCreatePlanModalOpen] = useState(false)

  const { data, isError, isLoading } = useQueryPlans({ page, take })

  return (
    <>
      <CreatePlanModal
        isOpen={isCreatePlanModalOpen}
        onClose={() => setIsCreatePlanModalOpen(false)}
      />

      <Flex w="full" flex={1} flexDir="column" justify="flex-start">
        <Flex w="full" flexDir="row" justify="space-between">
          <Heading size="xl">Planos</Heading>
          <IconButton
            aria-label="Add vehicle"
            icon={<IoMdAdd />}
            onClick={() => setIsCreatePlanModalOpen(true)}
          />
        </Flex>

        <PlansTable data={data ?? []} isError={isError} isLoading={isLoading} />

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
