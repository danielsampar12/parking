import { QUERY_KEY } from '@/constants/queryKeys'
import { createCustomer } from '@/services/customers/createCustomer'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useMutationCreateCustomer() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === QUERY_KEY.customers,
      })
    },
  })
}
