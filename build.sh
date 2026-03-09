#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────
# Fading Days – Build script
# Creates distributable ZIP packages for Chrome and Firefox
# Usage: ./build.sh
# ─────────────────────────────────────────────────────────

set -euo pipefail

VERSION=$(grep '"version"' manifest.json | head -1 | sed 's/.*: *"\(.*\)".*/\1/')
DIST_DIR="dist"
SRC_FILES=(
    manifest.json
    _locales
    assets
    src
)

echo "🔨 Building Fading Days v${VERSION}..."

# Clean previous builds
rm -rf "${DIST_DIR}"
mkdir -p "${DIST_DIR}"

# ── Chrome build ──────────────────────────────────────────
CHROME_ZIP="${DIST_DIR}/FadingDays-v${VERSION}-chrome.zip"
echo "📦 Packaging for Chrome → ${CHROME_ZIP}"
zip -r -q "${CHROME_ZIP}" "${SRC_FILES[@]}" -x "*.DS_Store" -x "*__MACOSX*"
echo "   ✅ Chrome package ready"

# ── Firefox build ─────────────────────────────────────────
# Firefox uses the same source (browser_specific_settings is ignored by Chrome)
FIREFOX_ZIP="${DIST_DIR}/FadingDays-v${VERSION}-firefox.zip"
echo "📦 Packaging for Firefox → ${FIREFOX_ZIP}"
zip -r -q "${FIREFOX_ZIP}" "${SRC_FILES[@]}" -x "*.DS_Store" -x "*__MACOSX*"
echo "   ✅ Firefox package ready"

echo ""
echo "🎉 Done! Packages are in ${DIST_DIR}/"
ls -lh "${DIST_DIR}/"
