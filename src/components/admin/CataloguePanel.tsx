import { createClient } from "@/lib/supabase/server";
import AddCatalogueItemForm from "@/components/admin/AddCatalogueItemForm";
import AddCategoryForm from "@/components/admin/AddCategoryForm";
import CatalogueItemRow from "@/components/admin/CatalogueItemRow";

export default async function CataloguePanel() {
  const supabase = await createClient();

  const [{ data: categories }, { data: items }] = await Promise.all([
    supabase.from("categories").select("*").order("sort_order"),
    supabase
      .from("catalogue_items")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false }),
  ]);

  const categoryById = new Map((categories ?? []).map((c) => [c.id, c]));

  // Same order as the public catalogue: by category, then by item order.
  const categoryRank = new Map((categories ?? []).map((c, i) => [c.id, i]));
  const sortedItems = [...(items ?? [])].sort(
    (a, b) =>
      (categoryRank.get(a.category_id) ?? 0) -
      (categoryRank.get(b.category_id) ?? 0)
  );

  return (
    <div>
      <section className="border border-line p-6">
        <h2 className="font-display text-xl text-ink">Add a category</h2>
        <AddCategoryForm />
      </section>

      <section className="mt-8 border border-line p-6">
        <h2 className="font-display text-xl text-ink">Add a catalogue item</h2>
        <AddCatalogueItemForm categories={categories ?? []} />
      </section>

      <section className="mt-12">
        <h2 className="font-display text-xl text-ink">
          Existing items ({sortedItems.length})
        </h2>
        <div className="mt-6 flex flex-col divide-y divide-line border-t border-line">
          {sortedItems.map((item) => (
            <CatalogueItemRow
              key={item.id}
              item={item}
              categoryTitle={categoryById.get(item.category_id)?.title ?? "—"}
              categories={categories ?? []}
            />
          ))}
          {sortedItems.length === 0 && (
            <p className="py-6 text-sm text-ink-soft">No items yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
