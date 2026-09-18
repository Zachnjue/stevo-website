-- Run after 0001-0003. Adds VAT breakdown to invoices.
-- Existing invoices keep their current "amount" as the total; subtotal/vat
-- are left null for them since we don't know their original VAT treatment.

alter table invoices add column if not exists subtotal numeric(12, 2);
alter table invoices add column if not exists vat_rate numeric(5, 2) not null default 16;
alter table invoices add column if not exists vat_amount numeric(12, 2) not null default 0;
