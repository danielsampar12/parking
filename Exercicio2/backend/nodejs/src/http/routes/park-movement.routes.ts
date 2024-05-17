import { FastifyInstance } from 'fastify'
import { entryCarController } from '../controllers/park-movements/entry-car.controller'
import { exitCarController } from '../controllers/park-movements/exit-car.controller'

export async function parkMovementRoutes(app: FastifyInstance) {
  app.post('/parkmovement', entryCarController)
  app.put('/parkmovement', exitCarController)
}
