import { driver } from "driver.js";
import { useEffect } from "react";
import "../styles/customDriver.css";
import { tourKey } from "@/constant/tourKey";
export default function ThemeTour() {
  useEffect(() => {
    const driverObj = driver({
      animate: false,
      showProgress: false,
      showButtons: ["next", "close"],
      onDestroyed: () => {
        localStorage.setItem(tourKey.theme, "true");
      },
      popoverClass: "customDriverTheme",
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
