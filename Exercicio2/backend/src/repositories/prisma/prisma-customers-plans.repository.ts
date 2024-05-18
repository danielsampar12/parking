import { CustomerPlan, Prisma } from '@prisma/client'
import { CustomersPlansRepository } from '../customers-plans.repository'
import { prisma } from '@/lib/prisma'

export class PrismaCustomersPlansRepository
  implements CustomersPlansRepository
{
  async create(data: Prisma.CustomerPlanCreateInput): Promise<CustomerPlan> {
    return await prisma.customerPlan.create({ data })
  }
}
