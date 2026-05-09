#!/usr/bin/env bash
set -euo pipefail

if ! command -v gh >/dev/null 2>&1; then
  echo "GitHub CLI is not installed. Install gh or apply .github/labels.yml manually."
  exit 1
fi

if ! gh auth status >/dev/null 2>&1; then
  echo "GitHub CLI is not authenticated. Run: gh auth login"
  exit 1
fi

labels=(
  "good first issue|7057ff|Beginner-friendly task with a small, clear scope"
  "bug|d73a4a|Something is broken or behaving unexpectedly"
  "feature|0e8a16|New feature or enhancement"
  "help wanted|008672|Extra help from contributors is welcome"
  "documentation|0075ca|Documentation updates or improvements"
)

for label in "${labels[@]}"; do
  IFS="|" read -r name color description <<< "$label"
  if gh label list --json name --jq '.[].name' | grep -Fxq "$name"; then
    gh label edit "$name" --color "$color" --description "$description"
  else
    gh label create "$name" --color "$color" --description "$description"
  fi
done

echo "Labels are up to date."
