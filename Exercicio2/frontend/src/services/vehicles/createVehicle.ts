import { api } from '@/lib/axios'
import { CreateVehicleBodySchema } from '@/lib/zod/vehicles/createVehicleSchema'
import { Vehicle } from '@/types/serverTypes/Vehicle'

export async function createVehicle(body: CreateVehicleBodySchema) {
  const { data } = await api.post<Vehicle>('/vehicle', body)

  return data
}
