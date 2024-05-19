import { FastifyInstance } from 'fastify'
import { createPlanController } from '../controllers/plans/create-plan.controller'
import { updatePlanController } from '../controllers/plans/update-plan.controller'
import { findPlansController } from '../controllers/plans/find-plans.controller'
import { paginationQuerySchema } from '@/lib/fastify/fastifyPaginationQuerySchema'

export async function planRoutes(app: FastifyInstance) {
  app.get('/plan', paginationQuerySchema, findPlansController)
  app.post('/plan', createPlanController)
  app.put('/plan', updatePlanController)
  app.patch('/plan', updatePlanController)
}
