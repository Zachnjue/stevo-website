"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function addInvoice(_prevState: unknown, formData: FormData) {
  const supabase = await createClient();

  const clientName = String(formData.get("client_name") ?? "").trim();
  const clientEmail = String(formData.get("client_email") ?? "").trim();
  const jobDescription = String(formData.get("job_description") ?? "").trim();
  const subtotal = Number(formData.get("amount"));
  const dueDate = String(formData.get("due_date") ?? "");
  const applyVat = formData.get("apply_vat") === "on";
  const vatRate = applyVat ? 16 : 0;
  const paymentMethods = formData.getAll("payment_methods").map(String);

  if (!clientName || !jobDescription) {
    return { error: "Client name and job description are required." };
  }
  if (!Number.isFinite(subtotal) || subtotal <= 0) {
    return { error: "Enter a valid amount." };
  }
  if (!dueDate) {
    return { error: "Due date is required." };
  }

  const vatAmount = Math.round(subtotal * (vatRate / 100) * 100) / 100;
  const total = subtotal + vatAmount;

  const { error } = await supabase.from("invoices").insert({
    client_name: clientName,
    client_email: clientEmail || null,
    job_description: jobDescription,
    amount: total,
    subtotal,
    vat_rate: vatRate,
    vat_amount: vatAmount,
    due_date: dueDate,
    payment_methods: paymentMethods,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin");
  return { error: null };
}

export async function markInvoicePaid(id: string) {
  const supabase = await createClient();

  const { data: invoice, error: fetchError } = await supabase
    .from("invoices")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchError || !invoice) return;

  await supabase
    .from("invoices")
    .update({ paid: true, paid_at: new Date().toISOString() })
    .eq("id", id);

  // Marking an invoice paid is revenue — record it in Finance too, so the
  // two aren't tracked separately and out of sync.
  await supabase.from("transactions").insert({
    type: "income",
    category: "Client payment",
    amount: invoice.amount,
    description: `${invoice.client_name} — ${invoice.job_description}`,
    occurred_on: new Date().toISOString().slice(0, 10),
  });

  revalidatePath("/admin");
}

export async function deleteInvoice(id: string) {
  const supabase = await createClient();
  await supabase.from("invoices").delete().eq("id", id);
  revalidatePath("/admin");
}
