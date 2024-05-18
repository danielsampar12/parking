import { makeCreateContractService } from '@/factories/contracts-services/make-create-contract.factory'
import { ContractAlreadyExistsError } from '@/services/error/contract-already-exists-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const createContractBodySchema = z.object({
  description: z.string().max(50),
  maxValue: z.number().optional(),

  contractRules: z.array(
    z.object({
      until: z.number(),
      value: z.number(),
    }),
  ),
})

export async function createContractController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const body = createContractBodySchema.parse(request.body)

  const createContractService = makeCreateContractService()

  try {
    const { contract } = await createContractService.execute(body)

    return reply.status(200).send(contract)
  } catch (error) {
    if (error instanceof ContractAlreadyExistsError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
