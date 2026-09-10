import Link from "next/link";
import Image from "next/image";
import ClientMarquee from "@/components/ClientMarquee";

const SERVICES = [
  {
    title: "Corporate Identity",
    desc: "Logos, brand collateral, and printed materials that give your brand a consistent, iconic look.",
    image: "/images/roll-up-banner.jpg",
  },
  {
    title: "Staff Uniform",
    desc: "Company, chef, school, sports, safety, and corporate uniforms customized to your specifications.",
    image: "/images/chef-uniform.jpg",
  },
  {
    title: "Printing",
    desc: "Gift bags, banners, notebooks, and promotional material branding that demands attention.",
    image: "/images/gift-bags.jpg",
  },
  {
    title: "Office Equipment",
    desc: "Stationery, printers, photocopy paper, desktops, and general supplies for your workplace.",
    image: "/images/office-supplies.jpg",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-black">
        <Image
          src="/images/printing-press.jpg"
          alt="Printing press running a large print job"
          fill
          priority
          className="object-cover opacity-40"
        />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-20 sm:py-28 md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-yellow">
              Ink is our underlying foundation
            </p>
            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
              Branding &amp; Printing that make brands{" "}
              <span className="text-brand-blue">iconic.</span>
            </h1>
            <p className="mt-5 max-w-md text-lg text-white/80">
              Thee Printing Hub is a vibrant, dynamic below-the-line company
              helping brands reach iconic status with materials that stand
              out and demand attention.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="rounded-full bg-brand-pink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-pink-700"
              >
                Get a Quote
              </Link>
              <Link
                href="/catalogue"
                className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                View Catalogue
              </Link>
            </div>
          </div>

          <div className="relative h-64 w-full overflow-hidden rounded-3xl sm:h-80">
            <Image
              src="/images/branded-apparel.jpg"
              alt="Stack of folded branded apparel"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/95 p-6 shadow-lg">
              <p className="text-sm font-semibold text-brand-black">
                Trusted by 15+ leading brands
              </p>
              <p className="mt-1 text-xs text-black/60">
                Gift bags · Uniforms · Corporate identity · Promotional merch
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="bg-brand-blue py-16 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold">What We Do</h2>
          <p className="mt-2 max-w-2xl text-white/85">
            From office equipment to staff uniforms, general supplies to full
            corporate identity — we cover every touchpoint of your brand.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="group overflow-hidden rounded-2xl bg-white/10 backdrop-blur transition-colors hover:bg-white/20"
              >
                <div className="relative h-36 w-full overflow-hidden">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-white/80">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/services"
              className="inline-block rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-blue-dark hover:bg-white/90"
            >
              Explore All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Vision / Mission / Values */}
      <section className="bg-zinc-50 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border-t-4 border-brand-pink bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-brand-black">Our Vision</h3>
              <p className="mt-3 text-sm text-black/70">
                To provide exceptional quality services and products to our
                clients, improving lives and becoming the world&apos;s most
                reliable branding agency.
              </p>
            </div>
            <div className="rounded-2xl border-t-4 border-brand-yellow bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-brand-black">Our Mission</h3>
              <p className="mt-3 text-sm text-black/70">
                Pace-setters for the industry in world-class product
                development that cares for the environment, empowering
                brands to build loyalty and advocacy.
              </p>
            </div>
            <div className="rounded-2xl border-t-4 border-brand-blue bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-brand-black">Core Values</h3>
              <ul className="mt-3 space-y-1 text-sm text-black/70">
                <li>Innovation</li>
                <li>Creativity</li>
                <li>Integrity</li>
                <li>Professionalism</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-2xl font-bold text-brand-black">
            Trusted by Leading Brands
          </h2>
        </div>
        <div className="mt-8">
          <ClientMarquee />
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-brand-pink py-14 text-center text-white">
        <Image
          src="/images/school-uniform.jpg"
          alt="Students in branded school uniforms"
          fill
          className="object-cover opacity-25"
        />
        <div className="relative mx-auto max-w-3xl px-6">
          <h2 className="text-3xl font-bold">
            Ready to give your brand an iconic look?
          </h2>
          <p className="mt-3 text-white/90">
            Talk to us about your next print run, uniform order, or branding
            campaign.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-block rounded-full bg-white px-8 py-3 text-sm font-semibold text-brand-pink hover:bg-white/90"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
