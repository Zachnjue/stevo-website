"use client";

import { useActionState, useEffect, useState } from "react";
import {
  deleteCatalogueItem,
  updateCatalogueItem,
} from "@/app/admin/actions";

type Item = {
  id: string;
  name: string;
  fit: string;
  image_path: string | null;
  category_id: string;
};

type Category = { id: string; title: string };

export default function CatalogueItemRow({
  item,
  categoryTitle,
  categories,
}: {
  item: Item;
  categoryTitle: string;
  categories: Category[];
}) {
  const [editing, setEditing] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [state, formAction, pending] = useActionState(updateCatalogueItem, {
    error: null,
  });

  useEffect(() => {
    if (submitted && !pending && state?.error === null) {
      setEditing(false);
      setSubmitted(false);
    }
  }, [submitted, pending, state]);

  if (editing) {
    return (
      <form action={formAction} className="py-4">
        <input type="hidden" name="id" value={item.id} />
        <input
          type="hidden"
          name="existing_image_path"
          value={item.image_path ?? ""}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm text-ink-soft">
            Item name
            <input
              type="text"
              name="name"
              required
              defaultValue={item.name}
              className="border border-line bg-paper px-4 py-3 text-ink outline-none focus:border-brand-blue"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm text-ink-soft">
            Category
            <select
              name="category_id"
              required
              defaultValue={item.category_id}
              className="border border-line bg-paper px-4 py-3 text-ink outline-none focus:border-brand-blue"
            >
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
              defaultValue={item.fit}
              className="border border-line bg-paper px-4 py-3 text-ink outline-none focus:border-brand-blue"
            >
              <option value="contain">Contain — show the whole photo</option>
              <option value="cover">Cover — fill the tile, cropped</option>
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm text-ink-soft">
            Replace photo (optional)
            <input
              type="file"
              name="photo"
              accept="image/*"
              className="border border-line bg-paper px-4 py-2.5 text-ink outline-none file:mr-3 file:border-0 file:bg-ink file:px-3 file:py-1.5 file:text-paper"
            />
          </label>
        </div>

        {state?.error && (
          <p className="mt-4 text-sm text-red-600">{state.error}</p>
        )}

        <div className="mt-4 flex gap-4">
          <button
            type="submit"
            disabled={pending}
            onClick={() => setSubmitted(true)}
            className="eyebrow border border-ink px-5 py-3 text-ink transition-colors hover:border-brand-blue hover:bg-brand-blue hover:text-white disabled:opacity-50"
          >
            {pending ? "Saving…" : "Save changes"}
          </button>
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="eyebrow text-ink-soft underline decoration-line underline-offset-4 hover:text-ink"
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div>
        <p className="text-ink">{item.name}</p>
        <p className="text-sm text-ink-soft">
          {categoryTitle} · fit: {item.fit} ·{" "}
          {item.image_path ? "has photo" : "no photo"}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setEditing(true)}
          className="eyebrow text-ink-soft underline decoration-line underline-offset-4 hover:text-ink"
        >
          Edit
        </button>
        <button
          onClick={() => {
            if (confirm(`Delete "${item.name}"?`)) {
              deleteCatalogueItem(item.id, item.image_path);
            }
          }}
          className="eyebrow text-red-600 underline decoration-red-200 underline-offset-4 hover:decoration-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
