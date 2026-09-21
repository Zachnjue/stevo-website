-- Replaces the placeholder catalogue with the real client photos.
-- Run once in the Supabase SQL Editor. Safe to re-run: it only removes rows it
-- created itself (local: paths) or placeholders with no photo, never photos
-- uploaded through the admin dashboard.
--
-- The photo files live in public/images/catalogue/ and are referenced with the
-- "local:" prefix, exactly like the original seed.

begin;

-- 1. Remove old placeholders / earlier local rows for the products covered by
--    the new photos.
delete from catalogue_items
where name in ('Bill Holders / Menus', 'Branded Caps', 'Branded Notebooks', 'Custom Pens', 'Custom Printed T-Shirts', 'Desk Pens', 'Diaries', 'Drawstring Bags', 'Dust Coats', 'Engraving', 'Flags', 'Flasks', 'Frames', 'Hoodies', 'Jerseys', 'Jute Bags', 'Lanyards', 'Laptop Power Banks', 'Maasai Shukas', 'Magazines', 'Non-Woven Bags', 'Pencils', 'Photo Booth Frames', 'Photo Stands', 'Polo T-Shirts', 'Pop-up Banners', 'Posters & Flyers', 'Roll-up Banners', 'Safety Vests / Reflectors', 'Signage', 'Stress Balls', 'Tear Drop Banners', 'Tents', 'Thermal Mugs', 'Travel Hats', 'Trophy Awards', 'UV Printing', 'Umbrellas', 'Wall Clocks', 'Wall Mounts', 'Water Bottles', 'Wristbands')
  and (image_path is null or image_path like 'local:%');

