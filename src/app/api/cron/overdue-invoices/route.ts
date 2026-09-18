import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createServiceClient } from "@/lib/supabase/service";

const money = new Intl.NumberFormat("en-KE", {
  style: "currency",
  currency: "KES",
  maximumFractionDigits: 0,
});

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createServiceClient();
  const today = new Date().toISOString().slice(0, 10);

  const { data: overdue, error } = await supabase
    .from("invoices")
    .select("*")
    .eq("paid", false)
    .lt("due_date", today)
    .order("due_date", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!overdue || overdue.length === 0) {
    return NextResponse.json({ sent: false, overdueCount: 0 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const rows = overdue
    .map(
      (i) =>
        `<tr><td style="padding:8px 12px">${i.client_name}</td><td style="padding:8px 12px">${i.job_description}</td><td style="padding:8px 12px">${money.format(i.amount)}</td><td style="padding:8px 12px">${i.due_date}</td></tr>`,
    )
    .join("");

  await resend.emails.send({
    from: process.env.CRON_FROM_EMAIL!,
    to: process.env.ADMIN_NOTIFICATION_EMAIL!,
    subject: `${overdue.length} overdue ${overdue.length === 1 ? "invoice" : "invoices"} — Thee Printing Hub`,
    html: `
      <p>These clients haven't paid past their due date:</p>
      <table style="border-collapse:collapse;width:100%">
        <thead>
          <tr><th align="left" style="padding:8px 12px">Client</th><th align="left" style="padding:8px 12px">Job</th><th align="left" style="padding:8px 12px">Amount</th><th align="left" style="padding:8px 12px">Due</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
      <p>Review and mark as paid at /admin/invoices.</p>
    `,
  });

  return NextResponse.json({ sent: true, overdueCount: overdue.length });
}
