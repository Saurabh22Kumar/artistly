"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface FilterState {
  category: string;
  location: string;
  feeRange: string;
}

const defaultState: FilterState = {
  category: "",
  location: "",
  feeRange: "",
};

const ArtistFilterContext = createContext<{
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
} | null>(null);

export function useArtistFilter() {
  const ctx = useContext(ArtistFilterContext);
  if (!ctx) throw new Error("useArtistFilter must be used within ArtistFilterProvider");
  return ctx;
}

export function ArtistFilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<FilterState>(defaultState);
  return (
    <ArtistFilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </ArtistFilterContext.Provider>
  );
}
