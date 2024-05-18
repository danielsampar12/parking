import { makeCalculateExitCarValueService } from '@/factories/park-movements-services/make-calculate-exit-car-service.factory'
import { makeExitCarService } from '@/factories/park-movements-services/make-exit-car-service.factory'
import { ParkMovementeNotFoundError } from '@/services/error/park-movement-not-found-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const exitCarBodySchema = z.object({
  exitDate: z.coerce.date(),
  plate: z.string().max(10).optional(),
  cardId: z.string().max(10).optional(),
})

export async function exitCarController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const body = exitCarBodySchema.parse(request.body)

  const exitCarService = makeExitCarService()
  const calculerExitCarValueService = makeCalculateExitCarValueService()

  try {
    const { parkMovement } = await exitCarService.execute(body)

    const { value } = await calculerExitCarValueService.execute({
      entryDate: parkMovement.entryDate,
      exitDate: body.exitDate,
      vehicleId: parkMovement.vehicleId,
    })

    return reply.status(200).send({ parkMovement, value })
  } catch (error) {
    if (error instanceof ParkMovementeNotFoundError) {
      return reply.status(400).send({ message: error.message })
    }
    throw error
  }
}
