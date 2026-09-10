export default function RegMark({
  className = "",
  color = "currentColor",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke={color}
      strokeWidth="1.4"
    >
      <circle cx="16" cy="16" r="9" />
      <circle cx="16" cy="16" r="2.2" fill={color} stroke="none" />
      <path d="M16 1v8M16 23v8M1 16h8M23 16h8" />
    </svg>
  );
}
