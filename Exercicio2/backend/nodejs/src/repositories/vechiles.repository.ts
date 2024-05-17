import { Prisma, Vehicle } from '@prisma/client'

export interface VehiclesRepository {
  create(data: Prisma.VehicleCreateInput): Promise<Vehicle>
  update(vehicleId: number, data: Prisma.VehicleUpdateInput): Promise<Vehicle>
  findById(id: number): Promise<Vehicle | null>
}
