"use client";

import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useEffect } from "react";

export default function UserSidebarTour() {
  useEffect(() => {
    const driverTour = driver({
      animate: true,
      showProgress: true,
      showButtons: ["next", "previous", "close"],

      popoverClass: "driver-popover customDriverTheme",
      onDestroyed: () => {
        localStorage.setItem("userSidebarTourCompleted", "true");
      },
      steps: [
        {
          element: "#wallet-route",
          popover: {
            title: "Wallet",
            description: "View your wallet balance and manage funds here.",
          },
        },
        {
          element: "#transactions-route",
          popover: {
            title: "Transactions",
            description: "Check all your transactions in one place.",
          },
        },
        {
          element: "#billPay-route",
          popover: {
            title: "Bill Pay",
            description: "Pay your bills quickly and securely.",
          },
        },
        {
          element: "#profile-route",
          popover: {
            title: "Profile",
            description: "Update your profile information and settings.",
          },
        },
        {
          element: "#activities-route",
          popover: {
            title: "Activities",
            description: "Review your recent activities and actions.",
          },
        },
        {
          element: "#apply-agent-route",
          popover: {
            title: "Apply for Agent",
            description: "Submit your application to become an agent.",
          },
        },
      ],
    });

    if (!localStorage.getItem("userSidebarTourCompleted")) {
      driverTour.drive();
    }
  }, []);

  return null;
}
