export type Transaction = {
  id: string;
  type: "income" | "expense";
  category: string;
  amount: number;
  description: string | null;
  occurred_on: string;
};

export type FinanceFilter = {
  type: "all" | "income" | "expense";
  year: string; // "" = all years
  month: string; // "" = whole year, otherwise "01"–"12"
};

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

type Params = { [key: string]: string | string[] | undefined };

function one(v: string | string[] | undefined) {
  return (Array.isArray(v) ? v[0] : v) ?? "";
}

export function parseFilter(params: Params): FinanceFilter {
  const t = one(params.type);
  const type = t === "income" || t === "expense" ? t : "all";

  const m = one(params.month);
  const month = /^(0[1-9]|1[0-2])$/.test(m) ? m : "";

  let year = /^\d{4}$/.test(one(params.year)) ? one(params.year) : "";
  // A month on its own means "that month this year".
  if (month && !year) year = String(new Date().getFullYear());

  return { type, year, month };
}

export function filterQuery(f: FinanceFilter) {
  const q = new URLSearchParams();
  if (f.type !== "all") q.set("type", f.type);
  if (f.year) q.set("year", f.year);
  if (f.month) q.set("month", f.month);
  return q.toString();
}

export function periodLabel(f: FinanceFilter) {
  if (!f.year) return "All time";
  if (!f.month) return f.year;
  return `${MONTHS[Number(f.month) - 1]} ${f.year}`;
}

export function applyFilter(all: Transaction[], f: FinanceFilter) {
  return all.filter((t) => {
    if (f.type !== "all" && t.type !== f.type) return false;
    if (f.year && t.occurred_on.slice(0, 4) !== f.year) return false;
    if (f.month && t.occurred_on.slice(5, 7) !== f.month) return false;
    return true;
  });
}

export function summarize(rows: Transaction[]) {
  const income = rows
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);
  const expenses = rows
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);
  return { income, expenses, net: income - expenses };
}

export function yearsIn(all: Transaction[]) {
  const years = new Set(all.map((t) => t.occurred_on.slice(0, 4)));
  years.add(String(new Date().getFullYear()));
  return [...years].sort().reverse();
}
