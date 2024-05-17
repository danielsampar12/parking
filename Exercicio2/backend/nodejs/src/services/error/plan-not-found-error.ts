export class PLanNotFoundError extends Error {
  constructor(id: number) {
    super(`PLan with id: ${id} not found.`)
  }
}
