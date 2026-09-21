-- Show Print & Signage first, then Apparel & Uniforms, on the catalogue page.
update categories set sort_order = 0 where title = 'Print & Signage';
update categories set sort_order = 1 where title = 'Apparel & Uniforms';
update categories set sort_order = 2 where title = 'Drinkware';
update categories set sort_order = 3 where title = 'Promotional & Gift Items';
update categories set sort_order = 4 where title = 'Stationery & Office';


steve2026