"use client";

import { useActionState } from "react";
import { sendContactMessage } from "@/app/contact/actions";

// "colour" is for placing the form on a brand-colour background (white text).
export default function ContactForm({
  tone = "light",
}: {
  tone?: "light" | "colour";
}) {
  const [state, formAction, pending] = useActionState(sendContactMessage, {
    error: null,
    success: false,
  });

  const onColour = tone === "colour";
  const label = `eyebrow mb-2 block ${onColour ? "text-white/80" : "text-ink-soft"}`;
  const field = `w-full border-0 border-b bg-transparent py-2 transition-colors focus:outline-none ${
    onColour
      ? "border-white/40 text-white focus:border-white"
      : "border-line text-ink focus:border-brand-blue"
  }`;

  if (state?.success) {
    return (
      <p className={`mt-8 ${onColour ? "text-white" : "text-ink"}`}>
        Thanks — your message has been sent. We&apos;ll get back to you soon.
      </p>
    );
  }

  return (
    <form action={formAction} className="mt-8 flex flex-col gap-6">
      <div>
        <label className={label}>Name</label>
        <input name="name" required className={field} />
      </div>
      <div>
        <label className={label}>Email</label>
        <input type="email" name="email" required className={field} />
      </div>
      <div>
        <label className={label}>Message</label>
        <textarea name="message" rows={4} required className={field} />
      </div>

      {state?.error && (
        <p className={`text-sm ${onColour ? "font-semibold text-white" : "text-red-600"}`}>
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className={`eyebrow mt-2 self-start border px-7 py-3.5 transition-colors disabled:opacity-50 ${
          onColour
            ? "border-white text-white hover:bg-white hover:text-brand-blue-deep"
            : "border-ink text-ink hover:border-brand-blue hover:bg-brand-blue hover:text-white"
        }`}
      >
        {pending ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
