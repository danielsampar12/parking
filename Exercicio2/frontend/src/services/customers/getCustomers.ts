import { api } from '@/lib/axios'
import { PaginationParams } from '@/types/pagination-params'
import { Customer } from '@/types/serverTypes/Customer'

export async function getCustomers({ page, take }: PaginationParams) {
  const { data } = await api.get<Customer[]>('/customer', {
    params: { page, take },
  })

  return data
}
