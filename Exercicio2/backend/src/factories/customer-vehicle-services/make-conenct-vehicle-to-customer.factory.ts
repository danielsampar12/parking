import { PrismaCustomerRepository } from '@/repositories/prisma/prisma-customers.repository'
import { PrismaVehiclesRepository } from '@/repositories/prisma/prisma-vehicles.repository'
import { ConnectVehicleToCustomerService } from '@/services/customer-vehicles/connect-vehicle-to-customer.service'

export function makeConnectVehicleToCustomerService() {
  return new ConnectVehicleToCustomerService(
    new PrismaVehiclesRepository(),
    new PrismaCustomerRepository(),
  )
}
