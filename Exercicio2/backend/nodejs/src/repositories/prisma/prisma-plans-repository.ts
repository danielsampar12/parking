import { Plan, Prisma } from '@prisma/client'
import { PlansRepository } from '../plans.repository'
import { prisma } from '@/lib/prisma'

export class PrismaPlansRepository implements PlansRepository {
  async create(data: Prisma.PlanCreateInput): Promise<Plan> {
    return await prisma.plan.create({ data })
  }

  async findById(id: number): Promise<Plan | null> {
    return await prisma.plan.findUnique({ where: { id } })
  }

  async update(planId: number, data: Prisma.PlanUpdateInput): Promise<Plan> {
    return await prisma.plan.update({
      where: { id: planId },
      data,
    })
  }
}
