import { store } from "@/redux/store.ts";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { RouterProvider } from "react-router";
import { Toaster } from "sonner";
import "../index.css";
import { ToastProvider } from "./providers/CustomToastProvider.tsx";
import { ThemeProvider } from "./providers/ThemeProvider.tsx";
import { router } from "./routes/index.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <ToastProvider>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
          <Toaster richColors={true} />
        </ThemeProvider>
      </ToastProvider>
    </ReduxProvider>
  </StrictMode>
);
