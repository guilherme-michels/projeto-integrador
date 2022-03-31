import { Api } from '..'
import { User } from '../../pages/UserPage/UserInterface'

interface UserResponse {
  person: User
  message: string
}

export function addUser(User: User) {
  return Api.post<UserResponse>('/persons/store', User).then(res => res.data)
}
