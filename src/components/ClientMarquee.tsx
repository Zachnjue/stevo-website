import Image from "next/image";

const CLIENTS = [
  { name: "Rainforest Alliance", file: "rainforest-alliance.png", w: 528, h: 158 },
  { name: "Premier Airlines", file: "premier-airlines.png", w: 694, h: 119 },
  { name: "Serene Health Connect", file: "serene-health-connect.png", w: 527, h: 213 },
  { name: "Galooli", file: "galooli.png", w: 543, h: 174 },
  { name: "Kencream Sacco", file: "kencream.png", w: 509, h: 342 },
  { name: "NRG Radio", file: "nrg-radio.png", w: 239, h: 412 },
  { name: "Halcyon Health Care Centre", file: "halcyon.png", w: 691, h: 178 },
  { name: "Zero Malaria Campaign Coalition", file: "zero-malaria.png", w: 395, h: 204 },
  { name: "Don Bosco Aid", file: "don-bosco-aid.png", w: 368, h: 310 },
  { name: "Kenya Railways", file: "kenya-railways.png", w: 296, h: 240 },
  { name: "Isuzu", file: "isuzu.png", w: 473, h: 96 },
  { name: "Mayar", file: "mayar.png", w: 343, h: 287 },
  { name: "JustMarkets", file: "justmarkets.png", w: 566, h: 95 },
  { name: "Crystal Gardens", file: "crystal-gardens.png", w: 566, h: 214 },
  { name: "The Custom Kiosk", file: "custom-kiosk.png", w: 403, h: 302 },
  { name: "Exquisite Expo Concepts", file: "exquisite-expo.png", w: 391, h: 207 },
];

function LogoBadge({ name, file, w, h }: { name: string; file: string; w: number; h: number }) {
  return (
    <div className="flex h-20 w-44 shrink-0 items-center justify-center border-r border-line px-6 last:border-r-0">
      <Image
        src={`/images/clients/${file}`}
        alt={name}
        width={w}
        height={h}
        className="max-h-12 w-auto object-contain opacity-90 transition-all duration-300 hover:opacity-100 hover:scale-105"
      />
    </div>
  );
}

export default function ClientMarquee() {
  const track = [...CLIENTS, ...CLIENTS];

  return (
    <div className="relative overflow-hidden border-y border-line [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
      <div className="flex w-max animate-marquee">
        {track.map((c, i) => (
          <LogoBadge key={`${c.name}-${i}`} {...c} />
        ))}
      </div>
    </div>
  );
}
