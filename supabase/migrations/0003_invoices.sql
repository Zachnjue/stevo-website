-- Run this in the Supabase SQL Editor after 0001 and 0002.

create table if not exists invoices (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  client_email text,
  job_description text not null,
  amount numeric(12, 2) not null check (amount > 0),
  due_date date not null,
  paid boolean not null default false,
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

alter table invoices enable row level security;

-- Private to the signed-in admin, same as transactions.
drop policy if exists "Authenticated read invoices" on invoices;
create policy "Authenticated read invoices" on invoices
  for select using (auth.role() = 'authenticated');

drop policy if exists "Authenticated write invoices" on invoices;
create policy "Authenticated write invoices" on invoices
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
