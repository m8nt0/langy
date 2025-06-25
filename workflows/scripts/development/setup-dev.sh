#!/bin/bash
set -e
echo "🚀 Starting development setup..."

# --- Preamble: Check for required tools ---
echo "Checking for required tools (Node, Docker, Docker Compose)..."
command -v node >/dev/null 2>&1 || { echo >&2 "❌ Node.js is required but not installed. Aborting."; exit 1; }
command -v docker >/dev/null 2>&1 || { echo >&2 "❌ Docker is required but not installed. Aborting."; exit 1; }
command -v docker-compose >/dev/null 2>&1 || { echo >&2 "❌ Docker Compose is required but not installed. Aborting."; exit 1; }

# --- Step 1: Install Node.js dependencies for the frontend ---
echo "📦 Installing Node.js dependencies for the Svelte frontend..."
# Assuming the main package.json for the frontend is in src/
if [ -f "src/package.json" ]; then
    npm install --prefix src
else
    echo "⚠️ Warning: src/package.json not found. Skipping npm install."
fi

# --- Step 2: Ensure Docker daemon is running ---
if ! docker info >/dev/null 2>&1; then
    echo "❌ Docker daemon is not running. Please start Docker and try again."
    exit 1
fi

echo "✅ Development setup complete! You can now run './workflows/scripts/development/start-dev.sh'"