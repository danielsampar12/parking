import { PrismaContractsRepository } from '@/repositories/prisma/prisma-contracts.repository'
import { PrismaCustomerRepository } from '@/repositories/prisma/prisma-customers.repository'
import { CalculateExitCarValueService } from '@/services/park-movement/calculate-exit-car-value.service'

export function makeCalculateExitCarValueService() {
  return new CalculateExitCarValueService(
    new PrismaCustomerRepository(),
    new PrismaContractsRepository(),
  )
}
