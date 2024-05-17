import { makeConnectVehicleToCustomerService } from '@/factories/customer-vehicle-services/make-conenct-vehicle-to-customer.factory'
import { CantConnectVehicleToCustomerError } from '@/services/error/cant-connect-vehicle-to-customer-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const connectVehicleToCustomerBodySchema = z.object({
  customerId: z.number(),
  vehicleId: z.number(),
})

export async function connectVehicleToCustomerController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const body = connectVehicleToCustomerBodySchema.parse(request.body)

  const connectVehicleToCustomerService = makeConnectVehicleToCustomerService()

  try {
    const { vehicle } = await connectVehicleToCustomerService.execute(body)

    return reply.status(200).send(vehicle)
  } catch (error) {
    if (error instanceof CantConnectVehicleToCustomerError) {
      return reply.status(400).send({ message: error.message })
    }
  }
}
