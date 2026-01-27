import React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { IconName } from "@/components/icons"
import NavUser from "../nav-user"
import SidebarNavLink from "../sidebar-nav-link";
import LogoutButton from "@module/admin/components/logout-btn";

export type SideBarItem = {
    title: string;
    url: string;
    icon: IconName;
}

const items: SideBarItem[] = [
    {
        title: "Dashboard",
        url: "/",
        icon: "LayoutDashboard",
    },
    {
        title: "Tours",
        url: "/tours",
        icon: "TramFront",
    },
    {
        title: "Bookings",
        url: "/bookings",
        icon: "TicketCheck",
    },
    {
        title: "Activities",
        url: "/activities",
        icon: "Calendar",
    },
    {
        title: "Reviews",
        url: "/reviews",
        icon: "SquareStar",
    },
    {
        title: "Requests",
        url: "/requests",
        icon: "BadgeQuestionMark",
    }
]

const USER = {
    name: "user name",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
}


const AppSidebar: React.FC = () => {
    return (
       <Sidebar collapsible="icon">
            <SidebarHeader>
                <div className="bg-blue-900 flex items-center justify-center p-4 rounde-xl text-primary-foreground">Logo</div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                        {items.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild >
                                    <SidebarNavLink item={item} />
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <LogoutButton />
            </SidebarFooter>
        </Sidebar>
    )
}

export default AppSidebar;