import { Api } from '..'
import { TaskRequest, TaskResponse } from '../../pages/TaskPage/TaskInterface'

export function addTask(Task: TaskRequest) {
  return Api.post<{ taskList: TaskResponse; message: string }>(
    '/tasks/store',
    Task
  ).then(res => res.data)
}

export function getTasks(projectId: string) {
  return Api.get<{ taskList: TaskResponse[]; message: string }>(
    `/tasks/${projectId}`
  ).then(res => res.data)
}

export function getTask(taskId: string) {
  return Api.get<TaskResponse>(`/tasks/${taskId}/show`).then(res => res.data)
}

export function editTask(task: TaskResponse['task']) {
  return Api.put(`/tasks/${task.id}/update`, task).then(res => res.data)
}

export function deleteTask(task: TaskResponse['task']) {
  return Api.delete<TaskResponse>(`/tasks/${task.id}/delete`).then(
    res => res.data
  )
}
