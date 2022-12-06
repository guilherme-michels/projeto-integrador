import React, { useEffect, useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { MdModeEditOutline } from 'react-icons/md'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { getProject } from '../../../api/Project/project.service'
import { TaskRequest, TaskResponse } from '../../TaskPage/TaskInterface'
import { User } from '../../UserPage/UserInterface'
import { Project } from '../ProjectInterface'

const TaskBody = styled.div`
  padding: 10px;
  display: flex;
  width: 100%;
`

const TaskItem = styled.button`
  display: flex;
  justify-content: center;
  border-radius: 8px;
  width: 100%;
  min-height: 80px;
  margin: 20px 0px 0px;
`

interface TaskTableProps {
  tasks: Array<TaskResponse>
  onEdit: (task: TaskResponse) => void
  onDelete: (task: TaskResponse) => void
  pessoas: Array<User>
}

export const ViewProject: React.FunctionComponent<TaskTableProps> = props => {
  const params = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [tasks, setTasks] = useState()

  useEffect(() => {
    if (params.id) {
      getProject(params.id).then(response => {
        console.log(`response`, response)
        setProject(response.project)
      })
      // getProjectTasks(params.id).then(response => {
      //   console.log(`response`, response)
      //   setProject(response.project)
      // })
    }
  }, [])

  return (
    <div>
      {tasks ? (
        tasks.map(task => (
          <TaskItem style={{ background: '#ebebeb' }}>
            <TaskBody>
              <div
                style={{
                  background: task.color,
                  height: '20px',
                  width: '20px',
                  border: '1px solid #fff',
                }}
              ></div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                }}
              >
                <span style={{ marginBottom: '10px' }}>{task.name}</span>
                <span>Tarefa: {task.description}</span>
                <hr
                  style={{
                    width: '100%',
                  }}
                />
                <span style={{ fontSize: '14px', marginTop: '10px' }}>
                  Responsável: {task.person.name}
                </span>
                <div style={{ display: 'flex', marginTop: '10px' }}>
                  <MdModeEditOutline size={20} onClick={() => onEdit(task)} />
                  <AiFillDelete
                    size={20}
                    style={{ marginLeft: '8px' }}
                    onClick={() => onDelete(task)}
                  />
                </div>
              </div>
            </TaskBody>
          </TaskItem>
        ))
      ) : (
        <tr></tr>
      )}
      {/* <button onClick={() => gerarPDF()} style={{ marginTop: "6px" }}>
            <span style={{ display: "flex", background: "#DF6064", borderRadius: "4px", padding: "4px" }}>
                Relatório <AiFillFilePdf size={24} style={{ marginLeft: "12px" }} />
            </span>
        </button> */}
    </div>
  )
}
