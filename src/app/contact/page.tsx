import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import RegMark from "@/components/RegMark";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Thee Printing Hub",
  description:
    "Get in touch with Thee Printing Hub for branding, printing, uniforms, and office supplies.",
};

export default function ContactPage() {
  return (
    <div>
      <section className="bg-brand-blue-deep px-6 py-16 text-white sm:px-10 sm:py-24">
        <p className="eyebrow flex items-center gap-2 text-white/90">
          <RegMark className="h-4 w-4" />
          Contact Us
        </p>
        <h1 className="display-light mt-6 text-6xl leading-[0.98] sm:text-7xl lg:text-8xl">
          Let&apos;s talk.
        </h1>
        <p className="mt-4 max-w-md text-white/85">
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
              <div className="border-t border-line pt-4">
                <dt className="eyebrow text-ink">Instagram</dt>
                <dd className="mt-1">
                  <a
                    href="https://www.instagram.com/theeprintinghub"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-reveal"
                  >
                    @theeprintinghub
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={150}>
            <p className="eyebrow text-accent">Send a Message</p>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
