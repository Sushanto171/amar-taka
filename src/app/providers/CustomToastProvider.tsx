import InfoIcon from "@/assets/icons/InfoIcon";
import { ToastContext } from "@/context/CustomToastContext";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useState, type ReactNode } from "react";

type Toast = {
  id: number;
  message: string;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);

    // auto remove after 10.05s
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 10050);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-5 right-5 space-y-3 z-50">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 80 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative flex items-center gap-3 bg-gray-900  p-3 rounded-xl shadow-lg overflow-hidden"
            >
              {/* Icon */}
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-yellow-500">
                <InfoIcon />
              </div>

              {/* Message */}
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <p className="text-sm whitespace-nowrap">{toast.message}</p>
              </motion.div>

              {/* Close */}
              <button
                onClick={() =>
                  setToasts((prev) => prev.filter((t) => t.id !== toast.id))
                }
                className="ml-2 p-1 rounded-full hover:bg-gray-700 transition"
              >
                <X size={16} />
              </button>

              {/* Progress bar */}
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 10, ease: "linear" }}
                className="absolute bottom-0 left-0 h-1 bg-yellow-500"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
