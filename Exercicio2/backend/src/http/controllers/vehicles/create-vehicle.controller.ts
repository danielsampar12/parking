import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateVehicleService } from '@/factories/vehicle-services/make-create-vehicle.factory'
import { VehicleAlreadyExistsError } from '@/services/error/vehicle-already-exists-error'

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

  try {
    const { vehicle } = await createVehicleService.execute(body)

    return reply.status(200).send(vehicle)
  } catch (error) {
    if (error instanceof VehicleAlreadyExistsError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
