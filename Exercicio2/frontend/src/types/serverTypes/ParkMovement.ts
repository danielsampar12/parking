import { Vehicle } from './Vehicle'

export type ParkMovement = {
  id: number
  entryDate: Date
  exitDate: Date | null
  vehicleId: number
}

export type ParkMovementWithVehicle = ParkMovement & {
  vehicle: Vehicle
}

export type ParkWithExitDate = ParkMovement & {
  exitDate: Date
}

export type ParkExitWithVehicle = ParkWithExitDate & {
  vehicle: Vehicle
}

export type ParkMovementWithVehicleAndCardId = ParkMovement & {
  vehicle: Vehicle & {
    customer: {
      cardId: string
    } | null
  }
}
