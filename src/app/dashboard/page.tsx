"use client";

import RequireAuth from "../../components/Auth/RequireAuth";
import { useSubmissionContext } from "../../context/SubmissionContext";
import { useState, useEffect } from "react";
import EditArtistModal from "../../components/EditArtistModal";
import ArtistViewModal from "../../components/ArtistCard/ArtistViewModal";
import type { Artist } from "../../components/ArtistCard/ArtistList";
import { useToast } from "../layout";
import DashboardTableSkeleton from "../../components/Table/DashboardTableSkeleton";
import { Button } from "../../components/ui/button";

function DashboardPage() {
  const { submissions, deleteSubmission, editSubmission } = useSubmissionContext();
  const [editArtist, setEditArtist] = useState<Artist | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [viewArtist, setViewArtist] = useState<Artist | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for localStorage fetch
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timeout);
  }, []);

  function handleView(artist: Artist) {
    setViewArtist(artist);
    setShowViewModal(true);
  }
  function handleViewClose() {
    setShowViewModal(false);
  }
  function handleEdit(artist: Artist) {
    setEditArtist(artist);
    setShowEditModal(true);
  }
  function handleEditSave(updated: Artist) {
    editSubmission(updated);
    setShowEditModal(false);
    showToast("Artist updated successfully!", "success");
  }
  function handleEditCancel() {
    setShowEditModal(false);
  }
  function handleDelete(id: number, name: string) {
    deleteSubmission(id);
    showToast(`Deleted artist: ${name}`, "info");
  }

  if (loading) return <DashboardTableSkeleton />;

  return (
    <main className="max-w-5xl mx-auto px-2 sm:px-4 py-6 sm:py-10">
      <h1 className="text-2xl md:text-4xl font-extrabold mb-2 text-primary drop-shadow-sm tracking-tight text-center md:text-left">Manager Dashboard</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 text-base sm:text-lg max-w-2xl leading-relaxed text-center md:text-left">
        View all artist submissions below. Data is stored in local state for this demo.
      </p>
      <div className="overflow-x-auto rounded-xl shadow border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800 text-xs sm:text-sm">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fee</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-950 divide-y divide-gray-100 dark:divide-gray-900">
            {submissions.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray-400">No submissions yet.</td>
              </tr>
            ) : (
              submissions.map((artist) => (
                <tr key={artist.id}>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 font-semibold">{artist.name}</td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3">{artist.category.join(", ")}</td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3">{artist.location}</td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3">{artist.feeRange}</td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 flex flex-col sm:flex-row gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="px-3 py-1 text-xs w-full sm:w-auto"
                      onClick={() => handleView(artist)}
                      aria-label={`View ${artist.name}`}
                    >
                      View
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 text-xs w-full sm:w-auto"
                      onClick={() => handleEdit(artist)}
                      aria-label={`Edit ${artist.name}`}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="bg-red-500 hover:bg-red-600 px-3 py-1 text-xs w-full sm:w-auto"
                      onClick={() => handleDelete(artist.id, artist.name)}
                      aria-label={`Delete ${artist.name}`}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
          {showViewModal && viewArtist && (
            <ArtistViewModal artist={viewArtist} onClose={handleViewClose} />
          )}
        </table>
      </div>
      {showEditModal && editArtist && (
        <EditArtistModal
          artist={editArtist}
          onSave={handleEditSave}
          onCancel={handleEditCancel}
        />
      )}
    </main>
  );
}

export default function Dashboard() {
  return (
    <RequireAuth>
      <DashboardPage />
    </RequireAuth>
  );
}
