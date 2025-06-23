import type { Artist } from "./ArtistList";
import { Button } from "../ui/button";

interface ArtistViewModalProps {
  artist: Artist;
  onClose: () => void;
}

export default function ArtistViewModal({ artist, onClose }: ArtistViewModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-label={`Details for ${artist.name}`}
      tabIndex={-1}
      onKeyDown={e => { if (e.key === "Escape") onClose(); }}
    >
      <div className="bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-xs sm:max-w-md relative">
        <Button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-primary text-2xl"
          aria-label="Close details modal"
          variant="ghost"
          size="icon"
        >
          &times;
        </Button>
        <div className="flex flex-col items-center gap-4">
          <img
            src={artist.image || "/default-artist.png"}
            alt={artist.name}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border"
          />
          <h2 className="text-lg sm:text-2xl font-bold text-primary mb-1 text-center">{artist.name}</h2>
          <div className="text-xs sm:text-sm text-gray-500 mb-2 text-center">{artist.category.join(", ")}</div>
          <div className="mb-2 text-center text-gray-700 dark:text-gray-200 text-xs sm:text-base">{artist.bio}</div>
          <div className="flex flex-col gap-1 w-full text-xs sm:text-sm">
            <div><span className="font-semibold">Location:</span> {artist.location}</div>
            <div><span className="font-semibold">Fee Range:</span> {artist.feeRange}</div>
            <div><span className="font-semibold">Languages:</span> {artist.languages.join(", ")}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
