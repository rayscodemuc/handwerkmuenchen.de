#!/usr/bin/env bash
# Worktree entfernen (z. B. nach Merge auf main).
# Nutzung: ./scripts/worktree-remove.sh <kurzname>
# Env: GIT_WORKTREE_BARE überschreibt ~/repos/handwerkmuenchen.de
set -euo pipefail

BARE="${GIT_WORKTREE_BARE:-$HOME/repos/handwerkmuenchen.de}"
SLUG="${1:?Usage: $0 <kurzname>  (Ordnername unter branches/, ohne Pfad)}"

WT_PATH="${BARE}/branches/${SLUG}"

if [[ ! -d "$BARE" ]]; then
  echo "Bare-Repo nicht gefunden: $BARE" >&2
  exit 1
fi

cd "$BARE"
git worktree remove "$WT_PATH"

echo "Entfernt: ${WT_PATH}"
echo "Optional lokalen Branch löschen (wenn gemergt): git branch -d feature/${SLUG}"
echo "Optional Remote-Branch: git push origin --delete feature/${SLUG}"
