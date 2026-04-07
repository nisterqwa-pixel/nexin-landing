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
    <div
      className={cn(
        "flex items-center font-display text-[22px] font-semibold leading-none tracking-[-0.05em] text-fg",
        className,
      )}
    >
      <Image
        src="/nexin-logo-plain.png"
        alt="Nexin"
        width={637}
        height={535}
        priority
        className="mr-[2px] inline-block h-[0.95em] w-auto select-none"
      />
      <span>exin</span>
      <span className="text-blue">.</span>
    </div>
  );
}
