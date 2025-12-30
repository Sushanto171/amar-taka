"use client";

import LoadingSpinner from "@/components/Loading";
import { role } from "@/constant/role";
import { useGetMeQuery } from "@/redux/features/user/user.api";
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router";

interface GuestGuardProps {
  children: ReactNode;
}

export default function GuestGuard({
  children,
}: GuestGuardProps) {
  const { data: user, isLoading } = useGetMeQuery(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && user) {
      // Redirect logged-in users to their dashboard
      let defaultDashboard = "/user";
      if (user.role === role.admin) defaultDashboard = "/admin";
      else if (user.role === role.agent) defaultDashboard = "/agent";

      navigate(defaultDashboard, { replace: true });
    }
  }, [user, isLoading, navigate]);

  if (isLoading) return <LoadingSpinner />;

  // Only render children if user is not logged in
  if (user) return null;

  return <>{children}</>;
}
