import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeUpdateVehicleService } from '@/factories/vehicle-services/make-update-vehicle.factory'
import { VechicleNotFoundError } from '@/services/error/vehicle-not-foudn-error'

const updateVehicleBodySchema = z.object({
  vehicleId: z.number(),
  data: z.object({
    plate: z.string().max(10).optional(),
    model: z.string().max(30).optional().nullable(),
    description: z.string().max(50).optional().nullable(),
  }),
})

export async function updateVehicleController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const body = updateVehicleBodySchema.parse(request.body)

  const updateVehicleService = makeUpdateVehicleService()

  try {
    const { vehicle } = await updateVehicleService.execute(body)

    return reply.status(200).send(vehicle)
  } catch (error) {
    if (error instanceof VechicleNotFoundError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
