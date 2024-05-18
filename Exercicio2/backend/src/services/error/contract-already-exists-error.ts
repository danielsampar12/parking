export class ContractAlreadyExistsError extends Error {
  constructor() {
    super(
      'A contract already exists, if you want to change it please use the update route.',
    )
  }
}
