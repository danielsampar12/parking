import { QUERY_KEY } from '@/constants/queryKeys'
import { getParkedCars } from '@/services/parkmovements/getParkedCars'
import { PaginationParams } from '@/types/pagination-params'
import { ParkMovementWithVehicleAndCardId } from '@/types/serverTypes/ParkMovement'
import { useQuery } from '@tanstack/react-query'

export function useQueryParked(pagination: PaginationParams) {
  return useQuery<ParkMovementWithVehicleAndCardId[]>({
    queryKey: [QUERY_KEY.parked, pagination.page],
    queryFn: () => getParkedCars(pagination),
    refetchOnWindowFocus: false,
  })
}
