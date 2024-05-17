import { PrismaContractsRepository } from '@/repositories/prisma/prisma-contracts.repository'
import { CreateContractService } from '@/services/contracts/create-contract.service'

export function makeCreateContractService() {
  return new CreateContractService(new PrismaContractsRepository())
}
