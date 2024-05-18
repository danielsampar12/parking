import { z } from 'zod'

export const paginationSchema = z.object({
  page: z.number().optional().default(0),
  take: z.number().optional(),
})
