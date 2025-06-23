"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { Artist } from "../components/ArtistCard/ArtistList";

interface SubmissionContextType {
  submissions: Artist[];
  addSubmission: (artist: Artist) => void;
  editSubmission: (artist: Artist) => void;
  deleteSubmission: (id: number) => void;
}

const SubmissionContext = createContext<SubmissionContextType | undefined>(undefined);

export function useSubmissionContext() {
  const ctx = useContext(SubmissionContext);
  if (!ctx) throw new Error("useSubmissionContext must be used within SubmissionProvider");
  return ctx;
}

export function SubmissionProvider({ children }: { children: ReactNode }) {
  const [submissions, setSubmissions] = useState<Artist[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("artistly_submissions");
    if (stored) setSubmissions(JSON.parse(stored));
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("artistly_submissions", JSON.stringify(submissions));
  }, [submissions]);

  function addSubmission(artist: Artist) {
    setSubmissions((prev) => [artist, ...prev]);
  }

  function editSubmission(updated: Artist) {
    setSubmissions((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
  }

  function deleteSubmission(id: number) {
    setSubmissions((prev) => prev.filter((a) => a.id !== id));
  }

  return (
    <SubmissionContext.Provider value={{ submissions, addSubmission, editSubmission, deleteSubmission }}>
      {children}
    </SubmissionContext.Provider>
  );
}
