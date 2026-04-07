import { cn } from "@/lib/utils";

export function SectionLabel({
  children,
  className,
  number,
}: {
  children: React.ReactNode;
  className?: string;
  number?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-fg",
        className,
      )}
    >
      {number && <span className="text-blue">{number}</span>}
      <span className="h-px w-8 bg-line-strong" />
      <span>{children}</span>
    </div>
  );
}
