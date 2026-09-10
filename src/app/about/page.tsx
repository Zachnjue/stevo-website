import type { Metadata } from "next";
import Image from "next/image";
import VisionMissionValues from "@/components/VisionMissionValues";
import Reveal from "@/components/Reveal";
import RegMark from "@/components/RegMark";

export const metadata: Metadata = {
  title: "About Us | Thee Printing Hub",
  description:
    "Learn about Thee Printing Hub — our story, vision, mission, and core values.",
};

export default function AboutPage() {
  return (
    <div>
      <section className="grid border-b border-line md:grid-cols-[1fr_1.1fr]">
        <div className="crop-corners relative min-h-[280px] md:min-h-0 md:order-2">
          <Image
            src="/images/office-supplies.jpg"
            alt="Office supplies"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center px-6 py-16 sm:px-10 sm:py-24 md:order-1">
          <p className="eyebrow flex items-center gap-2 text-ink-soft">
            <RegMark className="h-4 w-4 text-brand-blue" />
            About Us
          </p>
          <h1 className="font-display mt-4 text-5xl leading-tight text-ink sm:text-6xl">
            Who We Are
          </h1>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10 sm:py-28">
        <div className="mx-auto max-w-3xl">
          <Reveal className="font-display text-2xl leading-relaxed text-ink sm:text-3xl">
            <p>
              Thee Printing Hub is a vibrant, dynamic below-the-line company
              dealing with branding and printing. We formulate traction and
              create relationships that beget trust.
            </p>
          </Reveal>
          <Reveal delay={100} className="mt-8 text-ink-soft">
            <p>
              We are committed and passionate about what we do. Our business
              is to help brands reach their iconic status by providing
              branding materials that stand out and demand the attention of
              consumers. Our activities include gift bags and promotional
              material branding, staff uniforms, corporate identity, office
              equipment, and general supplies.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="crop-corners relative aspect-[16/7] border-y border-line">
        <Image
          src="/images/gift-bags.jpg"
          alt="Branded gift bags and promotional items"
          fill
          className="object-cover"
        />
      </section>

      <section className="px-6 py-20 sm:px-10 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <VisionMissionValues />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
