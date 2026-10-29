-- Adds the Steve Diaries photos to the catalogue under Stationery & Office.
-- Run once in the Supabase SQL Editor. Safe to re-run: skips photos already added.
-- Files live in public/images/catalogue/ and use the "local:" prefix.

insert into catalogue_items (category_id, name, image_path, fit, sort_order)
select c.id, 'Diaries', 'local:' || v.file, 'cover', v.sort_order
from (values
  ('diary-1.jpg', 3),
  ('diary-2.jpg', 4),
  ('diary-3.jpg', 5),
  ('diary-4.jpg', 6),
  ('diary-5.jpg', 7),
  ('diary-6.jpg', 8),
  ('diary-7.jpg', 9),
  ('diary-8.jpg', 10)
) as v(file, sort_order)
join categories c on c.title = 'Stationery & Office'
where not exists (
  select 1 from catalogue_items existing
  where existing.image_path = 'local:' || v.file
);
