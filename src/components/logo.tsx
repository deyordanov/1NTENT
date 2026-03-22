export function Logo({ className }: { className?: string }) {
  return (
    <span className={`font-sans font-semibold tracking-tight ${className ?? ""}`}>
      <span className="text-primary">1</span>NTENT
    </span>
  );
}
