import { QUERY_KEY } from '@/constants/queryKeys'
import { createVehicle } from '@/services/vehicles/createVehicle'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useMutationCreateCar() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === QUERY_KEY.vehicles,
      })
    },
  })
}
