import { PrismaContractsRepository } from '@/repositories/prisma/prisma-contracts.repository'
import { FindContractService } from '@/services/contracts/find-contract.service'

export function makeFindContractService() {
  return new FindContractService(new PrismaContractsRepository())
}
