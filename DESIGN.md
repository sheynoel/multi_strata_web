---
name: MultiStrata AI
description: A chronograph dial in black lacquer and applied gold, with Jarvis as the instrument at its centre.
colors:
  dial-950: "#0b0b0c"
  dial-900: "#111112"
  dial-850: "#151515"
  dial-800: "#1b1a19"
  dial-700: "#24221f"
  ivory: "#f2efe8"
  ivory-dim: "#c9c4b9"
  stone: "#9c968a"
  gold: "#c9a24c"
  gold-bright: "#e3c278"
  gold-pale: "#efdfb0"
  gold-deep: "#8a6d2e"
  line: "rgb(242 239 232 / 0.09)"
  line-strong: "rgb(242 239 232 / 0.17)"
  alert: "#e8806e"
typography:
  display:
    fontFamily: "Archivo Variable, Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.375rem, 3.3vw, 3.25rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.035em"
    fontVariation: "\"wdth\" 88"
  headline:
    fontFamily: "Archivo Variable, Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 3.2vw, 2.75rem)"
    fontWeight: 620
    lineHeight: 1.04
    letterSpacing: "-0.025em"
    fontVariation: "\"wdth\" 92"
  title:
    fontFamily: "Archivo Variable, Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.625rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.015em"
  numeral:
    fontFamily: "Archivo Variable, Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.375rem, 2.2vw, 1.75rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.02em"
    fontFeature: "\"tnum\" 1, \"lnum\" 1"
    fontVariation: "\"wdth\" 90"
  body-lead:
    fontFamily: "Archivo Variable, Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.625
  body:
    fontFamily: "Archivo Variable, Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Archivo Variable, Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.72rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.16em"
  mono:
    fontFamily: "JetBrains Mono Variable, JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: "4px"
  md: "6px"
  panel: "10px"
  full: "9999px"
spacing:
  gutter: "20px"
  gutter-sm: "32px"
  band-y: "96px"
  band-y-sm: "128px"
  container: "1280px"
components:
  button-primary:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.dial-950}"
    rounded: "{rounded.md}"
    padding: "0 20px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.gold-bright}"
    textColor: "{colors.dial-950}"
  button-primary-lg:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.dial-950}"
    rounded: "{rounded.md}"
    padding: "0 28px"
    height: "52px"
  button-primary-sm:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.dial-950}"
    rounded: "{rounded.md}"
    padding: "0 16px"
    height: "36px"
  button-secondary:
    backgroundColor: "{colors.dial-950}"
    textColor: "{colors.ivory}"
    rounded: "{rounded.md}"
    padding: "0 20px"
    height: "44px"
  button-secondary-hover:
    textColor: "{colors.gold-pale}"
  button-quiet:
    textColor: "{colors.gold-bright}"
  button-quiet-hover:
    textColor: "{colors.gold-pale}"
  input:
    backgroundColor: "{colors.dial-950}"
    textColor: "{colors.ivory}"
    rounded: "{rounded.md}"
    padding: "0 14px"
    height: "44px"
  segment-track:
    backgroundColor: "{colors.dial-900}"
    rounded: "{rounded.md}"
    padding: "2px"
  segment-active:
    backgroundColor: "{colors.dial-700}"
    textColor: "{colors.gold-pale}"
    rounded: "{rounded.sm}"
  panel:
    backgroundColor: "{colors.dial-900}"
    textColor: "{colors.ivory}"
    rounded: "{rounded.panel}"
    padding: "32px"
  tag:
    textColor: "{colors.gold-bright}"
    rounded: "{rounded.sm}"
    padding: "2px 6px"
  nav-item:
    textColor: "{colors.stone}"
    rounded: "{rounded.md}"
    padding: "8px 14px"
  nav-item-active:
    textColor: "{colors.ivory}"
---

# Design System: MultiStrata AI

## Overview

**Creative North Star: "The Chronograph Dial"**

The page is a watch face and Jarvis is the movement at its centre. The ground is black lacquer, the marks are applied gold indices, the words are ivory dial printing, and every figure on the site is read like a sub-register against one printed minute track. Gold is metal, not light: it is polished, bevelled and rationed by role. The orb is the only thing allowed to emit light.

