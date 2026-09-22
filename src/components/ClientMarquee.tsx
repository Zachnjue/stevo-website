import Image from "next/image";

// Logos are shown in their original brand colours, so this strip belongs on a
// light background (see the wrapper section in app/page.tsx).
const CLIENTS = [
  { name: "Rainforest Alliance", file: "rainforest-alliance.png", w: 1124, h: 349 },
  { name: "Premier Airlines", file: "premier-airlines.png", w: 1017, h: 166 },
  { name: "Serene Health Connect", file: "serene-health-connect.png", w: 1043, h: 402 },
  { name: "Kencream Sacco", file: "kencream.png", w: 995, h: 715 },
  { name: "NRG Radio", file: "nrg-radio.png", w: 600, h: 600 },
  { name: "Halcyon Health Care Centre", file: "halcyon.png", w: 1039, h: 808 },
  { name: "Zero Malaria Campaign Coalition", file: "zero-malaria.png", w: 395, h: 204 },
  { name: "Don Bosco Aid", file: "don-bosco-aid.png", w: 900, h: 537 },
  { name: "Kenya Railways", file: "kenya-railways.png", w: 320, h: 320 },
  { name: "Isuzu", file: "isuzu.png", w: 473, h: 96 },
  { name: "Mayar", file: "mayar.png", w: 343, h: 287 },
  { name: "JustMarkets", file: "justmarkets.png", w: 1005, h: 141 },
  { name: "Crystal Gardens", file: "crystal-gardens.png", w: 1013, h: 483 },
  { name: "The Custom Kiosk", file: "custom-kiosk.png", w: 1103, h: 816 },
  { name: "Exquisite Expo Concepts", file: "exquisite-expo.png", w: 961, h: 488 },
  { name: "Biker's Family Fest", file: "bikers-family-fest.png", w: 1059, h: 667 },
  { name: "Kijani Supplies", file: "kijani-supplies.jpg", w: 447, h: 447 },
  { name: "Top Level Management", file: "tlm.png", w: 441, h: 441 },
  { name: "MyAd Tangazoletu", file: "myad-tangazoletu.jpg", w: 447, h: 447 },
  { name: "Kivulini Eco-Park", file: "kivulini-eco-park.jpg", w: 447, h: 447 },
  { name: "Momentum", file: "momentum.png", w: 347, h: 145 },
  { name: "Ground Tv", file: "ground-tv.jpg", w: 1536, h: 1024 },
  { name: "JenaPay", file: "jenapay.jpg", w: 200, h: 200 },
  { name: "KRNK Nyumba Kumi", file: "krnk.png", w: 779, h: 823 },
  { name: "The Legacy Hub", file: "legacy-hub.png", w: 1075, h: 721 },
  { name: "sondr. Studio", file: "sondr-studio.png", w: 996, h: 996 },
  { name: "Tandhan SSS", file: "tandhan.png", w: 1066, h: 237 },
  { name: "We Do Bamboo", file: "we-do-bamboo.png", w: 1059, h: 1051 },
];

// Size each logo to roughly the same visual weight (area), so wide wordmarks
// aren't dwarfed by, or dwarfing, tall marks. Capped so nothing gets huge.
const TARGET_AREA = 12500;
const MAX_W = 180;
const MAX_H = 76;

function displaySize(w: number, h: number) {
  const ratio = w / h;
  let dw = Math.sqrt(TARGET_AREA * ratio);
  let dh = dw / ratio;
  if (dw > MAX_W) {
    dw = MAX_W;
    dh = dw / ratio;
  }
  if (dh > MAX_H) {
    dh = MAX_H;
    dw = dh * ratio;
  }
  return { width: Math.round(dw), height: Math.round(dh) };
}

function LogoBadge({ name, file, w, h }: { name: string; file: string; w: number; h: number }) {
  return (
    <div className="flex h-28 w-56 shrink-0 items-center justify-center px-6">
      <Image
        src={`/images/clients/${file}`}
        alt={name}
        width={w}
        height={h}
        style={displaySize(w, h)}
        className="object-contain transition-transform duration-300 hover:scale-105"
      />
    </div>
  );
}

export default function ClientMarquee() {
  const track = [...CLIENTS, ...CLIENTS];

  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div className="flex w-max animate-marquee">
        {track.map((c, i) => (
          <LogoBadge key={`${c.name}-${i}`} {...c} />
        ))}
      </div>
    </div>
  );
}
