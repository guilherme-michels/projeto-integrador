import React, { useState } from 'react'
import { MdModeEditOutline } from 'react-icons/md'
import { AiFillDelete } from 'react-icons/ai'
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'
import { ModalDelete } from '../../../components/ModalDelete/ModalDelete'
import { Project } from '../ProjectInterface'

interface ProjectTableProps {
  projects: Array<Project>
  onEdit: (team: Project) => void
  onDelete: (team: Project) => void
}

export const ProjectTable: React.FunctionComponent<ProjectTableProps> =
  props => {
    const [projectSelected, setProjectSelected] = useState<Project | null>(null)
    const [isModalVisible, setIsModalVisible] = useState(false)
    return (
      <>
        <Table
          variant="striped"
          colorScheme="blackAlpha"
          style={{ width: '100%' }}
        >
          <Thead>
            <Tr>
              <Th style={{ padding: '8px' }}>Nome</Th>
              <Th style={{ padding: '8px' }}></Th>
            </Tr>
          </Thead>
          <Tbody>
            {props.projects.length > 0 ? (
              props.projects.map(project => (
                <Tr key={project.name}>
                  <Td style={{ padding: '8px', fontSize: '14px' }}>
                    {project.name}
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
                        onClick={() => props.onEdit(project)}
                      >
                        <MdModeEditOutline size={20} />
                      </button>
                      <button
                        style={{ marginLeft: '20px', cursor: 'pointer' }}
                        onClick={() => {
                          setProjectSelected(project)
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
                <td colSpan={2}>Sem projetos cadastrados</td>
              </tr>
            )}
          </Tbody>
          {isModalVisible && projectSelected ? (
            <ModalDelete
              userName={projectSelected.name}
              onCloseModal={() => {
                setIsModalVisible(false)
                setProjectSelected(null)
              }}
              confirmDelete={() => {
                props.onDelete(projectSelected)
                setIsModalVisible(false)
                setProjectSelected(null)
              }}
            />
          ) : null}
        </Table>
      </>
    )
  }
