"use client";

import { deleteCatalogueItem } from "@/app/admin/actions";

type Item = {
  id: string;
  name: string;
  fit: string;
  image_path: string | null;
};

export default function CatalogueItemRow({
  item,
  categoryTitle,
}: {
  item: Item;
  categoryTitle: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div>
        <p className="text-ink">{item.name}</p>
        <p className="text-sm text-ink-soft">
          {categoryTitle} · fit: {item.fit} ·{" "}
          {item.image_path ? "has photo" : "no photo"}
        </p>
      </div>
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
  );
}
