import Image from "next/image";
import { cn } from "@/lib/utils";

export function NexinLogo({
  className,
  size = 32,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <Image
      src="/nexin-logo.png"
      alt="Nexin"
      width={size}
      height={size}
      priority
      className={cn("h-8 w-8 select-none", className)}
    />
  );
}

export function NexinWordmark({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <NexinLogo className="h-7 w-7" />
      <span className="font-display text-xl font-semibold tracking-[-0.04em] text-fg">
        Nexin
      </span>
    </div>
  );
}
