"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../../components/ui/button";

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Redirect authenticated users away from the login page
  useEffect(() => {
    if (isAuthenticated) {
      // If already logged in, redirect to dashboard
      router.replace("/dashboard");
    }
  }, [isAuthenticated, router]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (login(email, password)) {
      router.push("/dashboard");
    } else {
      setError("Invalid credentials");
    }
  }

  // Optionally, show a loading or redirecting state if already authenticated
  if (isAuthenticated) {
    return (
      <main className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-10">
        <div className="text-lg text-primary">Redirecting...</div>
      </main>
    );
  }

  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-10">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-950 rounded-xl shadow p-8 w-full max-w-sm flex flex-col gap-4 border border-gray-100 dark:border-gray-800">
        <h1 className="text-2xl font-bold mb-2 text-primary">Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border rounded p-2 w-full"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border rounded p-2 w-full"
          required
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <Button type="submit" className="w-full mt-2" variant="secondary">
          Login
        </Button>
      </form>
    </main>
  );
}

// ---
// Auth guard: This page uses useEffect to redirect authenticated users away from /login.
// See README for documentation of this behavior.
