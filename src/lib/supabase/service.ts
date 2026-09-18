import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Server-only client that bypasses RLS using the service role key. Never
// import this from client components or expose the key with NEXT_PUBLIC_.
// Used by the cron route, which has no logged-in user/session to satisfy
// the "authenticated" RLS policies on invoices/transactions.
export function createServiceClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}
