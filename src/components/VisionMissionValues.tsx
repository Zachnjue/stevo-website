import Image from "next/image";

const CARDS = [
  {
    key: "vision",
    icon: "/images/icons/icon-vision-eye-circle.png",
    label: "Our",
    title: "Vision",
    gradient: "from-[#c0177f] to-[#6a1b8f]",
    body: "To provide exceptional quality services and products to our clients, improving lives and becoming the world's most reliable branding agency.",
  },
  {
    key: "mission",
    icon: "/images/icons/icon-mission-target-circle.png",
    label: "Our",
    title: "Mission",
    gradient: "from-[#f5b800] to-[#e07b1d]",
    body: "Pace-setters for the industry in world-class product development that cares for the environment, empowering brands to build loyalty and advocacy.",
  },
  {
    key: "values",
    icon: "/images/icons/icon-values-diamond-circle.png",
    label: "Core",
    title: "Values",
    gradient: "from-[#1f8fcf] to-[#0f4f7a]",
    body: "Innovation, Creativity, Integrity, Professionalism.",
  },
];

export default function VisionMissionValues() {
  return (
    <div className="grid gap-10 pt-10 sm:grid-cols-3">
      {CARDS.map((c) => (
        <div key={c.key} className="relative pt-8">
          <div className="absolute -top-2 left-1/2 z-10 -translate-x-1/2">
            <Image
              src={c.icon}
              alt=""
              width={80}
              height={80}
              className="drop-shadow-lg"
            />
          </div>

          <div className="relative rounded-3xl bg-white px-6 pb-8 pt-12 text-center text-ink shadow-lg">
            <p className="text-sm leading-relaxed text-ink-soft">{c.body}</p>
            <div className="absolute -bottom-3 left-1/2 h-6 w-6 -translate-x-1/2 rotate-45 bg-white" />
          </div>

          <div
            className={`-mt-3 rounded-b-3xl bg-gradient-to-br ${c.gradient} px-6 pb-6 pt-7 text-center text-white shadow-lg`}
          >
            <p className="text-lg">{c.label}</p>
            <p className="font-display text-2xl font-bold">{c.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
