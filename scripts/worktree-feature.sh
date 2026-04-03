#!/usr/bin/env bash
# Neues Feature: Worktree unter branches/<slug> + Branch feature/<slug> von origin/main.
# Nutzung: ./scripts/worktree-feature.sh <kurzname>
#   Kurzname: kebab-case, z. B. gewerk-mangel-filter
# Env: GIT_WORKTREE_BARE überschreibt ~/repos/handwerkmuenchen.de
set -euo pipefail

BARE="${GIT_WORKTREE_BARE:-$HOME/repos/handwerkmuenchen.de}"
SLUG="${1:?Usage: $0 <kurzname-kebab-case>  (Beispiel: $0 gewerk-mangel-filter)}"

if [[ "$SLUG" == *"/"* ]] || [[ "$SLUG" == *" "* ]]; then
  echo "Kurzname ohne Slash und Leerzeichen (kebab-case)." >&2
  exit 1
fi

BRANCH="feature/${SLUG}"
WT_PATH="${BARE}/branches/${SLUG}"

if [[ ! -d "$BARE" ]]; then
  echo "Bare-Repo nicht gefunden: $BARE" >&2
  echo "Setze GIT_WORKTREE_BARE oder lege das Bare-Repo dort an." >&2
  exit 1
fi

cd "$BARE"
git fetch origin

if [[ -e "$WT_PATH" ]]; then
  echo "Pfad existiert schon: $WT_PATH" >&2
  exit 1
fi

if git show-ref --verify --quiet "refs/heads/${BRANCH}"; then
  echo "Branch existiert lokal schon: ${BRANCH} — nutze:" >&2
  echo "  git worktree add branches/${SLUG} ${BRANCH}" >&2
  exit 1
fi

git worktree add "branches/${SLUG}" -b "${BRANCH}" origin/main

echo ""
echo "Worktree: ${WT_PATH}"
echo "Branch:   ${BRANCH}"
echo ""
echo "Nächste Schritte:"
echo "  cd ${WT_PATH}"
echo "  npm i"
echo "  cp ../main/.env.local . 2>/dev/null || true   # falls ../main existiert"
echo "  npm run dev"
echo ""
