"use client";

export default function PrintInvoiceButton() {
  return (
    <button
      onClick={() => window.print()}
      className="eyebrow no-print border border-ink px-5 py-3 text-ink transition-colors hover:border-brand-blue hover:bg-brand-blue hover:text-white"
    >
      Print / Save as PDF
    </button>
  );
}
