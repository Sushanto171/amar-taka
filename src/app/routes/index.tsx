import Login from "@/features/auth/page/Login";
import Register from "@/features/auth/page/Register";
import Verify from "@/features/auth/page/Verify";

import { generateRoute } from "@/utils/generateRoute";

import LoadingSpinner from "@/components/Loading";
import { AdminSidebarItems } from "@/features/admin/components/AdminSidebarItems";
import UserByTransactions from "@/features/admin/page/UserByTransactions";
import { AgentSidebarItems } from "@/features/agent/components/AgentSidebarItems";
import { UserSidebarItems } from "@/features/user/components/UserSidebarItem";
import { withAuth } from "@/utils/withAuth";
import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import DashboardLayout from "../../features/dashboard/layout/DashboardLayout";
import App from "../App";
import Homepage from "../pages/Homepage";
import UnAuthorized from "../pages/UnAuthorized";

//lazy import (public route)
const About = lazy(() => import("../pages/About"));
const Service = lazy(() => import("../pages/Service"));

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: Homepage,
        index: true,
      },
      {
        Component: () => (
          <Suspense fallback={<LoadingSpinner />}>
            <About />
          </Suspense>
        ),
        path: "/about",
      },
      {
        Component: () => (
          <Suspense fallback={<LoadingSpinner />}>
            <Service />
          </Suspense>
        ),
        path: "/service",
      },
    ],
  },
  {
    Component: Login,
    path: "/login",
  },
  {
    Component: Register,
    path: "/register",
  },
  {
    Component: Verify,
    path: "/verify",
  },
  {
    Component: UnAuthorized,
    path: "/unauthorized",
  },
  {
    Component: withAuth(DashboardLayout, "ADMIN"),
    path: "/admin",
    children: [
      {
        index: true,
        element: <Navigate to="/admin/analytics" />,
      },
      ...generateRoute(AdminSidebarItems),
      {
        Component: UserByTransactions,
        path: "/admin/users/transactions/:phone",
      },
    ],
  },
  {
    Component: withAuth(DashboardLayout, "AGENT"),
    path: "/agent",
    children: [
      {
        index: true,
        element: <Navigate to="/agent/analytics" />,
      },
      ...generateRoute(AgentSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, "USER"),
    path: "/user",
    children: [
      { index: true, element: <Navigate to="/user/my-wallet" /> },
      ...generateRoute(UserSidebarItems),
    ],
  },
]);
