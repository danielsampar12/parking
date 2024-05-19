import { FastifyReply, FastifyRequest } from 'fastify'
import { makeFindAllVehiclesService } from '@/factories/vehicle-services/make-find-all-vehicles.factory'
import { paginationSchema } from '@/lib/zod/paginationSchema'

export async function findAllVehiclesController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const params = paginationSchema.parse(
    JSON.parse(JSON.stringify(request.query)),
  )

  const findAllVehiclesService = makeFindAllVehiclesService()

  const { vehicles } = await findAllVehiclesService.execute(params)

  return reply.status(200).send(vehicles)
}
