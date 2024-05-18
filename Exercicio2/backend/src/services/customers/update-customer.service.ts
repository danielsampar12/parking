import { CustomersRepository } from '@/repositories/customers.repository'
import { Customer, Prisma } from '@prisma/client'
import { CustomerNotFoundError } from '../error/customer-not-found-error'

interface UpdateCustomerRequest {
  customerId: number
  data: Prisma.CustomerUpdateInput
}

interface UpdateCustomerResponse {
  customer: Customer
}

export class UpdateCustomerService {
  constructor(private readonly customersRepository: CustomersRepository) {}

  async execute({
    customerId,
    data,
  }: UpdateCustomerRequest): Promise<UpdateCustomerResponse> {
    const existingCustomer = await this.customersRepository.findById(customerId)

    if (!existingCustomer) {
      throw new CustomerNotFoundError(customerId)
    }

    const customer = await this.customersRepository.update(customerId, data)

    return { customer }
  }
}
