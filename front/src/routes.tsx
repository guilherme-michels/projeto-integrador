import { Routes as ReactRoutes, Route } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import { MenuPage, UserPage } from './pages'
import { LoginForm } from './pages/LoginPage/LoginForm'
import { AddProject } from './pages/ProjectPage/AddProject/AddProject'
import { EditProject } from './pages/ProjectPage/EditProject/EditProject'
import { ProjectsPage } from './pages/ProjectPage/ProjectsPage'
import { ViewProject } from './pages/ProjectPage/ViewProject/ViewProject'
import { AddTask } from './pages/TaskPage/AddTask/AddTask'
import { EditTask } from './pages/TaskPage/EditTask/EditTask'

import { AddUser } from './pages/UserPage/AddUser/AddUser'
import { EditUser } from './pages/UserPage/EditUser/EditUser'

export function AppRoutes() {
  return (
    <ReactRoutes>
      <Route path="/" element={<MenuPage />} />

      <Route path="/tasker/user" element={<UserPage />} />

      <Route path="/tasker/add-user" element={<AddUser />} />

      <Route path="/tasker/editar-pessoa/:id" element={<EditUser />} />

      <Route path="/tasker/add-task/:projectId" element={<AddTask />} />

      <Route path="/tasker/editar-task/:id" element={<EditTask />} />

      <Route path="/tasker/projects" element={<ProjectsPage />} />

      <Route path="/tasker/project/:id" element={<ViewProject />} />

      <Route path="/tasker/add-project" element={<AddProject />} />

      <Route path="/tasker/editar-project/:id" element={<EditProject />} />
    </ReactRoutes>
  )
}

function AuthRoutes() {
  return (
    <ReactRoutes>
      <Route path="/" element={<LoginForm />} />
    </ReactRoutes>
  )
}

export function Routes() {
  const { user, loading } = useAuth()

  if (loading) return <span>Carregando...</span>
  if (!user) return <AuthRoutes />

  return <AppRoutes />
}
