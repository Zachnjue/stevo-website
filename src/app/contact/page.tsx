import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import TornDivider from "@/components/TornDivider";
import RegMark from "@/components/RegMark";

export const metadata: Metadata = {
  title: "Contact Us | Thee Printing Hub",
  description:
    "Get in touch with Thee Printing Hub for branding, printing, uniforms, and office supplies.",
};

export default function ContactPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-brand-blue py-16 text-white">
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-brand-yellow">
            <RegMark className="h-4 w-4" />
            Contact Us
          </p>
          <h1 className="mt-2 text-4xl font-bold">Let&apos;s Talk</h1>
          <p className="mt-3 max-w-2xl text-white/85">
            Reach out for quotes, custom orders, or general enquiries.
          </p>
        </div>
        <TornDivider color="#ffffff" className="absolute bottom-0 left-0" />
      </section>

      <section className="bg-dot-grid bg-white py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-2">
          <Reveal>
            <h2 className="text-2xl font-bold text-brand-black">Address</h2>
            <dl className="mt-6 space-y-5 text-black/70">
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <div>
                  <dt className="font-semibold text-brand-black">Location</dt>
                  <dd>Latema Plaza Building, 3rd Floor, Room No. 302</dd>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-pink/10 text-brand-pink">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <div>
                  <dt className="font-semibold text-brand-black">Phone</dt>
                  <dd>
                    <a href="tel:0748679132" className="hover:text-brand-pink">
                      0748 679 132
                    </a>
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-yellow/20 text-amber-600">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-10 5L2 7" />
                  </svg>
                </span>
                <div>
                  <dt className="font-semibold text-brand-black">Email</dt>
                  <dd>
                    <a
                      href="mailto:theeprinting.hub@gmail.com"
                      className="hover:text-brand-pink"
                    >
                      theeprinting.hub@gmail.com
                    </a>
                  </dd>
                </div>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={150}>
            <form
              action="mailto:theeprinting.hub@gmail.com"
              method="post"
              encType="text/plain"
              className="flex flex-col gap-4 rounded-2xl border border-black/5 bg-zinc-50 p-6 shadow-sm"
            >
              <div>
                <label className="mb-1 block text-sm font-medium text-brand-black">
                  Name
                </label>
                <input
                  name="name"
                  required
                  className="w-full rounded-lg border border-black/10 bg-white px-4 py-2 transition-colors focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-brand-black">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full rounded-lg border border-black/10 bg-white px-4 py-2 transition-colors focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-brand-black">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  className="w-full rounded-lg border border-black/10 bg-white px-4 py-2 transition-colors focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                />
              </div>
              <button
                type="submit"
                className="mt-2 rounded-full bg-brand-pink px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-pink-700 hover:shadow-lg"
              >
                Send Message
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
