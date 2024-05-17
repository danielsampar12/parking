import { Prisma, Customer } from '@prisma/client'
import { CustomersRepository } from '../customers.repository'
import { prisma } from '@/lib/prisma'

export class PrismaCustomerRepository implements CustomersRepository {
  async update(
    customerId: number,
    data: Prisma.CustomerUpdateInput,
  ): Promise<Customer> {
    return await prisma.customer.update({
      where: { id: customerId },
      data,
    })
  }

  async create(data: Prisma.CustomerCreateInput): Promise<Customer> {
    return await prisma.customer.create({ data })
  }

  async findById(id: number) {
    return prisma.customer.findUnique({ where: { id } })
  }
}
