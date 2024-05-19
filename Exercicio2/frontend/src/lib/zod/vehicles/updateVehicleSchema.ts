import { z } from 'zod'

export const updateVehicleFormSchema = z.object({
  plate: z.string().max(10).optional(),
  model: z.string().max(30).optional().nullable(),
  description: z.string().max(50).optional().nullable(),
})

export const updateVehicleBodySchema = z.object({
  vehicleId: z.number(),
  data: updateVehicleFormSchema,
})

export type UpdateVehicleFormSchema = z.infer<typeof updateVehicleFormSchema>
export type UpdateVehicleBodySchema = z.infer<typeof updateVehicleBodySchema>
