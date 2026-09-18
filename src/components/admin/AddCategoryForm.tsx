"use client";

import { useActionState } from "react";
import { addCategory } from "@/app/admin/actions";

export default function AddCategoryForm() {
  const [state, formAction, pending] = useActionState(addCategory, {
    error: null,
  });

  return (
    <form action={formAction} className="mt-4 flex flex-wrap items-end gap-4">
      <label className="flex flex-col gap-2 text-sm text-ink-soft">
        Category name
        <input
          type="text"
          name="title"
          required
          placeholder="e.g. Bags & Travel"
          className="w-64 border border-line bg-paper px-4 py-3 text-ink outline-none focus:border-brand-blue"
        />
      </label>
      <button
        type="submit"
        disabled={pending}
        className="eyebrow border border-ink px-5 py-3 text-ink transition-colors hover:border-brand-blue hover:bg-brand-blue hover:text-white disabled:opacity-50"
      >
        {pending ? "Adding…" : "Add category"}
      </button>
      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
    </form>
  );
}
