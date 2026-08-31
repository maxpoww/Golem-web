# Wikidata entry for Golem Linux — ready to create

> Why this matters more than anything else on the site: Google's Knowledge
> Graph, and several AI systems, treat Wikidata as a structured source of truth
> about what an entity *is*. Our own pages asserting "Golem is a Linux
> distribution" is a claim; a Wikidata item saying it is a fact in a database
> those systems already read. **This is the single highest-leverage fix
> remaining for the "golem linux" query problem** — see `SEO.md` Part II-B.
>
> Unlike Wikipedia, Wikidata has **no notability requirement** for software with
> a public repository and a website. There is no reason to wait for the ISO.

## Before you start

1. Create an account at [wikidata.org](https://www.wikidata.org) (2 minutes).
2. Search Wikidata for "Golem" first and confirm no item for *this* project
   already exists. Expect to find the Golem Network compute project, the
   folklore creature, and several games — none of those are us.
3. **Do not** create a Wikipedia article. Wikidata is a database and self-created
   items for real software are normal and accepted; Wikipedia has a notability
   bar and a conflict-of-interest policy, and a self-written article there gets
   deleted. Different site, different rules.

## Create the item

Use **Create a new Item** and fill in:

- **Label (English):** `Golem`
- **Description (English):** `Linux distribution based on NixOS`
- **Also known as:** `Golem OS` · `Golem Linux` · `Golem 26 Uprise`

The description matters: it is the disambiguator shown in search results
alongside the other Golems, and it is often the exact string an AI system
repeats back.

## Statements to add

Add these one at a time. Property IDs are stable; the search box accepts the
plain name too.

| Property | Value | Notes |
|---|---|---|
| `P31` instance of | `Linux distribution` (Q131669) | The single most important statement |
| `P279` subclass of | `operating system` (Q9135) | Optional but helps classification |
| `P144` based on | `NixOS` (Q7042249) | Verify the Q-number in the search box |
| `P178` developer | `Max Power` | Free-text if no person item exists — do not create one just for this |
| `P856` official website | `https://golem-os.com` | |
| `P1324` source code repository | `https://github.com/maxpoww/Golem` | |
| `P348` software version identifier | `26` | Add qualifier: `P548` version type → `pre-release` |
| `P275` license | *(add once a LICENSE file exists)* | Blocked on the open item in `SEO.md` |
| `P277` programmed in | `Rust` (Q575650), `Nix` | The engine is Rust; the system layer is Nix |
| `P306` operating system | `Linux` (Q388) | |
| `P571` inception | `2026` | Adjust if the project started earlier |
| `P1476` title | `Golem` | |

**On references:** Wikidata prefers each statement to cite a source. For most of
these, `P854` reference URL → `https://golem-os.com/faq.html` is appropriate,
since that page states these facts in prose. For the repository and version
statements, cite the GitHub URL.

## After creating it

1. Copy the item's Q-number (it looks like `Q1234567`).
2. Tell me the number and I will add it to the site's structured data as a
   `sameAs` link on the Organization and SoftwareApplication entities. That
   closes the loop: our page points at Wikidata, Wikidata points back, and the
   entity resolves unambiguously.
3. Re-test the "golem linux" search after roughly 4–6 weeks. Wikidata is
   re-ingested on its own schedule and the effect is not immediate.

## The other two off-site items, for the same reason

Both are faster than the above and both are currently empty:

- **GitHub repo About field** on `github.com/maxpoww/Golem` — set the
  description to something containing the exact phrase, e.g. *"Golem Linux — a
  NixOS-based distribution built around OPTIONS, a context engine. The OS that
  cannot rot."* Add the website link and topics: `nixos`, `linux-distribution`,
  `operating-system`, `wayland`, `hyprland`, `rust`, `desktop-environment`.
  GitHub is a high-authority domain that is heavily represented in both training
  data and live retrieval.
- **DistroWatch** submission — waits for the ISO, as it requires a real release,
  but it is the canonical Linux distribution database and is cited constantly.
