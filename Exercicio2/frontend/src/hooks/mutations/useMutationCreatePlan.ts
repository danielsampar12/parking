import { QUERY_KEY } from '@/constants/queryKeys'
import { createPlan } from '@/services/plans/createPlan'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useMutationCreatePlan() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createPlan,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === QUERY_KEY.plans,
      })
    },
  })
}
