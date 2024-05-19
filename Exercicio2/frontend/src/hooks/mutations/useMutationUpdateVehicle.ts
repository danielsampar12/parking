import { QUERY_KEY } from '@/constants/queryKeys'
import { updateVehicle } from '@/services/vehicles/updateVehicle'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useMutationUpdateVehicle() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === QUERY_KEY.vehicles,
      })
    },
  })
}
