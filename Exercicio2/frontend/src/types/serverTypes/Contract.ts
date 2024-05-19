export type ContractRule = {
  until: number
  value: number
}

export type Contract = {
  id: number
  description: string
  maxValue: number | null

  ContractRule: ContractRule[]
}
