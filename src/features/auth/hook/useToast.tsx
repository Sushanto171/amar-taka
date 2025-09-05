import { ToastContext } from "@/context/CustomToastContext";
import { useContext } from "react";

// Custom hook to use the toast
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};