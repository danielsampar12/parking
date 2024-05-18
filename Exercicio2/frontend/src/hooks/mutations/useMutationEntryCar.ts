import { QUERY_KEY } from '@/constants/queryKeys'
import { entryCar } from '@/services/parkmovements/entryCar'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useMutationEntryCar() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: entryCar,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === QUERY_KEY.parked,
      })
    },
  })
}
