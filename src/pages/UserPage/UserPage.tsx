import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export function UserPage() {
    return <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>Listagem de usuários</div>
            <Link to="/add-user" style={{ padding: "10px", background: "#DF6064", borderRadius: "8px" }}>Adicionar novo usuário</Link>
        </div>
        <Table variant='striped' colorScheme='whiteAlpha'>
            <Thead>
                <Tr>
                    <Th>Nome</Th>
                    <Th>E-mail</Th>
                    <Th>Telefone</Th>
                    <Th>Cargo</Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                <Tr>
                    <Td>Guilherme Michels</Td>
                    <Td>guilherme.michels@universo.univates.br</Td>
                    <Td>(51)99490990</Td>
                    <Td>Administrador</Td>
                    <Td isNumeric>editar excluir</Td>
                </Tr>
                <Tr>
                    <Td>Guilherme Michels</Td>
                    <Td>guilherme.michels@universo.univates.br</Td>
                    <Td>(51)99490990</Td>
                    <Td>Administrador</Td>
                    <Td isNumeric>editar excluir</Td>
                </Tr>
                <Tr>
                    <Td>Guilherme Michels</Td>
                    <Td>guilherme.michels@universo.univates.br</Td>
                    <Td>(51)99490990</Td>
                    <Td>Administrador</Td>
                    <Td isNumeric>editar excluir</Td>
                </Tr>
            </Tbody>
        </Table>
    </div >
}