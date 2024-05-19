import { FastifyInstance } from 'fastify'
import { createCustomerController } from '@/http/controllers/customers/create-customer.controller'
import { updateCustomerController } from '@/http/controllers/customers/update-customer.controller'
import { findCustomersController } from '../controllers/customers/find-customers.controller'
import { paginationQuerySchema } from '@/lib/fastify/fastifyPaginationQuerySchema'

export async function customerRoutes(app: FastifyInstance) {
  app.get('/customer', paginationQuerySchema, findCustomersController)
  app.post('/customer', createCustomerController)
  app.put('/customer', updateCustomerController)
  app.patch('/customer', updateCustomerController)
}
