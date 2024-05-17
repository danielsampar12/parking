import { FastifyInstance } from 'fastify'
import { createCustomerController } from '../controllers/customers/create-customer.controller'

export async function customerPlansRoutes(app: FastifyInstance) {
  app.post('/customerplan', createCustomerController)
}
