import {
  Box,
  Heading,
  Link as LinkChakra,
  ListIcon,
  Icon,
  Text,
} from '@chakra-ui/react'

import { DashboardSections } from '@/constants/dashboardSections'

import { Item } from '.'

interface NavItemProps {
  item: Item
  isActive: boolean
  setPath: React.Dispatch<React.SetStateAction<DashboardSections>>
  isHorizontalSideBar?: boolean
}

export function NavItem({
  item,
  isActive,
  setPath,
  isHorizontalSideBar = false,
}: NavItemProps) {
  const { label } = item

  if (isHorizontalSideBar && item.type === 'link') {
    const { icon } = item
    return (
      <Box display="flex" alignItems="center" my={6} justifyContent="center">
        <LinkChakra
          gap={1}
          display="flex"
          alignItems="center"
          _hover={{ textDecoration: 'none', color: 'black' }}
          fontWeight="medium"
          color={isActive ? 'black' : 'gray.500'}
          w="full"
          justifyContent={'center'}
          onClick={() => setPath(item.path)}
        >
          <Icon as={icon} fontSize={28} m="0" />
        </LinkChakra>
      </Box>
    )
  }

  if (item.type === 'link') {
    const { icon } = item
    return (
      <Box display="flex" alignItems="center" my={6} justifyContent="center">
        <LinkChakra
          gap={1}
          display="flex"
          alignItems="center"
          _hover={{ textDecoration: 'none', color: 'black' }}
          fontWeight="medium"
          color={isActive ? 'black' : 'gray.500'}
          w="full"
          justifyContent={'center'}
          onClick={() => setPath(item.path)}
        >
          <ListIcon as={icon} fontSize={22} m="0" />
        </LinkChakra>
      </Box>
    )
  }
  return (
    <Heading
      color="gray.400"
      fontWeight="medium"
      textTransform="uppercase"
      fontSize="sm"
      borderTopWidth={1}
      borderColor="gray.100"
      my={6}
    >
      <Text>{label}</Text>
    </Heading>
  )
}
