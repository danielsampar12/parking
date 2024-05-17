import { Prisma, Vehicle } from '@prisma/client'
import { VehiclesRepository } from '../vechiles.repository'
import { prisma } from '@/lib/prisma'

export class PrismaVehiclesRepository implements VehiclesRepository {
  async create(data: Prisma.VehicleCreateInput): Promise<Vehicle> {
    return await prisma.vehicle.create({ data })
  }

  async connectToCustomer(
    customerId: number,
    vehicleId: number,
  ): Promise<Vehicle> {
    return await prisma.vehicle.update({
      where: { id: vehicleId },
      data: {
        customer: {
          connect: {
            id: customerId,
          },
        },
      },
    })
  }

  async update(
    vehicleId: number,
    data: Prisma.VehicleUpdateInput,
  ): Promise<Vehicle> {
    return await prisma.vehicle.update({ where: { id: vehicleId }, data })
  }

  async findById(id: number): Promise<Vehicle | null> {
    return await prisma.vehicle.findUnique({ where: { id } })
  }

  async findByPlate(plate: string): Promise<Vehicle | null> {
    return await prisma.vehicle.findUnique({
      where: {
        plate,
      },
    })
  }
}
