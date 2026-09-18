import { redirect } from "next/navigation";

export default function FinancePageRedirect() {
  redirect("/admin?tab=finance");
}
