import { Customer, Prisma } from '@prisma/client'

export interface CustomersRepository {
  update(
    customerId: number,
    data: Prisma.CustomerUpdateInput,
  ): Promise<Customer>
  create(data: Prisma.CustomerCreateInput): Promise<Customer>
  findById(id: number): Promise<Customer | null>
}
