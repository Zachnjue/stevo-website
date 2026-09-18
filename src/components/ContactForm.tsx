"use client";

import { useActionState } from "react";
import { sendContactMessage } from "@/app/contact/actions";

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactMessage, {
    error: null,
    success: false,
  });

  if (state?.success) {
    return (
      <p className="mt-8 text-ink">
        Thanks — your message has been sent. We&apos;ll get back to you soon.
      </p>
    );
  }

  return (
    <form action={formAction} className="mt-8 flex flex-col gap-6">
      <div>
        <label className="eyebrow mb-2 block text-ink-soft">Name</label>
        <input
          name="name"
          required
          className="w-full border-0 border-b border-line bg-transparent py-2 text-ink transition-colors focus:border-brand-blue focus:outline-none"
        />
      </div>
      <div>
        <label className="eyebrow mb-2 block text-ink-soft">Email</label>
        <input
          type="email"
          name="email"
          required
          className="w-full border-0 border-b border-line bg-transparent py-2 text-ink transition-colors focus:border-brand-blue focus:outline-none"
        />
      </div>
      <div>
        <label className="eyebrow mb-2 block text-ink-soft">Message</label>
        <textarea
          name="message"
          rows={4}
          required
          className="w-full border-0 border-b border-line bg-transparent py-2 text-ink transition-colors focus:border-brand-blue focus:outline-none"
        />
      </div>

      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="eyebrow mt-2 self-start border border-ink px-7 py-3.5 text-ink transition-colors hover:border-brand-blue hover:bg-brand-blue hover:text-white disabled:opacity-50"
      >
        {pending ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
