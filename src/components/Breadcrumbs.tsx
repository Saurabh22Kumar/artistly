// Breadcrumbs.tsx
// Accessible breadcrumbs navigation for App Router pages.

"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Breadcrumbs() {
  const pathname = usePathname() || "/";
  // Split the path and filter out empty segments
  const segments = pathname.split("/").filter(Boolean);

  // Build the breadcrumb links
  const crumbs = [
    { name: "Home", href: "/" },
    ...segments.map((seg, idx) => {
      const href = "/" + segments.slice(0, idx + 1).join("/");
      // Capitalize and replace dashes/underscores for readability
      const label = seg.replace(/[-_]/g, " ").replace(/\b\w/g, c => c.toUpperCase());
      return { name: label, href };
    })
  ];

  // Don't show breadcrumbs on the homepage
  if (pathname === "/") return null;

  return (
    <nav aria-label="Breadcrumb" className="w-full px-4 py-2 text-sm">
      <ol className="flex flex-wrap gap-1 text-muted-foreground">
        {crumbs.map((crumb, i) => (
          <li key={crumb.href} className="flex items-center">
            {i > 0 && <span className="mx-1">/</span>}
            {i === crumbs.length - 1 ? (
              <span aria-current="page" className="font-medium text-foreground">{crumb.name}</span>
            ) : (
              <Link href={crumb.href} className="hover:underline focus:outline-none focus:underline">
                {crumb.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
// Handles null pathname by defaulting to "/" for SSR safety.
