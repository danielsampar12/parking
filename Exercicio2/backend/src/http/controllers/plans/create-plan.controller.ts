import { makeCreatePlanService } from '@/factories/plans-services/make-create-plan.factory'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const createPlanBodySchema = z.object({
  description: z.string().max(50),
  value: z.number(),
})

export async function createPlanController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const body = createPlanBodySchema.parse(request.body)

  const createPlanService = makeCreatePlanService()

  const { plan } = await createPlanService.execute(body)

  return reply.status(200).send(plan)
}
