import { role } from "@/constant/role";
import { AdminSidebarItems } from "@/features/admin/components/AdminSidebarItems";
import { AgentSidebarItems } from "@/features/agent/components/AgentSidebarItems";
import { UserSidebarItems } from "@/features/user/components/UserSidebarItem";
import type { TRole } from "@/types/global.types";

export const getSidebarItems = (userRole: TRole) => {
  switch (userRole) {
    case role.user:
      return UserSidebarItems;
    case role.agent:
      return AgentSidebarItems;
    case role.admin:
      return AdminSidebarItems;
    default:
      return [];
  }
};
