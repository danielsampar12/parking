import { Contract, Prisma } from '@prisma/client'
import { ContractsRepository } from '@/repositories/contracts.repository'
import { ContractNotFoundError } from '../error/contract-not-found-error'

interface UpdateContractRequest {
  contractId: number

  data: {
    description: string
    maxValue?: number

    contractRules: {
      id: number
    }[]
  }
}

interface UpdateContractResponse {
  contract: Contract
}

export class UpdateContractService {
  constructor(private readonly contractsRepository: ContractsRepository) {}

  async execute({
    contractId,
    data,
  }: UpdateContractRequest): Promise<UpdateContractResponse> {
    const existingContract = await this.contractsRepository.findById(contractId)

    if (!existingContract) {
      throw new ContractNotFoundError(contractId)
    }

    const prismaData: Prisma.ContractUpdateInput = {
      ...data,
      ContractRule: {
        set: data.contractRules.map((rule) => rule),
      },
    }

    const contract = await this.contractsRepository.update(
      contractId,
      prismaData,
    )

    return { contract }
  }
}
