export class VechicleNotFoundError extends Error {
  constructor(id: number) {
    super(`Vehicle with id: ${id} not found.`)
  }
}
