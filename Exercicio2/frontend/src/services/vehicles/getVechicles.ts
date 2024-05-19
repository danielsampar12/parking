import { api } from '@/lib/axios'
import { PaginationParams } from '@/types/pagination-params'
import { Vehicle } from '@/types/serverTypes/Vehicle'

export async function getVechicles({ page, take }: PaginationParams) {
  console.log({ page, take })

  const { data } = await api.get<Vehicle[]>('/vehicle', {
    params: { page, take },
  })

  return data
}
