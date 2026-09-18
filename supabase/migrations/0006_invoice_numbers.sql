-- Run after 0001-0005. Adds a real sequential invoice number.

create sequence if not exists invoices_number_seq;

alter table invoices add column if not exists invoice_seq bigint;
alter table invoices alter column invoice_seq set default nextval('invoices_number_seq');

-- Backfill any existing invoices in creation order so numbers stay sequential.
with numbered as (
  select id, row_number() over (order by created_at) as rn
  from invoices
  where invoice_seq is null
)
update invoices
set invoice_seq = numbered.rn + (select coalesce(max(invoice_seq), 0) from invoices)
from numbered
where invoices.id = numbered.id;

alter table invoices alter column invoice_seq set not null;
