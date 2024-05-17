import { CustomersRepository } from '@/repositories/customers.repository'
import { VehiclesRepository } from '@/repositories/vechiles.repository'
import { Vehicle } from '@prisma/client'
import { CantConnectVehicleToCustomerError } from '../error/cant-connect-vehicle-to-customer-error'

interface ConnectVehicleToCustomerRequest {
  customerId: number
  vehicleId: number
}

interface ConnectVehicleToCustomerResponse {
  vehicle: Vehicle
}

export class ConnectVehicleToCustomerService {
  constructor(
    private readonly vehiclesRepository: VehiclesRepository,
    private readonly customersRepository: CustomersRepository,
  ) {}

  async execute({
    customerId,
    vehicleId,
  }: ConnectVehicleToCustomerRequest): Promise<ConnectVehicleToCustomerResponse> {
    const findCustomerPromise = this.customersRepository.findById(customerId)
    const findVehiclePromise = this.vehiclesRepository.findById(vehicleId)

    const [existingCustomer, existingVehicle] = await Promise.all([
      findCustomerPromise,
      findVehiclePromise,
    ])

    if (!existingCustomer || !existingVehicle) {
      throw new CantConnectVehicleToCustomerError({
        customerId,
        vehicleId,
        customerExists: !!existingCustomer,
        vehicleExists: !!existingVehicle,
      })
    }

    const vehicle = await this.vehiclesRepository.connectToCustomer(
      customerId,
      vehicleId,
    )

    return { vehicle }
  }
}
