import { CustomersRepository } from '@/repositories/customers.repository'
import { Customer } from '@prisma/client'

interface CreateCustomerRequest {
  name: string
  cardId: string
}

interface CreateCustomerResponse {
  customer: Customer
}

export class CreateCustomerService {
  constructor(private readonly customersRepository: CustomersRepository) {}

  async execute(req: CreateCustomerRequest): Promise<CreateCustomerResponse> {
    const customer = await this.customersRepository.create(req)

    return { customer }
  }
}
