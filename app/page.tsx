import { SiteNav } from "@/components/site/nav";
import { Hero } from "@/components/site/hero";
import { LogoBar } from "@/components/site/logo-bar";
import { ContextLoss } from "@/components/site/context-loss";
import { Comparison } from "@/components/site/comparison";
import { LeadGen } from "@/components/site/lead-gen";
import { Services } from "@/components/site/services";
import { GrowthStory } from "@/components/site/growth-story";
import { Manifesto } from "@/components/site/manifesto";
import { Testimonials } from "@/components/site/testimonials";
import { FinalCta } from "@/components/site/cta";
import { SiteFooter } from "@/components/site/footer";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <GrowthStory />
        <LogoBar />
        <ContextLoss />
        <Comparison />
        <LeadGen />
        <Services />
        <Manifesto />
        <Testimonials />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
