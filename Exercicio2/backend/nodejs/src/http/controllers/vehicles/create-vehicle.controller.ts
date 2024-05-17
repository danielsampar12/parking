import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateVehicleService } from '@/factories/vehicle-services/make-create-vehicle.factory'

const createVehicleBodySchema = z.object({
  plate: z.string().max(10),
  model: z.string().max(30),
  description: z.string().max(50),
})

export async function createVehicleController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const body = createVehicleBodySchema.parse(request.body)

  const createVehicleService = makeCreateVehicleService()

  const { vehicle } = await createVehicleService.execute(body)

  return reply.status(200).send(vehicle)
}
