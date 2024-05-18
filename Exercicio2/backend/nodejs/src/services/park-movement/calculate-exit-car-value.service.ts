import { ContractsRepository } from '@/repositories/contracts.repository'
import { CustomersRepository } from '@/repositories/customers.repository'
import { NoContractRegistered } from '../error/no-contract-registered-error'
import { NoContractRulesRegistered } from '../error/no-contract-rules-registered-error'
import { differenceInHours } from 'date-fns'

interface CalculateExitCarValueRequest {
  vehicleId: number
  entryDate: Date
  exitDate: Date
}

interface CalculateExitCarValueResponse {
  value: number
}

export class CalculateExitCarValueService {
  constructor(
    private readonly customersRepository: CustomersRepository,
    private readonly contractRepository: ContractsRepository,
  ) {}

  async execute({
    entryDate,
    exitDate,
    vehicleId,
  }: CalculateExitCarValueRequest): Promise<CalculateExitCarValueResponse> {
    const isVehicleOwnedByMonthlyParkers =
      await this.customersRepository.isMonthlyParker(vehicleId)

    if (isVehicleOwnedByMonthlyParkers) {
      return { value: 0 }
    }

    const contract = await this.contractRepository.getContract()

    if (!contract) {
      throw new NoContractRegistered()
    }

    if (!contract.ContractRule.length) {
      throw new NoContractRulesRegistered()
    }

    const timeParked = differenceInHours(exitDate, entryDate)

    const contractRules = contract.ContractRule

    let value = 0

    for (let i = 0; i < contractRules.length; i++) {
      if (timeParked < contractRules[i].until) {
        value = contractRules[i].value
        break
      }
    }

    return { value }
  }
}
