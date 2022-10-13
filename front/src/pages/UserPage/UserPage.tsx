import { useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { deleteUser, getUsers } from '../../api/User/user.service'
import { SidebarHeaderTeamplate } from '../../templates/SidebarHeaderTeamplate'
import { User } from './UserInterface'
import { UserTable } from './UserTable/UserTable'

export function UserPage() {
  const [users, setUsers] = useState<User[]>([])
  const navigate = useNavigate()
  const toast = useToast()

  const fetchUsers = () => {
    getUsers().then(data => setUsers(data.personList))
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const onEditUser = (user: User) => {
    navigate(`/tasker/editar-pessoa/${user.id}`)
  }

  const onDeleteUser = async (user: User) => {
    try {
      await deleteUser(user)
      toast({
        position: 'top-right',
        description: 'Usuário deletado com sucesso!',
        status: 'success',
        duration: 4000,
        isClosable: true,
      })
      fetchUsers()
    } catch (err) {
      toast({
        position: 'top-right',
        description: 'Falha em excluir usuário!',
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
    }
  }

  return (
    <SidebarHeaderTeamplate>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <strong>Listagem de usuários</strong>
          <Link
            to="/tasker/add-user"
            style={{
              padding: '10px',
              background: '#783E76',
              borderRadius: '8px',
              color: '#fff',
            }}
          >
            Adicionar usuario
          </Link>
        </div>
        <UserTable onDelete={onDeleteUser} onEdit={onEditUser} users={users} />
      </div>
    </SidebarHeaderTeamplate>
  )
}
