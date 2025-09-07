import type { ComponentType } from "react";

export interface IResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export type TRole = "ADMIN" | "AGENT" | "USER";

export interface ISidebarItems {
  title: string;
  url: string;
  items: {
    title: string;
    url: string;
    Component: ComponentType;
  }[];
}
