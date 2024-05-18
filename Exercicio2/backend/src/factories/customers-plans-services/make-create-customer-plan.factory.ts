import { PrismaCustomersPlansRepository } from '@/repositories/prisma/prisma-customers-plans.repository'
import { PrismaCustomerRepository } from '@/repositories/prisma/prisma-customers.repository'
import { PrismaPlansRepository } from '@/repositories/prisma/prisma-plans-repository'
import { CreateCustomerPlanService } from '@/services/customers-plans/create-customer-plan.service'

export function makeCreateCustomerPlanService() {
  return new CreateCustomerPlanService(
    new PrismaCustomersPlansRepository(),
    new PrismaCustomerRepository(),
    new PrismaPlansRepository(),
  )
}
