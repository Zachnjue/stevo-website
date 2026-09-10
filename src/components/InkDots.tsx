export default function InkDots({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <div className="relative h-24 w-24 opacity-70 mix-blend-multiply">
        <span className="absolute left-0 top-2 h-12 w-12 rounded-full bg-brand-blue blur-[2px]" />
        <span className="absolute left-6 top-0 h-12 w-12 rounded-full bg-brand-pink blur-[2px]" />
        <span className="absolute left-3 top-8 h-12 w-12 rounded-full bg-brand-yellow blur-[2px]" />
        <span className="absolute left-10 top-9 h-9 w-9 rounded-full bg-brand-black blur-[2px]" />
      </div>
    </div>
  );
}
