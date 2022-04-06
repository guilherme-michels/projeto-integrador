import { Api } from '..'
import { User } from '../../pages/UserPage/UserInterface'

interface UserResponse {
  person: User
  message: string
}

export function addUser(user: User) {
  return Api.post<UserResponse>('/persons/store', user).then(res => res.data)
}

interface UsersResponse {
  personList: User[]
  message: string
}

export function getUsers() {
  return Api.get<UsersResponse>(`/persons`).then(res => res.data)
}

export function getUser(userId: string) {
  return Api.get<UserResponse>(`/persons/${userId}/show`).then(res => res.data)
}

export function editUser(user: User) {
  return Api.put(`/persons/${user.id}/update`, user).then(res => res.data)
}

export function deleteUser(user: User) {
  return Api.delete<UserResponse>(`/persons/${user.id}/delete`).then(
    res => res.data
  )
}
