import { Routes as ReactRoutes, Route } from 'react-router-dom'
import { MenuPage, UserPage } from './pages';

export function Routes() {
    return (
        <ReactRoutes>
            <Route path="/" element={<MenuPage />} />
            <Route path="user" element={<UserPage />} />
        </ReactRoutes>
    );
}
