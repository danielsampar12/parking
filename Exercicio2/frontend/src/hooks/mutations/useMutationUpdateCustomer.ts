import { QUERY_KEY } from '@/constants/queryKeys'
import { updateCustomer } from '@/services/customers/updateCustomer'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useMutationUpdateCustomer() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === QUERY_KEY.customers,
      })
    },
  })
}
