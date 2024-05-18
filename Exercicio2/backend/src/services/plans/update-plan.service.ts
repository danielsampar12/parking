import { Plan } from '@prisma/client'
import { PLanNotFoundError } from '../error/plan-not-found-error'
import { PlansRepository } from '@/repositories/plans.repository'

interface UpdatePlanRequest {
  planId: number
  data: {
    description?: string
    value?: number
  }
}

interface UpdatePlanResponse {
  plan: Plan
}

export class UpdatePlanService {
  constructor(private readonly plansRepository: PlansRepository) {}

  async execute({
    planId,
    data,
  }: UpdatePlanRequest): Promise<UpdatePlanResponse> {
    const existingPlan = await this.plansRepository.findById(planId)

    if (!existingPlan) {
      throw new PLanNotFoundError(planId)
    }

    const plan = await this.plansRepository.update(planId, data)

    return { plan }
  }
}
