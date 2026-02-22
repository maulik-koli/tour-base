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
import SidebarNavLink from "../sidebar-nav-link";
import LogoutButton from "@module/admin/components/logout-btn";
import { Avatar, AvatarFallback, AvatarImage } from "@ui/avatar";

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


const AppSidebar: React.FC = () => {
    return (
       <Sidebar collapsible="icon">
            <SidebarHeader className="flex items-center justify-center">
                <Avatar className="h-15 w-30 rounded-sm">
                    <AvatarImage src="/logo.png" alt="Eklavya Tourism" />
                    <AvatarFallback 
                        className="rounded-lg bg-secondary-foreground/50 text-secondary flex ic justify-center"
                    >
                        LOGO
                    </AvatarFallback>
                </Avatar>
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