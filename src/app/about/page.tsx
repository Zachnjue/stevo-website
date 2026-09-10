import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us | Thee Printing Hub",
  description:
    "Learn about Thee Printing Hub — our story, vision, mission, and core values.",
};

export default function AboutPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-brand-black py-16 text-white">
        <Image
          src="/images/office-supplies.jpg"
          alt="Office supplies"
          fill
          className="object-cover opacity-25"
        />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-yellow">
            About Us
          </p>
          <h1 className="mt-2 text-4xl font-bold">Who We Are</h1>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-2 md:items-center">
          <div className="text-lg leading-relaxed text-black/80">
            <p>
              Thee Printing Hub is a vibrant, dynamic below-the-line company
              dealing with branding and printing. We formulate traction and
              create relationships that beget trust. We are committed and
              passionate about what we do.
            </p>
            <p className="mt-6">
              Our business is to help brands reach their iconic status by
              providing branding materials that stand out and demand the
              attention of consumers. Our activities include gift bags and
              promotional material branding, staff uniforms, corporate
              identity, office equipment, and general supplies.
            </p>
          </div>
          <div className="relative h-72 w-full overflow-hidden rounded-3xl sm:h-96">
            <Image
              src="/images/gift-bags.jpg"
              alt="Branded gift bags and promotional items"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-zinc-50 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 sm:grid-cols-3">
          <div className="rounded-2xl border-t-4 border-brand-pink bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-brand-black">Our Vision</h2>
            <p className="mt-3 text-sm text-black/70">
              To provide exceptional quality services and products to our
              clients, improving lives and becoming the world&apos;s most
              reliable branding agency.
            </p>
          </div>
          <div className="rounded-2xl border-t-4 border-brand-yellow bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-brand-black">Our Mission</h2>
            <p className="mt-3 text-sm text-black/70">
              Pace-setter for the industry in providing world-class product
              development by caring for the environment. To empower brands
              to make connections that strengthen the loyalty, conviction,
              and advocacy of consumers.
            </p>
          </div>
          <div className="rounded-2xl border-t-4 border-brand-blue bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-brand-black">Core Values</h2>
            <ul className="mt-3 space-y-2 text-sm text-black/70">
              <li>Innovation</li>
              <li>Creativity</li>
              <li>Integrity</li>
              <li>Professionalism</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
