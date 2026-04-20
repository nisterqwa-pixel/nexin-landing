import { Hourglass, MailX, Layers } from "lucide-react";

const problems = [
  {
    label: "MANUELT SLIT",
    icon: Hourglass,
    title: "Dine beste folk gjør robotarbeid.",
    body: "SDR-er som kopierer fra regneark. Ops som jager statuser i Slack. Timer av menneskelig oppmerksomhet brent på oppgaver et system burde eie.",
    stat: "23 t/uke",
    statLabel: "bortkastet per ansatt",
  },
  {
    label: "KALD PIPELINE",
    icon: MailX,
    title: "Pipelinen din er en flat linje.",
    body: "Outbound føles som gjetting. Lister blir utdaterte. Svar sildrer inn. Prognosene dine lever på håp og én stor avtale som kanskje lukkes.",
    stat: "<2%",
    statLabel: "gjennomsnittlig svarrate",
  },
  {
    label: "VERKTØYKAOS",
    icon: Layers,
    title: "Stacken din er 14 verktøy som ikke snakker.",
    body: "Hvert team kjøpte sin egen SaaS. Ingenting synkroniserer. Rapportering er et Frankenstein av CSV-er. AI er skrudd på, ikke bygd inn.",
    stat: "14+",
    statLabel: "ukoordinerte verktøy",
  },
];

export function Problem() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-amber-400/80">
            // Kostnaden ved å ikke gjøre noe
          </p>
          <h2 className="text-balance text-4xl font-semibold tracking-tighter sm:text-5xl md:text-6xl">
            Du betaler 2 mill i året
            <br />
            for arbeid en maskin burde gjøre.
          </h2>
          <p className="mt-6 text-balance text-lg text-muted-foreground">
            De fleste selskaper har ikke et strategiproblem. De har et
            utførelsesproblem — og flaskehalsen er menneskelig kapasitet.
          </p>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
          {problems.map(({ label, icon: Icon, title, body, stat, statLabel }) => (
            <div
              key={label}
              className="group relative bg-background p-8 transition-colors hover:bg-muted/30"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {label}
                </span>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <h3 className="text-balance text-xl font-semibold tracking-tight">
                {title}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">{body}</p>
              <div className="mt-8 flex items-baseline gap-2 border-t border-border pt-6">
                <span className="text-3xl font-semibold tracking-tight text-amber-400">
                  {stat}
                </span>
                <span className="text-xs text-muted-foreground">
                  {statLabel}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
