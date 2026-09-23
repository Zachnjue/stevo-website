import Link from "next/link";
import Reveal from "@/components/Reveal";

// Real client feedback, taken from WhatsApp conversations. Kept verbatim —
// short as some of them are — rather than rewritten, since these are
// people's actual words, not copy we wrote for them.
const TESTIMONIALS = [
  {
    quote: "I loved everything. Beyond impressed.",
    name: "Nyambura Mwangi",
    context: "Client",
  },
  {
    quote: "Good stuff!",
    name: "Rose Ralak",
    context: "Client",
  },
  {
    quote: "Perfect.",
    name: "Tshepo Mokoena",
    context: "Client",
  },
  {
    quote: "Aaaaw very nice, iko sawa kabisaaa.",
    name: "Debra",
    context: "Jade's Cake House",
  },
  {
    quote: "Then that's perfect :)",
    name: "Rebecca Lyerly",
    context: "Client",
  },
  {
    quote: "The hoodie looks so good. We love it, thank you!",
    name: "Client",
    context: "Custom Hoodie",
  },
];

export default function Testimonials({
  limit,
  moreHref,
}: {
  /** Show only the first N testimonials — for a homepage teaser. */
  limit?: number;
  /** If set, shows a "Read more" link to the full list (e.g. the About page). */
  moreHref?: string;
}) {
  const items = limit ? TESTIMONIALS.slice(0, limit) : TESTIMONIALS;
  const track = [...items, ...items];

  return (
    <section className="border-t border-line bg-paper-deep px-6 py-20 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow text-accent">Client Testimonials</p>
            <h2 className="display-light mt-3 text-5xl leading-[1.02] text-ink sm:text-7xl">
              What it&apos;s like
              <br />
              working with us.
            </h2>
          </div>
          {moreHref && (
            <Link href={moreHref} className="eyebrow link-reveal shrink-0 text-ink">
              Read More →
            </Link>
          )}
        </Reveal>
      </div>

      <Reveal className="relative mt-14 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
        <div className="flex w-max animate-marquee">
          {track.map((t, i) => (
            <div
              key={`${t.name}-${i}`}
              className="flex h-56 w-[22rem] shrink-0 flex-col justify-between border border-line bg-white p-8 sm:p-10"
            >
              <p className="font-display text-2xl leading-snug text-ink">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="eyebrow mt-6 text-ink-soft">
                {t.name} <span className="text-ink-soft/60">— {t.context}</span>
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
