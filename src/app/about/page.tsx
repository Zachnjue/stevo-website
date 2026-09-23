import type { Metadata } from "next";
import Image from "next/image";
import VisionMissionValues from "@/components/VisionMissionValues";
import Testimonials from "@/components/Testimonials";
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
      <section className="grid bg-brand-pink text-white md:grid-cols-[1fr_1.1fr]">
        <div className="crop-corners relative min-h-[280px] md:min-h-[440px] md:order-2">
          <Image
            src="/images/catalogue/hoodie.jpg"
            alt="Embroidered hoodies laid out on a Thee Printing Hub branded backdrop"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center px-6 py-16 sm:px-10 sm:py-24 md:order-1">
          <p className="eyebrow flex items-center gap-2 text-white/90">
            <RegMark className="h-4 w-4" />
            About Us
          </p>
          <h1 className="display-light mt-6 text-6xl leading-[0.98] sm:text-7xl lg:text-8xl">
            Who we are.
          </h1>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10 sm:py-28">
        <div className="mx-auto max-w-3xl">
          <Reveal className="display-light text-3xl leading-[1.2] text-ink sm:text-5xl">
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
          src="/images/catalogue/tents.jpg"
          alt="Two green branded event tents"
          fill
          className="object-cover"
        />
      </section>

      <section className="border-t border-line px-6 py-20 sm:px-10 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <VisionMissionValues />
          </Reveal>
        </div>
      </section>

      <div id="testimonials">
        <Testimonials />
      </div>
    </div>
  );
}
