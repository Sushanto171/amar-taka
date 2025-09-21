import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useEffect } from "react";

export default function ProfileTour() {
  useEffect(() => {
    const tour = driver({
      animate: true,
      showProgress: true,
      showButtons:["next","close"],
      onDestroyed: () => {
        localStorage.setItem("profileTourCompleted", "true");
      },
      popoverClass: "customDriverTheme",
      steps: [
        {
          element: "#overview-tab", // overview trigger
          popover: {
            title: "Overview Tab",
            description: "Here you can see a quick summary of your account.",
          },
        },
        {
          element: "#transactions-tab", // transactions trigger
          popover: {
            title: "Transactions Tab",
            description: "Check your recent transactions here.",
          },
        },
        {
          element: "#security-tab", // security trigger
          popover: {
            title: "Security Tab",
            description:
              "Manage your password, 2FA, and other security settings.",
          },
        },
        {
          element: "#settings-tab", // settings trigger
          popover: {
            title: "Settings Tab",
            description: "Restart Tour Guide",
          },
        },
      ],
    });

    if (!localStorage.getItem("profileTourCompleted")) {
      tour.drive();
    }
  }, []);

  return null;
}
