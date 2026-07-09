#!/usr/bin/env bash
# Fetch customer brand logos into public/assets/logos/.
#
# Usage:
#   bash scripts/fetch-logos.sh
#
# Requires a logo provider token. Two free options:
#   1. logo.dev — sign up at https://www.logo.dev for a public token.
#      Then export: LOGO_DEV_TOKEN=pk_xxx
#   2. clearbit (legacy, may not work for all domains, no token needed):
#      runs as the fallback if LOGO_DEV_TOKEN is not set.
#
# Trademark note: even when fetch succeeds, you should hold customer
# permission before publishing the logos on a public site.

set -euo pipefail

OUT="public/assets/logos"
mkdir -p "$OUT"

DOMAINS=(
  "liberte-essentiel:liberte-essentiel.com"
  "cocouture:cocouture.com"
  "rosemunde:rosemunde.com"
  "freequent:freequent.com"
  "neo-noir:neonoir.com"
  "coverstory:coverstory.co.in"
  "mufti:muftijeans.in"
  "madame:madame.in"
  "balilab:balilab.com"
  "mavi:mavi.com"
  "7-for-all-mankind:7forallmankind.com"
  "us-polo-assn:uspoloassn.com"
  "tillys:tillys.com"
  "tjx:tjx.com"
  "walmart:walmart.com"
  "sanetta:sanetta.de"
  "herff-jones:herffjones.com"
  "bass-pro-shops:basspro.com"
  "bmw:bmw.com"
  "audi:audi.com"
  "vw:vw.com"
  "ktm:ktm.com"
  "stihl:stihl.com"
  "hilti:hilti.com"
  "claas:claas.com"
)

for pair in "${DOMAINS[@]}"; do
  slug="${pair%%:*}"
  domain="${pair##*:}"
  out="$OUT/${slug}.png"

  if [ -f "$out" ]; then
    echo "skip $slug, already present"
    continue
  fi

  if [ -n "${LOGO_DEV_TOKEN:-}" ]; then
    url="https://img.logo.dev/${domain}?token=${LOGO_DEV_TOKEN}&size=300&format=png"
  else
    url="https://logo.clearbit.com/${domain}?size=300"
  fi

  echo "fetch $slug from $url"
  if curl -fsSL "$url" -o "$out"; then
    echo "ok $slug"
  else
    echo "fail $slug, will fall back to text silhouette in the UI"
    rm -f "$out"
  fi
done

echo "done. files in $OUT"
