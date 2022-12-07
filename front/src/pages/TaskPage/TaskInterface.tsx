import { User } from '../UserPage/UserInterface'

export interface TaskRequest {
  name: string
  description: string
  id?: string
  color: string
  ['person_id']: string
  ['project_id']: string
}

export interface TaskResponse {
  message: string
  task: {
    name: string
    description: string
    id?: string
    color: string
    person: User
    projectId: string
    status: string
  }
}
