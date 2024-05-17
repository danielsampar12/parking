import { makeCreateCustomerService } from '@/factories/customers-services/make-create-customer.service'
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

  const { customer } = await createCustomerService.execute(body)

  return reply.status(200).send(customer)
}
