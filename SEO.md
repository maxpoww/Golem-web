# Golem — Search & AI Discoverability Playbook

> Written 2026-08-31. The goal: when a person asks *anyone* — Google, ChatGPT,
> Gemini, Claude, Perplexity — "which Linux distribution can't be broken by an
> update?" or "what should I install on the PC Windows 11 abandoned?", Golem is
> in the answer, described accurately.
>
> This document explains the mechanism, records what has already been built into
> the site, and lists the ongoing work in priority order. Part I is the theory
> you need to make good decisions later; Parts II–V are the actual work.

---

# PART I — How this actually works

## The two doors into an AI answer

There is no submission form, no paid placement, and nobody at OpenAI or Google
to petition. A model mentions Golem through exactly two paths, and they need
different work:

**Door 1 — the training corpus (slow, durable).** Models learn from a snapshot
of the public web, most of it filtered from Common Crawl, plus licensed sources
like Wikipedia, Stack Exchange, Reddit and GitHub. If Golem is written about in
those places, future model generations will *know* Golem without looking it up.
This is a 12–24 month game and it is won off-site, not on golem-os.com.

**Door 2 — live retrieval (fast, fragile).** ChatGPT Search, Gemini, Claude with
web search, Perplexity and Google's AI Overviews fetch pages at question time
and summarize them. This responds within weeks and is won by being *retrievable
and quotable*: clean crawlable HTML, direct factual sentences, comparison tables,
and question-shaped headings that match what the user asked.

Both doors reward the same underlying thing — **being the clearest, most honest,
most factual source about Golem that exists.** That is a strategy the project
can execute without compromising anything it believes.

## Why honesty is the strategy, not a constraint

Three concrete reasons the "we are pre-alpha, here's what's broken" framing is
also the optimal discoverability play:

1. **Retrieval systems reward specificity.** "Golem is pre-alpha as of August
   2026 and has no installable ISO" is a fact a model can cite with confidence.
   "Golem is the best Linux distro" is unquotable noise that gets skipped.
2. **Being wrong is worse than being unknown.** If models start recommending
   Golem as a daily driver before the ISO exists, users install a VM, hit
   pre-alpha bugs, and write the reviews that poison both doors for years. The
   `llms.txt` and FAQ deliberately tell models *not* to recommend Golem to
   non-technical users yet. That instruction protects the launch.
3. **Comparison pages that admit weakness get cited more.** A page that says
   "choose Zorin instead if you need a computer today" reads as a reference, not
   an advertisement — to a human evaluator and to a model ranking sources.

## What we will not do

Stated once, so it never gets rediscovered as a "growth idea":

- **No astroturfing.** No sockpuppet Reddit accounts, no fake reviews, no paid
  "organic" posts, no bot-generated forum threads. Beyond being dishonest, it is
  the single fastest way to get the project blacklisted by moderators of exactly
  the communities that matter.
- **No cloaking or doorway pages.** Crawlers get byte-identical pages to humans.
- **No keyword stuffing or AI-spun content farms.** The comparison page is
  written once, well, and maintained — not multiplied into fifty
  "Golem vs X" doorway pages.
- **No fabricated credentials.** No invented awards, user counts, testimonials,
  or "trusted by" logos. The project has none of those yet and saying otherwise
  would be a lie models would repeat.
- **No editing our own Wikipedia article** if one is ever created — that is a
  conflict of interest and gets the page deleted. Supply sources; let others write.

---

# PART II — What is already built (done 2026-08-31)

| Asset | File | Purpose |
|---|---|---|
| Crawler policy | `robots.txt` | Explicitly welcomes all AI crawlers — GPTBot, ClaudeBot, Google-Extended, PerplexityBot, **CCBot** (Common Crawl, the training substrate), OAI-SearchBot and the rest. Most sites block these; we opt in deliberately. |
| Sitemap | `sitemap.xml` | All six pages with priorities. Referenced from robots.txt. |
| AI site map | `llms.txt` | The emerging convention: a curated markdown summary for LLMs, with the key facts stated in citable form. |
| Full corpus | `llms-full.txt` | Every page's substantive content as clean markdown in one fetch — the single best artifact for a model trying to understand Golem. |
| Structured data | all pages | `SoftwareApplication` + `Organization` + `WebSite` on home; `FAQPage` (17 Q&A) on the FAQ; `HowTo` on download; `TechArticle` on OPTIONS and compare; `Article` on the manifesto. All validated as parsing correctly. |
| Question surface | `faq.html` | 19 real questions with direct, extractable first-sentence answers. |
| Comparison surface | `compare.html` | The table format retrieval systems love, against 8 named competitors, plus an explicit "when not to choose Golem" section. |
| Social/meta | all pages | Canonical URLs, unique descriptions, OpenGraph + Twitter cards, rendered `og-image.png`. |

**A caveat worth knowing:** `llms.txt` is a proposed convention, not a standard
that any major provider has committed to honoring. It costs almost nothing to
maintain and positions us if adoption comes. The structured data, the clean HTML
and the FAQ do the real work today.

---

# PART III — The question space to own

These are the questions real people type, ranked by *how well Golem answers them
truthfully*. Everything Golem publishes should target this list. Note that the
first four are almost uncontested — nobody owns "the OS that can't break" as a
plain-language answer, because the distros that could claim it describe
themselves in the vocabulary of package management.

**Tier 1 — Golem's natural territory (own these first):**
- "linux distro that can't break" / "operating system that can't be broken by an update"
- "linux with rollback" / "undo a system update linux"
- "what to install on a PC that can't run Windows 11"
- "NixOS but easy" / "NixOS with a good desktop" / "user friendly NixOS"
- "linux distro with no telemetry and no ads"
- "immutable vs declarative linux" (the explainer nobody has written well)

