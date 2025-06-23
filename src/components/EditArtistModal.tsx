import { useState } from "react";
import type { Artist } from "./ArtistCard/ArtistList";
import { Button } from "./ui/button";

const categories = ["Singer", "Dancer", "Speaker", "DJ", "Magician", "Band"];
const languages = ["Hindi", "English", "Gujarati", "Punjabi", "Marathi"];
const feeRanges = [
  "₹25,000 - ₹70,000",
  "₹30,000 - ₹80,000",
  "₹35,000 - ₹90,000",
  "₹40,000 - ₹90,000",
  "₹45,000 - ₹1,00,000",
  "₹50,000 - ₹1,00,000",
  "₹55,000 - ₹1,10,000",
  "₹60,000 - ₹1,20,000",
  "₹70,000 - ₹1,50,000",
  "₹80,000 - ₹2,00,000"
];

interface EditArtistModalProps {
  artist: Artist;
  onSave: (artist: Artist) => void;
  onCancel: () => void;
}

export default function EditArtistModal({ artist, onSave, onCancel }: EditArtistModalProps) {
  const [form, setForm] = useState<Artist>({ ...artist });
  const [preview, setPreview] = useState<string | null>(artist.image || null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>, group: "category" | "languages") {
    const { value, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [group]: checked
        ? [...(prev[group] as string[]), value]
        : (prev[group] as string[]).filter((v) => v !== value),
    }));
  }

  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setForm((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave({ ...form, image: preview || "/default-artist.png" });
  }

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-label={`Edit details for ${artist.name}`}
      tabIndex={-1}
      onKeyDown={e => { if (e.key === "Escape") onCancel(); }}
    >
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-xs sm:max-w-md mx-auto" aria-label="Edit artist form">
        <h2 className="text-lg sm:text-xl font-bold mb-4">Edit Artist</h2>
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded p-2 text-sm"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Bio</label>
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            className="w-full border rounded p-2 text-sm"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Category</label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <label key={cat} className="flex items-center gap-1 text-sm">
                <input
                  type="checkbox"
                  value={cat}
                  checked={form.category.includes(cat)}
                  onChange={(e) => handleCheckboxChange(e, "category")}
                />
                {cat}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block font-medium mb-1">Languages Spoken</label>
          <div className="flex flex-wrap gap-2">
            {languages.map((lang) => (
              <label key={lang} className="flex items-center gap-1 text-sm">
                <input
                  type="checkbox"
                  value={lang}
                  checked={form.languages.includes(lang)}
                  onChange={(e) => handleCheckboxChange(e, "languages")}
                />
                {lang}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block font-medium mb-1">Fee Range</label>
          <select
            name="feeRange"
            value={form.feeRange}
            onChange={handleChange}
            className="w-full border rounded p-2 text-sm"
            required
          >
            <option value="">Select fee range</option>
            {feeRanges.map((fee) => (
              <option key={fee} value={fee}>{fee}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Location</label>
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full border rounded p-2 text-sm"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Profile Image <span className="text-gray-400">(optional)</span></label>
          <input type="file" accept="image/*" onChange={handleImage} className="w-full" />
          {preview && (
            <img src={preview} alt="Preview" className="mt-2 w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-full border mx-auto" />
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-2 mt-4 justify-end">
          <Button type="button" onClick={onCancel} className="px-4 py-1 w-full sm:w-auto" variant="secondary" aria-label="Cancel editing">Cancel</Button>
          <Button type="submit" className="px-4 py-1 w-full sm:w-auto" variant="default">Save</Button>
        </div>
      </form>
    </div>
  );
}
