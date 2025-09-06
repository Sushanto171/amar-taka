import { createContext } from "react";

type ToastContextType = {
  showToast: (message: string) => void;
};

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);
