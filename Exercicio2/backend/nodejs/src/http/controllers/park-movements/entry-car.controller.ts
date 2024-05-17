import { makeEntryCarService } from '@/factories/park-movements-services/make-entry-car-sercvice.factory'
import { CantEntryCar } from '@/services/error/cant-entry-card-error'
import { VechicleNotFoundError } from '@/services/error/vehicle-not-foudn-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const entryCarBodySchema = z.object({
  entryDate: z.date().optional(),
  plate: z.string().max(10).optional(),
  cardId: z.string().max(10).optional(),
})

export async function entryCarController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const body = entryCarBodySchema.parse(request.body)

  const entryCarService = makeEntryCarService()

  try {
    const { parkMovement } = await entryCarService.execute(body)

    return reply.status(200).send(parkMovement)
  } catch (error) {
    if (
      error instanceof VechicleNotFoundError ||
      error instanceof CantEntryCar
    ) {
      return reply.status(400).send({ message: error.message })
    }
    throw error
  }
}
