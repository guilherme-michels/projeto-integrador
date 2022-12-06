import React, { useState } from 'react'
import { Team } from '../TeamInterface'
import { MdModeEditOutline } from 'react-icons/md'
import { AiFillDelete } from 'react-icons/ai'
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'
import { ModalDelete } from '../../../components/ModalDelete/ModalDelete'

interface TeamTableProps {
  teams: Array<Team>
  onEdit: (team: Team) => void
  onDelete: (team: Team) => void
}

export const TeamTable: React.FunctionComponent<TeamTableProps> = props => {
  const [teamSelected, setTeamSelected] = useState<Team | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  return (
    <>
      <Table variant="striped" colorScheme="blackAlpha">
        <Thead>
          <Tr>
            <Th style={{ padding: '8px' }}>Nome</Th>
            <Th style={{ padding: '8px' }}>Setor</Th>
            <Th style={{ padding: '8px' }}></Th>
          </Tr>
        </Thead>
        <Tbody>
          {props.teams ? (
            props.teams.map(team => (
              <Tr key={team.id}>
                <Td style={{ padding: '8px', fontSize: '14px' }}>
                  {team.team_name}
                </Td>
                <Td style={{ padding: '8px', fontSize: '14px' }}>
                  {team.sector}
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
                      onClick={() => props.onEdit(team)}
                    >
                      <MdModeEditOutline size={20} />
                    </button>
                    <button
                      style={{ marginLeft: '20px', cursor: 'pointer' }}
                      onClick={() => {
                        setTeamSelected(team)
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
              <td colSpan={3}>Sem times cadastrados</td>
            </tr>
          )}
        </Tbody>
        {isModalVisible && teamSelected ? (
          <ModalDelete
            userName={teamSelected.team_name}
            onCloseModal={() => {
              setIsModalVisible(false)
              setTeamSelected(null)
            }}
            confirmDelete={() => {
              props.onDelete(teamSelected)
              setIsModalVisible(false)
              setTeamSelected(null)
            }}
          />
        ) : null}
      </Table>
    </>
  )
}
