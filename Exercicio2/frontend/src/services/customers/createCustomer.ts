import { api } from '@/lib/axios'
import { CreateCustomerBodySchema } from '@/lib/zod/createCustomerSchema'
import { Customer } from '@/types/serverTypes/Customer'

export async function createCustomer(body: CreateCustomerBodySchema) {
  const { data } = await api.post<Customer>('/customer', body)

  return data
}
