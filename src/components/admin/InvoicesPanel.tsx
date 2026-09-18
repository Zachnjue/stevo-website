import { createClient } from "@/lib/supabase/server";
import AddInvoiceForm from "@/components/admin/AddInvoiceForm";
import InvoiceRow from "@/components/admin/InvoiceRow";

export default async function InvoicesPanel() {
  const supabase = await createClient();

  const { data: invoices } = await supabase
    .from("invoices")
    .select("*")
    .order("due_date", { ascending: true });

  const all = invoices ?? [];
  const today = new Date(new Date().toDateString());
  const overdue = all.filter((i) => !i.paid && new Date(i.due_date) < today);
  const rest = all.filter((i) => !(!i.paid && new Date(i.due_date) < today));

  return (
    <div>
      <p className="text-ink-soft">
        Log what a client owes and when it&apos;s due. Anything past its due
        date and still unpaid shows here in red.
      </p>

      {overdue.length > 0 && (
        <div className="mt-6 border border-red-200 bg-red-50 p-6">
          <p className="eyebrow text-red-600">
            {overdue.length} overdue{" "}
            {overdue.length === 1 ? "client" : "clients"}
          </p>
        </div>
      )}

      <section className="mt-8 border border-line p-6">
        <h2 className="font-display text-xl text-ink">Add an invoice</h2>
        <AddInvoiceForm />
      </section>

      <section className="mt-12">
        <h2 className="font-display text-xl text-ink">
          All invoices ({all.length})
        </h2>
        <div className="mt-6 flex flex-col divide-y divide-line border-t border-line">
          {[...overdue, ...rest].map((invoice) => (
            <InvoiceRow key={invoice.id} invoice={invoice} />
          ))}
          {all.length === 0 && (
            <p className="py-6 text-sm text-ink-soft">No invoices yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
