import Link from "next/link";
import { NavLogo } from "./header-logo";
import { ArrowUpRight } from "lucide-react";

const links = [
  { href: "#lead-gen", label: "Lead Gen" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#results", label: "Results" },
  { href: "#contact", label: "Contact" },
];

export function SiteNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-hair bg-bg/80 backdrop-blur-xl">
      <div className="container flex h-[68px] items-center justify-between">
        <Link href="/" aria-label="Nexin home">
          <NavLogo />
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13px] font-medium tracking-tight text-fg/70 transition-colors hover:text-fg"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="#contact"
            className="hidden text-[13px] font-medium tracking-tight text-fg/70 transition-colors hover:text-fg sm:inline"
          >
            Sign in
          </Link>
          <Link
            href="#contact"
            className="group inline-flex items-center gap-1.5 rounded-full bg-fg px-4 py-2 text-[13px] font-medium tracking-tight text-bg transition-all hover:bg-blue"
          >
            Book a call
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
