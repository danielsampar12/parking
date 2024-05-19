import { api } from '@/lib/axios'
import { UpdateCustomerBodySchema } from '@/lib/zod/customers/updateCustomerSchema'
import { Customer } from '@/types/serverTypes/Customer'

export async function updateCustomer(body: UpdateCustomerBodySchema) {
  const { data } = await api.put<Customer>('/customer', body)

  return data
}
