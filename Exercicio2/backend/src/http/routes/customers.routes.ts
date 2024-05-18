import { FastifyInstance } from 'fastify'
import { createCustomerController } from '@/http/controllers/customers/create-customer.controller'
import { updateCustomerController } from '@/http/controllers/customers/update-customer.controller'

export async function customerRoutes(app: FastifyInstance) {
  app.post('/customer', createCustomerController)
  app.put('/customer', updateCustomerController)
  app.patch('/customer', updateCustomerController)
}
