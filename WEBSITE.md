# Golem — Analysis & Website Spec

> Written 2026-08-31. Two parts: **I. Analysis** (idea, value proposition,
> selling points vs. competition, market) and **II. The website** (spec, pages,
> messaging, marketing plan). Sources for the vision: `~/Golem/Golem.md`,
> `roadmap.md`, `features.md`, `apps.md`, `android.md`.

---

# PART I — ANALYSIS

## 1. The idea, restated as a product

Golem is a NixOS-based operating system whose entire shell is one organism:

- **The Brain** (`options-engine`) senses context — windows, media, git,
  phone, battery — and decides what is logical to offer.
- **The Body** (`waverunner`) is the single living surface: dock, openbox,
  OPTIONS boxes. GPU-rendered, animated with intent, idle at rest.
- **The Ground** (NixOS) makes the system declarative, atomic, roll-backable.
  It cannot rot.
- **The Reach** (Golem for Android) plugs the phone into the same Brain.

The unifying thesis: **all friction between a person and their intention is a
design failure.** OPTIONS applies game design's greatest achievement —
teaching novices to master complex systems with no manual and no fear — to
the desktop.

This is a real idea, not a theme. Every competitor ships *either* a friendly
surface (elementary, Zorin) *or* an unbreakable base (NixOS, Silverblue)
*or* phone integration (KDE Connect) — none ships all three as one designed
organism, and none has a context engine deciding what the shell shows.

## 2. Value proposition

One sentence, per audience:

| Audience | The promise |
|---|---|
| Everyone | *A computer you use, not operate.* |
| Windows refugee | *No ads, no telemetry, no forced updates — and an update can never break your machine.* |
| Mac admirer without Mac money | *Mac-grade coherence + iPhone-grade phone fusion, on the PC you already own.* |
| Linux user | *NixOS power with zero terminal required — declarative, atomic, reproducible, finally humane.* |
| Owner of a Win10-orphaned PC | *Your PC isn't obsolete. Microsoft is.* |

## 3. Hot selling points vs. the competition

Ranked by (uniqueness × how much normal users care):

