import { DashboardSections } from '@/constants/dashboardSections'
import { Text } from '@chakra-ui/react'

interface SectionSelectorProps {
  path: DashboardSections
}

export function SectionSelector({ path }: SectionSelectorProps) {
  switch (path) {
    default:
      return (
        <Text fontSize={80} color="gray.300">
          Sem dados para essa seção
        </Text>
      )
  }
}
