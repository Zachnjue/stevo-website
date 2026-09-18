"use client";

import { useActionState } from "react";
import { addInvoice } from "@/app/admin/invoices/actions";

export default function AddInvoiceForm() {
  const [state, formAction, pending] = useActionState(addInvoice, {
    error: null,
  });

  return (
    <form
      action={formAction}
      className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      <label className="flex flex-col gap-2 text-sm text-ink-soft">
        Client name
        <input
          type="text"
          name="client_name"
          required
          className="border border-line bg-paper px-4 py-3 text-ink outline-none focus:border-brand-blue"
        />
      </label>

      <label className="flex flex-col gap-2 text-sm text-ink-soft">
        Client email (optional)
        <input
          type="email"
          name="client_email"
          className="border border-line bg-paper px-4 py-3 text-ink outline-none focus:border-brand-blue"
        />
      </label>

      <label className="flex flex-col gap-2 text-sm text-ink-soft">
        Amount (Ksh, excl. VAT)
        <input
          type="number"
          name="amount"
          required
          min="0.01"
          step="0.01"
          className="border border-line bg-paper px-4 py-3 text-ink outline-none focus:border-brand-blue"
        />
      </label>

      <label className="flex items-center gap-3 self-end pb-3 text-sm text-ink-soft">
        <input
          type="checkbox"
          name="apply_vat"
          defaultChecked
          className="h-4 w-4 accent-brand-blue"
        />
        Add 16% VAT
      </label>

      <label className="flex flex-col gap-2 text-sm text-ink-soft sm:col-span-2">
        Job description
        <input
          type="text"
          name="job_description"
          required
          placeholder="e.g. 500 branded T-shirts"
          className="border border-line bg-paper px-4 py-3 text-ink outline-none focus:border-brand-blue"
        />
      </label>

      <label className="flex flex-col gap-2 text-sm text-ink-soft">
        Payment due date
        <input
          type="date"
          name="due_date"
          required
          className="border border-line bg-paper px-4 py-3 text-ink outline-none focus:border-brand-blue"
        />
      </label>

      <fieldset className="sm:col-span-2 lg:col-span-3">
        <legend className="text-sm text-ink-soft">
          Show which payment method(s) on this invoice?
        </legend>
        <div className="mt-2 flex flex-wrap gap-6">
          <label className="flex items-center gap-2 text-sm text-ink-soft">
            <input
              type="checkbox"
              name="payment_methods"
              value="mpesa_paybill"
              className="h-4 w-4 accent-brand-blue"
            />
            M-Pesa Paybill/Till
          </label>
          <label className="flex items-center gap-2 text-sm text-ink-soft">
            <input
              type="checkbox"
              name="payment_methods"
              value="mpesa_phone"
              className="h-4 w-4 accent-brand-blue"
            />
            M-Pesa Send Money
          </label>
          <label className="flex items-center gap-2 text-sm text-ink-soft">
            <input
              type="checkbox"
              name="payment_methods"
              value="bank"
              className="h-4 w-4 accent-brand-blue"
            />
            Bank account
          </label>
        </div>
        <p className="mt-2 text-xs text-ink-soft">
          Set the actual numbers once under Settings.
        </p>
      </fieldset>

      <div className="sm:col-span-2 lg:col-span-3">
        {state?.error && (
          <p className="mb-4 text-sm text-red-600">{state.error}</p>
        )}
        <button
          type="submit"
          disabled={pending}
          className="eyebrow border border-ink px-5 py-3 text-ink transition-colors hover:border-brand-blue hover:bg-brand-blue hover:text-white disabled:opacity-50"
        >
          {pending ? "Saving…" : "Add invoice"}
        </button>
      </div>
    </form>
  );
}
