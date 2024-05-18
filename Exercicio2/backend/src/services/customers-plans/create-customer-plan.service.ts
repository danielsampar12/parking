import { CustomersRepository } from '@/repositories/customers.repository'
import { CustomerPlan } from '@prisma/client'
import { PlansRepository } from '@/repositories/plans.repository'
import { CantCreateCustomerPlanError } from '../error/cant-create-customer-plan-error'
import { CustomersPlansRepository } from '@/repositories/customers-plans.repository'

interface CreateCustomerPlanRequest {
  customerId: number
  planId: number
  dueDate?: Date
}

interface CreateCustomerPlanResponse {
  customerPlan: CustomerPlan
}

export class CreateCustomerPlanService {
  constructor(
    private readonly customersPlansRepository: CustomersPlansRepository,
    private readonly customersRepository: CustomersRepository,
    private readonly plansRepository: PlansRepository,
  ) {}

  async execute({
    customerId,
    planId,
    dueDate,
  }: CreateCustomerPlanRequest): Promise<CreateCustomerPlanResponse> {
    const findCustomerPromise = this.customersRepository.findById(customerId)
    const findPlanPromise = this.plansRepository.findById(planId)

    const [existingCustomer, existingPlan] = await Promise.all([
      findCustomerPromise,
      findPlanPromise,
    ])

    if (!existingCustomer || !existingPlan) {
      throw new CantCreateCustomerPlanError({
        customerId,
        planId,
        customerExists: !!existingCustomer,
        planExists: !!existingPlan,
      })
    }

    const customerPlan = await this.customersPlansRepository.create({
      customer: {
        connect: { id: customerId },
      },
      plan: {
        connect: { id: planId },
      },
      dueDate,
    })

    return { customerPlan }
  }
}
