# Nexin — Landing Page PRD

## 1. Overview
**Product:** Nexin — a SaaS automation business specialising in AI and automation, with a proven flagship product in **Lead Generation**.

**Goal of the page:** Convert qualified visitors (founders, marketing leads, sales heads at SMBs and mid-market companies) into booked discovery calls. Position Nexin as the no-nonsense partner that ships AI automations that actually move revenue — with Lead Gen as the proof point.

**Primary CTA:** *Book a strategy call*
**Secondary CTA:** *See lead-gen in action*

## 2. Audience
- **Primary:** Founders, Heads of Sales, Heads of Growth at companies ($1M–$50M ARR) drowning in manual workflows.
- **Secondary:** Operations leads who feel the pain of patchwork tools and disconnected data.
- **Tertiary:** Agencies looking for an AI automation partner to white-label.

**Pains the page must speak to:**
- Wasted hours on repetitive manual work
- Cold pipelines / inconsistent lead flow
- Tool sprawl with nothing actually connected
- Anxiety that "AI" is hype until it ships outcomes

## 3. Brand & Visual Direction

**Mood:** Confident, modern, technical, and a little brutalist. Inspired by Vercel's dark gridded aesthetic and ClickUp's bold typographic confidence.

**Logo:** Bold black geometric "N" — modernist, sharp.

**Palette:**
- Background: pure black `#000` and zinc-950
- Surface: zinc-900 / zinc-800
- Foreground: white / zinc-300
- Accent: amber-400 (`#fbbf24`) — warmth + energy, echoing the orange tones in the inspiration imagery
- Secondary accent: lime / electric green for "live" indicators

**Typography:**
- Display: Geist Sans (or `font-sans` system fallback) — large, tight tracking, bold
- Mono accents: Geist Mono / `font-mono` for labels, stats, and "system" text (UPDATE TASK style)

**Visual motifs:**
- Subtle dot/line grid backgrounds
- Monospace UPPERCASE labels above sections
- Big stat numbers (think 384%, 92,400 hrs)
- Cards with subtle 1px zinc borders
- Text scramble animation on the headline (the supplied component)

## 4. Information Architecture (Sections)

1. **Nav** — Logo left, anchor links centered (Product, Lead Gen, Process, Pricing), CTA right (*Book a call*).
2. **Hero** — Tag pill ("AI Automation Studio"), giant headline with **TextScramble** swapping between value-prop verbs (*"Automate. Capture. Convert."*), subhead, primary + secondary CTA, "trusted by" micro-bar.
3. **Problem section** — "Your team is doing $200k worth of work a robot should do." Three pain cards with monospace labels: *Manual Drudgery*, *Cold Pipelines*, *Tool Sprawl*.
4. **Stats / Outcomes bar** — 4 big numbers: hours saved, leads generated, ROI, payback period. Mirrors the ClickUp "It's like adding 15 full-time employees" pattern.
5. **Services grid** — 6–8 cards: Lead Gen, AI Outreach, Workflow Automation, AI Voice Agents, CRM Integration, Custom GPTs, Data Enrichment, Reporting. Uses ClickUp's icon-grid pattern.
6. **Lead Gen flagship section** — Dark hero-within-hero. Headline "Our proven product: Lead Gen on autopilot." Visual showing the pipeline: *Find → Enrich → Reach → Book*. Bullet results.
7. **Process / How it works** — 4 steps in numbered cards: *Audit → Architect → Automate → Iterate*.
8. **Testimonials** — 2–3 quotes with names + companies.
9. **Final CTA** — Full-bleed dark section with the text scramble headline again ("Stop doing what a machine could do.") and a single big *Book your strategy call* button.
10. **Footer** — Logo, mini-nav, social, copyright, "Built for operators" tagline.

## 5. Functional Requirements

- **Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui structure, framer-motion, lucide-react.
- **Component to integrate:** `text-scramble.tsx` placed at `components/ui/text-scramble.tsx` (per the prompt).
- **Responsive:** Mobile-first. All sections must work down to 360px width.
- **Performance:** Static page, no client-side data fetching. Animations should be GPU-friendly (transform/opacity).
- **Accessibility:** Semantic landmarks, sufficient contrast on dark backgrounds, focus styles on all CTAs, `prefers-reduced-motion` respected for the scramble animation (component already triggers once).

## 6. Content Outline (Copy)

- **Hero headline:** `Automate the work. // Multiply the wins.` (with `TextScramble` cycling on the verbs)
- **Hero sub:** `Nexin is an AI automation studio that ships systems your team will actually use — starting with the lead-gen engine that puts qualified meetings on your calendar while you sleep.`
- **Problem headline:** `Your best people are stuck doing robot work.`
- **Stats:** `12,400 hrs/yr saved · 3.2x pipeline · 41% close-rate lift · <60 day payback`
- **Services tagline:** `One studio. Every automation surface.`
- **Lead Gen headline:** `Our proven engine: Lead Gen on autopilot.`
- **Lead Gen sub:** `We find them, enrich them, reach them, and book them. You show up to the meeting.`
- **Process:** `Audit → Architect → Automate → Iterate`
- **Final CTA:** `Stop doing what a machine could do.`

## 7. Success Metrics
- ≥4% click-through to "Book a call" from hero
- ≥2 minute average session
- ≥30% scroll-to-bottom rate
- ≥1.5% landing → booking conversion

## 8. Out of Scope (v1)
- Blog / resources
- Case study sub-pages
- Multi-language
- Live chat widget (could add Intercom later)
- Auth / dashboard

## 9. Deliverables for v1
- Single-page Next.js site at `/`
- TextScramble component installed at `components/ui/text-scramble.tsx`
- Logo asset placed at `public/nexin-logo.svg`
- All sections listed in §4 implemented and styled
- Build passes `next build`
