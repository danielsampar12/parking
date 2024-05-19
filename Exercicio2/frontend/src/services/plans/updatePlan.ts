import { api } from '@/lib/axios'
import { UpdatePlanBodySchema } from '@/lib/zod/plans/updatePlanSchema'
import { Plan } from '@/types/serverTypes/Plan'

export async function updatePlan(body: UpdatePlanBodySchema) {
  await api.put<Plan>('/plan', body)
}
