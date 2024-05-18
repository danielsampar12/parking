import { Contract, ContractRule, Prisma } from '@prisma/client'

export type ContractWithRules = Contract & {
  ContractRule: ContractRule[]
}

export interface ContractsRepository {
  create(data: Prisma.ContractCreateInput): Promise<Contract>
  update(
    contractId: number,
    data: Prisma.ContractUpdateInput,
  ): Promise<Contract>
  findById(id: number): Promise<Contract | null>
  getContract(): Promise<ContractWithRules | null>
}