-- 2. Insert the new photographed items.
insert into catalogue_items (category_id, name, image_path, fit, sort_order)
select c.id, v.name, 'local:' || v.file, v.fit, v.sort_order
from (values
  ('Apparel & Uniforms', 'Custom Printed T-Shirts', 'tshirt.jpg', 'cover', 0),
  ('Apparel & Uniforms', 'Custom Printed T-Shirts', 'tshirt2.jpg', 'cover', 1),
  ('Apparel & Uniforms', 'Branded Caps', 'caps.jpg', 'cover', 2),
  ('Apparel & Uniforms', 'Branded Caps', 'caps2.jpg', 'contain', 3),
  ('Apparel & Uniforms', 'Branded Caps', 'caps3.jpg', 'cover', 4),
  ('Apparel & Uniforms', 'Jerseys', 'custom-jersey-name.jpg', 'contain', 5),
  ('Apparel & Uniforms', 'Jerseys', 'custom-jersey.jpg', 'cover', 6),
  ('Apparel & Uniforms', 'Jerseys', 'jersey-ac.jpg', 'cover', 7),
  ('Apparel & Uniforms', 'Jerseys', 'jersey-bayern.jpg', 'cover', 8),
  ('Apparel & Uniforms', 'Jerseys', 'jersey-bvb.jpg', 'cover', 9),
  ('Apparel & Uniforms', 'Hoodies', 'hoodie.jpg', 'cover', 10),
  ('Apparel & Uniforms', 'Hoodies', 'hoodies3.jpg', 'cover', 11),
  ('Apparel & Uniforms', 'Polo T-Shirts', 'polo-tshirt.jpg', 'cover', 12),
  ('Apparel & Uniforms', 'Polo T-Shirts', 'polo-tshirt2.jpg', 'cover', 13),
  ('Apparel & Uniforms', 'Dust Coats', 'dustcoat.jpg', 'cover', 14),
  ('Apparel & Uniforms', 'Dust Coats', 'dustcoat2.jpg', 'contain', 15),
  ('Apparel & Uniforms', 'Safety Vests / Reflectors', 'jay-reflector.jpg', 'cover', 16),
  ('Apparel & Uniforms', 'Safety Vests / Reflectors', 'red-reflector.jpg', 'cover', 17),
  ('Apparel & Uniforms', 'Safety Vests / Reflectors', 'reflector-in-a-person.jpg', 'cover', 18),
  ('Apparel & Uniforms', 'Safety Vests / Reflectors', 'reflectors-front.jpg', 'contain', 19),
  ('Apparel & Uniforms', 'Safety Vests / Reflectors', 'reflectors.jpg', 'contain', 20),
  ('Apparel & Uniforms', 'Travel Hats', 'travel-hats.jpg', 'cover', 21),
  ('Drinkware', 'Water Bottles', 'water-bottle.jpg', 'cover', 0),
  ('Drinkware', 'Flasks', 'flask.jpg', 'cover', 1),
  ('Drinkware', 'Flasks', 'flask2.jpg', 'cover', 2),
  ('Drinkware', 'Thermal Mugs', 'thermal-mugs.jpg', 'contain', 3),
  ('Promotional & Gift Items', 'Umbrellas', 'umbrella.jpg', 'cover', 0),
  ('Promotional & Gift Items', 'Umbrellas', 'umbrella2.jpg', 'cover', 1),
  ('Promotional & Gift Items', 'Jute Bags', 'jute.jpg', 'cover', 2),
  ('Promotional & Gift Items', 'Jute Bags', 'jute-2.jpg', 'contain', 3),
  ('Promotional & Gift Items', 'Maasai Shukas', 'maasai-shuka.jpg', 'cover', 4),
  ('Promotional & Gift Items', 'Maasai Shukas', 'maasai-shuka-2.jpg', 'contain', 5),
  ('Promotional & Gift Items', 'Drawstring Bags', 'drawstring-bag.jpg', 'contain', 6),
  ('Promotional & Gift Items', 'Non-Woven Bags', 'non-woven.jpg', 'contain', 7),
  ('Promotional & Gift Items', 'Non-Woven Bags', 'non-wooven-2.jpg', 'cover', 8),
  ('Promotional & Gift Items', 'Lanyards', 'lanyards.jpg', 'contain', 9),
  ('Promotional & Gift Items', 'Wristbands', 'wristband.jpg', 'cover', 10),
  ('Promotional & Gift Items', 'Stress Balls', 'stressballs.jpg', 'cover', 11),
  ('Promotional & Gift Items', 'Pencils', 'pencils.jpg', 'contain', 12),
  ('Promotional & Gift Items', 'Custom Pens', 'pens.jpg', 'cover', 13),
  ('Promotional & Gift Items', 'Desk Pens', 'deskpen.jpg', 'cover', 14),
  ('Promotional & Gift Items', 'Desk Pens', 'deskpen2.jpg', 'cover', 15),
  ('Promotional & Gift Items', 'Laptop Power Banks', 'laptop-power-bank.jpg', 'contain', 16),
  ('Print & Signage', 'Signage', 'signage.jpg', 'contain', 0),
  ('Print & Signage', 'Signage', 'signage2.jpg', 'contain', 1),
  ('Print & Signage', 'Signage', 'signage3.jpg', 'contain', 2),
  ('Print & Signage', 'Signage', 'signage4.jpg', 'contain', 3),
  ('Print & Signage', 'Signage', 'signage5.jpg', 'contain', 4),
  ('Print & Signage', 'Signage', 'signage6.jpg', 'contain', 5),
  ('Print & Signage', 'Roll-up Banners', 'roll-up.jpg', 'cover', 6),
  ('Print & Signage', 'Roll-up Banners', 'rollup-2.jpg', 'cover', 7),
  ('Print & Signage', 'Roll-up Banners', 'rollup-3.jpg', 'contain', 8),
  ('Print & Signage', 'Pop-up Banners', 'ppup-banner.jpg', 'cover', 9),
  ('Print & Signage', 'Tear Drop Banners', 'teardrops-2.jpg', 'contain', 10),
  ('Print & Signage', 'Tear Drop Banners', 'teardrops-4.jpg', 'cover', 11),
  ('Print & Signage', 'Tear Drop Banners', 'teardrops3.jpg', 'cover', 12),
  ('Print & Signage', 'Tents', 'tents.jpg', 'contain', 13),
  ('Print & Signage', 'Tents', 'tents2.jpg', 'cover', 14),
  ('Print & Signage', 'Flags', 'flag.jpg', 'contain', 15),
  ('Print & Signage', 'Flags', 'flag2.jpg', 'contain', 16),
  ('Print & Signage', 'Photo Stands', 'photo-stand.jpg', 'cover', 17),
  ('Print & Signage', 'Photo Stands', 'photo-stand-2.jpg', 'cover', 18),
  ('Print & Signage', 'Photo Booth Frames', 'photobooth.jpg', 'contain', 19),
  ('Print & Signage', 'Photo Booth Frames', 'photobooth2.jpg', 'contain', 20),
  ('Print & Signage', 'Frames', 'frames.jpg', 'contain', 21),
  ('Print & Signage', 'Wall Mounts', 'mounts.jpg', 'cover', 22),
  ('Print & Signage', 'Wall Mounts', 'mounts2.jpg', 'contain', 23),
  ('Print & Signage', 'Posters & Flyers', 'posters-fliers.jpg', 'cover', 24),
  ('Print & Signage', 'Magazines', 'magazines.jpg', 'contain', 25),
  ('Print & Signage', 'UV Printing', 'uv-printing.jpg', 'cover', 26),
  ('Print & Signage', 'UV Printing', 'uv-printing-2.jpg', 'cover', 27),
  ('Print & Signage', 'Engraving', 'engraving.jpg', 'cover', 28),
  ('Print & Signage', 'Engraving', 'engraving-2.jpg', 'cover', 29),
  ('Stationery & Office', 'Branded Notebooks', 'notebooks.jpg', 'cover', 0),
  ('Stationery & Office', 'Branded Notebooks', 'notebook2.jpg', 'cover', 1),
  ('Stationery & Office', 'Diaries', 'diaries.jpg', 'cover', 2),
  ('Stationery & Office', 'Bill Holders / Menus', 'billholder-menu2.jpg', 'cover', 3),
  ('Stationery & Office', 'Trophy Awards', 'trophy-awards.jpg', 'cover', 4),
  ('Stationery & Office', 'Trophy Awards', 'trophy-awards-2.jpg', 'cover', 5),
  ('Stationery & Office', 'Wall Clocks', 'wall-clock.jpg', 'contain', 6)
) as v(category_title, name, file, fit, sort_order)
join categories c on c.title = v.category_title;

-- 3. Older placeholder photos that were not replaced (mugs, keychains, gift
--    tags, passport holders, stickers, brochures, spiral notebooks) move to the
--    end of their category so the new work leads.
update catalogue_items
set sort_order = sort_order + 1000
where image_path like 'local:cat-%' and sort_order < 1000;

commit;
