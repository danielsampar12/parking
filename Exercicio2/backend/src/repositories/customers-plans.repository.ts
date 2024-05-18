import { CustomerPlan, Prisma } from '@prisma/client'

export interface CustomersPlansRepository {
  create(data: Prisma.CustomerPlanCreateInput): Promise<CustomerPlan>
}
