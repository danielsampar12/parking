import { z } from 'zod'

export const updateContractFormSchema = z.object({
  description: z.string().min(3).max(50).optional(),
  maxValue: z.number().optional(),
})

export type UpdateContractFormSchema = z.infer<typeof updateContractFormSchema>

export const updateContractBodySchema = z.object({
  contractId: z.number(),
  data: z.object({
    description: z.string().max(50),
    maxValue: z.number().optional(),

    contractRules: z.array(
      z.object({
        id: z.number(),
      }),
    ),
  }),
})

export type UpdateContractBodySchema = z.infer<typeof updateContractBodySchema>
