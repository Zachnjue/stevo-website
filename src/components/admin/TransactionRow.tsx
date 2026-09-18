"use client";

import { deleteTransaction } from "@/app/admin/finance/actions";

type Transaction = {
  id: string;
  type: "income" | "expense";
  category: string;
  amount: number;
  description: string | null;
  occurred_on: string;
};

const money = new Intl.NumberFormat("en-KE", {
  style: "currency",
  currency: "KES",
  maximumFractionDigits: 0,
});

export default function TransactionRow({ tx }: { tx: Transaction }) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div>
        <p className="text-ink">
          {tx.category}
          {tx.description && (
            <span className="text-ink-soft"> — {tx.description}</span>
          )}
        </p>
        <p className="text-sm text-ink-soft">{tx.occurred_on}</p>
      </div>
      <div className="flex items-center gap-4">
        <span
          className={
            tx.type === "income"
              ? "font-display text-brand-blue"
              : "font-display text-red-600"
          }
        >
          {tx.type === "income" ? "+" : "-"}
          {money.format(tx.amount)}
        </span>
        <button
          onClick={() => {
            if (confirm("Delete this transaction?")) {
              deleteTransaction(tx.id);
            }
          }}
          className="eyebrow text-red-600 underline decoration-red-200 underline-offset-4 hover:decoration-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
