import Image from "next/image";
import Reveal from "@/components/Reveal";

type CatalogueItem = {
  name: string;
  file?: string;
  url?: string;
  fit?: "contain" | "cover";
};

export default function PhotoMasonry({
  items,
  basePath,
  fit = "contain",
  startIndex = 0,
}: {
  items: CatalogueItem[];
  basePath: string;
  fit?: "contain" | "cover";
  startIndex?: number;
}) {
  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-14 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((item, i) => {
        const src = item.url ?? (item.file ? `${basePath}/${item.file}` : null);
        const itemFit = item.fit ?? fit;
        return (
        <Reveal
          key={`${item.name}-${i}`}
          delay={(i % 4) * 60}
          className="crop-corners relative"
        >
          <div className="group">
            <div className="relative aspect-square w-full overflow-hidden border border-line bg-paper-deep">
              {src ? (
                <Image
                  src={src}
                  alt={item.name}
                  fill
                  className={
                    itemFit === "contain"
                      ? "object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                      : "object-cover transition-transform duration-500 group-hover:scale-105"
                  }
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center p-6 text-center">
                  <p className="eyebrow text-ink-soft/60">Photo coming soon</p>
                </div>
              )}
            </div>
            <p className="eyebrow mt-3 text-ink-soft">
              <span className="text-brand-pink">
                {String(startIndex + i + 1).padStart(2, "0")}
              </span>{" "}
              — {item.name}
            </p>
          </div>
        </Reveal>
        );
      })}
    </div>
  );
}
