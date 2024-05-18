import { Box } from '@chakra-ui/react'

import { DashboardSections } from '@/constants/dashboardSections'

import { Item, Navigation } from './Navigation'

interface LogoProps {
  sections: Item[]
  selectedPath: DashboardSections
  setPath: React.Dispatch<React.SetStateAction<DashboardSections>>
}

export function Sidebar({ sections, selectedPath, setPath }: LogoProps) {
  return (
    <Box w="full">
      <Navigation
        items={sections}
        selectedPath={selectedPath}
        setPath={setPath}
      />
    </Box>
  )
}
