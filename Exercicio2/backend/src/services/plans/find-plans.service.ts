import { PlansRepository } from '@/repositories/plans.repository'
import { PaginationParams } from '@/types/pagination-params'
import { Plan } from '@prisma/client'

interface FindPlansRequest extends PaginationParams {}

interface FindPlansResponse {
  plans: Plan[]
}

export class FindPlansService {
  constructor(private readonly plansRepository: PlansRepository) {}

  async execute(pagionation: FindPlansRequest): Promise<FindPlansResponse> {
    const plans = await this.plansRepository.findAll(pagionation)

    return { plans }
  }
}
