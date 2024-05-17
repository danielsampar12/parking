import { PrismaPlansRepository } from '@/repositories/prisma/prisma-plans-repository'
import { CreateplanService } from '@/services/plans/create-plan.service'

export function makeCreatePlanService() {
  return new CreateplanService(new PrismaPlansRepository())
}
