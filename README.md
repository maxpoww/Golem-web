# Golem-web

The website for **Golem** — golem-os.com. Static, hand-built, no frameworks,
no trackers: this site, like Golem, does not watch you.

## Pages

- `index.html` — home: the story, live-animated recreations of OPTIONS
  behaviors, the interactive roll-back demo, phone fusion, the refusals.
- `options.html` — the philosophy: game design → OPTIONS, the four organs,
  the six gates of a finished module.
- `compare.html` — Golem measured against Windows, macOS, Ubuntu, Silverblue,
  NixOS and COSMIC, including when *not* to choose Golem.
- `faq.html` — real questions, direct answers, no marketing.
- `download.html` — get Golem: the VM build today, the ISO bar for Arc 1.
- `manifesto.html` — the manifesto, beautifully set.

## Assets

- `assets/styles.css` — the design language (dark substrate, frosted glass,
  motion with intent, idle at rest).
- `assets/golem.js` — demo timelines and reveals. Every animation runs only
  while visible and respects `prefers-reduced-motion`.
- `assets/og-card.html` → `assets/og-image.png` — the social share card.
  Regenerate with the command in the comment at the top of `og-card.html`.

## Discoverability

- `robots.txt` — deliberately welcomes every AI crawler, including CCBot.
- `sitemap.xml` — all pages; referenced from robots.txt.
- `llms.txt` / `llms-full.txt` — curated and full site content for LLMs.
- JSON-LD structured data is inline in each page's `<head>`.

## Docs

- `WEBSITE.md` — market analysis, site spec, and marketing plan.
- `SEO.md` — the search and AI-discoverability playbook: how AI recommendation
  works, what's built, the question space to own, and the ongoing work.

## Develop

It's static — open `index.html` in a browser. No build step.

When editing content, keep `llms-full.txt` in sync: it is the file AI systems
read, and a stale copy produces stale answers everywhere.
