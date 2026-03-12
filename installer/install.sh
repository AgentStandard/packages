#!/usr/bin/env bash

# ─────────────────────────────────────────────────────────────────────────────
#  AgentStandard — First Conversation Installer
#  agentstandard.ai
# ─────────────────────────────────────────────────────────────────────────────

set -euo pipefail

# ── Colours ──────────────────────────────────────────────────────────────────
BOLD='\033[1m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
RESET='\033[0m'

# ── Helpers ───────────────────────────────────────────────────────────────────
step()    { echo -e "\n${BOLD}▸ $1${RESET}"; }
ok()      { echo -e "  ${GREEN}✓ $1${RESET}"; }
warn()    { echo -e "  ${YELLOW}⚠  $1${RESET}"; }
fail()    { echo -e "\n${RED}✗ $1${RESET}\n"; exit 1; }

# ── Banner ────────────────────────────────────────────────────────────────────
echo ""
echo -e "${BOLD}  AgentStandard — First Conversation${RESET}"
echo -e "  Setting up your AI agent. This takes about a minute."
echo -e "  ────────────────────────────────────────────────────"


# ── Step 1: Check Node.js ─────────────────────────────────────────────────────
step "Checking for Node.js..."

if ! command -v node &>/dev/null; then
  echo ""
  echo -e "${RED}  Node.js is not installed.${RESET}"
  echo ""
  echo -e "  Node.js is required to run your agent. It's free and takes"
  echo -e "  about two minutes to install:"
  echo ""
  echo -e "  ${BOLD}  https://nodejs.org${RESET}  ← download the LTS version"
  echo ""
  echo -e "  Once Node.js is installed, run this command again."
  echo ""
  exit 1
fi

NODE_VERSION=$(node --version)
ok "Node.js found ($NODE_VERSION)"


# ── Step 2: Check / install OpenClaw ─────────────────────────────────────────
step "Checking for OpenClaw..."

if command -v openclaw &>/dev/null; then
  OC_VERSION=$(openclaw --version 2>/dev/null || echo "installed")
  ok "OpenClaw already installed ($OC_VERSION)"
else
  echo -e "  OpenClaw isn't installed yet — installing it now..."
  echo -e "  ${YELLOW}(You may be asked for your Mac password — this is normal.)${RESET}"
  echo ""

  if ! npm install -g openclaw; then
    fail "Could not install OpenClaw. Please check your internet connection and try again.
  If the problem continues, visit: https://agentstandard.ai/help"
  fi

  ok "OpenClaw installed"
fi


# ── Step 3: Install First Conversation package ────────────────────────────────
step "Installing the First Conversation package..."

if ! clawhub install first-conversation; then
  fail "Couldn't install the First Conversation package.
  Please check your internet connection and try again.
  If the problem continues, visit: https://agentstandard.ai/help"
fi

ok "First Conversation package installed"


# ── Done ──────────────────────────────────────────────────────────────────────
echo ""
echo -e "  ────────────────────────────────────────────────────"
echo -e "${GREEN}${BOLD}  Your agent is ready.${RESET}"
echo ""
echo -e "  Open a new terminal window and type:"
echo ""
echo -e "  ${BOLD}    openclaw start${RESET}"
echo ""
echo -e "  That's it. Your first conversation is waiting."
echo -e "  ────────────────────────────────────────────────────"
echo ""
