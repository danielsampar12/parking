import { FastifyReply, FastifyRequest } from 'fastify'
import { paginationSchema } from '@/lib/zod/paginationSchema'
import { makeGetParkedCarsService } from '@/factories/park-movements-services/make-get-parked-cars-service.factory'

export async function getParkedCarsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const params = paginationSchema.parse(request.params)

  const getParkedCarsService = makeGetParkedCarsService()

  const { parkMovements } = await getParkedCarsService.execute(params)

  return reply.status(200).send(parkMovements)
}
