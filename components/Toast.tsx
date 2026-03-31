"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface ToastData {
  id: number;
  message: string;
  type: "success" | "error" | "info";
}

interface ToastContextValue {
  showToast: (message: string, type?: "success" | "error" | "info") => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

let toastId = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const showToast = useCallback(
    (message: string, type: "success" | "error" | "info" = "success") => {
      const id = ++toastId;
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 2800);
    },
    []
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast container */}
      <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-[300] flex flex-col gap-2 items-center pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto px-5 py-3 rounded-xl text-[13px] font-medium shadow-lg backdrop-blur-md animate-toast-in ${
              toast.type === "success"
                ? "bg-black/90 text-white"
                : toast.type === "error"
                ? "bg-red-600/90 text-white"
                : "bg-white/90 text-black border border-gray-200"
            }`}
          >
            {toast.type === "success" && (
              <span className="mr-1.5">✓</span>
            )}
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
