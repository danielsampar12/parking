import { api } from '@/lib/axios'
import { ParkExitWithVehicle } from '@/types/serverTypes/ParkMovement'

interface ExitCarRequest {
  plate?: string
  cardId?: string
}

export interface ExitCarResponse {
  parkMovement: ParkExitWithVehicle
  value: number
}

export async function exitCar({ cardId, plate }: ExitCarRequest) {
  const { data } = await api.put<ExitCarResponse>('/parkmovement', {
    exitDate: new Date().toISOString(),
    cardId,
    plate,
  })

  return data
}
