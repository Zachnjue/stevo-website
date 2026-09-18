import { redirect } from "next/navigation";

export default function InvoicesPageRedirect() {
  redirect("/admin?tab=invoices");
}
