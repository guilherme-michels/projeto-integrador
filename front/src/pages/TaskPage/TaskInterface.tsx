import { User } from '../UserPage/UserInterface'

export interface TaskRequest {
  name: string
  description: string
  id?: string
  color: string
  personId: string
}

export interface TaskResponse {
  name: string
  description: string
  id?: string
  color: string
  person: User
}
