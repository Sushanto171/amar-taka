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
import Homepage from "../../features/public/pages/Homepage";
import UnAuthorized from "../../features/public/pages/UnAuthorized";
import App from "../App";

//lazy import (public route)
const About = lazy(() => import("../../features/public/pages/About"));
const Service = lazy(() => import("../../features/public/pages/Service"));
const FAQ = lazy(() => import("@/features/public/pages/FAQ"));
const Contact = lazy(()=>import("@/features/public/pages/Contact"))
const Features = lazy(()=>import("@/features/public/pages/Features"))
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
      {
        Component: () => (
          <Suspense fallback={<LoadingSpinner />}>
            <Features />
          </Suspense>
        ),
        path: "/features",
      },
      {
        Component: () => (
          <Suspense fallback={<LoadingSpinner />}>
            <Contact />
          </Suspense>
        ),
        path: "/contact",
      },
      {
        Component: () => (
          <Suspense fallback={<LoadingSpinner />}>
            <FAQ />
          </Suspense>
        ),
        path: "/faq",
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
