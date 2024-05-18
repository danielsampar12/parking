import { FastifyInstance } from 'fastify'
import { createCustomerPlanController } from '../controllers/customer-plan/create-customer-plan.controller'

export async function customerPlansRoutes(app: FastifyInstance) {
  app.post('/customerplan', createCustomerPlanController)
}
