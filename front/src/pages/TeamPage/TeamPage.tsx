import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Scrollbar } from 'react-scrollbars-custom'
import { ModalTask } from '../../components/TaskComponents/ModalTask/ModalTask'
import { TeamTable } from './TeamTable/TeamTable'
import { Team } from './TeamInterface'
import { useToast } from '@chakra-ui/react'
import { deleteTeam, getTeams } from '../../api/Team/team.service'
import { SidebarHeaderTeamplate } from '../../templates/SidebarHeaderTeamplate'

const Column = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 80vh;
  padding: 20px;
`

const Title = styled.strong``

export function TeamPage() {
  const [teams, setTeams] = useState<Team[]>([])
  const navigate = useNavigate()
  const toast = useToast()

  const fetchTeams = () => {
    getTeams().then(data => setTeams(data.teamList))
  }

  useEffect(() => {
    fetchTeams()
  }, [])

  const onEditTeam = (team: Team) => {
    navigate(`/tasker/editar-team/${team.id}`)
  }

  const onDeleteTeam = async (team: Team) => {
    try {
      await deleteTeam(team)
      toast({
        position: 'top-right',
        description: 'Time deletado com sucesso!',
        status: 'success',
        duration: 4000,
        isClosable: true,
      })
      fetchTeams()
    } catch (err) {
      toast({
        position: 'top-right',
        description: 'Falha em excluir time!',
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
            <Title>Times</Title>
            <Scrollbar style={{ width: '100%', height: '100%' }}>
              <TeamTable
                onDelete={onDeleteTeam}
                onEdit={onEditTeam}
                teams={teams}
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