Density is calm and editorial. Sections sit in one 1280px container with long vertical breath, headings are condensed Archivo set tight, labels are printed in the margin in small caps, and instruments (orb, dial, sub-registers, toggle, icon rings) are the only circles. Everything else is a 6px control or a 10px panel. Motion is horological: one seconds hand on a 60s revolution, a chronograph index run while Jarvis speaks, and short stamps that confirm a value changed.

The world explicitly rejects the glowing AI HUD it replaced: neon halos, glass cards, gradient text, pill eyebrows and rows of identical cards. The site is dark only.

**Key Characteristics:**
- Black lacquer ground with a faint sunray brush radiating from the dial centre.
- Gold rationed by role: metal for the primary action and indices, bright for emphasis and active state.
- Circles are instruments; controls are 6px, panels 10px.
- Condensed Archivo via the width axis; JetBrains Mono only for code and log lines.
- Section labels printed in the margin, never stacked above a heading.
- Depth from recess and applied metal, not from light.

## Colors

A monochrome black-lacquer ground carrying one metal: gold in four finishes, read against ivory printing.

### Primary
- **Applied Gold** (gold): the metal of the primary action (always as a polished plate, never flat), applied indices, major bezel ticks, icons and the toggle thumb.
- **Polished Gold** (gold-bright): emphasis and active state; the gold half of the hero line, the popular tier's price, active indicators, focus rings, the quiet action.
- **Pale Gold** (gold-pale): hover text on secondary and quiet actions, text in the active segment, text selection.
- **Shadowed Gold** (gold-deep): the lower edge of metal gradients, the inner ring of the instrument and the scrollbar thumb on hover. It is never used for text.

### Neutral
- **Black Lacquer** (dial-950): the page ground, input wells, and the text colour on gold plates.
- **Dial Plate** (dial-900): recessed registers, panels, the spec sheet and segment tracks.
- **Raised Plate** (dial-850 / dial-800): the floating launcher, the popular tier column and the speaking state of the speak chip.
- **Raised Segment** (dial-700): the active segment of a segmented control; the only use of the lightest dial tone.
- **Dial Ivory** (ivory): headings and primary reading text.
- **Dim Ivory** (ivory-dim): body copy and dial printing (labels).
- **Stone** (stone): tertiary text, placeholders, inactive nav items and bezel lettering.
- **Printed Track** (line / line-strong): hairlines, dividers, rings on panels and inputs. Line-strong is used where a control needs a visible edge.
- **Alert** (alert): errors only.

### Named Rules
**The Rationed Gold Rule.** Gold carries a role, not a mood. Use metal gold for the primary action and applied indices, gold-bright for emphasis and active state, ivory and ivory-dim for reading and printing, and stone for tertiary text. A view has one bright-gold primary action.

