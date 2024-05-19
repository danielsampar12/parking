import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
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

import { Plan } from '@/types/serverTypes/Plan'
import { MdEdit } from 'react-icons/md'
import { formatFloatToBRL } from '@/utils/formatFloatToBRL'

interface PlansTableProps {
  data: Plan[]
  isLoading?: boolean
  isError?: boolean
}

export function PlansTable({ data, isError, isLoading }: PlansTableProps) {
  const columns: ColumnDef<Plan>[] = useMemo(
    () => [
      {
        accessorKey: 'description',
        header: 'Descrição',
        cell: ({ row }) => (
          <Flex flexDir="column" justifyContent="flex-start" gap={1}>
            <Text fontWeight="bold">{row.original.description}</Text>
          </Flex>
        ),
      },
      {
        accessorKey: 'value',
        header: 'Valor',
        cell: ({ row }) => (
          <Flex flexDir="column" justifyContent="flex-start" gap={1}>
            <Text fontWeight="bold">
              {formatFloatToBRL(row.original.value)}
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
              label={`Editar cliente ${row.original.id}`}
              key={`Plan-${row.original.id}`}
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
        <Spinner size="3xl" color="brand.blue" />
      </Flex>
    )
  }

  if (isError) {
    return (
      <Flex flex={1} w="full" alignItems="center" justifyContent="center">
        <Alert
          status="error"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="200px"
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            Ocorreu um erro!
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            Ocorreu um erro ao buscar a informação. Verifique sua conexão à
            internet. Caso o erro persista, contate o suporte.
          </AlertDescription>
        </Alert>
      </Flex>
    )
  }

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
