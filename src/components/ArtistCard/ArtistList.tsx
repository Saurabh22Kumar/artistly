/**
 * ArtistList Component
 * Renders a responsive, animated grid of artist cards with filter support.
 * Fetches artist data from local JSON and applies filters from context.
 * Shows skeleton while loading and a friendly message if no results.
 *
 * Accessibility: Uses ARIA roles/labels for screen readers.
 * UI Polish: Adds hover/transition effects and smooth empty state animation.
 */
"use client";
import { useState, useEffect } from "react";
import ArtistCard from "./ArtistCard";
import ArtistListSkeleton from "./ArtistListSkeleton";
import { useArtistFilter } from "../../context/ArtistFilterContext";
import { motion, AnimatePresence } from "framer-motion";

export interface Artist {
  id: number;
  name: string;
  bio: string;
  category: string[];
  languages: string[];
  feeRange: string;
  location: string;
  image: string;
}

export default function ArtistList() {
  // State for all artists and loading status
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  // Get current filters from context
  const { filters } = useArtistFilter();

  // Fetch artist data from local JSON on mount
  useEffect(() => {
    fetch("/artists.json")
      .then((res) => res.json())
      .then(setArtists)
      .finally(() => setLoading(false));
  }, []);

  // Filter artists based on selected filters
  const filtered = artists.filter((artist) => {
    const matchCategory = !filters.category || artist.category.includes(filters.category);
    const matchLocation = !filters.location || artist.location === filters.location;
    const matchFee = !filters.feeRange || artist.feeRange === filters.feeRange;
    return matchCategory && matchLocation && matchFee;
  });

  // Show skeleton while loading
  if (loading) return <ArtistListSkeleton />;

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
      role="list"
      aria-label="Artist list"
    >
      <AnimatePresence>
        {/* Render filtered artist cards with animation and hover polish */}
        {filtered.map((artist) => (
          <motion.div
            key={artist.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.35, type: "spring", stiffness: 60 }}
            whileHover={{ scale: 1.03, boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}
            className="focus-within:ring-2 focus-within:ring-primary rounded-xl transition-shadow"
          >
            {/*
              ArtistCard handles image alt text for SEO/accessibility.
              tabIndex/aria-label for keyboard navigation and screen readers.
            */}
            <ArtistCard artist={artist} tabIndex={0} aria-label={`View details for ${artist.name}`} />
          </motion.div>
        ))}
      </AnimatePresence>
      {/* Empty state with fade-in animation */}
      {filtered.length === 0 && (
        <motion.div
          className="col-span-full text-center text-gray-500"
          role="status"
          aria-live="polite"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          No artists found.
        </motion.div>
      )}
    </div>
  );
}