**The Only The Orb Glows Rule.** Only the orb emits light. Nothing else on the page has glows, gradient text or glass. Gold gradients are allowed only as metal finishes (plate bevel, index bars, the popular tier's top hairline), never as light or as text fill.

**The Dark Only Rule.** The site is dark only, by owner commitment. There is no light mode and no light-mode tokens.

## Typography

**Display Font:** Archivo Variable (self-hosted with the width axis; falls back to Archivo, ui-sans-serif, system-ui)
**Body Font:** Archivo Variable
**Label/Mono Font:** JetBrains Mono Variable, for code and log lines only

**Character:** Archivo throughout, its width axis doing the work a second family would usually do. Headings are condensed and tight like engraved dial text; body copy is set at normal width and reads plainly.

### Hierarchy
- **Display** (600, clamp(2.375rem, 3.3vw, 3.25rem), 1.02, width 88%): the hero line, split into two halves either side of the dial. This must stay the largest type step on the site.
- **Headline** (620, clamp(2rem, 3.2vw, 2.75rem), 1.04, width 92%): section h2s. These are capped at 2.75rem.
- **Title** (600, 1.5 to 1.625rem): h3s, tier names and console titles.
- **Numeral** (600, clamp(1.375rem, 2.2vw, 1.75rem), width 90%, tabular lining figures): sub-register readouts. Tier prices use the headline size at 92% width.
- **Body lead** (400, 1.0625rem, 1.625): section intros, max 52 to 60ch.
- **Body** (400, 0.875 to 0.9375rem, 1.625): card copy, bullets and form text.
- **Label / dial print** (600, 0.72rem, 0.16em, uppercase, ivory-dim): margin labels, KPI captions and the illustrative-data note.
- **Mono** (JetBrains Mono, 0.6875 to 0.8125rem): the console URL, the stream log, quorum readouts and the model id.

### Named Rules
**The Largest Step Rule.** The hero dial print is the largest type on the site. Section h2s never exceed 2.75rem, and no other element may be set larger than the hero.

**The Width Axis Rule.** Condense with font-stretch, not with a second family: about 88% for the hero, 92% for section heads and prices, 90% for register numerals, and 100% for body.

**The Mono Is Data Rule.** JetBrains Mono appears only where the content is code or a log line. It is never used for labels, headings or decoration.

**The Margin Label Rule.** A section's label is printed as dial text in the margin (SectionHeader): in the left column on desktop, and after the copy on mobile. On the Jarvis instrument the label is printed along the bezel. Never place a kicker or eyebrow above a heading.

## Layout

One container: 1280px maximum width, 20px side gutters (32px from 640px up), and a 96px vertical band rhythm (128px from 640px up). Bands are separated by a printed track divider, which is a hairline with fine 24px ticks fading out from one applied index at the content edge.

Desktop sections use a 12-column grid with a 40px gap. The margin label takes 3 columns and the heading and copy take 9. Paired sections split 6/6 or 5/7. Below 1024px everything stacks, and the margin label moves after the copy.

The hero is one 100dvh viewport. From 1280px it is three columns (headline half, dial, headline half), with a dial of min(32vw, 31rem, max(20rem, 100dvh minus 22rem)) so the CTAs stay in the first viewport. Below 1280px the dial comes first at min(86vw, 25rem), with the headline stacked under it. KPI sub-registers sit in a 2-up grid, becoming 4-up from 768px.

Pricing is one spec sheet: one panel with three columns divided by hairlines, not three separate cards.

**The Clip Not Hide Rule.** Never use overflow-x hidden on an ancestor of sticky content. The app root uses overflow-x clip.

## Elevation & Depth

Depth is physical, not luminous. There are two moves: surfaces are recessed into the dial with inset shadows, and gold is applied on top as a bevelled plate. Panels lift with a deep, soft, downward black shadow and a 1px top highlight, and never with a coloured glow.

### Shadow Vocabulary
- **Applied metal** (`inset 0 1px 0 rgb(255 255 255 / 0.4), inset 0 -1px 0 rgb(0 0 0 / 0.25), 0 1px 2px rgb(0 0 0 / 0.5), 0 8px 20px -10px rgb(0 0 0 / 0.9)` over gold with a top-light linear gradient): the primary button and the toggle thumb.
- **Recess** (`inset 0 1px 2px rgb(0 0 0 / 0.55), inset 0 0 0 1px line` on dial-900): sub-registers, segment tracks, the toggle track and log wells.
- **Raised segment** (`inset 0 1px 0 rgb(255 255 255 / 0.06), 0 1px 2px rgb(0 0 0 / 0.6)`): the active segment.
- **Panel lift** (`0 1px 0 rgb(242 239 232 / 0.06) inset, 0 40px 80px -40px rgb(0 0 0 / 0.95)`): consoles and the spec sheet. Modals deepen this to `0 40px 100px -30px`.
- **Dial plate** (`0 0 0 1px rgb(242 239 232 / 0.06), 0 30px 80px -30px rgb(0 0 0 / 0.9), inset 0 2px 6px rgb(0 0 0 / 0.6)`): the sunray dial behind each orb.

### Named Rules
**The Metal Not Light Rule.** Shadows are black and fall downward. A gold surface is bevelled, not lit. Only the orb has bloom.

## Shapes

**The Circles Are Instruments Rule.** Full circles are reserved for instruments: the orb, the dial plates, the KPI sub-registers, the billing toggle, icon rings, status dots and the round social bezels. Controls use 6px corners and panels and the floating launcher use 10px. Small tags (tier codes, "Save 20%") use 4px. There are no pills for labels or badges.

Hairline rings (1px line or line-strong) define edges more often than borders do. Applied indices are 14×3px bars with 1px corners and a vertical metal gradient, and they act as markers: in front of dial labels, under the active nav item and at the start of each section divider.

## Components

### Buttons
Applied metal, used sparingly.
- **Shape:** gently squared (6px), in three heights: 36px, 44px and 52px.
- **Primary:** a gold metal plate with black lacquer text, semibold. There is one per view. Hover brightens the plate to gold-bright, and pressing drops it 1px.
- **Secondary:** a line-strong ring on a 40% black lacquer fill with ivory text. Hover warms the ring to gold at 70% and the text to gold-pale.
- **Quiet:** gold-bright text only, with gold-pale on hover. Used for "Launch Jarvis" style links.
- **Focus:** a 2px gold-bright outline at a 3px offset, set globally.

### Segmented controls
- **Style:** a recessed dial-900 track with 2px padding and 6px corners.
- **State:** the active segment is raised in dial-700 with gold-pale text and the raised-segment shadow. Inactive segments are stone text on the track. Used for the telemetry tabs and the testimonial industry filter.

### Toggle
A recessed full-round track (52×28px) holding a 22px applied-metal thumb that slides 24px on the expo ease. A value that changes because of it gets a value stamp: a 1px gold-bright underline that draws in and fades over 900ms.

### Cards / Containers
- **Corner Style:** 10px.
- **Background:** dial-900, or dial-800 at 80% for the featured column.
- **Shadow Strategy:** panel lift (see Elevation).
- **Border:** a 1px line ring; line-strong on modals. A featured item is marked by a 2px gold metal hairline along its top edge, not by a glow or by scale.
- **Internal Padding:** 24px, or 32px from 640px up.

### Inputs / Fields
- **Style:** a black lacquer well, 44px high with 6px corners and a 1px line-strong ring. The label (0.8125rem, medium, ivory-dim) sits above. An optional 16px stone icon sits inset at 14px.
- **Focus:** the ring thickens to 2px gold.
- **Error:** alert text. Disabled controls drop to 60% opacity.

### Navigation
A fixed bar, transparent at the top of the page. Once scrolled it gains a black lacquer fill at 90% and a line hairline below. Items are 0.875rem medium in stone, turning ivory on hover. The active item is ivory with an applied index bar centred beneath it. The primary "Book a Demo" plate sits at the right.

### Dial label (signature)
Small-caps dial printing (label role, ivory-dim) preceded by an applied index bar. It is the only section-label treatment, and it is placed by SectionHeader in the margin column.

### Dial and sub-registers (signature)
The hero orb sits at the centre of a sunray-brushed dial plate that carries a printed minute track, applied gold hour indices and a 60s seconds hand. While Jarvis speaks, the indices light in sequence (a chronograph run, 1.2s per cycle). KPI figures sit as recessed circular sub-registers, each with a partial gold arc, a register numeral beneath, and a dial-print caption. Below them is the line "Illustrative figures, pending launch data".

### Overlays
Modals and the Jarvis drawer use 10px dial-900 panels with modal lift, over a black lacquer scrim at 80%, and enter over 260ms (6px rise, 0.99 scale). The Jarvis launcher is a 10px dial-850 plate with a gold ring at 45%, fixed bottom right.

## Do's and Don'ts

### Do:
- **Do** keep the site dark. Black lacquer (dial-950) is the only ground.
- **Do** ration gold by role: metal gold for the primary action and applied indices, gold-bright for emphasis and active state, ivory and ivory-dim for reading and dial printing, and stone for tertiary text.
- **Do** reserve circles for instruments (orb, dial, sub-registers, toggle, icon rings). Use 6px for controls and 10px for panels and the floating launcher.
- **Do** condense headings with Archivo's width axis: about 88% for the hero and 92% for section heads.
- **Do** print section labels in the margin with SectionHeader (left column on desktop, after the copy on mobile), or along the bezel on the Jarvis instrument.
- **Do** show selection as a recessed track with the active segment raised in dial-700 and gold-pale text.
- **Do** limit motion to the 60s seconds hand, the chronograph index run while Jarvis speaks, the hero word reveal and feedback-only value stamps, and honour reduced motion globally.
- **Do** label placeholder metrics and testimonials "Illustrative figures, pending launch data".
- **Do** use overflow-x clip, never hidden, on any ancestor of sticky content.

### Don't:
- **Don't** let anything but the orb emit light: no glows, halos, gradient text or glass surfaces.
- **Don't** set any type larger than the hero dial print, or a section h2 above 2.75rem.
- **Don't** use JetBrains Mono for anything other than code and log lines (console URL, stream log, quorum readouts, model id).
- **Don't** place a kicker or eyebrow above a heading, and don't print labels as pill badges.
- **Don't** mark placeholder data as "Verified".
- **Don't** use flat gold for the primary action. It is always the applied-metal plate.
