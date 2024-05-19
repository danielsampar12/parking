import { CustomersRepository } from '@/repositories/customers.repository'
import { Customer } from '@prisma/client'
import { CustomerAlreadyExistsError } from '../error/customer-already-exists-error'

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
    const existingCustomer = await this.customersRepository.findByCardId(
      req.cardId,
    )

    if (existingCustomer) {
      throw new CustomerAlreadyExistsError(req.cardId)
    }

    const customer = await this.customersRepository.create(req)

    return { customer }
  }
}