### ① "Time Machine for your OS" — the roll-back button
Generations UI: every change to the system is reversible with one click.
**No mainstream OS has this.** Windows restore points are unreliable and
partial; macOS has none; Ubuntu/Fedora can be broken by an update. This
answers the single biggest fear of normal PC users ("the update broke my
computer") with a feature only Golem's NixOS ground makes possible.
→ This is the **headline demo**: a 20-second video of breaking the system
on purpose and rolling it back.

### ② OPTIONS — the OS that teaches itself
Context-aware, diegetic, scales to skill. The honest contrast: Clippy
interrupted, Copilot upsells, macOS hides, Linux assumes. OPTIONS *senses*
(e.g. Focus that knows what you're doing vs. macOS Focus you must schedule).
Hard to explain in text, **trivial to show in motion** — every OPTIONS
moment is a shareable 10-second clip.

### ③ What Golem refuses
No ads in the Start menu. No telemetry. No OneDrive nags, no Edge nags, no
Recall screenshotting your screen. In 2026 this is not a niche stance — it
is the loudest complaint about Windows 11. The manifesto's "What Golem
refuses" section is itself a marketing asset: an **anti-feature list**.

### ④ Golem × Android — the empty seat
Mac+iPhone is the moat Apple sells. Google has no desktop; Apple has no
openness. **Golem PC + any Android phone = one device**: mirrored
notifications, universal clipboard, phone mirroring (scrcpy), continuity
camera, instant hotspot, proximity unlock. KDE Connect built a settings
module; Golem plugs the phone into a Mind.

### ⑤ For everyone — actually
i18n (Spanish first), accessibility, keyboard-only, the person who has
never installed anything. Plus: runs on hardware Windows 11 rejected.

### Competitive map (one line each)

| Competitor | Their strength | Their opening for Golem |
|---|---|---|
| Windows 11 | Default, app compat | Ads, telemetry, Recall, breaks PCs, orphaned 200M+ machines |
| macOS | Coherence, ecosystem | $1000+ hardware lock-in, closed, no rollback |
| ChromeOS | Simplicity | Google dependency, a browser pretending to be an OS |
| Ubuntu / Fedora / Mint | Mature, friendly-ish | A pile of configured parts; updates can break; terminal eventually required |
| Zorin / elementary | Switcher-friendly polish | Skin-deep: same fragile base underneath, no context engine, no phone story |
| Pop!_OS / COSMIC | New shell, funded | Tiling-power-user focus, not "everyone"; no atomic ground |
| Vanilla OS / Silverblue | Immutable/atomic | Image-based not declarative; atomicity is plumbing, not a headline UI |
| NixOS | The same superpower | Legendarily hostile UX — Golem is NixOS made humane |
| KDE Connect / Phone Link | Phone features exist | Bolted-on settings modules, not fused into the shell |

Golem's defensible position: **the intersection is empty.** Coherent
designed shell ∩ unbreakable declarative base ∩ phone fusion ∩ context
engine — nobody occupies it, and the incumbents structurally can't
(Microsoft monetizes the friction; Apple monetizes the hardware; distros
don't own their shell).

## 4. The market (2026 reality)

- **Windows fell below 60%** of global desktop share for the first time in
  years (56.6% in June 2026).
- **Linux crossed 10.65% desktop share in North America** (July 2026) and
  ~4.4% globally, on a steep post-Win10-EOL curve.
- **Windows 10 support ended Oct 14, 2025**, orphaning hundreds of millions
  of PCs that can't run Windows 11. Zorin alone reported **780,000+ Windows
  users switching** after the EOL. This is the largest forced-switching
  event in desktop history, and it is happening *right now*.
- The Android side: ~3B active Android devices, none of which fuse with any
  desktop the way iPhone fuses with Mac.

"All PC users" is the vision (~1.4B machines). The realistic **beachhead
sequence** for a pre-alpha, one-flake OS:

1. **Now → ISO**: Linux enthusiasts, NixOS-curious, r/unixporn, HN — people
   who install pre-alphas for sport and amplify what impresses them.
2. **ISO → Uprise alpha**: Windows-10 refugees with orphaned hardware +
   privacy switchers — arriving via the enthusiasts' videos and posts.
3. **Arc 2**: Android+PC owners (the fusion pitch), Spanish-speaking users
   (i18n lead nobody else prioritizes), "family PC" buyers.

Honest risks to keep the site honest about: pre-alpha maturity, hardware
support breadth, no native MS Office/Adobe (webapp catalog answers 80%),
gaming expectations (Proton exists but isn't Golem's fight yet), and
single-maintainer bus factor. The site should never claim what the ISO
can't do — "honest install notes" (roadmap S10-lite) is the right instinct
and is itself differentiating.

---

# PART II — THE WEBSITE

## 5. Goals & staging

The site has one job per era. Don't build era 3 in era 1.

| Era | Trigger | Site's job | Primary CTA |
|---|---|---|---|
| **A. Manifesto** (now) | — | Plant the flag; capture believers | Email list ("be there when the ISO lands") + GitHub star |
| **B. Download** (S9 ISO) | ISO exists | Convert curiosity → installs | Download ISO + honest install notes |
| **C. Release** (S10, Uprise alpha) | Arc 2 | Full story: demos, docs, phone app | Download + Android app + community |

The current `index.html` (manifesto page) is era A and is good. This spec
defines the full era-B/C site and what to add to era A now.

## 6. Site architecture (pages)

```
golem-os.com
├── /            Home — the story in scrolls (spec below)
├── /options     The philosophy: game design → OPTIONS, Brain/Body/Ground/Reach
├── /download    Get Golem: ISO, hardware notes, honest caveats, install guide
├── /android     Golem × Android: the fusion pitch (P1→P4 ladder as "coming" tiers)
├── /roadmap     The public roadmap — rendered from the repo's roadmap.md (honesty as marketing)
├── /journal     Devlog / build-in-public posts (the marketing engine)
├── /manifesto   The full Golem.md text, beautifully set (current page moves here)
├── /faq         "Will my apps run?" "Is it hard?" "What about gaming?" …
└── /docs        (era C) install, first steps, rollback, phone pairing
```

Era A ships: `/` (new home), `/manifesto`, `/options`, `/roadmap`, `/journal`,
email capture. Era B adds `/download` + `/faq`. Era C adds `/android`, `/docs`.

## 7. Home page — section by section

Design rule: the page *demonstrates* the product's values — fast, quiet,
beautiful motion, nothing asking for anything. One screen = one idea.

1. **Hero.** Full-bleed looping screencast of the live desktop (waverunner
   idle → an OPTIONS moment appears → fades). Headline over it:
   - H1: **"An operating system with a soul."**
   - Sub: *"Golem notices what you're doing, offers exactly what helps, and
     gets out of the way. One surface. One Brain. Zero friction. For everyone."*
   - CTA (era A): "Follow the build →" (email) · (era B): "Download Golem 26"
2. **The idea.** One paragraph, huge type: "All friction between a person
   and their intention is a design failure. You should not operate a
   computer; you should *use* it."
3. **OPTIONS, shown not told.** 3–4 short autoplaying clips in cards:
   copy a link → share card blooms · battery ladder → the bell turns red ·
   clipboard/dictionary moment · window pills. Caption each with one line.
   Link → `/options`.
4. **The roll-back button** (the headline feature). Split screen: "Break it.
   Click. It never happened." 20-second demo of a bad change rolled back.
   Line: *"Updates are atomic. Any change can be undone. The system cannot
   rot. No mainstream OS can say that."*
5. **Your phone, fused.** (era A: "coming" treatment) Phone pill in the
   topbar, notification mirroring mock/real footage. Line: *"Google has no
   desktop. Apple has no openness. Golem PC + Android = one device."*
6. **What Golem refuses.** Dark, typographic, no images. The refusal list
   verbatim from the manifesto. This section gets screenshotted and shared.
7. **For everyone.** Three doors: "Coming from Windows / from Mac / from
   Linux" — one sentence each on how the shell meets them.
8. **Built in the open.** GitHub, roadmap link, latest 3 journal entries,
   honest status badge ("pre-alpha · Arc 1: reach metal").
9. **Footer CTA.** Email capture + the closing line: *"One surface. One
   Brain. Zero friction. For everyone."*

## 8. Messaging

**Voice:** the manifesto's voice — short declarative sentences, zero
corporate speak, refusals stated proudly, honesty about status. Never
"blazingly fast", never "revolutionize", never feature-list prose.

**Taglines** (tested against each audience):
- Master: **"An operating system with a soul."**
- Rollback: "The OS that cannot rot."
- Windows-refugee campaign: "Your PC isn't obsolete."
- Android: "Two screens. One device."
- OPTIONS: "The right tool, the moment you need it, gone when you don't."

**Words we own:** OPTIONS · the Brain · Uprise · "cannot rot" · "with a
soul". Use them consistently until they're searchable brand terms.

**Honesty as strategy:** status badges, real caveats on /download, roadmap
public. Linux early adopters reward honesty and destroy overclaiming; the
first audience is them.

## 9. Design & technical spec

- **Aesthetic:** the OS's own design language — dark substrate, frosted
  glass, accent glow, motion with intent (dt-based, idle at rest). The site
  should feel like a Golem surface. Current index.html palette (slate/sky)
  is a fine base; graduate it toward real waverunner materials.
- **Motion first:** the product is motion; the site's core assets are
  short, muted, looping MP4/WebM screencasts (≤3MB each, lazy-loaded,
  `prefers-reduced-motion` respected — the accessibility promise applies
  to the site too).
- **Stack:** static site. Either keep hand-written HTML (era A) or move to
  Astro when /journal needs markdown posts (era A→B). No React needed.
  Host: GitHub Pages or Cloudflare Pages, `golem-os.com`.
- **No trackers, no cookies, no analytics scripts** — and say so in the
  footer ("This site, like Golem, does not watch you."). Privacy-respecting
  server-side stats only (e.g. Cloudflare/GoatCounter) if needed.
- **Email list:** Buttondown or Listmonk (self-hosted later). The list is
  era-A's only conversion metric.
- **Performance budget:** first paint < 1s, no blocking JS, works with JS
  disabled (videos degrade to posters).
- **i18n:** English + Spanish from era B (the OS leads with Spanish;
  the site should too — and it doubles the addressable switcher market).
- **SEO basics:** per-page titles/descriptions, OpenGraph cards (the
  refusal list and rollback demo as og:images), `linux distro that can't
  break`, `windows 10 alternative` as long-tail targets for era B.

## 10. Marketing plan

**Era A — now (pre-ISO): build the audience the launch will need.**
1. **Build in public.** 1–2 journal posts/month + every OPTIONS module
   shipped = a 10-second clip posted to Mastodon/X/r/unixporn. The battery
   ladder, share cards, waveview are *already* postable.
2. **r/unixporn is the beachhead of the beachhead.** Golem screenshots are
   competitive there today; each post links the manifesto.
3. **Seed the words.** "The OS that cannot rot" in every bio/readme/post.
4. Email list target before ISO: it only needs hundreds — those are the
   day-one installers and bug reporters.

**Era B — ISO launch (the one shot at "new"):**
1. **Hacker News "Show HN: Golem — a NixOS-based OS with a soul"** — the
   manifesto voice + honest pre-alpha framing + rollback demo is exactly
   HN-shaped. Same week: Lobsters, r/linux, r/NixOS.
2. **Linux YouTube.** Send ISOs + a press-kit page (clips, screenshots,
   one-pager) to DistroTube, TechHut, Brodie Robertson, The Linux
   Experiment, Nicco (Veronica Explains for the switcher angle). One good
   video = more installs than everything else combined.
3. **The rollback demo video** is the launch hero asset. 20 seconds,
   no narration needed.
4. DistroWatch listing (it still drives distro-curious traffic).

**Era C — Uprise alpha + Android:**
1. **Win10-refugee campaign**: "Your PC isn't obsolete" landing page,
   targeted at the orphaned-hardware story; partner-ish content with the
   "install Linux on your old PC" wave (EndOf10-style efforts).
2. **F-Droid launch of Golem (Android)** — the fusion demo (copy on phone
   → share card on desktop) is the most viral clip the project can make;
   nobody has seen Continuity on Linux.
3. Spanish-language launch (LATAM/Spain Linux communities are underserved).
4. Conference/podcast circuit: Linux App Summit, NixCon (the "NixOS made
   humane" talk), Linux Unplugged, Late Night Linux.

**What to measure:** era A: email subs + GitHub stars. era B: ISO downloads
+ install-success reports. era C: 30-day-retained installs (a returning
`nixos-rebuild` telemetry is *refused* — use opt-in update-check pings only
if ever, or just count ISO downloads and community signals).

## 11. Immediate next steps (era A, this repo)

1. Restructure: current `index.html` → `/manifesto`; build the new Home
   per §7 with placeholder posters where screencasts don't exist yet.
2. Record 3 screencasts of what already works (openbox, share cards,
   battery ladder / red bell, waveview) — they unlock Home §1/§3.
3. Add email capture (Buttondown embed) + `/roadmap` rendered from repo.
4. Set up Cloudflare Pages + `golem-os.com` DNS, OG cards, favicons.
5. First journal post: "Why an OS with a soul" (adapt the manifesto's
   game-design section — it's the most original argument the project has).
