import { FastifyInstance } from 'fastify'
import { createPlanController } from '../controllers/plans/create-plan.controller'
import { updatePlanController } from '../controllers/plans/update-plan.controller'

export async function planRoutes(app: FastifyInstance) {
  app.post('/plan', createPlanController)
  app.put('/plan', updatePlanController)
  app.patch('/plan', updatePlanController)
}
