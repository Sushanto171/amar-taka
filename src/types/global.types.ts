import type { ComponentType, ReactElement, ReactNode } from "react";

export interface IResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export type TRole = "ADMIN" | "AGENT" | "USER";

export interface ISidebarItems {
  title: string;
  url: string;
  items: {
    title: string | ReactElement;
    url: string;
    icon: ReactNode,
    Component: ComponentType;
  }[];
}
