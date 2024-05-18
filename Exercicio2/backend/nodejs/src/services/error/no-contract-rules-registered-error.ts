export class NoContractRulesRegistered extends Error {
  constructor() {
    super("There's no registered contract rules.")
  }
}
