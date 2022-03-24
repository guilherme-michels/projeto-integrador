import { Routes as ReactRoutes, Route } from 'react-router-dom'
import { MenuPage, TaskPage, UserPage } from './pages';
import { AddTask } from './pages/TaskPage/AddTask/AddTask';
import { AddUser } from './pages/UserPage/AddUser/AddUser';

export function Routes() {
    return (
        <ReactRoutes>
            <Route path="/" element={<MenuPage />} />

            <Route path="user" element={<UserPage />} />
            <Route path="add-user" element={<AddUser />} />

            <Route path="tasks" element={<TaskPage />} />
            <Route path="add-task" element={<AddTask />} />
        </ReactRoutes>
    );
}
