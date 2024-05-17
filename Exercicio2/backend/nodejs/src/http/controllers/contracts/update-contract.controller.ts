import { makeUpdateContractService } from '@/factories/contracts-services/make-update-contract.factory'
import { ContractNotFoundError } from '@/services/error/contract-not-found-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const updateContractBodySchema = z.object({
  contractId: z.number(),
  data: z.object({
    description: z.string().max(50),
    maxValue: z.number().optional(),

    contractRules: z.array(
      z.object({
        id: z.number(),
      }),
    ),
  }),
})

export async function updateContractController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const body = updateContractBodySchema.parse(request.body)

  const updateContractService = makeUpdateContractService()

  try {
    const { contract } = await updateContractService.execute(body)

    return reply.status(200).send(contract)
  } catch (error) {
    if (error instanceof ContractNotFoundError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
