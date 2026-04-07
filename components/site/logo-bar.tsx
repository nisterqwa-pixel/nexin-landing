const logos = [
  "Northwind",
  "Helix",
  "Forge & Co.",
  "Atlas",
  "Lumen",
  "Vantage",
  "Apex",
  "Foundry",
  "Mercer",
  "Halcyon",
];

export function LogoBar() {
  return (
    <section className="border-y-hair bg-cream">
      <div className="container py-12">
        <div className="grid items-center gap-10 lg:grid-cols-[260px_1fr]">
          <p className="font-mono text-[11px] uppercase leading-relaxed tracking-[0.16em] text-muted-fg">
            Operators shipping
            <br />
            real revenue with Nexin
          </p>
          <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div className="flex w-max gap-14 animate-marquee transition-[animation-duration] duration-500 group-hover:[animation-play-state:paused]">
              {[...logos, ...logos].map((n, idx) => (
                <span
                  key={`${n}-${idx}`}
                  className="whitespace-nowrap font-display text-[26px] font-semibold tracking-[-0.04em] text-fg/45 transition-colors duration-300 hover:text-blue group-hover:text-fg"
                >
                  {n}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
