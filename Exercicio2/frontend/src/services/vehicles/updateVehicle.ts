import { api } from '@/lib/axios'
import { UpdateVehicleBodySchema } from '@/lib/zod/vehicles/updateVehicleSchema'
import { Vehicle } from '@/types/serverTypes/Vehicle'

export async function updateVehicle(body: UpdateVehicleBodySchema) {
  await api.put<Vehicle>('/vehicle', body)
}
