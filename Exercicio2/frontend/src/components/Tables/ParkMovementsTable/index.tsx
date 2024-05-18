import {
  Flex,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useMemo } from 'react'

import { ParkMovementWithVehicleAndCardId } from '@/types/serverTypes/ParkMovement'
import { format } from 'date-fns'

interface ParkMovemntTableProps {
  data: ParkMovementWithVehicleAndCardId[]
  isLoading?: boolean
  isError?: boolean
}

export function ParkMovementsTable({
  data,
  isError,
  isLoading,
}: ParkMovemntTableProps) {
  const columns: ColumnDef<ParkMovementWithVehicleAndCardId>[] = useMemo(
    () => [
      {
        accessorKey: 'entryDate',
        header: 'Entrada',
        cell: ({ row }) => (
          <Flex flexDir="column" justifyContent="flex-start" gap={1}>
            <Text fontWeight="bold">
              {format(row.original.entryDate, 'dd/mm/yy HH:MM')}
            </Text>
          </Flex>
        ),
      },
      {
        accessorKey: 'vehicle.plate',
        header: 'Placa',
        cell: ({ row }) => (
          <Flex flexDir="column" justifyContent="flex-start" gap={1}>
            <Text fontWeight="bold">{row.original.vehicle.plate}</Text>
          </Flex>
        ),
      },
      {
        accessorKey: 'vehicle.customer.cardId',
        // Pelo ERD enviado o cardId pertence ao Customer...
        // Me parece que ta errado, porque pelo enunciado da a entender que cardId é obrigatório
        // porém alguns veículos não tem cliente vinculado.
        // Como pede no enunciado: "Caso o veículo não esteja cadastrado na base de dados deverá cadastrar o mesmo sem vínculo com cliente, pois ele será um veículo rotativo."
        header: 'Cartão do cliente',
        cell: ({ row }) => (
          <Flex flexDir="column" justifyContent="flex-start" gap={1}>
            <Text fontWeight="bold">
              {row.original.vehicle.customer
                ? row.original.vehicle.customer.cardId
                : 'SEM CLIENTE'}
            </Text>
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
    <>
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
    </>
  )
}
