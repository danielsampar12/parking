export class CustomerAlreadyExistsError extends Error {
  constructor(cardId: string) {
    super(`Customer with cardId: ${cardId} already exists.`)
  }
}
