interface CantCreateCustomerPlanErrorInput {
  planId: number
  customerExists: boolean
  customerId: number
  planExists: boolean
}

export class CantCreateCustomerPlanError extends Error {
  constructor({
    planId,
    customerExists,
    customerId,
    planExists,
  }: CantCreateCustomerPlanErrorInput) {
    super(
      `Can't create customer plan one or both of customer and plan do not exists. Because -> Plan: {planId: ${planId}, exists: ${planExists}}, Customer: {customerId: ${customerId}, exists: ${customerExists}}`,
    )
  }
}
