import {
  Flex,
  IconButton,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  useBreakpoint,
} from '@chakra-ui/react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useMemo } from 'react'

import { Vehicle } from '@/types/serverTypes/Vehicle'
import { MdEdit } from 'react-icons/md'

interface VehiclesTableProps {
  data: Vehicle[]
  isLoading?: boolean
  isError?: boolean
}

export function VehiclesTable({
  data,
  isError,
  isLoading,
}: VehiclesTableProps) {
  const breakpoint = useBreakpoint()

  const columns: ColumnDef<Vehicle>[] = useMemo(
    () =>
      breakpoint !== 'sm' && breakpoint !== 'md'
        ? [
            {
              accessorKey: 'plate',
              header: 'Placa',
              cell: ({ row }) => (
                <Flex flexDir="column" justifyContent="flex-start" gap={1}>
                  <Text fontWeight="bold">{row.original.plate}</Text>
                </Flex>
              ),
            },
            {
              accessorKey: 'description',
              header: 'Descrição',
              cell: ({ row }) => (
                <Flex flexDir="column" justifyContent="flex-start" gap={1}>
                  <Text fontWeight="bold">
                    {row.original.description ?? 'SEM DESCRIÇÃO'}
                  </Text>
                </Flex>
              ),
            },
            {
              accessorKey: 'model',
              header: 'Modelo',
              cell: ({ row }) => (
                <Flex flexDir="column" justifyContent="flex-start" gap={1}>
                  <Text fontWeight="bold">
                    {row.original.model ?? 'MODEL DESCONHECIDO'}
                  </Text>
                </Flex>
              ),
            },
            {
              accessorKey: 'edit',
              header: 'Editar',
              cell: ({ row }) => (
                <Flex flexDir="column" justifyContent="center">
                  <Tooltip
                    label={`Editar veículo ${row.original.plate}`}
                    key={`vehicle-${row.original.id}`}
                    bg="brand.blue"
                  >
                    <IconButton
                      aria-label="edit vehicle"
                      colorScheme="gray"
                      w="fit-content"
                      icon={<MdEdit />}
                      onClick={() => console.log('TODO')}
                    />
                  </Tooltip>
                </Flex>
              ),
            },
          ]
        : [
            {
              accessorKey: 'plate',
              header: 'Placa',
              cell: ({ row }) => (
                <Flex flexDir="column" justifyContent="flex-start" gap={1}>
                  <Text fontWeight="bold">{row.original.plate}</Text>
                </Flex>
              ),
            },

            {
              accessorKey: 'model',
              header: 'Modelo',
              cell: ({ row }) => (
                <Flex flexDir="column" justifyContent="flex-start" gap={1}>
                  <Text fontWeight="bold">
                    {row.original.model ?? 'MODEL DESCONHECIDO'}
                  </Text>
                </Flex>
              ),
            },
            {
              accessorKey: 'edit',
              header: 'Editar',
              cell: ({ row }) => (
                <Flex flexDir="column" justifyContent="center">
                  <Tooltip
                    label={`Editar veículo ${row.original.plate}`}
                    key={`vehicle-${row.original.id}`}
                    bg="brand.blue"
                  >
                    <IconButton
                      aria-label="edit vehicle"
                      colorScheme="gray"
                      w="fit-content"
                      icon={<MdEdit />}
                      onClick={() => console.log('TODO')}
                    />
                  </Tooltip>
                </Flex>
              ),
            },
          ],
    [breakpoint],
  )

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  })

  const headerGroups = table.getHeaderGroups()

  if (isLoading) {
    return (
      <Flex flex={1} w="full" alignItems="center" justifyContent="center">
        <Spinner size="2xl" />
      </Flex>
    )
  }

  if (!data || isError) return <></>

  return (
    <TableContainer w="full" h="full" pt="20px">
      <Table variant="simple">
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th className="th" key={header.id}>
                  {/* {header.column.columnDef.header} */}
                  {header.column.columnDef.header?.toString()}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
