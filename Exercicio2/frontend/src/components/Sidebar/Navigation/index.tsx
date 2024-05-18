import { List, ListItem, Tooltip } from '@chakra-ui/react'
import { IconType } from 'react-icons'

import { DashboardSections } from '@/constants/dashboardSections'

import { NavItem } from './NavItem'

export interface Item {
  type: string
  label: string
  icon: IconType
  path: DashboardSections
}

interface NavigationComponentProps {
  items: Item[]
  selectedPath: DashboardSections
  setPath: React.Dispatch<React.SetStateAction<DashboardSections>>
}

export function Navigation({
  items,
  selectedPath,
  setPath,
}: NavigationComponentProps) {
  return (
    <List w="full" my={8}>
      {items.map((item, index) => (
        <Tooltip label={item.label} key={index} bg="brand.blue">
          <ListItem>
            <NavItem
              item={item}
              isActive={item.path === selectedPath}
              setPath={setPath}
            />
          </ListItem>
        </Tooltip>
      ))}
    </List>
  )
}
