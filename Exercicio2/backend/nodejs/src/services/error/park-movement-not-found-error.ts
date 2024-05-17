export class ParkMovementeNotFoundError extends Error {
  constructor(input: { plate?: string; cardId?: string }) {
    super(
      `ParkMovement not found for the input: ${input}. Please create it before trying to close.`,
    )
  }
}
