"use client";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSubmissionContext } from "../../context/SubmissionContext";
import { useToast } from "../../app/layout";
import { Button } from "../ui/button";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  bio: z.string().min(10, "Bio is required"),
  category: z.array(z.string()).min(1, "Select at least one category"),
  languages: z.array(z.string()).min(1, "Select at least one language"),
  feeRange: z.string().min(1, "Fee range is required"),
  location: z.string().min(2, "Location is required"),
  image: z.any().optional(),
});

type FormData = z.infer<typeof schema>;

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

export default function OnboardForm() {
  const [preview, setPreview] = useState<string | null>(null);
  const { register, handleSubmit, control, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      category: [],
      languages: [],
    },
  });
  const { addSubmission } = useSubmissionContext();
  const { showToast } = useToast();

  function onSubmit(data: FormData) {
    try {
      // For demo: add to dashboard local state
      addSubmission({
        id: Date.now(),
        ...data,
        image: preview || "/default-artist.png",
      });
      showToast("Artist submitted! Check dashboard for entry.", "success");
      // Do not reset the form immediately to avoid hydration mismatch
      // reset();
      // setPreview(null);
    } catch (error) {
      showToast("Submission failed. Please try again.", "error");
    }
  }

  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        showToast("Only image files are allowed.", "error");
        setPreview(null);
        return;
      }
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        showToast("Image size must be under 2MB.", "error");
        setPreview(null);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.onerror = () => {
        showToast("Failed to read image file.", "error");
        setPreview(null);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6 px-2">
      <div>
        <label className="block font-medium mb-1">Name</label>
        <input {...register("name")}
          className="w-full border rounded p-2 text-sm"
          placeholder="Artist name" />
        {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
      </div>
      <div>
        <label className="block font-medium mb-1">Bio</label>
        <textarea {...register("bio")}
          className="w-full border rounded p-2 text-sm"
          placeholder="Short artist bio" />
        {errors.bio && <span className="text-red-500 text-sm">{errors.bio.message}</span>}
      </div>
      <div>
        <label className="block font-medium mb-1">Category</label>
        <Controller
          control={control}
          name="category"
          render={({ field }) => (
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <label key={cat} className="flex items-center gap-1 text-sm">
                  <input
                    type="checkbox"
                    value={cat}
                    checked={field.value.includes(cat)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        field.onChange([...field.value, cat]);
                      } else {
                        field.onChange(field.value.filter((v: string) => v !== cat));
                      }
                    }}
                  />
                  {cat}
                </label>
              ))}
            </div>
          )}
        />
        {errors.category && <span className="text-red-500 text-sm">{errors.category.message}</span>}
      </div>
      <div>
        <label className="block font-medium mb-1">Languages Spoken</label>
        <Controller
          control={control}
          name="languages"
          render={({ field }) => (
            <div className="flex flex-wrap gap-2">
              {languages.map((lang) => (
                <label key={lang} className="flex items-center gap-1 text-sm">
                  <input
                    type="checkbox"
                    value={lang}
                    checked={field.value.includes(lang)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        field.onChange([...field.value, lang]);
                      } else {
                        field.onChange(field.value.filter((v: string) => v !== lang));
                      }
                    }}
                  />
                  {lang}
                </label>
              ))}
            </div>
          )}
        />
        {errors.languages && <span className="text-red-500 text-sm">{errors.languages.message}</span>}
      </div>
      <div>
        <label className="block font-medium mb-1">Fee Range</label>
        <select {...register("feeRange")}
          className="w-full border rounded p-2 text-sm">
          <option value="">Select fee range</option>
          {feeRanges.map((fee) => (
            <option key={fee} value={fee}>{fee}</option>
          ))}
        </select>
        {errors.feeRange && <span className="text-red-500 text-sm">{errors.feeRange.message}</span>}
      </div>
      <div>
        <label className="block font-medium mb-1">Location</label>
        <input {...register("location")}
          className="w-full border rounded p-2 text-sm"
          placeholder="City" />
        {errors.location && <span className="text-red-500 text-sm">{errors.location.message}</span>}
      </div>
      <div>
        <label className="block font-medium mb-1">Profile Image <span className="text-gray-400">(optional)</span></label>
        <input type="file" accept="image/*" onChange={handleImage} className="w-full" />
        {preview && (
          <img src={preview} alt="Preview" className="mt-2 w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-full border mx-auto" />
        )}
      </div>
      <Button type="submit" className="w-full mt-4" variant="secondary">
        Submit Artist
      </Button>
    </form>
  );
}
