import {
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    Modal,
} from '@chakra-ui/react'
import { Task } from '../../pages/TaskPage/TaskInterface'

interface ModalProps {
    onCloseModal: () => void,
    taskInfo: Task
}

export const ModalDelete = ({ onCloseModal, taskInfo }: ModalProps) => {

    return (
        <>
            <Modal closeOnOverlayClick={false} isOpen={true} onClose={onCloseModal} size={'sm'} id="">
                <ModalOverlay />
                <ModalContent style={{ background: "#dddddd" }}>
                    <ModalHeader>{taskInfo.name}</ModalHeader>
                    <ModalFooter style={{ display: "flex", justifyContent: "space-between" }}>
                        <div></div>
                        <div>
                            <button onClick={() => { onCloseModal() }}>Cancelar</button>
                        </div>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
