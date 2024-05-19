import { api } from '@/lib/axios'
import { CreateContractBodySchema } from '@/lib/zod/contracts/createContractSchema'
import { Contract } from '@/types/serverTypes/Contract'

export async function createContract(body: CreateContractBodySchema) {
  await api.post<Contract>('/contract', body)
}
