import Login from "@/features/auth/page/Login";
import Register from "@/features/auth/page/Register";
import Verify from "@/features/auth/page/Verify";
import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import App from "../App";
import Homepage from "../pages/Homepage";

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
]);
