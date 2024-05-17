import { Contract, Prisma } from '@prisma/client'

export interface ContractsRepository {
  create(data: Prisma.ContractCreateInput): Promise<Contract>
  update(
    contractId: number,
    data: Prisma.ContractUpdateInput,
  ): Promise<Contract>
  findById(id: number): Promise<Contract | null>
}
