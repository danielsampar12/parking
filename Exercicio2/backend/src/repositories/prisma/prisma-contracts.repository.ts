import { Contract, Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { ContractWithRules, ContractsRepository } from '../contracts.repository'

export class PrismaContractsRepository implements ContractsRepository {
  async create(data: Prisma.ContractCreateInput): Promise<Contract> {
    return await prisma.contract.create({ data })
  }

  async findById(id: number): Promise<Contract | null> {
    return await prisma.contract.findUnique({ where: { id } })
  }

  async getContract(): Promise<ContractWithRules | null> {
    return await prisma.contract.findFirst({
      include: {
        ContractRule: {
          orderBy: {
            until: 'asc',
          },
        },
      },
    })
  }

  async update(
    contractId: number,
    data: Prisma.ContractUpdateInput,
  ): Promise<Contract> {
    return await prisma.contract.update({
      where: { id: contractId },
      data,
    })
  }
}
