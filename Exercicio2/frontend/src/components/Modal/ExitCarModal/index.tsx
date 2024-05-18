import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import { DefaultModalProps } from '../DefaultModalProps'
import { ExitCarResponse } from '@/services/parkmovements/exitCar'
import { format } from 'date-fns'
import { formatFloatToBRL } from '@/utils/formatFloatToBRL'

interface ExitCarModalProps extends DefaultModalProps {
  exitCarData: ExitCarResponse
}

export function ExitCarModal({
  isOpen,
  onClose,
  exitCarData,
}: ExitCarModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="white" border="1px" borderColor="brand.grey">
        <ModalHeader>Saída de veículo registrada</ModalHeader>

        <ModalCloseButton bg="gray.100" />

        <ModalBody>
          <Flex flexDir="column">
            <Text>Placa: {exitCarData.parkMovement.vehicle.plate}</Text>
            <Text>
              Entrada: {format(exitCarData.parkMovement.entryDate, 'HH:mm')}
            </Text>
            <Text>
              Saída: {format(exitCarData.parkMovement.exitDate, 'HH:mm')}
            </Text>

            <Text>
              <span style={{ fontWeight: 'bold' }}>
                Total: {formatFloatToBRL(exitCarData.value)}
              </span>
            </Text>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" onClick={onClose}>
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
