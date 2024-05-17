import { PrismaCustomerRepository } from '@/repositories/prisma/prisma-customers.repository'
import { UpdateCustomerService } from '@/services/customers/update-customer.service'

export function makeUpdateCustomerService() {
  return new UpdateCustomerService(new PrismaCustomerRepository())
}
