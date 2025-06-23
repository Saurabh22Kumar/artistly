import "@/app/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { SubmissionProvider } from "@/context/SubmissionContext";
import { AuthProvider } from "@/context/AuthContext";
import Toast from "@/components/ui/Toast";
import { Geist, Geist_Mono } from "next/font/google";
import { useState, createContext, useContext } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ToastContext = createContext<{
  showToast: (msg: string, type?: "success" | "error" | "info") => void;
} | undefined>(undefined);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);
  function showToast(message: string, type: "success" | "error" | "info" = "success") {
    setToast({ message, type });
  }
  function handleClose() {
    setToast(null);
  }
  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && <Toast message={toast.message} type={toast.type} onClose={handleClose} />}
    </ToastContext.Provider>
  );
}

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", isDark);
    }
  }, []);
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground transition-colors duration-300`}>
      <ToastProvider>
        <AuthProvider>
          <SubmissionProvider>
            <Component {...pageProps} />
          </SubmissionProvider>
        </AuthProvider>
      </ToastProvider>
    </div>
  );
}
