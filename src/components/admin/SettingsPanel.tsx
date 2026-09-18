import { createClient } from "@/lib/supabase/server";
import PaymentSettingsForm from "@/components/admin/PaymentSettingsForm";

export default async function SettingsPanel() {
  const supabase = await createClient();
  const { data: settings } = await supabase
    .from("company_settings")
    .select("*")
    .eq("id", 1)
    .single();

  return (
    <section className="border border-line p-6">
      <h2 className="font-display text-xl text-ink">Payment details</h2>
      <p className="mt-2 text-sm text-ink-soft">
        Shown on invoices when you choose to include them. Leave a field
        blank to hide it.
      </p>
      <PaymentSettingsForm settings={settings} />
    </section>
  );
}
