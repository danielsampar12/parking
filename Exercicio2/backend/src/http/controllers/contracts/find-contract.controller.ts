import { makeFindContractService } from '@/factories/contracts-services/make-find-contract.factory'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function findContractController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const findContractService = makeFindContractService()

  const { contract } = await findContractService.execute()

  return reply.status(200).send(contract)
}
