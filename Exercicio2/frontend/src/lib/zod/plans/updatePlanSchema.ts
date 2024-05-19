import { z } from 'zod'

export const updatePlanFormSchema = z.object({
  description: z.string().max(50).optional(),
  value: z.number().optional(),
})

export const updatePlanBodySchema = z.object({
  planId: z.number(),
  data: updatePlanFormSchema,
})

export type UpdatePlanFormSchema = z.infer<typeof updatePlanFormSchema>
export type UpdatePlanBodySchema = z.infer<typeof updatePlanBodySchema>
