import { makeCreateCustomerPlanService } from '@/factories/customers-plans-services/make-create-customer-plan.factory'
import { CantCreateCustomerPlanError } from '@/services/error/cant-create-customer-plan-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const createCustomerPlanBodySchema = z.object({
  customerId: z.number(),
  planId: z.number(),
  dueDate: z.date().optional(),
})

export async function createCustomerPlanController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const body = createCustomerPlanBodySchema.parse(request.body)

  const createCustomerPlanService = makeCreateCustomerPlanService()

  try {
    const { customerPlan } = await createCustomerPlanService.execute(body)

    return reply.status(200).send(customerPlan)
  } catch (error) {
    if (error instanceof CantCreateCustomerPlanError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
