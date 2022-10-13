import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Modal,
} from '@chakra-ui/react'

export const ModalTask = ({ onCloseModal = () => {} }) => {
  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        isOpen={true}
        onClose={onCloseModal}
        size={'3xl'}
        id=""
      >
        <ModalOverlay />
        <ModalContent style={{ background: '#2b2b2c' }}>
          <ModalHeader style={{ background: '#783E76' }}>
            Tarefa - Guilherme Michels
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>Descrição da tarefa</ModalBody>
          <ModalFooter
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <div>25/04/2022</div>
            <Button onClick={onCloseModal} style={{ background: '#783E76' }}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
