import { PrismaPlansRepository } from '@/repositories/prisma/prisma-plans-repository'
import { UpdatePlanService } from '@/services/plans/update-plan.service'

export function makeUpdatePlanService() {
  return new UpdatePlanService(new PrismaPlansRepository())
}
