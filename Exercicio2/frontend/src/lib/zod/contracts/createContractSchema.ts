import { z } from 'zod'

export const createContractBodySchema = z.object({
  description: z.string().min(3).max(50),
  maxValue: z.number().optional(),

  contractRules: z
    .array(
      z.object({
        until: z.number(),
        value: z.number(),
      }),
    )
    .min(1),
})

export type CreateContractBodySchema = z.infer<typeof createContractBodySchema>
