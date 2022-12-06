import { Api } from '..'
import { Team } from '../../pages/TeamPage/TeamInterface'

interface TeamResponse {
  team: Team
  message: string
}

export function addTeam(team: Team) {
  return Api.post<TeamResponse>('/teams/store', team).then(res => res.data)
}

interface TeamsResponse {
  teamList: Team[]
  message: string
}

export function getTeams() {
  return Api.get<TeamsResponse>(`/teams`).then(res => res.data)
}

export function getTeam(teamId: string) {
  return Api.get<TeamResponse>(`/teams/${teamId}/show`).then(res => res.data)
}

export function editTeam(team: Team) {
  return Api.put(`/teams/${team.id}/update`, team).then(res => res.data)
}

export function deleteTeam(team: Team) {
  return Api.delete<TeamResponse>(`/teams/${team.id}/delete`).then(
    res => res.data
  )
}
