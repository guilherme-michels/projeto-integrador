import { Api } from '..'
import { Task } from '../../pages/TaskPage/TaskInterface'

interface TaskResponse {
  task: Task
  message: string
}

export function addTask(Task: Task) {
  return Api.post<TaskResponse>('/tasks/store', Task).then(res => res.data)
}

interface TasksResponse {
  taskList: Task[]
  message: string
}

export function getTasks() {
  return Api.get<TasksResponse>(`/tasks`).then(res => res.data)
}

export function getTask(taskId: string) {
  return Api.get<TaskResponse>(`/tasks/${taskId}/show`).then(res => res.data)
}

export function editTask(Task: Task) {
  return Api.put(`/tasks/${Task.id}/update`, Task).then(res => res.data)
}

export function deleteTask(task: Task) {
  return Api.delete<TaskResponse>(`/tasks/${task.id}/delete`).then(
    res => res.data
  )
}
