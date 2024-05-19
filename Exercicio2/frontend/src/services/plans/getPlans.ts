import { api } from '@/lib/axios'
import { PaginationParams } from '@/types/pagination-params'
import { Plan } from '@/types/serverTypes/Plan'

export async function getPlans({ page, take }: PaginationParams) {
  const { data } = await api.get<Plan[]>('/plan', {
    params: { page, take },
  })

  return data
}
