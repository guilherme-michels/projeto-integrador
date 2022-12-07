import { useToast } from '@chakra-ui/react'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
// import { AiFillDelete } from 'react-icons/ai'
// import { MdModeEditOutline } from 'react-icons/md'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Scrollbar from 'react-scrollbars-custom'
import styled from 'styled-components'
import { getProject } from '../../../api/Project/project.service'
// import { getProject } from '../../../api/Project/project.service'
import { deleteTask, getTasks } from '../../../api/Task/task.service'
// import { getUsers } from '../../../api/User/user.service'
import { SidebarHeaderTeamplate } from '../../../templates/SidebarHeaderTeamplate'
import { TaskResponse } from '../../TaskPage/TaskInterface'
import { TaskTable } from '../../TaskPage/TaskTable/TaskTable'
import { Project } from '../ProjectInterface'
// import { User } from '../../UserPage/UserInterface'
// import { Project } from '../ProjectInterface'

// const TaskBody = styled.div`
//   padding: 10px;
//   display: flex;
//   width: 100%;
// `

// const TaskItem = styled.button`
//   display: flex;
//   justify-content: center;
//   border-radius: 8px;
//   width: 100%;
//   min-height: 80px;
//   margin: 20px 0px 0px;
// `

const Column = styled.div`
  width: 30%;
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 80vh;
  padding: 20px;
`

const Title = styled.strong`
  margin-bottom: 5%;
`

export const ViewProject: React.FunctionComponent = () => {
  const { id } = useParams<{ id: string }>()
  const [project, setProject] = useState<Project | null>(null)
  const [tasks, setTasks] = useState<TaskResponse[]>([])
  const navigate = useNavigate()
  const toast = useToast()

  const tasksAFazer = useMemo(() => {
    if (!tasks) return []
    return tasks.filter(task => {
      return (task as any).status === 'A fazer'
    })
  }, [tasks])
  const tasksEmAndamento = useMemo(() => {
    if (!tasks) return []
    return tasks.filter(task => {
      return (task as any).status === 'Em andamento'
    })
  }, [tasks])
  const tasksFinalizadas = useMemo(() => {
    if (!tasks) return []
    return tasks.filter(task => {
      return (task as any).status === 'Finalizada'
    })
  }, [tasks])

  const fetchTasks = useCallback(async () => {
    if (id) {
      getTasks(id).then(data => {
        setTasks(data.taskList)
      })
    }
  }, [])

  useEffect(() => {
    if (id) {
      getProject(id).then(response => setProject(response.project))
    }

    fetchTasks()
  }, [])

  const onEditTask = (task: TaskResponse['task']) => {
    navigate(`/tasker/editar-task/${task.id}`)
  }

  const onDeleteTask = async (task: TaskResponse['task']) => {
    try {
      await deleteTask(task)
      toast({
        position: 'top-right',
        description: 'Tarefa deletada com sucesso!',
        status: 'success',
        duration: 4000,
        isClosable: true,
      })
      fetchTasks()
    } catch (err) {
      toast({
        position: 'top-right',
        description: 'Falha em excluir tarefa!',
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
    }
  }

  return (
    <SidebarHeaderTeamplate>
      <div>
        <Title>Projeto {project?.name ?? '...'}</Title>
        <div style={{ display: 'flex' }}>
          <Column>
            <Title>A fazer</Title>
            <Scrollbar style={{ width: '100%', height: '100%' }}>
              <TaskTable
                onDelete={onDeleteTask}
                onEdit={onEditTask}
                tasks={tasksAFazer}
              />
            </Scrollbar>
          </Column>
          <Column>
            <Title>Em andamento</Title>
            <Scrollbar style={{ width: '100%', height: '100%' }}>
              <TaskTable
                onDelete={onDeleteTask}
                onEdit={onEditTask}
                tasks={tasksEmAndamento}
              />
            </Scrollbar>
          </Column>
          <Column>
            <Title>Finalizadas</Title>
            <Scrollbar style={{ width: '100%', height: '100%' }}>
              <TaskTable
                onDelete={onDeleteTask}
                onEdit={onEditTask}
                tasks={tasksFinalizadas}
              />
            </Scrollbar>
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
            to={`/tasker/add-task/${id}`}
            style={{
              padding: '10px',
              background: '#783E76',
              borderRadius: '8px',
              width: '140px',
              color: '#fff',
            }}
          >
            Adicionar tarefa
          </Link>
        </div>
      </div>
    </SidebarHeaderTeamplate>
    // <div>
    //   <TaskItem style={{ background: '#ebebeb' }}>
    //     <TaskBody>
    //       <div
    //         style={{
    //           height: '20px',
    //           width: '20px',
    //           border: '1px solid #fff',
    //         }}
    //       ></div>
    //       <div
    //         style={{
    //           display: 'flex',
    //           flexDirection: 'column',
    //           width: '100%',
    //         }}
    //       >
    //         <span style={{ marginBottom: '10px' }}></span>
    //         <span>Tarefa: </span>
    //         <hr
    //           style={{
    //             width: '100%',
    //           }}
    //         />
    //         <span style={{ fontSize: '14px', marginTop: '10px' }}>
    //           Responsável:
    //         </span>
    //         <div style={{ display: 'flex', marginTop: '10px' }}>
    //           {/* <MdModeEditOutline size={20} onClick={() => onEdit(task)} />
    //               <AiFillDelete
    //                 size={20}
    //                 style={{ marginLeft: '8px' }}
    //                 onClick={() => onDelete(task)}
    //               /> */}
    //         </div>
    //       </div>
    //     </TaskBody>
    //   </TaskItem>
    // </div>
  )
}
