import { useEffect } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type = "success", onClose, duration = 2500 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div
      className={`fixed top-6 right-6 z-[100] px-4 py-2 rounded shadow-lg text-white font-semibold transition-all animate-fade-in-up
        ${type === "success" ? "bg-green-600" : type === "error" ? "bg-red-600" : "bg-gray-800"}`}
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  );
}
