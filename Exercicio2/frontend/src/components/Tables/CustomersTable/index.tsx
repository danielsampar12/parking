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
} from '@chakra-ui/react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useMemo } from 'react'

import { Customer } from '@/types/serverTypes/Customer'
import { MdEdit } from 'react-icons/md'

interface CustomersTableProps {
  data: Customer[]
  isLoading?: boolean
  isError?: boolean
}

export function CustomersTable({
  data,
  isError,
  isLoading,
}: CustomersTableProps) {
  const columns: ColumnDef<Customer>[] = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Nome',
        cell: ({ row }) => (
          <Flex flexDir="column" justifyContent="flex-start" gap={1}>
            <Text fontWeight="bold">{row.original.name}</Text>
          </Flex>
        ),
      },
      {
        accessorKey: 'cardId',
        header: 'Cartão',
        cell: ({ row }) => (
          <Flex flexDir="column" justifyContent="flex-start" gap={1}>
            <Text fontWeight="bold">{row.original.cardId}</Text>
          </Flex>
        ),
      },
      {
        accessorKey: 'edit',
        header: 'Editar',
        cell: ({ row }) => (
          <Flex flexDir="column" justifyContent="center">
            <Tooltip
              label={`Editar cliente ${row.original.id}`}
              key={`Customer-${row.original.id}`}
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
    [],
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
