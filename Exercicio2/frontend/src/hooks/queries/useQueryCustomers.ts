import { QUERY_KEY } from '@/constants/queryKeys'
import { getCustomers } from '@/services/customers/getCustomers'
import { PaginationParams } from '@/types/pagination-params'
import { Customer } from '@/types/serverTypes/Customer'
import { useQuery } from '@tanstack/react-query'

export function useQueryCustomers(pagination: PaginationParams) {
  return useQuery<Customer[]>({
    queryKey: [QUERY_KEY.customers, pagination.page],
    queryFn: () => getCustomers(pagination),
    refetchOnWindowFocus: false,
  })
}
