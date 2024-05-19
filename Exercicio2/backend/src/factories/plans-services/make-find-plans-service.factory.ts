import { PrismaPlansRepository } from '@/repositories/prisma/prisma-plans-repository'
import { FindPlansService } from '@/services/plans/find-plans.service'

export function makeFindPlansService() {
  return new FindPlansService(new PrismaPlansRepository())
}
