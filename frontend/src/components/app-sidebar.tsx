import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Search,
  Brain,
  UserRound,
  User2,
  ChevronsUpDown,
  LogOut,
  Settings,
  Calendar,
  ChevronRight,
  Headset,
} from "lucide-react";
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
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Logo from "./logo/logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";

// Main menu items (NO settings here)
const items = [
  {
    title: "Overview",
    url: "/overview",
    icon: LayoutDashboard,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: UserRound,
  },
  {
    title: "Calendar",
    url: "/calendar",
    icon: Calendar,
  },
  {
    title: "Meetings",
    url: "/meetings",
    icon: Headset,
  },
  {
    title: "Skills",
    url: "/skills",
    icon: Brain,
  },
  {
    title: "Find people",
    url: "/find-people",
    icon: Search,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="lg:border-r-0!">
      {/* Header */}
      <SidebarHeader className="md:p-3.5">
        <SidebarMenu>
          <SidebarMenuItem>
            <Logo />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <NavLink to={item.url} end>
                    {({ isActive }) => (
                      <SidebarMenuButton isActive={isActive}>
                        <span className="flex items-center gap-3">
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </span>
                      </SidebarMenuButton>
                    )}
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>

            {/* Settings collapsible */}
            <SidebarMenu>
              <Collapsible className="group/settings">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="flex items-center gap-3">
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                      <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/settings:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="ml-3">
                    <SidebarMenuSub className="text-muted-foreground">
                      <SidebarMenuSubItem>
                        <NavLink to="/account">
                          {({ isActive }) => (
                            <SidebarMenuButton isActive={isActive}>Account</SidebarMenuButton>
                          )}
                        </NavLink>
                      </SidebarMenuSubItem>

                      <SidebarMenuSubItem>
                        <NavLink to="/advanced">
                          {({ isActive }) => (
                            <SidebarMenuButton isActive={isActive}>Advanced</SidebarMenuButton>
                          )}
                        </NavLink>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 className="h-4 w-4" />
                  <span>Username</span>
                  <ChevronsUpDown className="ml-auto h-4 w-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-60">
                <DropdownMenuItem className="flex gap-2 text-destructive">
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
