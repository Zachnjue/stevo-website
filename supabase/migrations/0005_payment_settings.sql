-- Run after 0001-0004.

create table if not exists company_settings (
  id int primary key default 1,
  mpesa_paybill text,
  mpesa_paybill_account text,
  mpesa_till text,
  mpesa_phone text,
  bank_name text,
  bank_account_name text,
  bank_account_number text,
  bank_branch text,
  bank_swift text,
  updated_at timestamptz not null default now(),
  constraint single_row check (id = 1)
);

insert into company_settings (id) values (1) on conflict (id) do nothing;

alter table company_settings enable row level security;

drop policy if exists "Authenticated read company_settings" on company_settings;
create policy "Authenticated read company_settings" on company_settings
  for select using (auth.role() = 'authenticated');

drop policy if exists "Authenticated write company_settings" on company_settings;
create policy "Authenticated write company_settings" on company_settings
  for update using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Which payment method(s) to show on a given invoice.
alter table invoices add column if not exists payment_methods text[] not null default '{}';
