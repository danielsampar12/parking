import { QUERY_KEY } from '@/constants/queryKeys'
import { updatePlan } from '@/services/plans/updatePlan'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useMutationUpdatePlan() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updatePlan,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === QUERY_KEY.plans,
      })
    },
  })
}
