import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import UserDropdown from "@/components/UserDropDown";
import { role } from "@/constant/role";
import AdminSidebarTour from "@/features/driver/tours/AdminSidebarTour";
import AgentSidebarTour from "@/features/driver/tours/AgentSidebarTour";
import UserSidebarTour from "@/features/driver/tours/UserSidebarTour";
import { useGetMeQuery } from "@/redux/features/user/user.api";
import { Outlet, useLocation } from "react-router";

export default function DashboardLayout() {
  const { data: me } = useGetMeQuery(undefined);
  const { pathname } = useLocation();
  const menus = pathname.split("/");

  return (
  <SidebarProvider>
  {me && me.role === role.admin && <AdminSidebarTour />}
  {me && me.role === role.agent && <AgentSidebarTour />}
  {me && me.role === role.user && <UserSidebarTour />}

  <div className="flex w-full h-screen overflow-hidden">
    <AppSidebar />

    {/* Main content area */}
    <SidebarInset className="flex flex-col flex-1 w-full overflow-hidden">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 sticky top-0 bg-background z-50">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">{menus[1]}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>{menus[2]}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex-1 flex justify-end items-center gap-4 w-full">
          <UserDropdown user={me!} />
        </div>
      </header>

      {/* Scrollable content */}
      <div className="flex-1 overflow-auto p-4">
        <Outlet />
      </div>
    </SidebarInset>
  </div>
</SidebarProvider>

  );
}
