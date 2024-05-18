import { QUERY_KEY } from '@/constants/queryKeys'
import { exitCar } from '@/services/parkmovements/exitCar'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useMutationExitCar() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: exitCar,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === QUERY_KEY.parked,
      })
    },
  })
}
