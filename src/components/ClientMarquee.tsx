const CLIENTS = [
  { name: "Rainforest Alliance", color: "bg-emerald-600" },
  { name: "Premier Airlines", color: "bg-indigo-600" },
  { name: "Serene Health Connect", color: "bg-teal-600" },
  { name: "Galooli", color: "bg-lime-600" },
  { name: "Kencream Sacco", color: "bg-blue-600" },
  { name: "NRG Radio", color: "bg-red-600" },
  { name: "Halcyon Health Care Centre", color: "bg-green-600" },
  { name: "Zero Malaria Campaign Coalition", color: "bg-orange-600" },
  { name: "Don Bosco Aid", color: "bg-amber-600" },
  { name: "Kenya Railways", color: "bg-red-700" },
  { name: "Isuzu", color: "bg-red-600" },
  { name: "Mayar", color: "bg-emerald-700" },
  { name: "JustMarkets", color: "bg-blue-700" },
  { name: "Crystal Gardens", color: "bg-green-600" },
  { name: "The Custom Kiosk", color: "bg-zinc-700" },
  { name: "Exquisite Expo Concepts", color: "bg-sky-600" },
];

function initials(name: string) {
  return name
    .split(" ")
    .filter((w) => w[0] === w[0]?.toUpperCase())
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function LogoBadge({ name, color }: { name: string; color: string }) {
  return (
    <div className="flex shrink-0 items-center gap-3 rounded-full border border-black/10 bg-white px-5 py-3 shadow-sm">
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${color}`}
      >
        {initials(name)}
      </span>
      <span className="whitespace-nowrap text-sm font-semibold text-brand-black">
        {name}
      </span>
    </div>
  );
}

export default function ClientMarquee() {
  const track = [...CLIENTS, ...CLIENTS];

  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className="flex w-max animate-marquee gap-4 py-2">
        {track.map((c, i) => (
          <LogoBadge key={`${c.name}-${i}`} name={c.name} color={c.color} />
        ))}
      </div>
    </div>
  );
}
