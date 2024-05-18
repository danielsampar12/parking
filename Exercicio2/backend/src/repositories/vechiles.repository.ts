import { PaginationParams } from '@/types/pagination-params'
import { Prisma, Vehicle } from '@prisma/client'

export interface VehiclesRepository {
  create(data: Prisma.VehicleCreateInput): Promise<Vehicle>
  connectToCustomer(customerId: number, vehicleId: number): Promise<Vehicle>
  update(vehicleId: number, data: Prisma.VehicleUpdateInput): Promise<Vehicle>
  findById(id: number): Promise<Vehicle | null>
  findByPlate(plate: string): Promise<Vehicle | null>
  findByCustomerCardId(cardId: string): Promise<Vehicle | null>
  findAll(paginatinon: PaginationParams): Promise<Vehicle[]>
}
