import { PrismaCustomerRepository } from '@/repositories/prisma/prisma-customers.repository'
import { CreateCustomerService } from '@/services/customers/create-customer.service'

export function makeCreateCustomerService() {
  return new CreateCustomerService(new PrismaCustomerRepository())
}
