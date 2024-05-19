import { FastifyInstance } from 'fastify'
import { createPlanController } from '../controllers/plans/create-plan.controller'
import { updatePlanController } from '../controllers/plans/update-plan.controller'
import { findPlansController } from '../controllers/plans/find-plans.controller'

export async function planRoutes(app: FastifyInstance) {
  app.get('/plan', findPlansController)
  app.post('/plan', createPlanController)
  app.put('/plan', updatePlanController)
  app.patch('/plan', updatePlanController)
}
