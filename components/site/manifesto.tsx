export function Manifesto() {
  return (
    <section className="relative overflow-hidden bg-cream py-32 sm:py-40">
      {/* Decorative quote marks */}
      <div className="pointer-events-none absolute -left-8 top-12 font-serif text-[280px] italic leading-none text-blue/15 sm:-left-4 sm:text-[420px]">
        &ldquo;
      </div>
      <div className="pointer-events-none absolute -right-8 bottom-0 font-serif text-[280px] italic leading-none text-blue/15 sm:-right-4 sm:text-[420px]">
        &rdquo;
      </div>

      <div className="container relative">
        <div className="mx-auto max-w-5xl">
          <p className="mb-10 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-muted-fg">
            — Nexins driftsprinsipp
          </p>
          <p className="text-balance text-center font-display text-[44px] font-semibold leading-[0.98] tracking-[-0.05em] text-fg sm:text-[68px] md:text-[88px] lg:text-[104px]">
            Vi selger ikke{" "}
            <span className="font-serif italic text-blue">programvare.</span>
            <br />
            Vi selger{" "}
            <span className="relative inline-block">
              <span className="relative z-10 font-serif italic text-blue">
                timer tilbake
              </span>
              <span className="absolute -bottom-1 left-0 right-0 h-3 bg-blue/15" />
            </span>{" "}
            til teamet ditt.
          </p>

          <div className="mt-16 flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-line-strong" />
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-fg">
              Grunnlegger &amp; team — Nexin Labs
            </span>
            <div className="h-px w-12 bg-line-strong" />
          </div>
        </div>
      </div>
    </section>
  );
}
