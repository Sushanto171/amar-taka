import LoadingSpinner from "@/components/Loading";
import { useGetMeQuery } from "@/redux/features/user/user.api";

import type { TRole } from "@/types/global.types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

export const withAuth = (Component: ComponentType, requiredRole?: TRole) => {
  return function AuthWrapper() {
    const { data, isLoading } = useGetMeQuery(undefined);
    if (isLoading) {
      return <LoadingSpinner />;
    }
    if (!data) {
      return <Navigate to="/login" />;
    }
    if (requiredRole && data.role !== requiredRole) {
      console.log(data.role);
      return <Navigate to="/unauthorized" />;
    }

    return <Component />;
  };
};
