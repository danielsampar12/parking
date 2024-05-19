import { QUERY_KEY } from '@/constants/queryKeys'
import { isParkedByCardId } from '@/services/parkmovements/isParkedByCardId'
import { isParkedByPlate } from '@/services/parkmovements/isParkedByPlate'
import { useQuery } from '@tanstack/react-query'

interface UseIsVehicleParkedParams {
  plate?: string
  cardId?: string
}

export function useQueryIsVehicleParked({
  cardId,
  plate,
}: UseIsVehicleParkedParams) {
  return useQuery<boolean>({
    queryKey: [QUERY_KEY.isParked, plate ?? cardId],
    queryFn: () => {
      if (!plate && !cardId) return false

      return plate ? isParkedByPlate({ plate }) : isParkedByCardId({ cardId })
    },
    refetchOnWindowFocus: false,
  })
}
