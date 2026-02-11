#!/bin/bash
# Claude Skills Library Installer
# by tyr0nin - AiAiOHHH
#
# Installs skills to ~/.claude/skills/

set -e

SKILLS_DIR="$HOME/.claude/skills"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SOURCE_DIR="$SCRIPT_DIR/skills"

echo "Claude Skills Library Installer"
echo "================================"
echo ""

if [ ! -d "$SOURCE_DIR" ]; then
  echo "Error: skills/ directory not found. Run this from the repo root."
  exit 1
fi

mkdir -p "$SKILLS_DIR"

installed=0
skipped=0
updated=0

for skill_dir in "$SOURCE_DIR"/*/; do
  skill_name=$(basename "$skill_dir")

  if [ -d "$SKILLS_DIR/$skill_name" ]; then
    if [ "$1" = "--force" ] || [ "$1" = "-f" ]; then
      cp -r "$skill_dir" "$SKILLS_DIR/$skill_name"
      echo "  Updated: $skill_name"
      ((updated++))
    else
      echo "  Skipped: $skill_name (already exists, use --force to overwrite)"
      ((skipped++))
    fi
  else
    cp -r "$skill_dir" "$SKILLS_DIR/$skill_name"
    echo "  Installed: $skill_name"
    ((installed++))
  fi
done

echo ""
echo "Done! Installed: $installed | Updated: $updated | Skipped: $skipped"
echo ""
echo "To install a single skill instead:"
echo "  cp -r skills/<skill-name> ~/.claude/skills/"
echo ""
echo "Restart Claude Code to pick up new skills."
