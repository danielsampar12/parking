export type Contract = {
  id: number
  description: string
  maxValue: number | null

  ContractRule: {
    until: number
    value: number
  }[]
}
