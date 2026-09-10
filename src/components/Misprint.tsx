export default function Misprint({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <span className={`text-misprint ${className}`} data-text={children}>
      {children}
    </span>
  );
}
