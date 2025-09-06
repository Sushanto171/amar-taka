import Login from "@/features/auth/page/Login";
import Register from "@/features/auth/page/Register";
import Verify from "@/features/auth/page/Verify";

import { generateRoute } from "@/utils/generateRoute";

import { UserSidebarItems } from "@/utils/UserSidebarItem";
import { withAuth } from "@/utils/withAuth";
import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import App from "../App";
import DashboardLayout from "../layout/DashboardLayout";
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
        Component: About,
        path: "/about",
      },
      {
        Component: Service,
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
  },
  {
    Component: withAuth(DashboardLayout, "AGENT"),
    path: "/agent",
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
