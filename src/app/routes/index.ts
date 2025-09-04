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
]);
