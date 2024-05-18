import { api } from '@/lib/axios'
import { ParkMovement } from '@/types/serverTypes/ParkMovement'

interface EntryCarRequest {
  plate?: string
  cardId?: string
}

export async function entryCar({ cardId, plate }: EntryCarRequest) {
  const { data } = await api.post<ParkMovement>('/parkmovement', {
    cardId,
    plate,
  })

  return data
}
