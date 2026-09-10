import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Thee Printing Hub",
  description:
    "Get in touch with Thee Printing Hub for branding, printing, uniforms, and office supplies.",
};

export default function ContactPage() {
  return (
    <div>
      <section className="bg-brand-blue py-16 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-yellow">
            Contact Us
          </p>
          <h1 className="mt-2 text-4xl font-bold">Let&apos;s Talk</h1>
          <p className="mt-3 max-w-2xl text-white/85">
            Reach out for quotes, custom orders, or general enquiries.
          </p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-brand-black">Address</h2>
            <dl className="mt-4 space-y-3 text-black/70">
              <div>
                <dt className="font-semibold text-brand-black">Location</dt>
                <dd>Latema Plaza Building, 3rd Floor, Room No. 302</dd>
              </div>
              <div>
                <dt className="font-semibold text-brand-black">Phone</dt>
                <dd>
                  <a href="tel:0748679132" className="hover:text-brand-pink">
                    0748 679 132
                  </a>
                </dd>
              </div>
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
            </dl>
          </div>

          <form
            action="mailto:theeprinting.hub@gmail.com"
            method="post"
            encType="text/plain"
            className="flex flex-col gap-4 rounded-2xl bg-zinc-50 p-6 shadow-sm"
          >
            <div>
              <label className="mb-1 block text-sm font-medium text-brand-black">
                Name
              </label>
              <input
                name="name"
                required
                className="w-full rounded-lg border border-black/10 px-4 py-2 focus:border-brand-blue focus:outline-none"
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
                className="w-full rounded-lg border border-black/10 px-4 py-2 focus:border-brand-blue focus:outline-none"
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
                className="w-full rounded-lg border border-black/10 px-4 py-2 focus:border-brand-blue focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="mt-2 rounded-full bg-brand-pink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-pink-700"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
