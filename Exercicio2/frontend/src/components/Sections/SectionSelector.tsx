import { DashboardSections } from '@/constants/dashboardSections'
import { Text } from '@chakra-ui/react'
import { DashboardSection } from './DashboardSection'
import { VehiclesSection } from './VehiclesSection'
import { CustomersSection } from './CustomersSection'
import { PlansSection } from './PlansSection'

interface SectionSelectorProps {
  path: DashboardSections
}

export function SectionSelector({ path }: SectionSelectorProps) {
  switch (path) {
    case 'dashboard':
      return <DashboardSection />
    case 'vehicles':
      return <VehiclesSection />
    case 'customer':
      return <CustomersSection />
    case 'plans':
      return <PlansSection />
    default:
      return (
        <Text fontSize={80} color="gray.300">
          Sem dados para essa seção
        </Text>
      )
  }
}
