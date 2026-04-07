import { SiteNav } from "@/components/site/nav";
import { Hero } from "@/components/site/hero";
import { LogoBar } from "@/components/site/logo-bar";
import { ContextLoss } from "@/components/site/context-loss";
import { Comparison } from "@/components/site/comparison";
import { Framework } from "@/components/site/framework";
import { LeadGen } from "@/components/site/lead-gen";
import { Services } from "@/components/site/services";
import { Stats } from "@/components/site/stats";
import { Manifesto } from "@/components/site/manifesto";
import { Process } from "@/components/site/process";
import { Testimonials } from "@/components/site/testimonials";
import { FinalCta } from "@/components/site/cta";
import { SiteFooter } from "@/components/site/footer";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <LogoBar />
        <ContextLoss />
        <Comparison />
        <Framework />
        <LeadGen />
        <Services />
        <Stats />
        <Manifesto />
        <Process />
        <Testimonials />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
