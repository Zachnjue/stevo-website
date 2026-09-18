"use client";

import Link from "next/link";
import { markInvoicePaid, deleteInvoice } from "@/app/admin/invoices/actions";

type Invoice = {
  id: string;
  client_name: string;
  client_email: string | null;
  job_description: string;
  amount: number;
  due_date: string;
  paid: boolean;
  created_at: string;
  invoice_seq: number;
};

const money = new Intl.NumberFormat("en-KE", {
  style: "currency",
  currency: "KES",
  maximumFractionDigits: 0,
});

export default function InvoiceRow({ invoice }: { invoice: Invoice }) {
  const isOverdue =
    !invoice.paid && new Date(invoice.due_date) < new Date(new Date().toDateString());
  const invoiceNumber = `INV-${invoice.created_at.slice(0, 7).replace("-", "")}-${String(invoice.invoice_seq).padStart(4, "0")}`;

  return (
    <div
      className={`flex items-center justify-between gap-4 py-4 ${
        isOverdue ? "bg-red-50" : ""
      }`}
    >
      <div>
        <p className="text-ink">
          <span className="text-ink-soft">{invoiceNumber}</span> —{" "}
          {invoice.client_name}
          <span className="text-ink-soft"> — {invoice.job_description}</span>
        </p>
        <p className={`text-sm ${isOverdue ? "text-red-600" : "text-ink-soft"}`}>
          Due {invoice.due_date}
          {isOverdue && " — OVERDUE"}
          {invoice.paid && " — Paid"}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-display text-ink">
          {money.format(invoice.amount)}
        </span>
        <Link
          href={`/admin/invoices/${invoice.id}`}
          className="eyebrow text-ink-soft underline decoration-line underline-offset-4 hover:text-ink"
        >
          View / Print
        </Link>
        {!invoice.paid && (
          <button
            onClick={() => markInvoicePaid(invoice.id)}
            className="eyebrow text-brand-blue underline decoration-brand-blue/30 underline-offset-4 hover:decoration-brand-blue"
          >
            Mark paid
          </button>
        )}
        <button
          onClick={() => {
            if (confirm(`Delete invoice for ${invoice.client_name}?`)) {
              deleteInvoice(invoice.id);
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
