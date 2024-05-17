import { ContractsRepository } from '@/repositories/contracts.repository'
import { Contract, Prisma } from '@prisma/client'
import { ContractAlreadyExistsError } from '../error/contract-already-exists-error'

interface CreateContractRequest {
  description: string
  maxValue?: number

  contractRules: {
    until: number
    value: number
  }[]
}

interface CreateContractResponse {
  contract: Contract
}

export class CreateContractService {
  constructor(private readonly contractsRepository: ContractsRepository) {}

  async execute(req: CreateContractRequest): Promise<CreateContractResponse> {
    const contractAlreadyExists = await this.contractsRepository.findFirst()

    if (!contractAlreadyExists) {
      throw new ContractAlreadyExistsError()
    }

    const data: Prisma.ContractCreateInput = {
      ...req,
      ContractRule: {
        createMany: {
          data: req.contractRules.map((data) => data),
        },
      },
    }

    const contract = await this.contractsRepository.create(data)

    return { contract }
  }
}
