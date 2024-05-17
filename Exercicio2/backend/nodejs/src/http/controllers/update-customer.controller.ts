import { CustomerNotFoundError } from '@/services/error/customer-not-found-error'
import { makeUpdateCustomerService } from '@/services/factories/make-update-customer.service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const updateCustomerBodySchema = z.object({
  customerId: z.number(),
  data: z.object({
    name: z.string().max(50),
    cardId: z.string().max(10),
  }),
})

export async function updateCustomerController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const body = updateCustomerBodySchema.parse(request.body)

  const updateCustomerService = makeUpdateCustomerService()

  try {
    const { customer } = await updateCustomerService.execute(body)

    return reply.status(200).send(customer)
  } catch (error) {
    if (error instanceof CustomerNotFoundError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
