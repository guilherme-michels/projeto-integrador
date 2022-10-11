import { Table, Thead, Tbody, Tr, Th, Td, Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import { AiFillDelete, AiFillFilePdf } from 'react-icons/ai'
import { MdModeEditOutline } from 'react-icons/md'
import { ModalDelete } from '../../../components/ModalDelete/ModalDelete'
import { User } from '../UserInterface'

import * as pdfMake from 'pdfmake/build/pdfmake'
import * as pdfFonts from 'pdfmake/build/vfs_fonts'
interface UserTableProps {
  users: Array<User>
  onEdit: (user: User) => void
  onDelete: (user: User) => void
}

export const UserTable: React.FunctionComponent<UserTableProps> = props => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [userSelected, setUserSelected] = useState<User | null>(null)
  const [filter, setFilter] = useState('')

  const userFilter =
    props.users.filter(user =>
      user.name.toLowerCase().includes(filter.toLowerCase())
    ) &&
    props.users.filter(user =>
      user.email.toLowerCase().includes(filter.toLowerCase())
    )

  function gerarPDF() {
    ;(pdfMake as any).vfs = pdfFonts.pdfMake.vfs
    pdfMake
      .createPdf({
        pageSize: 'A4',
        pageMargins: [20, 20, 20, 20],
        content: [
          {
            table: {
              headerRows: 1,
              body: [
                ['Nome', 'Cargo', 'Telefone', 'E-mail'],
                ...userFilter.map(user => [
                  user.name,
                  user.cargo,
                  user.telefone,
                  user.email,
                ]),
              ],
            },
          },
        ],
      })
      .download()
  }

  return (
    <>
      <div style={{ display: 'flex', marginBottom: '10px', marginTop: '10px' }}>
        <Input
          placeholder="Buscar"
          type="text"
          onChange={ev => setFilter(ev.target.value)}
          value={filter}
          style={{ marginLeft: '10px' }}
        />
      </div>

      <Table variant="striped" colorScheme="blackAlpha">
        <Thead>
          <Tr>
            <Th style={{ padding: '8px' }}>Nome</Th>
            <Th style={{ padding: '8px' }}>Email</Th>
            <Th style={{ padding: '8px' }}>Cargo</Th>
            <Th style={{ padding: '8px' }}>Telefone</Th>
            <Th style={{ padding: '8px' }}></Th>
          </Tr>
        </Thead>
        <Tbody>
          {userFilter.length > 0 ? (
            userFilter.map(user => (
              <Tr key={user.email}>
                <Td style={{ padding: '8px', fontSize: '14px' }}>
                  {user.name}
                </Td>
                <Td style={{ padding: '8px', fontSize: '14px' }}>
                  {user.email}
                </Td>
                <Td style={{ padding: '8px', fontSize: '14px' }}>
                  {user.cargo}
                </Td>
                <Td style={{ padding: '8px', fontSize: '14px' }}>
                  {user.telefone}
                </Td>
                <Td style={{ padding: '8px', fontSize: '14px' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <button
                      style={{ cursor: 'pointer' }}
                      onClick={() => props.onEdit(user)}
                    >
                      <MdModeEditOutline size={20} />
                    </button>
                    <button
                      style={{ marginLeft: '20px', cursor: 'pointer' }}
                      onClick={() => {
                        setUserSelected(user)
                        setIsModalVisible(true)
                      }}
                    >
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
        {isModalVisible && userSelected ? (
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
        ) : null}
      </Table>
      <button onClick={() => gerarPDF()} style={{ marginTop: '6px' }}>
        <span
          style={{
            display: 'flex',
            background: '#DF6064',
            borderRadius: '4px',
            padding: '4px',
            marginLeft: '2px',
          }}
        >
          Relatório <AiFillFilePdf size={24} style={{ marginLeft: '12px' }} />
        </span>
      </button>
    </>
  )
}
