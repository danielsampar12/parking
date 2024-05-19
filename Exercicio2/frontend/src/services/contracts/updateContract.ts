import { api } from '@/lib/axios'
import { UpdateContractBodySchema } from '@/lib/zod/contracts/updateContractSchema'
import { Contract } from '@/types/serverTypes/Contract'

export async function updateContract(body: UpdateContractBodySchema) {
  await api.put<Contract>('/contract', body)
}
