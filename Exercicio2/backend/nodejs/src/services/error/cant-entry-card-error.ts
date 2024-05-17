export class CantEntryCar extends Error {
  constructor() {
    super("Can't entry car with plate or cardId")
  }
}
