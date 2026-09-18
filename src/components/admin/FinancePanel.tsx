import { createClient } from "@/lib/supabase/server";
import AddTransactionForm from "@/components/admin/AddTransactionForm";
import TransactionRow from "@/components/admin/TransactionRow";

const money = new Intl.NumberFormat("en-KE", {
  style: "currency",
  currency: "KES",
  maximumFractionDigits: 0,
});

export default async function FinancePanel() {
  const supabase = await createClient();

  const { data: transactions } = await supabase
    .from("transactions")
    .select("*")
    .order("occurred_on", { ascending: false });

  const all = transactions ?? [];
  const revenue = all
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);
  const expenses = all
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);
  const net = revenue - expenses;

  const now = new Date();
  const thisMonth = all.filter((t) => {
    const d = new Date(t.occurred_on);
    return (
      d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    );
  });
  const monthRevenue = thisMonth
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);
  const monthExpenses = thisMonth
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="border border-line p-6">
          <p className="eyebrow text-ink-soft">Total revenue</p>
          <p className="font-display mt-2 text-2xl text-brand-blue">
            {money.format(revenue)}
          </p>
        </div>
        <div className="border border-line p-6">
          <p className="eyebrow text-ink-soft">Total expenses</p>
          <p className="font-display mt-2 text-2xl text-red-600">
            {money.format(expenses)}
          </p>
        </div>
        <div className="border border-line p-6">
          <p className="eyebrow text-ink-soft">Net profit</p>
          <p
            className={`font-display mt-2 text-2xl ${
              net >= 0 ? "text-ink" : "text-red-600"
            }`}
          >
            {money.format(net)}
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="border border-line p-6">
          <p className="eyebrow text-ink-soft">
            This month ({now.toLocaleString("en-KE", { month: "long" })})
            revenue
          </p>
          <p className="font-display mt-2 text-xl text-ink">
            {money.format(monthRevenue)}
          </p>
        </div>
        <div className="border border-line p-6">
          <p className="eyebrow text-ink-soft">
            This month ({now.toLocaleString("en-KE", { month: "long" })})
            expenses
          </p>
          <p className="font-display mt-2 text-xl text-ink">
            {money.format(monthExpenses)}
          </p>
        </div>
      </div>

      <section className="mt-12 border border-line p-6">
        <h2 className="font-display text-xl text-ink">Add a transaction</h2>
        <AddTransactionForm />
      </section>

      <section className="mt-12">
        <h2 className="font-display text-xl text-ink">
          Transactions ({all.length})
        </h2>
        <div className="mt-6 flex flex-col divide-y divide-line border-t border-line">
          {all.map((tx) => (
            <TransactionRow key={tx.id} tx={tx} />
          ))}
          {all.length === 0 && (
            <p className="py-6 text-sm text-ink-soft">
              No transactions yet.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
