import { FastifyReply, FastifyRequest } from 'fastify'
import { paginationSchema } from '@/lib/zod/paginationSchema'
import { makeFindPlansService } from '@/factories/plans-services/make-find-plans-service.factory'

export async function findPlansController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const params = paginationSchema.parse(
    JSON.parse(JSON.stringify(request.query)),
  )

  const findPlansService = makeFindPlansService()

  const { plans } = await findPlansService.execute(params)

  return reply.status(200).send(plans)
}
