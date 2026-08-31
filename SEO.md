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
| Definitional surface | `concepts.html` | `DefinedTermSet` with 10 `DefinedTerm` entries — atomic update, generation, rollback, declarative, immutable, reproducible, flake, context engine, compositor. Definitional content is what AI systems retrieve most, and the immutable-vs-declarative explainer is a Tier-1 query nobody has written well. |
| Entity consolidation | inner pages | Each page carries a `BreadcrumbList` and a `WebPage` node whose `about` points at `#golem` and `isPartOf` at `#website`, so the whole site resolves to one entity rather than eight unrelated documents. |
| Soft-404 prevention | `404.html` | GitHub Pages serves it automatically. Marked `noindex, follow` so link equity passes through but the page never ranks. |
| Keyboard & contrast | `assets/styles.css` | Skip link, visible `:focus-visible` ring, and `--ink-faint` raised from #64748b (4.15:1 — failed WCAG AA) to #707f95 (4.87:1 — passes). Accessibility is a ranking input and a real usability fix. |
| Off-site prep | `WIKIDATA.md` | Every property and value needed to create the Wikidata item, ready to paste. |
| Author entity | all pages | One `Person` node with `@id` on the homepage, referenced by every other page, so Max Power resolves as one author rather than seven unlinked mentions. |
| Instant indexing | `indexnow.sh` + key file | IndexNow push to Bing, Yandex, Seznam and Naver. Guarded so it refuses to submit before DNS resolves. |
| Deployment | `DEPLOY.md` | Pages live on `main`/root; the Cloudflare DNS step and its two common failure modes documented. |

**A caveat worth knowing:** `llms.txt` is a proposed convention, not a standard
that any major provider has committed to honoring. It costs almost nothing to
maintain and positions us if adoption comes. The structured data, the clean HTML
and the FAQ do the real work today.

---

# PART II-B — Two specific problems, and what was done about them

## Problem 1: "golem os" ranks, "golem linux" does not

**Diagnosed 2026-08-31.** The cause was concrete and entirely our own doing:

- The homepage `<title>` was *"Golem — an operating system with a soul"*.
- The `<h1>` was *"An operating system with a soul"*.
- The meta description said *"operating system"*.
- The exact phrase **"Golem Linux" appeared zero times on the entire site.**

Google had therefore learned the association `Golem + operating system` — which
is exactly why "golem os" worked — and had no `Golem + Linux` association to
retrieve. Faced with an unfamiliar query it substituted the nearest known
entity, which is why *Gentoo Linux* showed up instead. That is not Google being
wrong; it is Google never having been told.

**Fixed:**

| Change | Where |
|---|---|
| Title → "Golem Linux — an operating system with a soul" | `index.html` |
| Description rewritten to lead with "Golem Linux is a NixOS-based distribution…" | `index.html` |
| Hero copy → "We build Golem, a Linux distribution designed around one idea…" | `index.html` |
| `alternateName: ["Golem Linux", "Golem OS", …]` + `applicationSubCategory: "Linux distribution"` | JSON-LD |
| Explicit disambiguation from the Golem Network crypto project | JSON-LD, `llms.txt`, FAQ |
| New FAQ entry: "Is Golem Linux the same thing as Golem OS?" | `faq.html` |

Count of the phrase "Golem Linux" across the site: **0 before, 15 after.**

**Still needed (off-site — this is where entity resolution is actually won):**
a Wikidata item, the GitHub About field, and DistroWatch at ISO. Google builds
its Knowledge Graph from those, not from our own assertions about ourselves.

## Problem 2: competing on "best linux distro"

You asked for the keywords to live "in the back end" so they don't clutter the
design. Half of that is exactly right and has been done; the other half does not
work, and it is worth being precise about which is which.

### What was done (invisible to visitors, honest, effective)

Titles, meta descriptions, JSON-LD and `llms.txt` are all invisible on the
rendered page and are precisely what Google and AI crawlers read. That *is* the
back end you were asking for, and it now carries the entity terms. Nothing about
the visible design changed except one word in the hero paragraph.

### What was deliberately not done, and why

