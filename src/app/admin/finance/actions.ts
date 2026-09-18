"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function addTransaction(_prevState: unknown, formData: FormData) {
  const supabase = await createClient();

  const type = String(formData.get("type") ?? "");
  const category = String(formData.get("category") ?? "").trim();
  const amount = Number(formData.get("amount"));
  const description = String(formData.get("description") ?? "").trim();
  const occurredOn = String(formData.get("occurred_on") ?? "");

  if (type !== "income" && type !== "expense") {
    return { error: "Choose income or expense." };
  }
  if (!category) {
    return { error: "Category is required." };
  }
  if (!Number.isFinite(amount) || amount <= 0) {
    return { error: "Enter a valid amount." };
  }

  const { error } = await supabase.from("transactions").insert({
    type,
    category,
    amount,
    description: description || null,
    occurred_on: occurredOn || new Date().toISOString().slice(0, 10),
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin");
  return { error: null };
}

export async function deleteTransaction(id: string) {
  const supabase = await createClient();
  await supabase.from("transactions").delete().eq("id", id);
  revalidatePath("/admin");
}
