"use client";

import { useActionState } from "react";
import { addCatalogueItem } from "@/app/admin/actions";

type Category = { id: string; title: string };

export default function AddCatalogueItemForm({
  categories,
}: {
  categories: Category[];
}) {
  const [state, formAction, pending] = useActionState(addCatalogueItem, {
    error: null,
  });

  return (
    <form
      action={formAction}
      className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2"
    >
      <label className="flex flex-col gap-2 text-sm text-ink-soft">
        Item name
        <input
          type="text"
          name="name"
          required
          placeholder="e.g. Branded Umbrella"
          className="border border-line bg-paper px-4 py-3 text-ink outline-none focus:border-brand-blue"
        />
      </label>

      <label className="flex flex-col gap-2 text-sm text-ink-soft">
        Category
        <select
          name="category_id"
          required
          defaultValue=""
          className="border border-line bg-paper px-4 py-3 text-ink outline-none focus:border-brand-blue"
        >
          <option value="" disabled>
            Choose a category
          </option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-2 text-sm text-ink-soft">
        Photo fit
        <select
          name="fit"
          defaultValue="contain"
          className="border border-line bg-paper px-4 py-3 text-ink outline-none focus:border-brand-blue"
        >
          <option value="contain">Contain — show the whole photo</option>
          <option value="cover">Cover — fill the tile, cropped</option>
        </select>
      </label>

      <label className="flex flex-col gap-2 text-sm text-ink-soft">
        Photo
        <input
          type="file"
          name="photo"
          accept="image/*"
          className="border border-line bg-paper px-4 py-2.5 text-ink outline-none file:mr-3 file:border-0 file:bg-ink file:px-3 file:py-1.5 file:text-paper"
        />
      </label>

      <div className="sm:col-span-2">
        {state?.error && (
          <p className="mb-4 text-sm text-red-600">{state.error}</p>
        )}
        <button
          type="submit"
          disabled={pending}
          className="eyebrow border border-ink px-5 py-3 text-ink transition-colors hover:border-brand-blue hover:bg-brand-blue hover:text-white disabled:opacity-50"
        >
          {pending ? "Saving…" : "Add item"}
        </button>
      </div>
    </form>
  );
}
