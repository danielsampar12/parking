import { FastifyInstance } from 'fastify'
import { createContractController } from '../controllers/contracts/create-contract.controller'
import { updateContractController } from '../controllers/contracts/update-contract.controller'
import { findContractController } from '../controllers/contracts/find-contract.controller'

export async function contractRoutes(app: FastifyInstance) {
  app.get('/contract', findContractController)
  app.post('/contract', createContractController)
  app.put('/contract', updateContractController)
  app.patch('/contract', updateContractController)
}
