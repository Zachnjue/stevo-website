import Link from "next/link";
import { signOut } from "@/app/admin/actions";
import CataloguePanel from "@/components/admin/CataloguePanel";
import FinancePanel from "@/components/admin/FinancePanel";
import InvoicesPanel from "@/components/admin/InvoicesPanel";
import SettingsPanel from "@/components/admin/SettingsPanel";

const TABS = [
  { key: "catalogue", label: "Catalogue" },
  { key: "finance", label: "Finance" },
  { key: "invoices", label: "Invoices" },
  { key: "settings", label: "Settings" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const tab = params.tab;
  const activeTab: TabKey = TABS.some((t) => t.key === tab)
    ? (tab as TabKey)
    : "catalogue";

  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl">
      <aside className="hidden w-56 shrink-0 flex-col border-r border-line px-6 py-16 sm:flex">
        <p className="eyebrow text-ink-soft">Admin</p>
        <p className="font-display mt-1 text-xl text-ink">Dashboard</p>

        <nav className="mt-10 flex flex-col gap-1">
          {TABS.map((t) => (
            <Link
              key={t.key}
              href={t.key === "catalogue" ? "/admin" : `/admin?tab=${t.key}`}
              className={`eyebrow border-l-2 px-4 py-3 transition-colors ${
                activeTab === t.key
                  ? "border-brand-blue bg-paper-deep text-ink"
                  : "border-transparent text-ink-soft hover:border-line hover:text-ink"
              }`}
            >
              {t.label}
            </Link>
          ))}
        </nav>

        <form action={signOut} className="mt-auto pt-10">
          <button className="eyebrow text-ink-soft underline decoration-line underline-offset-4 hover:text-ink">
            Sign out
          </button>
        </form>
      </aside>

      <div className="flex-1 px-6 py-10 sm:px-10 sm:py-16">
        <div className="flex items-center justify-between sm:hidden">
          <p className="font-display text-2xl text-ink">
            {TABS.find((t) => t.key === activeTab)?.label}
          </p>
          <form action={signOut}>
            <button className="eyebrow text-ink-soft underline decoration-line underline-offset-4">
              Sign out
            </button>
          </form>
        </div>

        <nav className="mt-4 flex gap-2 border-b border-line sm:hidden">
          {TABS.map((t) => (
            <Link
              key={t.key}
              href={t.key === "catalogue" ? "/admin" : `/admin?tab=${t.key}`}
              className={`eyebrow border-b-2 px-3 py-3 ${
                activeTab === t.key
                  ? "border-brand-blue text-ink"
                  : "border-transparent text-ink-soft"
              }`}
            >
              {t.label}
            </Link>
          ))}
        </nav>

        <h1 className="font-display hidden text-3xl text-ink sm:block">
          {TABS.find((t) => t.key === activeTab)?.label}
        </h1>

        <div className="mt-8">
          {activeTab === "catalogue" && <CataloguePanel />}
          {activeTab === "finance" && <FinancePanel searchParams={params} />}
          {activeTab === "invoices" && <InvoicesPanel />}
          {activeTab === "settings" && <SettingsPanel />}
        </div>
      </div>
    </div>
  );
}
