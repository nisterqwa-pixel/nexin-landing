import {
  SiHubspot,
  SiSalesforce,
  SiOpenai,
  SiAnthropic,
  SiSlack,
  SiGmail,
  SiNotion,
  SiZapier,
  SiGooglecalendar,
  SiAirtable,
} from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import type { IconType } from "react-icons";

type Tool = { Icon: IconType; name: string };

const stack: Tool[] = [
  { Icon: SiHubspot, name: "HubSpot" },
  { Icon: SiSalesforce, name: "Salesforce" },
  { Icon: FaLinkedin, name: "LinkedIn" },
  { Icon: SiOpenai, name: "OpenAI" },
  { Icon: SiAnthropic, name: "Anthropic" },
  { Icon: SiGmail, name: "Gmail" },
  { Icon: SiGooglecalendar, name: "Google Calendar" },
  { Icon: SiSlack, name: "Slack" },
  { Icon: SiNotion, name: "Notion" },
  { Icon: SiZapier, name: "Zapier" },
  { Icon: SiAirtable, name: "Airtable" },
];

export function LogoBar() {
  return (
    <section className="border-y-hair bg-cream">
      <div className="container py-14">
        <div className="grid items-center gap-10 lg:grid-cols-[280px_1fr]">
          <div>
            <p className="font-mono text-[11px] uppercase leading-relaxed tracking-[0.2em] text-muted-fg">
              Kobles til stacken
              <br />
              teamet ditt allerede kjører
            </p>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-fg/60">
              30+ native integrasjoner
            </p>
          </div>
          <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div className="flex w-max animate-marquee items-center gap-14 transition-[animation-duration] duration-500 group-hover:[animation-play-state:paused]">
              {[...stack, ...stack].map(({ Icon, name }, idx) => (
                <div
                  key={`${name}-${idx}`}
                  className="group/item flex items-center gap-3 whitespace-nowrap"
                  aria-label={name}
                >
                  <Icon className="h-7 w-7 text-fg/55 transition-colors duration-300 group-hover/item:text-fg" />
                  <span className="font-display text-[20px] font-semibold tracking-[-0.03em] text-fg/55 transition-colors duration-300 group-hover/item:text-fg">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
