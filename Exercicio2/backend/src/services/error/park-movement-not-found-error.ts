export class ParkMovementeNotFoundError extends Error {
  constructor(input: { plate?: string; cardId?: string }) {
    super(
      `ParkMovement not found for the input: ${JSON.stringify(input)}. Please create it before trying to close.`,
    )
  }
}
