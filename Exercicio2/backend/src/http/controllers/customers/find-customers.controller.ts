import { FastifyReply, FastifyRequest } from 'fastify'
import { paginationSchema } from '@/lib/zod/paginationSchema'
import { makeFindCustomersService } from '@/factories/customers-services/mkae-find-customers-service.factory'

export async function findCustomersController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const params = paginationSchema.parse(
    JSON.parse(JSON.stringify(request.query)),
  )

  const findCustomersService = makeFindCustomersService()

  const { customers } = await findCustomersService.execute(params)

  return reply.status(200).send(customers)
}
