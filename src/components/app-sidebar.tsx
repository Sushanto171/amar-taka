import { ChevronRight, Wallet } from "lucide-react";
import * as React from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import { useGetMeQuery } from "@/redux/features/user/user.api";
import { TRole } from "@/types/global.types";
import { getSidebarItems } from "@/utils/getSidebarItems";
import { Link, useLocation } from "react-router";
import Logout from "../features/auth/components/Logout";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userData } = useGetMeQuery(undefined);
  const { pathname } = useLocation();

  const navData = getSidebarItems(userData?.role || "user" as TRole);

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-4 px-4 py-3">
          <Link className="flex items-center gap-2 group w-fit" to="/">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-[#111813]">
              <Wallet className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight hover:text-primary transition-colors">Amar Taka</span>
          </Link>
        </div>
      </SidebarHeader>

      <SidebarContent className="gap-0">
        {navData.map((group) => (
          <Collapsible key={group.title} defaultOpen className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-2">
                  <span>{group.title}</span>
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>

              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => {
                      const isActive = pathname === item.url;
                      return (
                        <SidebarMenuItem key={item.url}>
                          <SidebarMenuButton
                            asChild
                            className={`flex items-center gap-2 px-4 py-2 rounded ${isActive
                              ? "bg-accent/10 font-bold text-primary border border-accent"
                              : "hover:bg-accent/10 hover:text-primary hover:border-accent/50 hover:border"
                              }`}
                          >
                            <Link to={item.url}>
                              {item.icon && <span className="w-5 h-5 inline-block">{item.icon}</span>}
                              <span>{item.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>

      <SidebarRail />

      <div className="p-4">
        <Logout width="full" />
      </div>
    </Sidebar>
  );
}
