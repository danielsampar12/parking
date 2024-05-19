import { makeCreateCustomerService } from '@/factories/customers-services/make-create-customer.factory'
import { CustomerAlreadyExistsError } from '@/services/error/customer-already-exists-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const createCustomerBodySchema = z.object({
  name: z.string().max(50),
  cardId: z.string().max(10),
})

export async function createCustomerController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const body = createCustomerBodySchema.parse(request.body)

  const createCustomerService = makeCreateCustomerService()

  try {
    const { customer } = await createCustomerService.execute(body)

    return reply.status(200).send(customer)
  } catch (error) {
    if (error instanceof CustomerAlreadyExistsError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