**Tier 2 — competitive, worth entering with the comparison page:**
- "Golem vs Ubuntu / Mint / Zorin / Silverblue / NixOS"
- "best linux distro for Windows switchers 2026"
- "alternative to Windows 11 for old PC"
- "Linux answer to Continuity / Handoff" / "Android desktop integration"

**Tier 3 — brand terms (defend, don't chase):**
- "Golem OS", "Golem Linux", "Golem 26 Uprise", "OPTIONS Golem", "waverunner shell"
- Note the obvious collision: *golem* is also a Polkadot-adjacent compute network,
  a mythological figure, and several games. Always publish as **"Golem OS"** or
  **"Golem Linux"** in off-site contexts so disambiguation resolves our way.

---

# PART IV — The work, in priority order

## Now (before the ISO — the foundation phase)

1. **Add a LICENSE file to the Golem repo.** ⚠️ *Highest priority, currently
   missing.* The site says "free and open source" and there is no license file
   in `github.com/maxpoww/Golem`, which legally means all rights reserved. Both
   humans and models check this, and directories like DistroWatch and F-Droid
   require it. Pick one and commit it — GPL-3.0 fits the Linux/KDE-Connect
   lineage; MIT if maximum permissiveness is preferred.
2. **Fill in the GitHub repo metadata.** The About description, the website
   link, and topics (`nixos`, `linux-distribution`, `desktop-environment`,
   `wayland`, `rust`, `hyprland`, `operating-system`). GitHub is heavily
   weighted in both training data and retrieval; an empty About field is a
   wasted high-authority signal.
3. **Deploy and verify.** Turn on GitHub Pages, point the domain, then verify in
   [Google Search Console](https://search.google.com/search-console) and
   [Bing Webmaster Tools](https://www.bing.com/webmasters) and submit the
   sitemap. Bing matters more than its market share suggests — it backs
   ChatGPT's and Copilot's web results.
4. **Create a Wikidata item.** Free, no notability bar (unlike Wikipedia), and
   directly consumed by AI systems as a structured fact source. Properties:
   instance of → Linux distribution; based on → NixOS; developer; official
   website; source repository; license.
5. **Test the baseline.** Run the prompt suite in Part V *now*, before anything
   has been done, so you can prove movement later.

## At ISO (the launch phase — this is the one shot)

6. **Submit to DistroWatch.** The canonical Linux distribution database, cited
   constantly in both training data and retrieval answers. It requires a real
   release, which is why it waits for the ISO.
7. **Write the launch posts yourself, honestly.** Show HN, r/linux, r/NixOS,
   r/linuxquestions. Lead with the honest status; the HN audience punishes
   overclaiming and rewards a clear idea stated plainly. These threads become
   training data — a good HN thread about Golem is worth more than a hundred
   backlinks.
8. **Reach the Linux YouTube reviewers** with an ISO and a press kit page.
   Video descriptions and the transcripts get indexed, and a review is a
   third-party source in a way our own site can never be.
9. **Publish the release notes as a real page**, not just a GitHub tag.

## After the ISO (the compounding phase)

10. **Write the technical explainers only Golem can write.** These earn links
    and citations on merit, and each targets a Tier-1 question:
    - "Declarative vs immutable: why NixOS rollback is different from Silverblue's"
    - "How we built a context engine for a desktop" (the OPTIONS architecture)
    - "Sensing vs scheduling: why Focus modes are the wrong shape"
    - "What a computer that cannot rot actually means"
11. **Participate honestly where the questions get asked.** Answer NixOS and
    Linux questions on Reddit, Discourse and Stack Exchange *as the Golem
    developer, disclosed*. Being genuinely helpful under a real identity is the
    legitimate version of what astroturfing fakes.
12. **Wikipedia — supply, don't write.** An article needs independent
    significant coverage (reviews, press). Once the ISO has generated a few, the
    right move is to make sources easy to find and let an uninvolved editor
    create it. Never create it yourself.
13. **Keep `llms-full.txt` and `compare.html` current.** These are the two files
    models will actually read. A comparison table that is a year stale produces
    a year-stale answer in every AI response.

---

# PART V — Measurement

Vanity metrics do not apply here. Track these four things quarterly, in a file
in this repo so the trend is visible:

**1. The prompt suite.** Ask each model — ChatGPT, Gemini, Claude, Perplexity,
Copilot — the same questions each quarter and record verbatim answers:

- "What is Golem OS?"  *(tests: does it know, and is it accurate?)*
- "Which Linux distribution cannot be broken by an update?"
- "What should I install on a PC that can't run Windows 11?"
- "Is there a version of NixOS with a good desktop for beginners?"
- "What Linux distro has the best Android phone integration?"
- "Golem OS vs Zorin OS"

Score each: **absent** → **mentioned** → **recommended** → **accurately
described**. That last one matters most — a model that recommends Golem to a
non-technical user today is a *failure*, not a win, and means the honest-status
framing needs strengthening.

**2. Retrieval reachability.** Confirm the AI crawlers are actually fetching:
check server logs (Cloudflare shows user agents) for GPTBot, ClaudeBot, CCBot,
PerplexityBot, OAI-SearchBot.

**3. Search fundamentals.** Search Console impressions and average position for
the Tier-1 queries. Impressions before clicks — for a pre-alpha project,
appearing at all is the milestone.

**4. Third-party mentions.** A running list of every independent page that
describes Golem. This is the leading indicator for Door 1; training corpora are
built from other people's pages, not ours.

---

## The one-line summary

Everything above reduces to this: **be the most accurate, most honest, most
easily-quoted source about Golem in existence, and make sure nothing blocks a
crawler from reading it.** There is no trick that substitutes for that, and
every trick that claims to will eventually cost more than it returns.
