import { FastifyInstance } from 'fastify'
import { entryCarController } from '../controllers/park-movements/entry-car.controller'
import { exitCarController } from '../controllers/park-movements/exit-car.controller'
import { getParkedCarsController } from '../controllers/park-movements/get-parked-cars.controller'
import { paginationQuerySchema } from '@/lib/fastify/fastifyPaginationQuerySchema'
import { plateQuerySchema } from '@/lib/fastify/plateQuerySchema'
import { isVehicleParkByPlateController } from '../controllers/park-movements/is-vehicle-park-by-plate.controller'
import { cardIdQuerySchema } from '@/lib/fastify/cardIdQuerySchema'
import { isVehicleParkByCardIdController } from '../controllers/park-movements/is-vehicle-parked-by-card-id.controller'

export async function parkMovementRoutes(app: FastifyInstance) {
  app.get('/parkmovement', paginationQuerySchema, getParkedCarsController)
  app.get(
    '/parkmovement/isParkedByPlate',
    plateQuerySchema,
    isVehicleParkByPlateController,
  )
  app.get(
    '/parkmovement/isParkedByCardId',
    cardIdQuerySchema,
    isVehicleParkByCardIdController,
  )
  app.post('/parkmovement', entryCarController)
  app.put('/parkmovement', exitCarController)
}
