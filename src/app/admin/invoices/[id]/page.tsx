import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PrintInvoiceButton from "@/components/admin/PrintInvoiceButton";

const money = new Intl.NumberFormat("en-KE", {
  style: "currency",
  currency: "KES",
  maximumFractionDigits: 0,
});

const COMPANY = {
  name: "Thee Printing Hub",
  address: "Latema Plaza, 3rd Floor, Room 302",
  phone: "0748 679 132",
  email: "theeprinting.hub@gmail.com",
  // Fill in and this will appear on the invoice automatically.
  kraPin: "",
};

export default async function InvoiceDocumentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: invoice }, { data: settings }] = await Promise.all([
    supabase.from("invoices").select("*").eq("id", id).single(),
    supabase.from("company_settings").select("*").eq("id", 1).single(),
  ]);

  if (!invoice) notFound();

  const paymentMethods: string[] = invoice.payment_methods ?? [];

  const invoiceNumber = `INV-${invoice.created_at.slice(0, 7).replace("-", "")}-${String(invoice.invoice_seq).padStart(4, "0")}`;
  const isOverdue =
    !invoice.paid &&
    new Date(invoice.due_date) < new Date(new Date().toDateString());

  const subtotal = invoice.subtotal ?? invoice.amount;
  const vatRate = invoice.vat_rate ?? 0;
  const vatAmount = invoice.vat_amount ?? 0;

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <div className="no-print mb-10 flex items-center justify-between">
        <Link
          href="/admin?tab=invoices"
          className="eyebrow text-ink-soft hover:text-ink"
        >
          ← Back to invoices
        </Link>
        <PrintInvoiceButton />
      </div>

      <div className="relative overflow-hidden border border-line bg-paper shadow-sm print:shadow-none">
        <div className="h-2 bg-gradient-to-r from-brand-blue via-brand-pink to-brand-yellow" />

        <div className="p-8 sm:p-12">
          <div className="flex items-start justify-between gap-6 border-b border-line pb-8">
            <div>
              <Image
                src="/images/logo.png"
                alt={COMPANY.name}
                width={470}
                height={300}
                className="h-14 w-auto"
              />
              <div className="mt-4 space-y-0.5 text-sm text-ink-soft">
                <p>{COMPANY.address}</p>
                <p>{COMPANY.phone}</p>
                <p>{COMPANY.email}</p>
                {COMPANY.kraPin && <p>KRA PIN: {COMPANY.kraPin}</p>}
              </div>
            </div>

            <div className="text-right">
              <p className="eyebrow text-ink-soft">Invoice</p>
              <h1 className="font-display text-3xl text-ink">
                {invoiceNumber}
              </h1>
              <span
                className={`eyebrow mt-3 inline-block rounded-sm px-3 py-1 ${
                  invoice.paid
                    ? "bg-brand-blue/10 text-brand-blue"
                    : isOverdue
                      ? "bg-red-50 text-red-600"
                      : "bg-paper-deep text-ink-soft"
                }`}
              >
                {invoice.paid ? "Paid" : isOverdue ? "Overdue" : "Unpaid"}
              </span>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <div>
              <p className="eyebrow text-ink-soft">Billed to</p>
              <p className="mt-2 text-lg text-ink">{invoice.client_name}</p>
              {invoice.client_email && (
                <p className="text-sm text-ink-soft">
                  {invoice.client_email}
                </p>
              )}
            </div>
            <div className="text-right">
              <p className="eyebrow text-ink-soft">Issued</p>
              <p className="mt-2 text-ink">
                {new Date(invoice.created_at).toLocaleDateString("en-KE", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="eyebrow mt-4 text-ink-soft">Due</p>
              <p className="mt-2 text-ink">
                {new Date(invoice.due_date).toLocaleDateString("en-KE", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          <table className="mt-10 w-full border-t border-line text-left">
            <thead>
              <tr className="border-b border-line bg-paper-deep">
                <th className="eyebrow px-3 py-3 text-ink-soft">
                  Description
                </th>
                <th className="eyebrow px-3 py-3 text-right text-ink-soft">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-line">
                <td className="px-3 py-4 text-ink">
                  {invoice.job_description}
                </td>
                <td className="px-3 py-4 text-right text-ink">
                  {money.format(subtotal)}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="mt-4 flex justify-end">
            <div className="w-full max-w-xs space-y-2">
              <div className="flex justify-between text-sm text-ink-soft">
                <span>Subtotal</span>
                <span>{money.format(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-ink-soft">
                <span>VAT ({vatRate}%)</span>
                <span>{money.format(vatAmount)}</span>
              </div>
              <div className="flex justify-between border-t border-line pt-2">
                <span className="font-display text-ink">Total</span>
                <span className="font-display text-xl text-ink">
                  {money.format(invoice.amount)}
                </span>
              </div>
            </div>
          </div>

          {paymentMethods.length > 0 && settings && (
            <div className="mt-10 border border-line bg-paper-deep p-6">
              <p className="eyebrow text-ink-soft">Pay via</p>
              <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {paymentMethods.includes("mpesa_paybill") &&
                  (settings.mpesa_paybill || settings.mpesa_till) && (
                    <div className="text-sm text-ink">
                      <p className="font-display text-ink">M-Pesa</p>
                      {settings.mpesa_paybill && (
                        <p>Paybill: {settings.mpesa_paybill}</p>
                      )}
                      {settings.mpesa_paybill_account && (
                        <p>Account: {settings.mpesa_paybill_account}</p>
                      )}
                      {settings.mpesa_till && (
                        <p>Till: {settings.mpesa_till}</p>
                      )}
                    </div>
                  )}

                {paymentMethods.includes("mpesa_phone") &&
                  settings.mpesa_phone && (
                    <div className="text-sm text-ink">
                      <p className="font-display text-ink">
                        M-Pesa (Send Money)
                      </p>
                      <p>{settings.mpesa_phone}</p>
                    </div>
                  )}

                {paymentMethods.includes("bank") && settings.bank_name && (
                  <div className="text-sm text-ink">
                    <p className="font-display text-ink">Bank</p>
                    <p>{settings.bank_name}</p>
                    {settings.bank_account_name && (
                      <p>{settings.bank_account_name}</p>
                    )}
                    {settings.bank_account_number && (
                      <p>Acc: {settings.bank_account_number}</p>
                    )}
                    {settings.bank_branch && (
                      <p>Branch: {settings.bank_branch}</p>
                    )}
                    {settings.bank_swift && (
                      <p>SWIFT: {settings.bank_swift}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="mt-8 border-t border-line pt-6 text-sm text-ink-soft">
            <p>
              Thank you for your business. Please make payment by the due
              date above.
            </p>
            <p className="mt-1">
              {COMPANY.phone} · {COMPANY.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
