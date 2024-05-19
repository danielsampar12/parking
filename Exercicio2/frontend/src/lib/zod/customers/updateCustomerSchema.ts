import { z } from 'zod'

export const updateCustomerFormSchema = z.object({
  name: z.string().max(50),
  cardId: z.string().max(10),
})

export const updateCustomerBodySchema = z.object({
  customerId: z.number(),
  data: updateCustomerFormSchema,
})

export type UpdateCustomerBodySchema = z.infer<typeof updateCustomerBodySchema>
export type UpdateCustomerFormSchema = z.infer<typeof updateCustomerFormSchema>
