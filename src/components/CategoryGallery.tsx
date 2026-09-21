"use client";

import { useState } from "react";
import PhotoMasonry, { type Product } from "@/components/PhotoMasonry";

// One category's products, shown a page at a time.
export default function CategoryGallery({
  items,
  basePath,
  pageSize = 5,
  anchorId,
}: {
  items: Product[];
  basePath: string;
  pageSize?: number;
  anchorId: string;
}) {
  const [page, setPage] = useState(0);
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
  const from = page * pageSize;
  const visible = items.slice(from, from + pageSize);

  function go(next: number) {
    if (next < 0 || next >= pageCount || next === page) return;
    setPage(next);
    // Keep the reader at the top of this category rather than mid-page.
    document
      .getElementById(anchorId)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const btn =
    "eyebrow transition-colors disabled:cursor-default disabled:opacity-30";

  return (
    <div>
      {/* Keyed by page so each new page fades in fresh */}
      <PhotoMasonry
        key={page}
        items={visible}
        basePath={basePath}
        startIndex={from}
      />

      {pageCount > 1 && (
        <nav
          aria-label="Pages in this category"
          className="mt-14 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-6"
        >
          <p className="eyebrow text-ink-soft">
            {from + 1}–{from + visible.length} of {items.length}
          </p>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => go(page - 1)}
              disabled={page === 0}
              className={`${btn} text-ink hover:text-accent`}
            >
              ← Prev
            </button>

            <ol className="flex items-center gap-4">
              {Array.from({ length: pageCount }, (_, i) => (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`Page ${i + 1}`}
                    aria-current={i === page ? "page" : undefined}
                    className={`eyebrow border-b pb-1 transition-colors ${
                      i === page
                        ? "border-accent text-accent"
                        : "border-transparent text-ink-soft hover:text-ink"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </button>
                </li>
              ))}
            </ol>

            <button
              type="button"
              onClick={() => go(page + 1)}
              disabled={page === pageCount - 1}
              className={`${btn} text-ink hover:text-accent`}
            >
              Next →
            </button>
          </div>
        </nav>
      )}
    </div>
  );
}
