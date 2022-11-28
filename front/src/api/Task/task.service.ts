import { Api } from '..'
import { TaskRequest, TaskResponse } from '../../pages/TaskPage/TaskInterface'

export function addTask(Task: TaskRequest) {
  return Api.post<{ taskList: TaskResponse; message: string }>(
    '/tasks/store',
    Task
  ).then(res => res.data)
}

export function getTasks() {
  return Api.get<{ taskList: TaskResponse[]; message: string }>(`/tasks`).then(
    res => res.data
  )
}

export function getTask(taskId: string) {
  return Api.get<TaskResponse>(`/tasks/${taskId}/show`).then(res => res.data)
}

export function editTask(Task: TaskResponse) {
  return Api.put(`/tasks/${Task.id}/update`, Task).then(res => res.data)
}

export function deleteTask(task: TaskResponse) {
  return Api.delete<TaskResponse>(`/tasks/${task.id}/delete`).then(
    res => res.data
  )
}
