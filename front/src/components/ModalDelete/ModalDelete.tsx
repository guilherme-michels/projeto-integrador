import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Modal,
} from '@chakra-ui/react'

interface ModalProps {
  onCloseModal: () => void
  confirmDelete: () => void
  userName: string
}

export const ModalDelete = ({
  onCloseModal,
  confirmDelete,
  userName,
}: ModalProps) => {
  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        isOpen={true}
        onClose={onCloseModal}
        size={'sm'}
        id=""
      >
        <ModalOverlay />
        <ModalContent style={{ background: '#783E76', color: '#fff' }}>
          <ModalHeader> Deseja excluir {userName} da lista?</ModalHeader>
          <ModalFooter
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <div></div>
            <div>
              <button
                onClick={() => {
                  onCloseModal()
                }}
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  onCloseModal()
                }}
              >
                <button
                  onClick={() => {
                    confirmDelete()
                  }}
                  style={{ marginLeft: '10px' }}
                >
                  Confirmar
                </button>
              </button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
