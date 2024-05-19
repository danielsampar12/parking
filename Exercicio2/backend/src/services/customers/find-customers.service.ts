import { CustomersRepository } from '@/repositories/customers.repository'
import { PaginationParams } from '@/types/pagination-params'
import { Customer } from '@prisma/client'

interface FindCustomersRequest extends PaginationParams {}

interface FindCustomersResponse {
  customers: Customer[]
}

export class FindCustomersService {
  constructor(private readonly customersRepository: CustomersRepository) {}

  async execute(
    pagionation: FindCustomersRequest,
  ): Promise<FindCustomersResponse> {
    const customers = await this.customersRepository.findAll(pagionation)

    return { customers }
  }
}
