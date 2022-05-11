import { PropsWithChildren } from "react";
import { Sidebar } from '../components/Sidebar/Sidebar'

export function SidebarHeaderTeamplate({ children }: PropsWithChildren<unknown>) {
    return (
        <Sidebar>
            {children}
        </Sidebar>
    )
}
