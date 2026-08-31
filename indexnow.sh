#!/usr/bin/env bash
# Push golem-os.com URLs to IndexNow — instant indexing for Bing, Yandex,
# Seznam and Naver from a single submission. Google does not participate.
#
# Because Bing's index also feeds DuckDuckGo, Yahoo, ChatGPT Search and
# Copilot, this one call reaches all of them.
#
# Usage:
#   ./indexnow.sh                      submit every URL in sitemap.xml
#   ./indexnow.sh /faq.html /index.html   submit specific paths
#
# Only run this after golem-os.com resolves — IndexNow verifies ownership by
# fetching the key file from the domain you are submitting for.

set -euo pipefail

HOST="golem-os.com"
KEY="baea06f8d1b802fb5ee1489f9c4e42b30220cdc78e84d0845394062d20848e4d"
KEY_LOCATION="https://${HOST}/${KEY}.txt"

cd "$(dirname "$0")"

if [ $# -gt 0 ]; then
  urls=()
  for p in "$@"; do
    [[ "$p" == http* ]] && urls+=("$p") || urls+=("https://${HOST}${p}")
  done
else
  mapfile -t urls < <(grep -o '<loc>[^<]*</loc>' sitemap.xml | sed 's|<loc>||;s|</loc>||')
fi

if [ ${#urls[@]} -eq 0 ]; then
  echo "no URLs to submit" >&2
  exit 1
fi

# Confirm the key file is reachable before submitting; IndexNow rejects
# the whole batch with 403 if it cannot verify ownership.
code=$(curl -s -o /dev/null -w '%{http_code}' "$KEY_LOCATION" || true)
if [ "$code" != "200" ]; then
  echo "key file not reachable at ${KEY_LOCATION} (HTTP ${code})" >&2
  echo "DNS may not be live yet — see DEPLOY.md" >&2
  exit 1
fi

payload=$(printf '%s\n' "${urls[@]}" | jq -R . | jq -s \
  --arg host "$HOST" --arg key "$KEY" --arg loc "$KEY_LOCATION" \
  '{host: $host, key: $key, keyLocation: $loc, urlList: .}')

echo "submitting ${#urls[@]} URL(s) to IndexNow…"
printf '%s\n' "${urls[@]}" | sed 's/^/  /'

status=$(curl -s -o /dev/stderr -w '%{http_code}' \
  -X POST "https://api.indexnow.org/IndexNow" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d "$payload")

echo
case "$status" in
  200|202) echo "accepted (HTTP $status)" ;;
  400) echo "HTTP 400 — malformed request" >&2; exit 1 ;;
  403) echo "HTTP 403 — key not valid for this host" >&2; exit 1 ;;
  422) echo "HTTP 422 — URLs do not match the host" >&2; exit 1 ;;
  429) echo "HTTP 429 — rate limited, try later" >&2; exit 1 ;;
  *)   echo "unexpected HTTP $status" >&2; exit 1 ;;
esac
