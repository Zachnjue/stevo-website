import Image from "next/image";
import Reveal from "@/components/Reveal";

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
    <div className="grid grid-cols-2 gap-x-8 gap-y-14 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((item, i) => (
        <Reveal
          key={`${item.name}-${i}`}
          delay={(i % 4) * 60}
          className="crop-corners relative"
        >
          <div className="group">
            <div className="relative aspect-square w-full overflow-hidden border border-line bg-paper-deep">
              <Image
                src={`${basePath}/${item.file}`}
                alt={item.name}
                fill
                className={
                  fit === "contain"
                    ? "object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                    : "object-cover transition-transform duration-500 group-hover:scale-105"
                }
              />
            </div>
            <p className="eyebrow mt-3 text-ink-soft">
              <span className="text-brand-pink">
                {String(i + 1).padStart(2, "0")}
              </span>{" "}
              — {item.name}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
