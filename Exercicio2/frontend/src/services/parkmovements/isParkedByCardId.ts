import { api } from '@/lib/axios'

interface IsParkedByCardIdParams {
  cardId?: string
}

export async function isParkedByCardId(params: IsParkedByCardIdParams) {
  if (!params.cardId) return false

  const { data } = await api.get<boolean>('/parkmovement/isParkedByCardId', {
    params,
  })

  return data
}
