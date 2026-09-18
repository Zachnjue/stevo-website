"use client";

import { useActionState } from "react";
import { addTransaction } from "@/app/admin/finance/actions";

export default function AddTransactionForm() {
  const [state, formAction, pending] = useActionState(addTransaction, {
    error: null,
  });

  const today = new Date().toISOString().slice(0, 10);

  return (
    <form
      action={formAction}
      className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      <label className="flex flex-col gap-2 text-sm text-ink-soft">
        Type
        <select
          name="type"
          defaultValue="income"
          className="border border-line bg-paper px-4 py-3 text-ink outline-none focus:border-brand-blue"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </label>

      <label className="flex flex-col gap-2 text-sm text-ink-soft">
        Category
        <input
          type="text"
          name="category"
          required
          placeholder="e.g. Client payment, Printing supplies"
          className="border border-line bg-paper px-4 py-3 text-ink outline-none focus:border-brand-blue"
        />
      </label>

      <label className="flex flex-col gap-2 text-sm text-ink-soft">
        Amount (Ksh)
        <input
          type="number"
          name="amount"
          required
          min="0.01"
          step="0.01"
          className="border border-line bg-paper px-4 py-3 text-ink outline-none focus:border-brand-blue"
        />
      </label>

      <label className="flex flex-col gap-2 text-sm text-ink-soft">
        Date
        <input
          type="date"
          name="occurred_on"
          defaultValue={today}
          className="border border-line bg-paper px-4 py-3 text-ink outline-none focus:border-brand-blue"
        />
      </label>

      <label className="flex flex-col gap-2 text-sm text-ink-soft sm:col-span-2 lg:col-span-1">
        Description (optional)
        <input
          type="text"
          name="description"
          placeholder="e.g. Invoice #204 — Rainforest Alliance"
          className="border border-line bg-paper px-4 py-3 text-ink outline-none focus:border-brand-blue"
        />
      </label>

      <div className="sm:col-span-2 lg:col-span-3">
        {state?.error && (
          <p className="mb-4 text-sm text-red-600">{state.error}</p>
        )}
        <button
          type="submit"
          disabled={pending}
          className="eyebrow border border-ink px-5 py-3 text-ink transition-colors hover:border-brand-blue hover:bg-brand-blue hover:text-white disabled:opacity-50"
        >
          {pending ? "Saving…" : "Add transaction"}
        </button>
      </div>
    </form>
  );
}
