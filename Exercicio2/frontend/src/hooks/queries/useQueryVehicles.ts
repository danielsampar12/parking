import { QUERY_KEY } from '@/constants/queryKeys'
import { getVechicles } from '@/services/vehicles/getVechicles'
import { PaginationParams } from '@/types/pagination-params'
import { Vehicle } from '@/types/serverTypes/Vehicle'
import { useQuery } from '@tanstack/react-query'

export function useQueryVehicles(pagination: PaginationParams) {
  return useQuery<Vehicle[]>({
    queryKey: [QUERY_KEY.vehicles, pagination.page],
    queryFn: () => getVechicles(pagination),
    refetchOnWindowFocus: false,
  })
}
