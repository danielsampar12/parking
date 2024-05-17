import { PrismaContractsRepository } from '@/repositories/prisma/prisma-contracts.repository'
import { UpdateContractService } from '@/services/contracts/update-contract.service'

export function makeUpdateContractService() {
  return new UpdateContractService(new PrismaContractsRepository())
}
