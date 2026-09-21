import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import PrintInvoiceButton from "@/components/admin/PrintInvoiceButton";
import {
  applyFilter,
  filterQuery,
  parseFilter,
  periodLabel,
  summarize,
  type Transaction,
} from "@/lib/finance";

const money = new Intl.NumberFormat("en-KE", {
  style: "currency",
  currency: "KES",
  maximumFractionDigits: 0,
});

export default async function FinanceReportPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const filter = parseFilter(await searchParams);
  const supabase = await createClient();

  const { data } = await supabase
    .from("transactions")
    .select("*")
    .order("occurred_on", { ascending: true });

  const rows = applyFilter((data ?? []) as Transaction[], filter);
  const { income, expenses, net } = summarize(rows);
  const query = filterQuery(filter);

  // Totals per category, split by income / expense.
  const byCategory = new Map<string, { income: number; expense: number }>();
  for (const t of rows) {
    const entry = byCategory.get(t.category) ?? { income: 0, expense: 0 };
    entry[t.type] += Number(t.amount);
    byCategory.set(t.category, entry);
  }

  const typeLabel =
    filter.type === "income"
      ? "Income"
      : filter.type === "expense"
        ? "Expenses"
        : "Income & expenses";

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <div className="no-print mb-10 flex items-center justify-between">
        <Link
          href={`/admin?tab=finance${query ? `&${query}` : ""}`}
          className="eyebrow text-ink-soft hover:text-ink"
        >
          ← Back to finance
        </Link>
        <PrintInvoiceButton />
      </div>

      <div className="border border-line bg-paper p-8 shadow-sm print:shadow-none sm:p-12">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="eyebrow text-ink-soft">Finance report</p>
            <h1 className="font-display mt-2 text-3xl text-ink">
              {periodLabel(filter)}
            </h1>
            <p className="mt-1 text-sm text-ink-soft">{typeLabel}</p>
          </div>
          <Image
            src="/images/logo.png"
            alt="Thee Printing Hub"
            width={120}
            height={60}
            className="h-auto w-28"
          />
        </div>

        <div className="mt-8 grid grid-cols-3 gap-4 border-y border-line py-6">
          <div>
            <p className="eyebrow text-ink-soft">Revenue</p>
            <p className="font-display mt-1 text-xl text-brand-blue">
              {money.format(income)}
            </p>
          </div>
          <div>
            <p className="eyebrow text-ink-soft">Expenses</p>
            <p className="font-display mt-1 text-xl text-red-600">
              {money.format(expenses)}
            </p>
          </div>
          <div>
            <p className="eyebrow text-ink-soft">Net profit</p>
            <p
              className={`font-display mt-1 text-xl ${
                net >= 0 ? "text-ink" : "text-red-600"
              }`}
            >
              {money.format(net)}
            </p>
          </div>
        </div>

        {byCategory.size > 0 && (
          <>
            <h2 className="eyebrow mt-10 text-ink-soft">By category</h2>
            <table className="mt-3 w-full text-sm">
              <thead>
                <tr className="border-b border-line text-left text-ink-soft">
                  <th className="py-2 font-normal">Category</th>
                  <th className="py-2 text-right font-normal">Income</th>
                  <th className="py-2 text-right font-normal">Expenses</th>
                </tr>
              </thead>
              <tbody>
                {[...byCategory.entries()].map(([cat, v]) => (
                  <tr key={cat} className="border-b border-line">
                    <td className="py-2 text-ink">{cat}</td>
                    <td className="py-2 text-right">
                      {v.income ? money.format(v.income) : "—"}
                    </td>
                    <td className="py-2 text-right">
                      {v.expense ? money.format(v.expense) : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        <h2 className="eyebrow mt-10 text-ink-soft">
          Transactions ({rows.length})
        </h2>
        <table className="mt-3 w-full text-sm">
          <thead>
            <tr className="border-b border-line text-left text-ink-soft">
              <th className="py-2 font-normal">Date</th>
              <th className="py-2 font-normal">Details</th>
              <th className="py-2 text-right font-normal">Amount</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((t) => (
              <tr key={t.id} className="border-b border-line align-top">
                <td className="whitespace-nowrap py-2 pr-4 text-ink-soft">
                  {t.occurred_on}
                </td>
                <td className="py-2 pr-4 text-ink">
                  {t.category}
                  {t.description && (
                    <span className="text-ink-soft"> — {t.description}</span>
                  )}
                </td>
                <td
                  className={`whitespace-nowrap py-2 text-right ${
                    t.type === "income" ? "text-brand-blue" : "text-red-600"
                  }`}
                >
                  {t.type === "income" ? "+" : "-"}
                  {money.format(Number(t.amount))}
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={3} className="py-6 text-ink-soft">
                  No transactions for this selection.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <p className="mt-8 text-xs text-ink-soft">
          Generated {new Date().toLocaleDateString("en-KE")}
        </p>
      </div>
    </div>
  );
}
