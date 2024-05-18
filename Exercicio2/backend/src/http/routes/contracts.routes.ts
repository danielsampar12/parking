import { FastifyInstance } from 'fastify'
import { createContractController } from '../controllers/contracts/create-contract.controller'
import { updateContractController } from '../controllers/contracts/update-contract.controller'

export async function contractRoutes(app: FastifyInstance) {
  app.post('/contract', createContractController)
  app.put('/contract', updateContractController)
  app.patch('/contract', updateContractController)
}
