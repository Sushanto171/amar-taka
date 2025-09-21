import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useEffect } from "react";

export default function ThemeTour() {
  useEffect(() => {
    const driverObj = driver({
      animate: false,
      showProgress: false,
      showButtons: ["next", "close"],
      onDestroyed: () => {
        localStorage.setItem("Theme-toggle-completed", "true");
      },
      steps: [
        {
          element: "#theme-toggle",
          popover: {
            title: "Theme Toggle 🌗",
            description: "Click here to switch between Light and Dark mode.",
          },
        },
      ],
    });
    if (!localStorage.getItem("Theme-toggle-completed")) {
      driverObj.drive();
    }
  }, []);

  return null;
}
