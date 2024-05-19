import { FastifyInstance } from 'fastify'
import { updateVehicleController } from '../controllers/vehicles/update-vehicle.controller'
import { createVehicleController } from '../controllers/vehicles/create-vehicle.controller'
import { findAllVehiclesController } from '../controllers/vehicles/find-all-vehicles.controller'
import { paginationQuerySchema } from '@/lib/fastify/fastifyPaginationQuerySchema'

export async function vehicleRoutes(app: FastifyInstance) {
  app.get('/vehicle', paginationQuerySchema, findAllVehiclesController)
  app.post('/vehicle', createVehicleController)
  app.put('/vehicle', updateVehicleController)
  app.patch('/vehicle', updateVehicleController)
}
