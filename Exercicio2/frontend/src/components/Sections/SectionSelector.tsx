import { DashboardSections } from '@/constants/dashboardSections'
import { Text } from '@chakra-ui/react'
import { DashboardSection } from './DashboardSection'

interface SectionSelectorProps {
  path: DashboardSections
}

export function SectionSelector({ path }: SectionSelectorProps) {
  switch (path) {
    case 'dashboard':
      return <DashboardSection />
    default:
      return (
        <Text fontSize={80} color="gray.300">
          Sem dados para essa seção
        </Text>
      )
  }
}
