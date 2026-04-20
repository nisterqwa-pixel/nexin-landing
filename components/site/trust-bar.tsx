const logos = [
  "Apex",
  "Northwind",
  "Lumen",
  "Forge & Co.",
  "Helix",
  "Vantage",
  "Foundry",
  "Atlas",
];

export function TrustBar() {
  return (
    <section className="border-y border-border/60 bg-muted/20 py-10">
      <div className="container">
        <p className="mb-6 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
          Betrodd av operatører som leverer ekte inntekter
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-70">
          {logos.map((name) => (
            <span
              key={name}
              className="text-lg font-semibold tracking-tight text-muted-foreground sm:text-xl"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
