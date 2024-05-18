import { FastifyInstance } from 'fastify'
import { entryCarController } from '../controllers/park-movements/entry-car.controller'
import { exitCarController } from '../controllers/park-movements/exit-car.controller'
import { getParkedCarsController } from '../controllers/park-movements/get-parked-cars.controller'

export async function parkMovementRoutes(app: FastifyInstance) {
  app.get('/parkmovement', getParkedCarsController)
  app.post('/parkmovement', entryCarController)
  app.put('/parkmovement', exitCarController)
}
