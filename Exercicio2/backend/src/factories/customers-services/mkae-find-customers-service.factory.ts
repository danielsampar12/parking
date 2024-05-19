import { PrismaCustomerRepository } from '@/repositories/prisma/prisma-customers.repository'
import { FindCustomersService } from '@/services/customers/find-customers.service'

export function makeFindCustomersService() {
  return new FindCustomersService(new PrismaCustomerRepository())
}
