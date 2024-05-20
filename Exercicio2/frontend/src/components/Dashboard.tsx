import { useState } from 'react'
import { Flex, HStack, VStack, useBreakpoint } from '@chakra-ui/react'
import {
  MdDocumentScanner,
  MdOutlineCreditCard,
  MdSpaceDashboard,
} from 'react-icons/md'

import { Sidebar } from './Sidebar/Sidebar'
import { DashboardSections } from '@/constants/dashboardSections'
import { Item } from './Sidebar/Navigation'
import { FaCar, FaUsers } from 'react-icons/fa'
import { SectionSelector } from './Sections/SectionSelector'

export function Dashboard() {
  const [path, setPath] = useState<DashboardSections>('dashboard')

  const breakpoint = useBreakpoint()

  const sections: Item[] = [
    {
      type: 'link',
      label: 'Patio',
      icon: MdSpaceDashboard,
      path: 'dashboard',
    },
    {
      type: 'link',
      label: 'Veículos',
      icon: FaCar,
      path: 'vehicles',
    },
    {
      type: 'link',
      label: 'Clientes',
      icon: FaUsers,
      path: 'customer',
    },
    {
      type: 'link',
      label: 'Planos',
      icon: MdOutlineCreditCard,
      path: 'plans',
    },
    {
      type: 'link',
      label: 'Contrato',
      icon: MdDocumentScanner,
      path: 'contract',
    },
  ]

  if (breakpoint === 'sm' || breakpoint === 'base') {
    return (
      <VStack
        w="full"
        h="100vh"
        bgGradient="linear(to-br, brand.blue, brand.navyBlue)"
        padding="8px"
      >
        <Flex
          w="full"
          bg="white"
          alignItems="center"
          justify="center"
          padding={2}
          flexDirection="row"
          transition="ease-in-out .2s"
          borderRadius="3xl"
        >
          <Sidebar
            sections={sections}
            selectedPath={path}
            setPath={setPath}
            isHorizontal
          />
        </Flex>
        <Flex
          as="main"
          w="full"
          h="full"
          bg="white"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          position="relative"
          borderRadius="3xl"
          padding={5}
        >
          <SectionSelector path={path} />
        </Flex>
      </VStack>
    )
  }

  return (
    <HStack
      w="full"
      h="100vh"
      bgGradient="linear(to-br, brand.blue, brand.navyBlue)"
      padding="8px"
    >
      <Flex
        as="aside"
        w="full"
        h="full"
        maxW={100}
        bg="white"
        alignItems="start"
        padding={6}
        flexDirection="column"
        justifyContent="space-between"
        transition="ease-in-out .2s"
        borderRadius="3xl"
      >
        <Sidebar sections={sections} selectedPath={path} setPath={setPath} />
      </Flex>
      <Flex
        as="main"
        w="full"
        h="full"
        bg="white"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        position="relative"
        borderRadius="3xl"
        padding={5}
      >
        <SectionSelector path={path} />
      </Flex>
    </HStack>
  )
}
