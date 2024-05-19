import { QUERY_KEY } from '@/constants/queryKeys'
import { createContract } from '@/services/contracts/createContract'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useMutationCreateContract() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createContract,
    onSuccess: (contract) => {
      queryClient.setQueryData([QUERY_KEY.contract], contract)
    },
  })
}
