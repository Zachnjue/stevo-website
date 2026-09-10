import Image from "next/image";
import Reveal from "@/components/Reveal";

const ASPECTS = ["aspect-square", "aspect-[4/5]", "aspect-[4/3]", "aspect-square"];

export default function PhotoMasonry({
  items,
  basePath,
  fit = "contain",
}: {
  items: { name: string; file: string }[];
  basePath: string;
  fit?: "contain" | "cover";
}) {
  return (
    <div className="columns-2 gap-4 sm:columns-3 lg:columns-4">
      {items.map((item, i) => (
        <Reveal
          key={`${item.name}-${i}`}
          delay={(i % 4) * 80}
          className="crop-corners relative mb-4 break-inside-avoid"
        >
          <div className="group overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div
              className={`relative w-full bg-zinc-50 ${ASPECTS[i % ASPECTS.length]}`}
            >
              <Image
                src={`${basePath}/${item.file}`}
                alt={item.name}
                fill
                className={
                  fit === "contain"
                    ? "object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                    : "object-cover transition-transform duration-300 group-hover:scale-105"
                }
              />
            </div>
            <p className="p-3 text-center text-sm font-medium text-black/80">
              {item.name}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
