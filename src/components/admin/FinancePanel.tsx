import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import {
  MONTHS,
  applyFilter,
  filterQuery,
  parseFilter,
  periodLabel,
  summarize,
  yearsIn,
  type Transaction,
} from "@/lib/finance";
import AddTransactionForm from "@/components/admin/AddTransactionForm";
import TransactionRow from "@/components/admin/TransactionRow";

const money = new Intl.NumberFormat("en-KE", {
  style: "currency",
  currency: "KES",
  maximumFractionDigits: 0,
});

export default async function FinancePanel({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const supabase = await createClient();

  const { data: transactions } = await supabase
    .from("transactions")
    .select("*")
    .order("occurred_on", { ascending: false });

  const everything = (transactions ?? []) as Transaction[];
  const filter = parseFilter(searchParams);
  const all = applyFilter(everything, filter);
  const { income: revenue, expenses, net } = summarize(all);
  const query = filterQuery(filter);
  const isFiltered = query !== "";

  const selectClass =
    "mt-2 w-full border border-line bg-white px-3 py-2 text-sm text-ink";

  return (
    <div>
      <form
        method="get"
        className="grid grid-cols-2 items-end gap-4 border border-line p-6 sm:grid-cols-4"
      >
        <input type="hidden" name="tab" value="finance" />
        <label className="eyebrow text-ink-soft">
          Show
          <select
            name="type"
            defaultValue={filter.type}
            className={selectClass}
          >
            <option value="all">Income &amp; expenses</option>
            <option value="income">Income only</option>
            <option value="expense">Expenses only</option>
          </select>
        </label>
        <label className="eyebrow text-ink-soft">
          Year
          <select
            name="year"
            defaultValue={filter.year}
            className={selectClass}
          >
            <option value="">All years</option>
            {yearsIn(everything).map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </label>
        <label className="eyebrow text-ink-soft">
          Month
          <select
            name="month"
            defaultValue={filter.month}
            className={selectClass}
          >
            <option value="">Whole year</option>
            {MONTHS.map((m, i) => (
              <option key={m} value={String(i + 1).padStart(2, "0")}>
                {m}
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          className="eyebrow border border-ink px-5 py-2.5 text-ink transition-colors hover:bg-ink hover:text-white"
        >
          Apply
        </button>
      </form>

      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="eyebrow text-ink-soft">
          Showing: {periodLabel(filter)}
          {filter.type !== "all" &&
            ` · ${filter.type === "income" ? "Income" : "Expenses"} only`}
          {isFiltered && (
            <Link href="/admin?tab=finance" className="link-reveal ml-4">
              Clear filters
            </Link>
          )}
        </p>
        <Link
          href={`/admin/finance/report${isFiltered ? `?${query}` : ""}`}
          className="eyebrow border border-brand-blue bg-brand-blue px-5 py-2.5 text-center shrink-0 text-white transition-colors hover:bg-brand-blue-dark"
        >
          Preview report
        </Link>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="border border-line p-6">
          <p className="eyebrow text-ink-soft">Revenue</p>
          <p className="font-display mt-2 text-2xl text-brand-blue">
            {money.format(revenue)}
          </p>
        </div>
        <div className="border border-line p-6">
          <p className="eyebrow text-ink-soft">Expenses</p>
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
              {isFiltered
                ? "No transactions match these filters."
                : "No transactions yet."}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
