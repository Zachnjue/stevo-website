import Image from "next/image";

const CARDS = [
  {
    key: "vision",
    icon: "/images/icons/icon-vision-eye-circle.png",
    label: "Our Vision",
    border: "border-brand-pink",
    body: (
      <p className="mt-3 text-sm text-black/70">
        To provide exceptional quality services and products to our clients,
        improving lives and becoming the world&apos;s most reliable branding
        agency.
      </p>
    ),
  },
  {
    key: "mission",
    icon: "/images/icons/icon-mission-target-circle.png",
    label: "Our Mission",
    border: "border-brand-yellow",
    body: (
      <p className="mt-3 text-sm text-black/70">
        Pace-setters for the industry in world-class product development
        that cares for the environment, empowering brands to build loyalty
        and advocacy.
      </p>
    ),
  },
  {
    key: "values",
    icon: "/images/icons/icon-values-diamond-circle.png",
    label: "Core Values",
    border: "border-brand-blue",
    body: (
      <ul className="mt-3 space-y-1 text-sm text-black/70">
        <li>Innovation</li>
        <li>Creativity</li>
        <li>Integrity</li>
        <li>Professionalism</li>
      </ul>
    ),
  },
];

export default function VisionMissionValues() {
  return (
    <div className="grid gap-8 pt-10 sm:grid-cols-3">
      {CARDS.map((c) => (
        <div key={c.key} className="relative">
          <div className="absolute -top-8 left-1/2 z-10 -translate-x-1/2">
            <Image
              src={c.icon}
              alt=""
              width={72}
              height={72}
              className="drop-shadow-md"
            />
          </div>
          <div
            className={`rounded-2xl border-t-4 ${c.border} bg-white p-6 pt-10 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
          >
            <h3 className="text-xl font-bold text-brand-black">{c.label}</h3>
            {c.body}
          </div>
        </div>
      ))}
    </div>
  );
}
