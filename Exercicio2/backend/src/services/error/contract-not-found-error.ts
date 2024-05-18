export class ContractNotFoundError extends Error {
  constructor(id: number) {
    super(`Contract with id: ${id} not found.`)
  }
}
