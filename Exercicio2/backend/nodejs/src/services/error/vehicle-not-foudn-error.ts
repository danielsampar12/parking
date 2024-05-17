export class VechicleNotFoundError extends Error {
  constructor(id: number | string) {
    super(`Vehicle with id: ${id} not found.`)
  }
}
