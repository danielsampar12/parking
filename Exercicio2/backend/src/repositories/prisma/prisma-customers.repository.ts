import { Prisma, Customer } from '@prisma/client'
import { CustomersRepository } from '../customers.repository'
import { prisma } from '@/lib/prisma'
import { PaginationParams } from '@/types/pagination-params'

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

  async isMonthlyParker(vehicleId: number) {
    const customer = await prisma.customer.findFirst({
      where: {
        Vehicle: {
          some: { id: vehicleId },
        },
      },
      include: {
        CustomerPlan: {
          select: { id: true },
        },
      },
    })

    return !!customer?.CustomerPlan?.id
  }

  async findAll({ page = 1, take }: PaginationParams): Promise<Customer[]> {
    return await prisma.customer.findMany({
      skip: take ? (page - 1) * take : 0,
      take,
      orderBy: {
        id: 'desc',
      },
    })
  }
}
