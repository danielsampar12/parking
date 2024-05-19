import { api } from '@/lib/axios'
import { CreatePlanBodySchema } from '@/lib/zod/plans/createPlanSchema'
import { Plan } from '@/types/serverTypes/Plan'

export async function createPlan(body: CreatePlanBodySchema) {
  const { data } = await api.post<Plan>('/plan', body)

  return data
}