**A `<meta name="keywords">` tag.** Google has publicly ignored this tag
[since 2009](https://developers.google.com/search/blog/2009/09/google-does-not-use-keywords-meta-tag).
Bing treats it as a spam signal. It is not a shortcut that has been overlooked —
it is a dead element, and adding it would have zero effect in either direction.

**Hidden keywords anywhere else** — white-on-white text, `display:none` blocks,
alt-text stuffing, comment blocks. This is [hidden text and
cloaking](https://developers.google.com/search/docs/essentials/spam-policies),
an explicit spam policy violation carrying manual-action and deindexing risk.
For a domain with no ranking history, one manual action is close to
unrecoverable. And it would not work even if it were allowed: modern ranking is
based on how well a page satisfies a query, evaluated on the content users see.

**Claiming "best Linux distro" in metadata.** Two reasons beyond honesty. First,
Google rewrites meta descriptions that don't match page content, so the claim
would be discarded. Second, the entire discoverability strategy in this document
depends on Golem being the *trustworthy* source about itself — one unearned
superlative from a pre-alpha project undermines the asset that took real work
to build.

### The thing nobody tells you about "best linux distro"

**A distribution's own website essentially never ranks for that query.** A search
performed 2026-08-31 returned nine results — DreamHost, LinuxBlog, ServerSpace,
Contabo, iTechGuides, Tech2Geek, Linux Journal, LinuxTeck, DEV Community. Every
one is a third-party listicle. `ubuntu.com` was not there. Neither was
`fedoraproject.org` or `linuxmint.com`, and those are the distributions the
articles *recommend*.

The reason is intent: someone typing "best linux distro" is asking to be shown a
comparison, so Google serves comparison articles. A vendor homepage does not
satisfy that intent no matter what its metadata says. **You do not win this
query by ranking for it. You win it by being in the articles that do.**

### So the real strategy is three parts

1. **Get into the listicles.** Every article above is written by someone
   reachable, and they refresh yearly. At ISO, a genuinely novel angle — "the
   distro whose rollback is a visible feature" — is a pitch that writes itself.
   This is the single highest-leverage action for this query, and it is entirely
   off-site.
2. **Own the long tail where the claim is true.** Not "best Linux distro" but
   *"best Linux distro that can't break"*, *"best Linux for a PC Windows 11
   rejected"*, *"easiest NixOS-based distro"*. These are winnable, they convert
   far better, and Golem can honestly claim them once the ISO ships.
3. **Be the source listicle authors and AI systems quote** — which is what
   `choose.html` is for (below).

### `choose.html` — the honest way to serve this intent

A new page, *"Which Linux should you actually install?"*: a routing table that
recommends Zorin, Mint, Fedora, Silverblue, Bazzite, Debian, Arch and NixOS by
situation, and puts Golem in exactly one row, honestly labelled as not ready.

This is not a doorway page, and the distinction is worth stating because it is
the line this project should keep walking. A doorway page exists only to catch a
query and funnel traffic; it has no value of its own and recommends only its
owner. `choose.html` would be genuinely useful if Golem did not exist, and it
sends most readers to competitors. That is what makes it citable — by a listicle
author looking for a credible source, and by an AI system answering "what should
I install?". Being the honest reference is a *better* position than being the
loudest claimant, and it is the only one available to a pre-alpha project anyway.

The corresponding FAQ entry, *"Is Golem the best Linux distribution?"*, answers
**"No, not today"** and names the alternatives. When an AI system is asked that
question, this is the passage it can quote — and a project that publicly names
its own competitors is one whose eventual claim gets believed.

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
- Note the obvious collision: *golem* is also a compute network, a mythological
  figure, and several games. Always publish as **"Golem Linux"** in off-site
  contexts — it is the least ambiguous form and the one that was missing entirely
  until 2026-08-31 (see Part II-B).

**Explicitly out of reach today — "best linux distro" / "best linux distribution"
/ "best linux".** Not because of ambition but because of mechanics: those SERPs
are 100% third-party listicles and a vendor site does not satisfy the intent.
The path in is Part II-B's three-part strategy — get into the listicles, own the
qualified long tail, be the source others quote. Revisit the unqualified term
only when the ISO has shipped and the claim can survive scrutiny.

---

# PART IV — The work, in priority order

## Now (before the ISO — the foundation phase)

1. ~~**Add a LICENSE file to the Golem repo.**~~ ✅ **Done 2026-08-31** —
   **GPL-3.0-or-later**, chosen because the planned Android companion forks the
   GPL-3.0 kdeconnect-android (so the phone side is copyleft regardless) and
   because copyleft is what prevents a closed derivative with the telemetry and
   ads the manifesto refuses. GitHub now detects and displays the license, which
   is itself a discoverability signal; DistroWatch and F-Droid both require it.
   Reflected in the site's `SoftwareApplication` schema, the FAQ and `llms.txt`.
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
   directly consumed by AI systems as a structured fact source. **Every property
   and value is written out ready to paste in [`WIKIDATA.md`](WIKIDATA.md)** —
   it is about fifteen minutes of work and it is the highest-leverage remaining
   fix for the "golem linux" entity problem, because Google trusts a database
   record over a site's claims about itself.
5. **Test the baseline.** Run the prompt suite in Part V *now*, before anything
   has been done, so you can prove movement later.
6. **Re-test "golem linux" in about 4–6 weeks.** The entity fix in Part II-B
   only takes effect after Google recrawls and reprocesses the homepage. If the
   query still fails after the Wikidata item exists and has been indexed, the
   next lever is a third-party page using the exact phrase — a GitHub About
   field, a forum post, a review — because Google trusts other people's naming
   of you more than your own.

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

# PART IV-B — Search engines beyond Google

## Bing, DuckDuckGo and Yahoo are one lever, not three

This is the single most useful fact in this section. **Bing's index powers
DuckDuckGo, Yahoo, ChatGPT Search, Microsoft Copilot and Windows search.**
DuckDuckGo supplements with its own crawler and sources like Wikipedia, and
Yahoo layers its own homepage on top, but the underlying results come from Bing.

There is no DuckDuckGo submission tool and no Yahoo submission tool, because
there is nothing to submit to. **Verifying the site in [Bing Webmaster
Tools](https://www.bing.com/webmasters) covers all of them at once** — and,
critically for this project, it is also the index behind ChatGPT's web results.
For a site chasing AI visibility, Bing is arguably a better use of an hour than
Google Search Console.

## The engines that actually have their own index

Almost every other "search engine" is a front end on Google or Bing. The ones
running independent crawls:

| Engine | Worth doing? |
|---|---|
| **Google** | Yes — Search Console, submit the sitemap. |
| **Bing** | Yes — covers Bing, DuckDuckGo, Yahoo, ChatGPT Search, Copilot. |
| **Brave Search** | Independent index, privacy-focused audience that overlaps ours almost perfectly. No submission needed; it crawls. Just do not block `Bravebot`. |
| **Yandex** | Own index. Matters if Russian-speaking users are a target; otherwise low priority. Accepts IndexNow. |
| **Mojeek / Marginalia** | Tiny independent indexes, but Marginalia deliberately surfaces non-commercial, text-heavy, hand-built sites — which describes this one exactly. Nothing to submit; they crawl. |
| **Baidu** | Skip. Meaningful presence requires an ICP licence and Chinese hosting. |

**Do not** use "submit your site to 500 search engines" services. Those 500 are
front ends on the two indexes above; the services are spam, and some leave
footprints that look like link schemes.

## IndexNow — set up 2026-08-31

[IndexNow](https://www.indexnow.org) lets a site *push* changed URLs instead of
waiting to be crawled. Supported by **Bing, Yandex, Seznam and Naver**; a single
submission propagates to all participants. **Google does not participate** and
has said it is evaluating the protocol, so Google still needs Search Console.

Set up in this repo:

- Key file: `baea06f8…8e4d.txt` at the site root (the filename is the key, and
  the file contains the key — that is how IndexNow verifies ownership).
- `indexnow.sh` submits every URL in `sitemap.xml`, or specific paths.

```sh
./indexnow.sh                        # everything in the sitemap
./indexnow.sh /faq.html /index.html  # just these
```

The script refuses to submit until the key file is reachable at
`golem-os.com`, so it is safe to run now — it will simply tell you DNS is not
live yet. Run it after DNS lands, and after any significant content change.

Cloudflare also offers a one-click IndexNow integration in its dashboard which
submits automatically on cache purge. Since the site is already behind
Cloudflare DNS, that is a reasonable alternative to the script — but do not
enable both, or you will double-submit and risk rate limiting.

## Submission checklist, in order

Everything here is blocked on DNS resolving (see `DEPLOY.md`).

1. **Bing Webmaster Tools** — verify, submit `sitemap.xml`. Highest value:
   Bing + DuckDuckGo + Yahoo + ChatGPT Search + Copilot in one action. It can
   import from Search Console if you do Google first.
2. **Google Search Console** — verify, submit `sitemap.xml`, request indexing on
   the homepage.
3. **Run `./indexnow.sh`** — Bing, Yandex, Seznam, Naver, immediately.
4. **Wikidata** — see [`WIKIDATA.md`](WIKIDATA.md). Not a search engine, but it
   is what makes the entity resolve, and it feeds Google's Knowledge Graph.

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
