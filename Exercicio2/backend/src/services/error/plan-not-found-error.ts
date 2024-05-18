export class PLanNotFoundError extends Error {
  constructor(id: number) {
    super(`Plan with id: ${id} not found.`)
  }
}
