import { PlansRepository } from '@/repositories/plans.repository'
import { Plan } from '@prisma/client'

interface CreatePlanRequest {
  description: string
  value: number
}

interface CreatePlanResponse {
  plan: Plan
}

export class CreateplanService {
  constructor(private readonly plansRepository: PlansRepository) {}

  async execute(req: CreatePlanRequest): Promise<CreatePlanResponse> {
    const plan = await this.plansRepository.create(req)

    return { plan }
  }
}
