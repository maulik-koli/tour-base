import { LayoutDashboard, TicketCheck, TramFront } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavUser } from "../nav-user"

const items = [
  {
    title: "Dashboard",
    url: "#",
    icon: LayoutDashboard,
  },
  {
    title: "Tours",
    url: "#",
    icon: TramFront,
  },
  {
    title: "Tickets",
    url: "#",
    icon: TicketCheck,
  },
]

const USER = {
    name: "user name",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
}

 
export function AppSidebar() {
    return (
       <Sidebar collapsible="icon">
            <SidebarHeader>
                <div className="bg-blue-200 flex items-center justify-center p-4">Logo</div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                        {items.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild>
                                    <a href={item.url}>
                                    <item.icon />
                                    <span>{item.title}</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={USER} />
            </SidebarFooter>
        </Sidebar>
    )
}