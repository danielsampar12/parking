import { FastifyInstance } from 'fastify'
import { connectVehicleToCustomerController } from '../controllers/customer-vehicle/connect-vehicle-to-customer.controller'

export async function customerVehicleRoutes(app: FastifyInstance) {
  app.post('/customervehicle', connectVehicleToCustomerController)
}
