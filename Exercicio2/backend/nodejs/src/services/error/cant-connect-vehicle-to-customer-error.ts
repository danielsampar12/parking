interface CantConnectVehicleToCustomerErrorInput {
  customerId: number
  customerExists: boolean
  vehicleId: number
  vehicleExists: boolean
}

export class CantConnectVehicleToCustomerError extends Error {
  constructor({
    customerId,
    customerExists,
    vehicleId,
    vehicleExists,
  }: CantConnectVehicleToCustomerErrorInput) {
    super(
      `Can't connect vehicle to customer but one or both of them do not exists.
Customer: {customerId: ${customerId}, exists: ${customerExists}} Vehicle: {vehicleId: ${vehicleId}, exists: ${vehicleExists}}`,
    )
  }
}
