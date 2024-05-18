export class NoContractRegistered extends Error {
  constructor() {
    super(
      "There's no registered contract. Please create a contract and its rules",
    )
  }
}
