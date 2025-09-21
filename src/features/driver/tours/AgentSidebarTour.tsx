"use client";

import { tourKey } from "@/constant/tourKey";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useEffect } from "react";

export default function AgentSidebarTour() {
  useEffect(() => {
    const driverTour = driver({
      animate: true,
      showProgress: true,
      showButtons: ["next", "previous", "close"],

      popoverClass: "driver-popover customDriverTheme",
      onDestroyed: () => {
        localStorage.setItem(tourKey.agent, "true");
      },
      steps: [
        {
          element: "#agent-analytics-route",
          popover: {
            title: "Analytics",
            description: "View your analytics dashboard and performance stats.",
          },
        },
        {
          element: "#agent-wallet-route",
          popover: {
            title: "Wallet",
            description: "Check your wallet balance and manage funds here.",
          },
        },
        {
          element: "#agent-transactions-route",
          popover: {
            title: "Transactions",
            description: "Review all your transactions at a glance.",
          },
        },
        {
          element: "#agent-commission-route",
          popover: {
            title: "Commission",
            description: "Track your commissions and earnings.",
          },
        },
        {
          element: "#agent-profile-route",
          popover: {
            title: "Profile",
            description: "Update your profile information and settings.",
          },
        },
        {
          element: "#agent-activities-route",
          popover: {
            title: "Activities",
            description: "Monitor your recent activities and actions.",
          },
        },
      ],
    });

    if (!localStorage.getItem("agentSidebarTourCompleted")) {
      driverTour.drive();
    }
  }, []);

  return null;
}
