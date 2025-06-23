import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <h1 className="text-6xl font-extrabold text-primary mb-4 drop-shadow">404</h1>
      <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
      <p className="mb-6 text-gray-500 dark:text-gray-400 text-center max-w-md">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Button
        asChild
        variant="secondary"
        className="px-6 py-2 rounded-lg font-semibold shadow w-auto"
      >
        <Link href="/" aria-label="Go back to homepage">
          Go to Homepage
        </Link>
      </Button>
    </main>
  );
}
