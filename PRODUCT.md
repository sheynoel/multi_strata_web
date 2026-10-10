# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- Business owners running Philippine companies (owner-operators who handle orders, invoicing, stock and team coordination themselves or with a small team). They want the repetitive work between their everyday apps to run on its own and need plain-language explanations, visible pricing and a low-risk way to try it. Added by the owner on 2026-10-10: new sections such as the workflow showcase and FAQ are written for this reader.
- Operations and finance leaders (COO, CFO, heads of operations, treasury, supply chain and compliance) at mid-to-large Philippine enterprises evaluating whether to hand recurring operational workflows to autonomous AI agents. They arrive skeptical, compare vendors, and need to see the mechanism and the price before they book a call.

## Product Purpose

Multistrata AI (multistrata.dev) runs enterprise operations workflows autonomously through a three-layer ("tri-strata") agent architecture, with Jarvis as the executive copilot people talk to. The marketing site exists to make that mechanism legible, show pricing openly, and convert visitors into demo bookings, plan selections, brochure requests or a Jarvis conversation.

## Positioning

A layered architecture rather than a single chatbot: Stratum I senses (ingests ERP, banking, API and email streams), Stratum II reasons (a multi-agent swarm deliberates and reaches consensus), Stratum III acts (signed, auditable execution with rollback). Jarvis is the voice and face of that stack. Pricing is published in Philippine pesos.

## Operating Context

- Scenarios shown on the site: treasury FX rebalancing, supply-chain rerouting (e.g. typhoon disruption at Port of Manila), multi-jurisdiction tax compliance audits.
- Integrations named: ERP, Salesforce, GitHub, SWIFT, AWS CloudWatch, webhooks, REST APIs.
- Visitors can talk to Jarvis (Gemini-backed chat drawer with model and persona selection) and hear Jarvis speak via browser speech synthesis from the hero orb.

## Capabilities and Constraints

- Site features that must be preserved: hero with the holographic reactor orb (click-to-speak, three rotating greeting lines, ignition state), sample workflow showcase (replaced the telemetry tabs on 2026-10-10), KPI strip, FAQ for business owners, Jarvis capability selector, tri-strata explainer with typed simulation of three incident scenarios, three pricing tiers with monthly/annual toggle, brochure email capture (Resend), footer newsletter and socials, Jarvis chat drawer, and modals for auth, demo booking, contact, plan checkout, legal and an admin console.
- Personalisation by time of day, referrer/UTM and returning-visitor state changes hero subheadline, CTA labels and Jarvis greeting.
- Stack: React 19, Vite, Tailwind CSS v4, lucide-react icons, Express server with Gemini and Resend endpoints.
- Tiers: T1 Starter ₱1,999/mo, T2 Growth ₱4,999/mo (most popular), T3 Enterprise ₱12,999/mo; annual billing saves 20%.

## Brand Commitments

- Name and wordmark: "MultiStrata AI", domain multistrata.dev, isometric four-layer diamond logo.
- Palette commitment from the owner: gold on black. The site stays dark.
- The reactor orb is a signature asset and must stay (geometry, motion layers, interactions); its rendering may be refined.
- Jarvis persona: composed, articulate, British-inflected executive copilot.
- Owner instruction for redesigns: remove nothing without the owner's say-so. Layouts and treatments may be recomposed. On 2026-10-10 the owner approved taking the hero telemetry console and the placeholder testimonials off the page; removed sections are unmounted in App.tsx, not deleted.

## Evidence on Hand

All metrics, testimonials, client names, avatars and certifications on the site are placeholders (e.g. ₱420M+ saved, 99.98% reliability, 38ms latency, SOC-2 Type II, Eleanor Vance-Castillo / Aurelius Quantum, Marcus Sterling / Novus Dynamics). KPI figures stay on the page labelled "Illustrative figures, pending launch data". The testimonials section (TrustedBySection) is unmounted until real testimonials exist; restore it only with real, approved quotes. No real customer logos, case studies or product screenshots exist yet.
- The workflow showcase uses Gmail, Google Sheets, Google Calendar, Google Forms and Facebook Messenger (Page replies) as illustrative examples, chosen because each has a free official API a small business can connect; the owner ruled out Xero and Viber (paid bot messages, no group broadcast), labelled "Sample workflow". These are not confirmed integrations; confirmed connectivity is webhooks and REST APIs. 

## Product Principles

1. Show the mechanism, not adjectives: every claim should point at a stratum, a scenario or a price.
2. Price in the open: tiers and peso pricing stay visible and comparable.
3. Jarvis is the product's voice: talking to Jarvis is always one click away.
4. Remove nothing the owner built without asking; improve how it reads.
