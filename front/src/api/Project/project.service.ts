import { Api } from '..'
import { Project } from '../../pages/ProjectPage/ProjectInterface'

interface ProjectResponse {
  project: Project
  message: string
}

export function addProject(project: Project) {
  return Api.post<ProjectResponse>('/projects/store', project).then(
    res => res.data
  )
}

interface ProjectsResponse {
  projectList: Project[]
  message: string
}

export function getProjects() {
  return Api.get<ProjectsResponse>(`/projects`).then(res => res.data)
}

export function getProject(projectId: string) {
  return Api.get<ProjectResponse>(`/projects/${projectId}/show`).then(
    res => res.data
  )
}

export function editProject(project: Project) {
  return Api.put(`/projects/${project.id}/update`, project).then(
    res => res.data
  )
}

export function deleteProject(project: Project) {
  return Api.delete<ProjectResponse>(`/projects/${project.id}/delete`).then(
    res => res.data
  )
}
