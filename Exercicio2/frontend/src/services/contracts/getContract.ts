import { api } from '@/lib/axios'
import { Contract } from '@/types/serverTypes/Contract'

export async function getContract() {
  const { data } = await api.get<Contract | null>('/customer')

  return data
}
