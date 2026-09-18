"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type SignInState = { error: string | null };

export async function signIn(
  _prevState: SignInState,
  formData: FormData,
): Promise<SignInState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/admin");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function addCatalogueItem(_prevState: unknown, formData: FormData) {
  const supabase = await createClient();

  const name = String(formData.get("name") ?? "").trim();
  const categoryId = String(formData.get("category_id") ?? "");
  const fit = String(formData.get("fit") ?? "contain");
  const photo = formData.get("photo") as File | null;

  if (!name || !categoryId) {
    return { error: "Name and category are required." };
  }

  let imagePath: string | null = null;

  if (photo && photo.size > 0) {
    const ext = photo.name.split(".").pop() || "jpg";
    const path = `${categoryId}/${crypto.randomUUID()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("catalogue")
      .upload(path, photo);

    if (uploadError) {
      return { error: `Photo upload failed: ${uploadError.message}` };
    }

    imagePath = path;
  }

  const { error } = await supabase.from("catalogue_items").insert({
    name,
    category_id: categoryId,
    fit,
    image_path: imagePath,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin");
  revalidatePath("/catalogue");
  return { error: null };
}

export async function updateCatalogueItem(
  _prevState: unknown,
  formData: FormData,
) {
  const supabase = await createClient();

  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const categoryId = String(formData.get("category_id") ?? "");
  const fit = String(formData.get("fit") ?? "contain");
  const existingImagePath = String(formData.get("existing_image_path") ?? "");
  const photo = formData.get("photo") as File | null;

  if (!id || !name || !categoryId) {
    return { error: "Name and category are required." };
  }

  let imagePath: string | null = existingImagePath || null;

  if (photo && photo.size > 0) {
    const ext = photo.name.split(".").pop() || "jpg";
    const path = `${categoryId}/${crypto.randomUUID()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("catalogue")
      .upload(path, photo);

    if (uploadError) {
      return { error: `Photo upload failed: ${uploadError.message}` };
    }

    // Only remove the old photo if it was a real upload, not the seeded
    // "local:" placeholder that points at a file in public/images.
    if (existingImagePath && !existingImagePath.startsWith("local:")) {
      await supabase.storage.from("catalogue").remove([existingImagePath]);
    }

    imagePath = path;
  }

  const { error } = await supabase
    .from("catalogue_items")
    .update({ name, category_id: categoryId, fit, image_path: imagePath })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin");
  revalidatePath("/catalogue");
  return { error: null };
}

export async function deleteCatalogueItem(id: string, imagePath: string | null) {
  const supabase = await createClient();

  if (imagePath) {
    await supabase.storage.from("catalogue").remove([imagePath]);
  }

  await supabase.from("catalogue_items").delete().eq("id", id);

  revalidatePath("/admin");
  revalidatePath("/catalogue");
}

export async function addCategory(_prevState: unknown, formData: FormData) {
  const supabase = await createClient();
  const title = String(formData.get("title") ?? "").trim();

  if (!title) {
    return { error: "Category name is required." };
  }

  const { error } = await supabase.from("categories").insert({ title });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin");
  revalidatePath("/catalogue");
  return { error: null };
}
