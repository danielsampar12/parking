import { FastifyInstance } from 'fastify'
import { updateVehicleController } from '../controllers/vehicles/update-vehicle.controller'
import { createVehicleController } from '../controllers/vehicles/create-vehicle.controller'

export async function vehicleRoutes(app: FastifyInstance) {
  app.post('/vehicle', createVehicleController)
  app.put('/vehicle', updateVehicleController)
  app.patch('/vehicle', updateVehicleController)
}
