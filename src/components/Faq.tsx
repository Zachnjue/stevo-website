import Reveal from "@/components/Reveal";

const FAQS = [
  {
    q: "Do you offer bulk printing?",
    a: "Yes we do.",
  },
  {
    q: "How long does an order take?",
    a: "Depending on the job, mostly a week is enough.",
  },
  {
    q: "Do you deliver?",
    a: "Within the CBD it's free. On other destinations we charge based on location and the mode of transportation to be used.",
  },
  {
    q: "Can you print my logo on merchandise?",
    a: "We do customize according to your specifications.",
  },
  {
    q: "What file formats do you accept?",
    a: "PDF, vector format.",
  },
  {
    q: "Do you offer branding and design services?",
    a: "Yes we do.",
  },
];

function FaqList() {
  return (
    <dl className="mt-8 divide-y divide-line border-t border-line">
      {FAQS.map((item, i) => (
        <Reveal key={item.q} delay={i * 60} className="py-5">
          <dt className="font-display text-lg text-ink">{item.q}</dt>
          <dd className="mt-2 text-sm text-ink-soft">{item.a}</dd>
        </Reveal>
      ))}
    </dl>
  );
}

/**
 * `compact`: renders just the heading + list (no section wrapper/max-width),
 * meant to be dropped into an existing grid column — e.g. side-by-side with
 * contact info on the Contact page.
 */
export default function Faq({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <Reveal>
        <p className="eyebrow text-accent">FAQ</p>
        <h2 className="font-display mt-2 text-2xl text-ink">
          Questions, answered.
        </h2>
        <FaqList />
      </Reveal>
    );
  }

  return (
    <section className="border-t border-line px-6 py-20 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="eyebrow text-accent">FAQ</p>
          <h2 className="display-light mt-3 text-5xl leading-[1.02] text-ink sm:text-6xl">
            Questions,
            <br />
            answered.
          </h2>
        </Reveal>
        <FaqList />
      </div>
    </section>
  );
}
