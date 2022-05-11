import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
} from '@chakra-ui/react'
import React, { useState } from "react"
import { AiFillDelete } from 'react-icons/ai';
import { MdModeEditOutline } from 'react-icons/md';
import { ModalDelete } from '../../../components/ModalDelete/ModalDelete';
import { User } from '../UserInterface';

interface UserTableProps {
    users: Array<User>;
    onEdit: (user: User) => void;
    onDelete: (user: User) => void;
}


export const UserTable: React.FunctionComponent<UserTableProps> = props => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [userSelected, setUserSelected] = useState<User | null>(null)

    return (
        <>
            <Table variant='striped' colorScheme="blackAlpha">
                <Thead>
                    <Tr>
                        <Th style={{ padding: "8px" }} >Nome</Th>
                        <Th style={{ padding: "8px" }} >Email</Th>
                        <Th style={{ padding: "8px" }} >Cargo</Th>
                        <Th style={{ padding: "8px" }} >Telefone</Th>
                        <Th style={{ padding: "8px" }} ></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {props.users.length > 0 ? (
                        props.users.map(user => (
                            <Tr key={user.email}>
                                <Td style={{ padding: "8px", fontSize: "14px" }}>{user.name}</Td>
                                <Td style={{ padding: "8px", fontSize: "14px" }}>{user.email}</Td>
                                <Td style={{ padding: "8px", fontSize: "14px" }}>{user.cargo}</Td>
                                <Td style={{ padding: "8px", fontSize: "14px" }}>{user.telefone}</Td>
                                <Td style={{ padding: "8px", fontSize: "14px" }}>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <button style={{ cursor: "pointer" }} onClick={() => props.onEdit(user)}>
                                            <MdModeEditOutline size={20} />
                                        </button>
                                        <button style={{ marginLeft: "20px", cursor: "pointer" }} onClick={() => {
                                            setUserSelected(user)
                                            setIsModalVisible(true)
                                        }}>
                                            <AiFillDelete size={20} />
                                        </button>
                                    </div>
                                </Td>
                            </Tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5}>Sem pessoas cadastradas</td>
                        </tr>
                    )}
                </Tbody>
                {isModalVisible && userSelected ?
                    <ModalDelete
                        userName={userSelected.name}
                        onCloseModal={() => {
                            setIsModalVisible(false)
                            setUserSelected(null)
                        }}
                        confirmDelete={() => {
                            props.onDelete(userSelected)
                            setIsModalVisible(false)
                            setUserSelected(null)
                        }}
                    />
                    : null}
            </Table>
        </ >
    )
}