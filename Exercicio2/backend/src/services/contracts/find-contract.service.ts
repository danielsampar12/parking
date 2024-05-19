import { ContractsRepository } from '@/repositories/contracts.repository'
import { Contract } from '@prisma/client'

interface FindContractResponse {
  contract: Contract | null
}

export class FindContractService {
  constructor(private readonly contractRepository: ContractsRepository) {}

  async execute(): Promise<FindContractResponse> {
    const contract = await this.contractRepository.getContract()

    return { contract }
  }
}
