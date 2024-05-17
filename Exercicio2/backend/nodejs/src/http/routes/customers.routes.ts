import { FastifyInstance } from 'fastify'
import { createCustomerController } from '../controllers/create-customer.controller'
import { updateCustomerController } from '../controllers/update-customer.controller'

export async function customerRoutes(app: FastifyInstance) {
  app.post('/customer', createCustomerController)
  app.put('/customer', updateCustomerController)
  app.patch('/customer', updateCustomerController)
}
