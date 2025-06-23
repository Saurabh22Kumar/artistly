"use client";
import { useArtistFilter } from "../../context/ArtistFilterContext";
import { Button } from "../ui/button";

const categories = ["Singer", "Dancer", "Speaker", "DJ", "Magician", "Band"];
const locations = ["Mumbai", "Ahmedabad", "Delhi", "Chandigarh", "Lucknow", "Pune", "Bangalore", "Kolkata", "Hyderabad", "Goa"];
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

export default function FilterBlock() {
  const { filters, setFilters } = useArtistFilter();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold mb-2">Filter By</h2>
      <div>
        <label className="block mb-1 font-medium">Category</label>
        <select name="category" value={filters.category} onChange={handleChange} className="w-full border rounded p-2">
          <option value="">All</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-1 font-medium">Location</label>
        <select name="location" value={filters.location} onChange={handleChange} className="w-full border rounded p-2">
          <option value="">All</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-1 font-medium">Fee Range</label>
        <select name="feeRange" value={filters.feeRange} onChange={handleChange} className="w-full border rounded p-2">
          <option value="">All</option>
          {feeRanges.map((fee) => (
            <option key={fee} value={fee}>{fee}</option>
          ))}
        </select>
      </div>
      <div className="flex gap-2 mt-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => setFilters({ category: "", location: "", feeRange: "" })}
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
}
