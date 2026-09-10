const SEED = [
  0, 8, 40, 2, 80, 9, 120, 1, 160, 7, 200, 3, 240, 9, 280, 2, 320, 8, 360, 1,
  400, 6, 440, 3, 480, 9, 520, 1, 560, 7, 600, 2, 640, 8, 680, 1, 720, 6, 760,
  3, 800, 9, 840, 1, 880, 7, 920, 2, 960, 8, 1000, 1, 1040, 6, 1080, 3, 1120,
  9, 1160, 2, 1200, 0,
];

function buildPath(flip: boolean) {
  const pts: string[] = [];
  for (let i = 0; i < SEED.length; i += 2) {
    const x = SEED[i];
    const y = flip ? 12 - SEED[i + 1] : SEED[i + 1];
    pts.push(`${x},${y}`);
  }
  const top = flip ? 12 : 0;
  return `M0,${top} L${pts.join(" L")} L1200,${top} Z`;
}

export default function TornDivider({
  color,
  flip = false,
  className = "",
}: {
  color: string;
  flip?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 1200 12"
      preserveAspectRatio="none"
      className={`block h-6 w-full ${className}`}
      aria-hidden="true"
    >
      <path d={buildPath(flip)} fill={color} />
    </svg>
  );
}
