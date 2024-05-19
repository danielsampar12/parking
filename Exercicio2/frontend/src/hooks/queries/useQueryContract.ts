import { QUERY_KEY } from '@/constants/queryKeys'
import { getContract } from '@/services/contracts/getContract'
import { Contract } from '@/types/serverTypes/Contract'

import { useQuery } from '@tanstack/react-query'

export function useQueryContract() {
  return useQuery<Contract | null>({
    queryKey: [QUERY_KEY.contract],
    queryFn: getContract,
    refetchOnWindowFocus: false,
  })
}
