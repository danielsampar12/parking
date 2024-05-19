import { makeIsVehicleParkedService } from '@/factories/park-movements-services/make-is-vehicle-parked-service.factory'
import { CantEntryCar } from '@/services/error/cant-entry-card-error'
import { OpendParkMovementError } from '@/services/error/opened-park-moviment-error'
import { VechicleNotFoundError } from '@/services/error/vehicle-not-foudn-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const isVehicleParkByCardIdBodySchema = z.object({
  cardId: z.string().max(10),
})

export async function isVehicleParkByCardIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const params = isVehicleParkByCardIdBodySchema.parse(
    JSON.parse(JSON.stringify(request.query)),
  )

  const isVehicleParkedService = makeIsVehicleParkedService()

  try {
    const { isParked } = await isVehicleParkedService.executeByCardId(params)

    return reply.status(200).send(isParked)
  } catch (error) {
    if (
      error instanceof VechicleNotFoundError ||
      error instanceof CantEntryCar ||
      error instanceof OpendParkMovementError
    ) {
      return reply.status(400).send({ message: error.message })
    }
    throw error
  }
}
