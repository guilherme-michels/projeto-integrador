import { Routes as ReactRoutes, Route } from 'react-router-dom'
import { MenuPage, TaskPage, UserPage } from './pages';
import { AddTask } from './pages/TaskPage/AddTask/AddTask';
import { EditTask } from './pages/TaskPage/EditTask/EditTask';
import { AddUser } from './pages/UserPage/AddUser/AddUser';
import { EditUser } from './pages/UserPage/EditUser/EditUser';

export function Routes() {
    return (
        <ReactRoutes>
            <Route path="/" element={<MenuPage />} />

            <Route path="user" element={<UserPage />} />
            <Route path="add-user" element={<AddUser />} />
            <Route path="/editar-pessoa/:id" element={<EditUser />} />

            <Route path="tasks" element={<TaskPage />} />
            <Route path="add-task" element={<AddTask />} />
            <Route path="/editar-task/:id" element={<EditTask />} />
        </ReactRoutes>
    );
}
