import { z } from 'zod'

export const createPlanBodySchema = z.object({
  description: z.string().min(1).max(50),
  value: z.number(),
})

export type CreatePlanBodySchema = z.infer<typeof createPlanBodySchema>
