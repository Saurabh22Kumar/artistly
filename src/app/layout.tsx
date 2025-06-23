// layout.tsx
// Root layout for the App Router. Wraps all pages with global providers, fonts, theming, and the Navbar.
// Handles dark/light mode, toast notifications, and context providers for authentication and submissions.

"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Breadcrumbs from "../components/Breadcrumbs";
import { useEffect, useState, createContext, useContext } from "react";
import { SubmissionProvider } from "../context/SubmissionContext";
import { AuthProvider } from "../context/AuthContext";
import Toast from "../components/ui/Toast";
import { Button } from "../components/ui/button";

// Font setup for consistent typography
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Toast context for global notifications
const ToastContext = createContext<{
  showToast: (msg: string, type?: "success" | "error" | "info") => void;
} | undefined>(undefined);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

// ToastProvider manages toast state and displays notifications
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

// RootLayout wraps all pages with providers, fonts, and theming
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Automatically set dark mode based on system preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", isDark);
    }
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground transition-colors duration-300`}
      >
        <ToastProvider>
          <AuthProvider>
            <SubmissionProvider>
              <Navbar />
              {/* Breadcrumbs navigation for all pages except home */}
              <Breadcrumbs />
              {children}
              {/* Theme toggle button, fixed in the corner */}
              <div className="fixed bottom-4 right-4 z-50">
                <ThemeToggle />
              </div>
            </SubmissionProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}

// ThemeToggle toggles dark/light mode for the app
function ThemeToggle() {
  // Toggle dark/light mode
  function toggleTheme() {
    document.documentElement.classList.toggle("dark");
  }
  return (
    <Button
      aria-label="Toggle dark mode"
      onClick={toggleTheme}
      className="rounded-full bg-card border shadow p-2 hover:bg-primary/10 transition-colors"
      variant="ghost"
      size="icon"
    >
      <span className="sr-only">Toggle dark mode</span>
      <svg
        className="w-6 h-6 text-primary"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.93l-.71-.71" />
      </svg>
    </Button>
  );
}
