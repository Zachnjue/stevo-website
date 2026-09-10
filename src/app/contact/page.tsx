import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import RegMark from "@/components/RegMark";

export const metadata: Metadata = {
  title: "Contact Us | Thee Printing Hub",
  description:
    "Get in touch with Thee Printing Hub for branding, printing, uniforms, and office supplies.",
};

export default function ContactPage() {
  return (
    <div>
      <section className="border-b border-line px-6 py-16 sm:px-10 sm:py-24">
        <p className="eyebrow flex items-center gap-2 text-ink-soft">
          <RegMark className="h-4 w-4 text-brand-blue" />
          Contact Us
        </p>
        <h1 className="font-display mt-4 text-5xl leading-tight text-ink sm:text-6xl">
          Let&apos;s Talk
        </h1>
        <p className="mt-4 max-w-md text-ink-soft">
          Reach out for quotes, custom orders, or general enquiries.
        </p>
      </section>

      <section className="px-6 py-16 sm:px-10 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-2">
          <Reveal>
            <p className="eyebrow text-accent">Address</p>
            <dl className="mt-8 space-y-6 text-ink-soft">
              <div className="border-t border-line pt-4">
                <dt className="eyebrow text-ink">Location</dt>
                <dd className="mt-1">
                  Latema Plaza Building, 3rd Floor, Room No. 302
                </dd>
              </div>
              <div className="border-t border-line pt-4">
                <dt className="eyebrow text-ink">Phone</dt>
                <dd className="mt-1">
                  <a href="tel:0748679132" className="link-reveal">
                    0748 679 132
                  </a>
                </dd>
              </div>
              <div className="border-t border-line pt-4">
                <dt className="eyebrow text-ink">Email</dt>
                <dd className="mt-1">
                  <a
                    href="mailto:theeprinting.hub@gmail.com"
                    className="link-reveal"
                  >
                    theeprinting.hub@gmail.com
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={150}>
            <p className="eyebrow text-accent">Send a Message</p>
            <form
              action="mailto:theeprinting.hub@gmail.com"
              method="post"
              encType="text/plain"
              className="mt-8 flex flex-col gap-6"
            >
              <div>
                <label className="eyebrow mb-2 block text-ink-soft">
                  Name
                </label>
                <input
                  name="name"
                  required
                  className="w-full border-0 border-b border-line bg-transparent py-2 text-ink transition-colors focus:border-brand-blue focus:outline-none"
                />
              </div>
              <div>
                <label className="eyebrow mb-2 block text-ink-soft">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full border-0 border-b border-line bg-transparent py-2 text-ink transition-colors focus:border-brand-blue focus:outline-none"
                />
              </div>
              <div>
                <label className="eyebrow mb-2 block text-ink-soft">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  className="w-full border-0 border-b border-line bg-transparent py-2 text-ink transition-colors focus:border-brand-blue focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="eyebrow mt-2 self-start border border-ink px-7 py-3.5 text-ink transition-colors hover:border-brand-blue hover:bg-brand-blue hover:text-white"
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
