import { QUERY_KEY } from '@/constants/queryKeys'
import { updateContract } from '@/services/contracts/updateContract'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useMutationUpdateContract() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateContract,
    onSuccess: (contract) => {
      queryClient.setQueryData([QUERY_KEY.contract], contract)
    },
  })
}
