# Deploying golem-os.com

Static site, no build step. Pushing to `main` deploys.

## Current state (2026-08-31)

| | |
|---|---|
| GitHub Pages | **Enabled** — source `main` / root, HTTPS enforced |
| Live at | https://maxpoww.github.io/Golem-web/ |
| Custom 404 | Detected and serving a real 404 status |
| Custom domain | **Not set yet — blocked on DNS** (see below) |
| `golem-os.com` | Registered, on Cloudflare nameservers, **no A/CNAME record yet** |

## The one remaining step: DNS at Cloudflare

Everything on the GitHub side is done. The domain needs two records in the
Cloudflare dashboard → **DNS → Records → Add record**:

| Type | Name | Target | Proxy status |
|---|---|---|---|
| `CNAME` | `@` | `maxpoww.github.io` | **DNS only** (grey cloud) |
| `CNAME` | `www` | `maxpoww.github.io` | **DNS only** (grey cloud) |

Two things that matter here:

**Use CNAME at the apex, not A records.** Cloudflare does CNAME flattening, so a
CNAME on `@` works where it would be illegal on most DNS providers. This is
better than hardcoding GitHub's four A records (`185.199.108-111.153`) because
if GitHub changes those addresses, a CNAME follows automatically and A records
silently break.

**Grey cloud, not orange.** If the record is proxied, GitHub cannot complete the
ACME challenge and will never issue the TLS certificate — the site sits on
"certificate provisioning" forever. This is the single most common failure in
this setup. If you specifically want Cloudflare's proxy later (for caching or
DDoS protection), turn it on *after* GitHub's certificate has issued, and set
SSL/TLS mode to **Full (strict)** or you will get a redirect loop.

## After the DNS records exist

Tell me and I will run these, or do it yourself:

```sh
# point Pages at the domain (writes the CNAME file to the repo)
gh api -X PUT repos/maxpoww/Golem-web/pages -f cname=golem-os.com

# once the cert has issued (can take up to ~an hour), enforce HTTPS
gh api -X PUT repos/maxpoww/Golem-web/pages -F https_enforced=true

# check progress
gh api repos/maxpoww/Golem-web/pages | jq '{cname, https_enforced, status}'
```

**Do not set the custom domain before the DNS records exist.** GitHub will start
redirecting `maxpoww.github.io/Golem-web` to `golem-os.com`, and if that domain
does not resolve the site becomes unreachable at both addresses until DNS
propagates. That is why it was deliberately left unset.

## Note on canonical URLs

Every page's `<link rel="canonical">`, the sitemap and `llms.txt` all point at
`https://golem-os.com/...`, which is correct for the final home but does not
resolve yet. Nothing links to the GitHub URL so a crawl is unlikely in the
meantime, but it is a reason to finish DNS sooner rather than later — a crawler
that sees a canonical pointing at a dead domain will not index either address.

## Verifying a deploy

```sh
gh api repos/maxpoww/Golem-web/pages/builds/latest | jq -r .status   # "built"
curl -s -o /dev/null -w '%{http_code}\n' https://golem-os.com/       # 200
curl -s -o /dev/null -w '%{http_code}\n' https://golem-os.com/nope   # 404
```

## Once the domain is live

Both are in `SEO.md`, and both need the domain resolving first:

1. Submit the sitemap to [Google Search Console](https://search.google.com/search-console)
   and [Bing Webmaster Tools](https://www.bing.com/webmasters). Bing matters more
   than its market share suggests — it backs ChatGPT's web results.
2. Create the Wikidata item — every field is written out in [`WIKIDATA.md`](WIKIDATA.md).
