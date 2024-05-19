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
import { useMemo, useState } from 'react'

import { Customer } from '@/types/serverTypes/Customer'
import { MdEdit } from 'react-icons/md'
import { UpdateCustomerModal } from '@/components/Modal/UpdateCustomerModal'

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
  const [updateCustomer, setUpdateCustomer] = useState<Customer | null>(null)
  const [isOpen, setIsOpen] = useState(false)

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
                onClick={() => {
                  setUpdateCustomer(row.original)
                  setIsOpen(true)
                }}
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

  function handleCloseEditCustomer() {
    setUpdateCustomer(null)
    setIsOpen(false)
  }

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
    <>
      {updateCustomer ? (
        <UpdateCustomerModal
          isOpen={isOpen}
          onClose={handleCloseEditCustomer}
          customer={updateCustomer}
        />
      ) : (
        <></>
      )}
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
