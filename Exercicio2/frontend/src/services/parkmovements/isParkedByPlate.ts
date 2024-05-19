import { api } from '@/lib/axios'

interface IsParkedByPlateParams {
  plate?: string
}

export async function isParkedByPlate(params: IsParkedByPlateParams) {
  if (!params.plate) return false

  const { data } = await api.get<boolean>('/parkmovement/isParkedByPlate', {
    params,
  })

  return data
}
