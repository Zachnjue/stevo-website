-- Run this once in the Supabase SQL Editor (Project > SQL Editor > New query).

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  title text not null unique,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists catalogue_items (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references categories (id) on delete cascade,
  name text not null,
  image_path text,
  fit text not null default 'contain' check (fit in ('contain', 'cover')),
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table categories enable row level security;
alter table catalogue_items enable row level security;

-- Anyone can read (the public catalogue page).
create policy "Public read categories" on categories
  for select using (true);
create policy "Public read catalogue_items" on catalogue_items
  for select using (true);

-- Only signed-in users (the admin account you create in Authentication > Users)
-- can add/edit/delete. There is no public sign-up flow in the app.
create policy "Authenticated write categories" on categories
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
create policy "Authenticated write catalogue_items" on catalogue_items
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Seed the existing categories so the admin can start adding items right away.
insert into categories (title, sort_order) values
  ('Apparel & Uniforms', 0),
  ('Drinkware', 1),
  ('Promotional & Gift Items', 2),
  ('Print & Signage', 3),
  ('Stationery & Office', 4)
on conflict (title) do nothing;

-- Seed the items already shown on the public catalogue page. Items that had
-- a local photo in public/images/catalogue keep it via the "local:" prefix;
-- new uploads from the admin dashboard get a plain storage path instead.
insert into catalogue_items (category_id, name, image_path, fit, sort_order)
select c.id, v.name, v.image_path, 'cover', v.sort_order
from (values
  ('Apparel & Uniforms', 'Custom Printed T-Shirts', 'local:cat-tshirts.png', 0),
  ('Apparel & Uniforms', 'Branded Caps', 'local:cat-caps.png', 1),
  ('Apparel & Uniforms', 'Safety Vests / Reflectors', 'local:cat-safety-vest.png', 2),
  ('Apparel & Uniforms', 'Jerseys', null, 3),
  ('Apparel & Uniforms', 'Polo T-Shirts', null, 4),
  ('Apparel & Uniforms', 'Dust Coats', null, 5),
  ('Apparel & Uniforms', 'Hoodies', null, 6),
  ('Apparel & Uniforms', 'Travel Hats', null, 7),
  ('Apparel & Uniforms', 'Khaki Aprons', null, 8),
  ('Drinkware', 'Branded Mugs', 'local:cat-mug-orange.png', 0),
  ('Drinkware', 'Water Bottles', 'local:cat-bottle-black-wood.png', 1),
  ('Drinkware', 'Water Bottles', 'local:cat-bottle-blue.png', 2),
  ('Drinkware', 'Flasks', null, 3),
  ('Drinkware', 'Thermal Mugs', null, 4),
  ('Promotional & Gift Items', 'Keychains & Gift Sets', 'local:cat-keychain-box.png', 0),
  ('Promotional & Gift Items', 'Gift Bags & Tags', 'local:cat-gift-tags.png', 1),
  ('Promotional & Gift Items', 'Custom Pens', 'local:cat-pens.png', 2),
  ('Promotional & Gift Items', 'Branded Passport Holders', 'local:cat-passport-holder.png', 3),
  ('Promotional & Gift Items', 'Stress Balls', null, 4),
  ('Promotional & Gift Items', 'Wristbands', null, 5),
  ('Promotional & Gift Items', 'Bookmarks', null, 6),
  ('Promotional & Gift Items', 'Pencils', null, 7),
  ('Promotional & Gift Items', 'Desk Pens', null, 8),
  ('Promotional & Gift Items', 'Earbuds / Earpods', null, 9),
  ('Promotional & Gift Items', 'Laptop Power Banks', null, 10),
  ('Promotional & Gift Items', 'Umbrellas', null, 11),
  ('Promotional & Gift Items', 'Maasai Shukas', null, 12),
  ('Promotional & Gift Items', 'Jute Bags', null, 13),
  ('Promotional & Gift Items', 'Drawstring Bags', null, 14),
  ('Promotional & Gift Items', 'Lanyards', null, 15),
  ('Print & Signage', 'Brochures & Flyers', 'local:cat-brochure-fan.png', 0),
  ('Print & Signage', 'Stickers & Decals', 'local:cat-sticker-badge.png', 1),
  ('Print & Signage', 'Roll-up Banners', 'local:cat-rollup-banners.png', 2),
  ('Print & Signage', 'UV Printing', null, 3),
  ('Print & Signage', 'Engraving', null, 4),
  ('Print & Signage', 'Pop-up Banners', null, 5),
  ('Print & Signage', 'Tear Drop Banners', null, 6),
  ('Print & Signage', 'Signage', null, 7),
  ('Print & Signage', 'Tents', null, 8),
  ('Print & Signage', 'Flags', null, 9),
  ('Print & Signage', 'Frames', null, 10),
  ('Print & Signage', 'Wall Mounts', null, 11),
  ('Print & Signage', 'Posters & Flyers', null, 12),
  ('Print & Signage', 'Non-Woven Bags', null, 13),
  ('Print & Signage', 'Photo Stands', null, 14),
  ('Print & Signage', 'Photo Booth Frames', null, 15),
  ('Print & Signage', 'Magazines', null, 16),
  ('Stationery & Office', 'Branded Notebooks', 'local:cat-notebooks.png', 0),
  ('Stationery & Office', 'Spiral Notebooks', 'local:cat-spiral-notebook.png', 1),
  ('Stationery & Office', 'Diaries', null, 2),
  ('Stationery & Office', 'Bill Holders / Menus', null, 3),
  ('Stationery & Office', 'Trophy Awards', null, 4),
  ('Stationery & Office', 'Wall Clocks', null, 5)
) as v(category_title, name, image_path, sort_order)
join categories c on c.title = v.category_title
where not exists (
  select 1 from catalogue_items existing
  where existing.name = v.name and existing.category_id = c.id
);

-- Storage bucket for catalogue photos.
insert into storage.buckets (id, name, public)
values ('catalogue', 'catalogue', true)
on conflict (id) do nothing;

create policy "Public read catalogue photos" on storage.objects
  for select using (bucket_id = 'catalogue');
create policy "Authenticated upload catalogue photos" on storage.objects
  for insert with check (bucket_id = 'catalogue' and auth.role() = 'authenticated');
create policy "Authenticated update catalogue photos" on storage.objects
  for update using (bucket_id = 'catalogue' and auth.role() = 'authenticated');
create policy "Authenticated delete catalogue photos" on storage.objects
  for delete using (bucket_id = 'catalogue' and auth.role() = 'authenticated');
