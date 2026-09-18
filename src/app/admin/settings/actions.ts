"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type PaymentSettingsState = { error: string | null; saved: boolean };

export async function updatePaymentSettings(
  _prevState: PaymentSettingsState,
  formData: FormData,
): Promise<PaymentSettingsState> {
  const supabase = await createClient();

  const fields = [
    "mpesa_paybill",
    "mpesa_paybill_account",
    "mpesa_till",
    "mpesa_phone",
    "bank_name",
    "bank_account_name",
    "bank_account_number",
    "bank_branch",
    "bank_swift",
  ] as const;

  const update: Record<string, string | null> = {};
  for (const field of fields) {
    const value = String(formData.get(field) ?? "").trim();
    update[field] = value || null;
  }

  const { error } = await supabase
    .from("company_settings")
    .update(update)
    .eq("id", 1);

  if (error) {
    return { error: error.message, saved: false };
  }

  revalidatePath("/admin");
  return { error: null, saved: true };
}
