"use client";

import { useActionState } from "react";
import { updatePaymentSettings } from "@/app/admin/settings/actions";

type Settings = {
  mpesa_paybill: string | null;
  mpesa_paybill_account: string | null;
  mpesa_till: string | null;
  mpesa_phone: string | null;
  bank_name: string | null;
  bank_account_name: string | null;
  bank_account_number: string | null;
  bank_branch: string | null;
  bank_swift: string | null;
} | null;

export default function PaymentSettingsForm({
  settings,
}: {
  settings: Settings;
}) {
  const [state, formAction, pending] = useActionState(updatePaymentSettings, {
    error: null,
  });

  const field = (name: keyof NonNullable<Settings>, label: string) => (
    <label className="flex flex-col gap-2 text-sm text-ink-soft">
      {label}
      <input
        type="text"
        name={name}
        defaultValue={settings?.[name] ?? ""}
        className="border border-line bg-paper px-4 py-3 text-ink outline-none focus:border-brand-blue"
      />
    </label>
  );

  return (
    <form action={formAction} className="mt-4 flex flex-col gap-8">
      <div>
        <p className="eyebrow text-ink-soft">M-Pesa</p>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {field("mpesa_paybill", "Paybill number")}
          {field("mpesa_paybill_account", "Paybill account name/number")}
          {field("mpesa_till", "Till number")}
          {field("mpesa_phone", "Send Money phone number")}
        </div>
      </div>

      <div>
        <p className="eyebrow text-ink-soft">Bank</p>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {field("bank_name", "Bank name")}
          {field("bank_account_name", "Account name")}
          {field("bank_account_number", "Account number")}
          {field("bank_branch", "Branch")}
          {field("bank_swift", "SWIFT code (optional)")}
        </div>
      </div>

      <div>
        {state?.error && (
          <p className="mb-4 text-sm text-red-600">{state.error}</p>
        )}
        {state && "saved" in state && state.saved && (
          <p className="mb-4 text-sm text-brand-blue">Saved.</p>
        )}
        <button
          type="submit"
          disabled={pending}
          className="eyebrow border border-ink px-5 py-3 text-ink transition-colors hover:border-brand-blue hover:bg-brand-blue hover:text-white disabled:opacity-50"
        >
          {pending ? "Saving…" : "Save payment details"}
        </button>
      </div>
    </form>
  );
}
