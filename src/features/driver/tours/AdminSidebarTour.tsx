import { tourKey } from "@/constant/tourKey";
import { driver } from "driver.js";
import { useEffect } from "react";

export default function AdminSidebarTour() {
  useEffect(() => {
    const driverTour = driver({
      animate: true,
      showProgress: true,
      showButtons: ["next", "previous", "close"],
      popoverClass: "driver-popover customDriverTheme",
      onDestroyed: () => {
        localStorage.setItem(tourKey.admin, "true");
      },
      steps: [
        {
          element: "#dashboard-route",
          popover: {
            title: "Analytics",
            description: "Here you can see dashboard analytics.",
          },
        },
        {
          element: "#users-route",
          popover: {
            title: "Users",
            description: "Manage all users from this section.",
          },
        },
        {
          element: "#agents-route",
          popover: {
            title: "Agents",
            description:
              "Handle new agent applications and manage all existing agents from this section.",
          },
        },
        {
          element: "#transactions-route",
          popover: {
            title: "Transactions",
            description: "View and manage all transactions.",
          },
        },
        {
          element: "#auditLogs-route",
          popover: {
            title: "Audit Logs",
            description: "Keep track of all activity logs.",
          },
        },
        {
          element: "#activities-route",
          popover: {
            title: "Activities",
            description: "View  activities for system.",
          },
        },
        {
          element: "#profile-route",
          popover: {
            title: "Profile",
            description: "Edit your profile settings.",
          },
        },
        {
          element: "#systemSettings-route",
          popover: {
            title: "System Settings",
            description: "Configure system-wide settings.",
          },
        },
      ],
    });

    if (!localStorage.getItem("adminSidebarTourCompleted")) {
      driverTour.drive();
    }
  }, []);

  return null;
}
