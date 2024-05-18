import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeUpdatePlanService } from '@/factories/plans-services/make-update-plan.factory'
import { PLanNotFoundError } from '@/services/error/plan-not-found-error'

const updatePlanBodySchema = z.object({
  planId: z.number(),
  data: z.object({
    description: z.string().max(50).optional(),
    value: z.number().optional(),
  }),
})

export async function updatePlanController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const body = updatePlanBodySchema.parse(request.body)

  const updatePlanService = makeUpdatePlanService()

  try {
    const { plan } = await updatePlanService.execute(body)

    return reply.status(200).send(plan)
  } catch (error) {
    if (error instanceof PLanNotFoundError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
