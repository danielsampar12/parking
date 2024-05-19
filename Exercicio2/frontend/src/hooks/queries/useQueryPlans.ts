import { QUERY_KEY } from '@/constants/queryKeys'
import { getPlans } from '@/services/plans/getPlans'
import { PaginationParams } from '@/types/pagination-params'
import { Plan } from '@/types/serverTypes/Plan'
import { useQuery } from '@tanstack/react-query'

export function useQueryPlans(pagination: PaginationParams) {
  return useQuery<Plan[]>({
    queryKey: [QUERY_KEY.plans, pagination.page],
    queryFn: () => getPlans(pagination),
    refetchOnWindowFocus: false,
  })
}
