// Navbar.tsx
// Responsive, accessible navigation bar for Artistly.com.
// Includes links to all main pages, authentication actions, and a hamburger menu for mobile.
// Uses Auth and Toast context for login/logout and notifications.

"use client";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useToast } from "../app/layout";
import { Button } from "./ui/button";
import { useState } from "react";

export default function Navbar() {
  // Auth context for login/logout state
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const { showToast } = useToast();
  const [menuOpen, setMenuOpen] = useState(false);

  // Handle logout and show toast notification
  const handleLogout = () => {
    logout();
    showToast("Logged out successfully!", "success");
    router.push("/login");
  };

  return (
    <nav className="w-full flex flex-col sm:flex-row items-center justify-between py-3 px-3 sm:px-6 bg-white shadow-sm dark:bg-gray-950 dark:shadow-gray-900 gap-2 sm:gap-4" aria-label="Main navigation">
      <div className="flex w-full items-center justify-between">
        {/* Logo/Home link */}
        <Link href="/" className="text-xl font-bold tracking-tight text-primary" aria-label="Go to homepage">
          Artistly.com
        </Link>
        {/* Desktop nav links */}
        <div className="hidden sm:flex items-center gap-6 ml-8">
          <Link href="/artists" className="hover:underline underline-offset-4 text-center" aria-label="Browse artists">Artists</Link>
          <Link href="/onboard" className="hover:underline underline-offset-4 text-center" aria-label="Onboard a new artist">Onboard Artist</Link>
          <Link href="/dashboard" className="hover:underline underline-offset-4 text-center" aria-label="Manager dashboard">Dashboard</Link>
          <Link href="/artists-shortlist" className="hover:underline underline-offset-4 text-center" aria-label="Shortlist demo">Shortlist Demo</Link>
          {isAuthenticated ? (
            <Button
              onClick={handleLogout}
              aria-label="Logout"
              variant="secondary"
              size="sm"
              className="ml-2"
            >
              Logout
            </Button>
          ) : (
            <Link href="/login" className="hover:underline underline-offset-4 ml-2 text-center" aria-label="Login to your account">Sign In</Link>
          )}
        </div>
        {/* Hamburger menu for mobile */}
        <button
          className="sm:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Toggle navigation menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>
      </div>
      {/* Mobile nav links, shown when menuOpen is true */}
      <div
        className={`flex-col gap-2 items-center w-full sm:hidden ${menuOpen ? "flex" : "hidden"}`}
      >
        <Link href="/artists" className="hover:underline underline-offset-4 w-full text-center" aria-label="Browse artists">Artists</Link>
        <Link href="/onboard" className="hover:underline underline-offset-4 w-full text-center" aria-label="Onboard a new artist">Onboard Artist</Link>
        <Link href="/dashboard" className="hover:underline underline-offset-4 w-full text-center" aria-label="Manager dashboard">Dashboard</Link>
        <Link href="/artists-shortlist" className="hover:underline underline-offset-4 w-full text-center" aria-label="Shortlist demo">Shortlist Demo</Link>
        {isAuthenticated ? (
          <Button
            onClick={handleLogout}
            aria-label="Logout"
            variant="secondary"
            size="sm"
            className="w-full"
          >
            Logout
          </Button>
        ) : (
          <Link href="/login" className="hover:underline underline-offset-4 w-full text-center" aria-label="Login to your account">Sign In</Link>
        )}
      </div>
    </nav>
  );
}
