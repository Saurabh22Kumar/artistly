// artists-shortlist.tsx
// Demo page in the Pages Router to showcase getStaticProps and static generation in Next.js.
// This page allows users to shortlist artists and view all their details in a separate section.
// All data is loaded from local JSON and managed in local state. No backend is used.

import fs from "fs";
import path from "path";
import { useState } from "react";
import Head from "next/head";
import { Button } from "../src/components/ui/button";

// Artist type definition for type safety and clarity
interface Artist {
  id: number;
  name: string;
  category: string[];
  languages?: string[];
  feeRange?: string;
  location?: string;
  image?: string;
  bio?: string;
}

// getStaticProps: Loads artist data at build time from local JSON
// This is only available in the Pages Router, not the App Router
export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "public", "artists.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  return {
    props: {
      artists: data,
    },
  };
}

// Main component for the shortlist demo page
export default function ArtistsShortlistPage({ artists }: { artists: Artist[] }) {
  // Local state for the user's shortlist
  const [shortlist, setShortlist] = useState<Artist[]>([]);

  // Handles adding/removing an artist from the shortlist
  function handleShortlist(artist: Artist) {
    setShortlist((prev) =>
      prev.find((a) => a.id === artist.id)
        ? prev.filter((a) => a.id !== artist.id)
        : [...prev, artist]
    );
  }

  return (
    <>
      {/* SEO metadata for the page */}
      <Head>
        <title>Shortlist Artists | Artistly.com</title>
        <meta name="description" content="Shortlist your favorite artists on Artistly.com" />
      </Head>
      <main className="min-h-[80vh] bg-background text-foreground flex flex-col items-center justify-center px-2 py-8">
        <section className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-950 rounded-2xl shadow-lg p-4 sm:p-8 border border-gray-200 dark:border-gray-800">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 text-primary text-center tracking-tight">Shortlist Artists</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8 text-center text-base sm:text-lg">
            Browse and shortlist your favorite artists. This page demonstrates static generation with
            <span className="font-semibold text-primary"> getStaticProps</span>.
          </p>
          {/* Main artist list with all details and shortlist button */}
          <ul className="space-y-4">
            {artists.map((artist) => (
              <li
                key={artist.id}
                className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-gray-50 dark:bg-gray-900 transition-colors w-full"
              >
                <div className="flex flex-col items-center sm:items-start w-full">
                  <img src={artist.image} alt={artist.name} className="w-16 h-16 rounded-full object-cover mb-2" />
                  <div className="font-semibold text-lg text-primary mb-1">{artist.name}</div>
                  <div className="text-xs text-gray-500 mb-1">{artist.category && artist.category.join(", ")}</div>
                  <div className="text-xs text-gray-500 mb-1">{artist.languages && artist.languages.join(", ")}</div>
                  <div className="text-xs text-gray-500 mb-1">{artist.location}</div>
                  <div className="text-xs text-gray-500 mb-1">{artist.feeRange}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-300 mb-1">{artist.bio}</div>
                </div>
                {/* Button to add/remove from shortlist */}
                <Button
                  variant={shortlist.find((a) => a.id === artist.id) ? "secondary" : "outline"}
                  size="sm"
                  className="px-4 py-2 text-xs w-full sm:w-auto"
                  aria-pressed={!!shortlist.find((a) => a.id === artist.id)}
                  onClick={() => handleShortlist(artist)}
                >
                  {shortlist.find((a) => a.id === artist.id) ? "Shortlisted" : "Shortlist"}
                </Button>
              </li>
            ))}
          </ul>
          <hr className="my-10 border-gray-200 dark:border-gray-800" />
          {/* Shortlist section with all artist details and remove button */}
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-2 text-center text-primary">Your Shortlist</h2>
            {shortlist.length === 0 ? (
              <div className="text-gray-400 text-center">No artists shortlisted yet.</div>
            ) : (
              <ul className="flex flex-col gap-4 items-center w-full">
                {shortlist.map((artist) => (
                  <li key={artist.id} className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 w-full bg-gray-50 dark:bg-gray-900 flex flex-col sm:flex-row items-center justify-between gap-3 transition-colors">
                    <div className="flex flex-col items-center sm:items-start w-full">
                      <img src={artist.image} alt={artist.name} className="w-16 h-16 rounded-full object-cover mb-2" />
                      <div className="font-semibold text-lg text-primary mb-1">{artist.name}</div>
                      <div className="text-xs text-gray-500 mb-1">{artist.category && artist.category.join(", ")}</div>
                      <div className="text-xs text-gray-500 mb-1">{artist.languages && artist.languages.join(", ")}</div>
                      <div className="text-xs text-gray-500 mb-1">{artist.location}</div>
                      <div className="text-xs text-gray-500 mb-1">{artist.feeRange}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-300 mb-1">{artist.bio}</div>
                    </div>
                    {/* Button to remove from shortlist */}
                    <Button
                      variant="destructive"
                      size="sm"
                      className="px-4 py-2 text-xs w-full sm:w-auto"
                      aria-label={`Remove ${artist.name} from shortlist`}
                      onClick={() => setShortlist((prev) => prev.filter((a) => a.id !== artist.id))}
                    >
                      Remove
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
