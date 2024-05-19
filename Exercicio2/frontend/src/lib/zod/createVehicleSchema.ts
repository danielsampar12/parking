import { z } from 'zod'

export const createVehicleBodySchema = z.object({
  plate: z.string().min(7).max(10),
  model: z.string().max(30).optional().nullable(),
  description: z.string().max(50).optional().nullable(),
})

export type CreateVehicleBodySchema = z.infer<typeof createVehicleBodySchema>
