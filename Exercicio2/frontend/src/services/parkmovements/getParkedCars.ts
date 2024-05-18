import { api } from '@/lib/axios'
import { PaginationParams } from '@/types/pagination-params'
import { ParkMovementWithVehicleAndCardId } from '@/types/serverTypes/ParkMovement'

export async function getParkedCars({ page, take }: PaginationParams) {
  const { data } = await api.get<ParkMovementWithVehicleAndCardId[]>(
    '/parkmovement',
    {
      params: { page, take },
    },
  )

  return data
}
