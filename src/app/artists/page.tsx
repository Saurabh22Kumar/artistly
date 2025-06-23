import { Suspense } from "react";
import { ArtistFilterProvider } from "../../context/ArtistFilterContext";
import ArtistList from "../../components/ArtistCard/ArtistList";
import FilterBlock from "../../components/FilterBlock/FilterBlock";

export default function ArtistsPage() {
  return (
    <ArtistFilterProvider>
      <main className="max-w-7xl mx-auto px-2 sm:px-4 py-6 sm:py-10">
        <h1 className="text-2xl md:text-4xl font-extrabold mb-2 text-primary drop-shadow-sm tracking-tight text-center md:text-left">
          Browse Artists
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 text-base sm:text-lg max-w-2xl leading-relaxed text-center md:text-left">
          Discover and book top performers for your event. Use the filters to find
          artists by category, location, or fee range.
        </p>
        <div className="flex flex-col md:flex-row gap-6 sm:gap-8">
          <aside className="md:w-1/4 w-full md:mb-0 mb-4">
            <div className="sticky top-24 bg-white dark:bg-gray-950 rounded-xl shadow p-4 border border-gray-100 dark:border-gray-800">
              <FilterBlock />
            </div>
          </aside>
          <section className="flex-1 w-full">
            <Suspense fallback={<div className="text-center py-10 text-gray-400">Loading artists...</div>}>
              <ArtistList />
            </Suspense>
          </section>
        </div>
      </main>
    </ArtistFilterProvider>
  );
}
