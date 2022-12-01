import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Scrollbar } from 'react-scrollbars-custom'
import { ModalTask } from '../../components/TaskComponents/ModalTask/ModalTask'
import { useToast } from '@chakra-ui/react'
import { SidebarHeaderTeamplate } from '../../templates/SidebarHeaderTeamplate'
import { Project } from './ProjectInterface'
import { deleteProject, getProjects } from '../../api/Project/project.service'
import { ProjectTable } from './ProjectTable/ProjectTable'

const Column = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 80vh;
  padding: 20px;
`

const Title = styled.strong``

export function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const navigate = useNavigate()
  const toast = useToast()

  const fetchProjects = () => {
    getProjects().then(data => setProjects(data.projectList))
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const onEditProject = (project: Project) => {
    navigate(`/tasker/editar-project/${project.id}`)
  }

  const onDeleteProject = async (project: Project) => {
    try {
      await deleteProject(project)
      toast({
        position: 'top-right',
        description: 'Projeto deletado com sucesso!',
        status: 'success',
        duration: 4000,
        isClosable: true,
      })
      fetchProjects()
    } catch (err) {
      toast({
        position: 'top-right',
        description: 'Falha em excluir projeto!',
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
    }
  }

  const [isModalVisible, setIsModalVisible] = useState(false)

  return (
    <SidebarHeaderTeamplate>
      <div>
        <div style={{ display: 'flex' }}>
          <Column>
            <Title>Projetos</Title>
            <Scrollbar style={{ width: '100%', height: '100%' }}>
              <ProjectTable
                onDelete={onDeleteProject}
                onEdit={onEditProject}
                projects={projects}
              />
            </Scrollbar>
            {isModalVisible ? (
              <ModalTask onCloseModal={() => setIsModalVisible(false)} />
            ) : null}
          </Column>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <hr
            style={{
              width: '100%',
              marginBottom: '10px',
            }}
          />
          <Link
            to="/tasker/add-team"
            style={{
              padding: '10px',
              background: '#783E76',
              borderRadius: '8px',
              width: '140px',
              color: '#fff',
            }}
          >
            Adicionar time
          </Link>
        </div>
      </div>
    </SidebarHeaderTeamplate>
  )
}
