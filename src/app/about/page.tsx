import type { Metadata } from "next";
import Image from "next/image";
import VisionMissionValues from "@/components/VisionMissionValues";
import Reveal from "@/components/Reveal";
import TornDivider from "@/components/TornDivider";
import RegMark from "@/components/RegMark";

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
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-brand-yellow">
            <RegMark className="h-4 w-4" />
            About Us
          </p>
          <h1 className="mt-2 text-4xl font-bold">Who We Are</h1>
        </div>
        <TornDivider color="#ffffff" className="absolute bottom-0 left-0" />
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-2 md:items-center">
          <Reveal className="text-lg leading-relaxed text-black/80">
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
          </Reveal>
          <Reveal
            delay={150}
            className="crop-corners relative h-72 w-full rounded-3xl sm:h-96"
          >
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              <Image
                src="/images/gift-bags.jpg"
                alt="Branded gift bags and promotional items"
                fill
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-zinc-50 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <VisionMissionValues />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
