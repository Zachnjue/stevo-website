-- Run this in the Supabase SQL Editor after 0001_catalogue.sql.

create table if not exists transactions (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('income', 'expense')),
  category text not null,
  amount numeric(12, 2) not null check (amount > 0),
  description text,
  occurred_on date not null default current_date,
  created_at timestamptz not null default now()
);

alter table transactions enable row level security;

-- Financial data is private — only the signed-in admin can read or write it.
-- Unlike the catalogue tables, there is no public select policy here.
create policy "Authenticated read transactions" on transactions
  for select using (auth.role() = 'authenticated');
create policy "Authenticated write transactions" on transactions
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
