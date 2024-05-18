export class OpendParkMovementError extends Error {
  constructor(input: { plate?: string; cardId?: string }) {
    super(
      `There's already a opened park movement for the input: ${JSON.stringify(input)}. Please closed it before creating another.`,
    )
  }
}
