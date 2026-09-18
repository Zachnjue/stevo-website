"use client";

import { useActionState } from "react";
import { signIn } from "@/app/admin/actions";

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(signIn, { error: null });

  return (
    <div className="mx-auto flex max-w-sm flex-col px-6 py-24 sm:py-32">
      <p className="eyebrow text-ink-soft">Admin</p>
      <h1 className="font-display mt-2 text-3xl text-ink">Sign in</h1>

      <form action={formAction} className="mt-8 flex flex-col gap-4">
        <label className="flex flex-col gap-2 text-sm text-ink-soft">
          Email
          <input
            type="email"
            name="email"
            required
            className="border border-line bg-paper px-4 py-3 text-ink outline-none focus:border-brand-blue"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-ink-soft">
          Password
          <input
            type="password"
            name="password"
            required
            className="border border-line bg-paper px-4 py-3 text-ink outline-none focus:border-brand-blue"
          />
        </label>

        {state?.error && (
          <p className="text-sm text-red-600">{state.error}</p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="eyebrow mt-2 border border-ink px-5 py-3 text-ink transition-colors hover:border-brand-blue hover:bg-brand-blue hover:text-white disabled:opacity-50"
        >
          {pending ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
