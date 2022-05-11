import { Routes as ReactRoutes, Route } from "react-router-dom"
import { useAuth } from './context/AuthContext';
import { MenuPage, TaskPage, UserPage } from './pages';
import { LoginForm } from "./pages/LoginPage/LoginForm";
import { AddTask } from './pages/TaskPage/AddTask/AddTask';
import { EditTask } from './pages/TaskPage/EditTask/EditTask';
import { AddUser } from './pages/UserPage/AddUser/AddUser';
import { EditUser } from './pages/UserPage/EditUser/EditUser';

export function AppRoutes() {
    return (
        <ReactRoutes>
            <Route path="/" element={<MenuPage />} />

            <Route path="/tasker/user" element={<UserPage />} />

            <Route path="/tasker/add-user" element={<AddUser />} />

            <Route path="/tasker/editar-pessoa/:id" element={<EditUser />} />

            <Route path="/tasker/tasks" element={<TaskPage />} />

            <Route path="/tasker/add-task" element={<AddTask />} />

            <Route path="/tasker/editar-task/:id" element={<EditTask />} />
        </ReactRoutes>
    );
}

function AuthRoutes() {
    return (
        <ReactRoutes>
            <Route path="/" element={<LoginForm />} />
        </ReactRoutes>
    )
}

export function Routes() {
    const { user, loading } = useAuth();

    if (loading) return <span>Carregando...</span>
    if (!user) return <AuthRoutes />

    return <AppRoutes />
}

