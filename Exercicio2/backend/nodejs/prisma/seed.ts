import {
  ContractRule,
  Customer,
  CustomerPlan,
  ParkMovement,
  Plan,
  PrismaClient,
  Vehicle,
} from '@prisma/client'
import { addMonths, subHours } from 'date-fns'

const prisma = new PrismaClient()

// We need to omit the id so the increment function from prisma can keep track of the ids
type OmitId<T> = Omit<T, 'id'>

async function seed() {
  const customers: OmitId<Customer>[] = [
    {
      cardId: '5254',
      name: 'Fulano da Silva',
    },
    {
      cardId: '4883',
      name: 'Ciclana da Silva',
    },
    {
      cardId: '5754',
      name: 'Fulano de Souza',
    },
    {
      cardId: '3163',
      name: 'Ciclana de Souza',
    },
    {
      cardId: '4123',
      name: 'Fulano da Silva só que motoqueiro',
    },
  ]

  const createCustomersPromise = prisma.customer.createMany({ data: customers })

  const vehiclesWithNoCustomer: OmitId<Vehicle>[] = [
    {
      model: 'Chevrolet Onix Branco',
      plate: 'AYK4425',
      description: null,
      customerId: null,
    },
    {
      model: 'Ford Fiesta Preto',
      plate: 'JVY6168',
      description: null,
      customerId: null,
    },
    {
      model: 'Chevrolet Corsa Preto',
      plate: 'JWA0289',
      description: null,
      customerId: null,
    },
    {
      model: 'Fiat Uno Vermelho',
      plate: 'HUQ4731',
      description: null,
      customerId: null,
    },
  ]

  const createVehiclesWithNoCustomerPromise = prisma.vehicle.createMany({
    data: vehiclesWithNoCustomer,
  })

  await Promise.all([
    createCustomersPromise,
    createVehiclesWithNoCustomerPromise,
  ])

  console.log('Created customers!')
  console.log('Created vehicles with no customer!')

  const vehiclesWithCustomers: OmitId<Vehicle>[] = [
    {
      model: 'Renault Kwid Branco',
      plate: 'NCD3921',
      description: null,
      customerId: 1,
    },
    {
      model: 'Fiat Mobi Vermelho',
      plate: 'FDV4625',
      description: null,
      customerId: 2,
    },
    {
      model: 'Hyundai HB20 Branco',
      plate: 'JQH8595',
      description: null,
      customerId: 3,
    },
    {
      model: 'Fiat Argo Preto',
      plate: 'KBD9278',
      description: null,
      customerId: 4,
    },
    {
      model: 'Honda CG 125',
      plate: 'FQF0776',
      description: null,
      customerId: 5,
    },
  ]

  const createVehiclesWithCustomersPromise = prisma.vehicle.createMany({
    data: vehiclesWithCustomers,
  })

  const plans: OmitId<Plan>[] = [
    {
      description: 'Mensal Carro Coberto',
      value: 230,
    },
    {
      description: 'Mensal Carro Descoberto',
      value: 180,
    },
    {
      description: 'Mensal Moto Coberto',
      value: 160,
    },
    {
      description: 'Mensal Carro Descoberto',
      value: 125,
    },
  ]

  const createPlansPromise = prisma.plan.createMany({ data: plans })

  await Promise.all([createVehiclesWithCustomersPromise, createPlansPromise])

  console.log('Created vehicles with customers!')
  console.log('Created plans!')

  const customerPlans: OmitId<CustomerPlan>[] = [
    {
      planId: 1,
      customerId: 3,
      dueDate: addMonths(new Date(), 1),
    },
    {
      planId: 2,
      customerId: 4,
      dueDate: addMonths(new Date(), 1),
    },
    {
      planId: 4,
      customerId: 5,
      dueDate: addMonths(new Date(), 1),
    },
  ]

  await prisma.customerPlan.createMany({ data: customerPlans })

  console.log('Create customer plans!')

  const contractRules: Omit<ContractRule, 'contractId' | 'id'>[] = [
    {
      until: 1,
      value: 5,
    },
    {
      until: 2,
      value: 10,
    },
    {
      until: 3,
      value: 15,
    },
    {
      until: 4,
      value: 20,
    },
    {
      until: 5,
      value: 25,
    },
    {
      until: 6,
      value: 30,
    },
    {
      until: 7,
      value: 35,
    },
    {
      until: 8,
      value: 40,
    },
    {
      until: 9,
      value: 45,
    },
    {
      until: 10,
      value: 50,
    },
    {
      until: 11,
      value: 55,
    },
    {
      until: 12,
      value: 60,
    },
  ]

  await prisma.contract.create({
    data: {
      id: 1,
      maxValue: 80,
      description: 'Contrato de valores do estacionamento',
      ContractRule: {
        createMany: {
          data: contractRules,
        },
      },
    },
  })

  console.log('Created contract and its contract rules!')

  const parkMovements: OmitId<ParkMovement>[] = [
    {
      entryDate: subHours(new Date(), 2),
      exitDate: null,
      vehicleId: 1,
    },
    {
      entryDate: subHours(new Date(), 1),
      exitDate: null,
      vehicleId: 2,
    },
    {
      entryDate: subHours(new Date(), 12),
      exitDate: null,
      vehicleId: 3,
    },
    {
      entryDate: subHours(new Date(), 5),
      exitDate: null,
      vehicleId: 5,
    },
    {
      entryDate: subHours(new Date(), 1),
      exitDate: null,
      vehicleId: 6,
    },
    {
      entryDate: subHours(new Date(), 1),
      exitDate: new Date(),
      vehicleId: 6,
    },
    {
      entryDate: subHours(new Date(), 4),
      exitDate: null,
      vehicleId: 7,
    },
  ]

  await prisma.parkMovement.createMany({ data: parkMovements })

  console.log('Created park movements!')

  console.log('---> seed is done :)')
}

seed()
