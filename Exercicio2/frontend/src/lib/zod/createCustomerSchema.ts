import { z } from 'zod'

export const createCustomerBodySchema = z.object({
  name: z.string().min(3).max(50),
  cardId: z.string().min(3).max(10),
})

export type CreateCustomerBodySchema = z.infer<typeof createCustomerBodySchema>
