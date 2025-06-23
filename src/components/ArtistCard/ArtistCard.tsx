import Image from "next/image";
import { Artist } from "./ArtistList";
import Link from "next/link";
import { Button } from "../ui/button";
import { useState } from "react";
import { useToast } from "../../app/layout";

export default function ArtistCard({ artist, tabIndex = 0, ...props }: { artist: Artist; tabIndex?: number } & React.HTMLAttributes<HTMLDivElement>) {
  const [showBooking, setShowBooking] = useState(false);
  const { showToast } = useToast();

  function handleBookingRequest() {
    setShowBooking(false);
    setTimeout(() => {
      if (Math.random() > 0.2) {
        showToast("Booking request sent! The artist will contact you soon.", "success");
      } else {
        showToast("Booking request failed. Please try again.", "error");
      }
    }, 600);
  }

  return (
    <div
      className="rounded-xl border bg-white dark:bg-gray-950 p-6 shadow flex flex-col gap-4 min-h-[420px] h-full"
      role="listitem"
      aria-label={`Artist card for ${artist.name}`}
      tabIndex={tabIndex}
      {...props}
    >
      <Image
        src={artist.image}
        alt={artist.name}
        width={120}
        height={120}
        className="rounded-full object-cover mx-auto mb-2"
        unoptimized
      />
      <h3 className="text-lg font-bold text-center">{artist.name}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 text-center">{artist.category.join(", ")}</p>
      <p className="text-xs text-gray-500 text-center">{artist.location}</p>
      <p className="text-sm text-center mt-2">{artist.bio}</p>
      <div className="flex flex-col gap-2 mt-auto pt-2">
        <span className="text-primary font-semibold text-center">{artist.feeRange}</span>
        <Button asChild variant="secondary" className="text-xs px-4 py-2 rounded-lg font-semibold shadow w-full">
          <Link
            href={`/artists/${artist.id}`}
            aria-label={`Ask for quote for ${artist.name}`}
            tabIndex={0}
          >
            Ask for Quote
          </Link>
        </Button>
        <Button
          variant="outline"
          className="text-xs px-4 py-2 rounded-lg font-semibold shadow w-full"
          onClick={() => setShowBooking(true)}
          aria-label={`Request booking for ${artist.name}`}
        >
          Request Booking
        </Button>
      </div>
      {/* Booking Request Modal */}
      {showBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-gray-950 rounded-xl shadow-lg p-6 w-full max-w-xs mx-auto flex flex-col items-center">
            <h4 className="text-lg font-bold mb-2 text-primary">Request Booking</h4>
            <p className="text-sm text-center mb-4">Send a booking request for <span className="font-semibold">{artist.name}</span>?</p>
            <div className="flex gap-3 mt-2">
              <Button variant="secondary" onClick={handleBookingRequest}>
                Confirm
              </Button>
              <Button variant="ghost" onClick={() => setShowBooking(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
