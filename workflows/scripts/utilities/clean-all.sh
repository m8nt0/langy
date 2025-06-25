#!/bin/bash
set -e
echo "🧹 Cleaning up the project..."

# --- Stop and remove Docker containers ---
echo "Stopping and removing local development containers..."
cd "$(dirname "$0")/../../../" # Go to repo root
DEV_COMPOSE_FILE="workflows/config/deployment/local/docker/docker-compose.dev.yml"
if [ -f "$DEV_COMPOSE_FILE" ]; then
    docker-compose -f "$DEV_COMPOSE_FILE" down --volumes --remove-orphans
fi

# --- Remove build artifacts ---
echo "Removing build artifacts..."
rm -rf src/dist
rm -rf src/target
rm -rf src/interfaces/web/svelte/dist

# --- Remove Node modules ---
echo "Removing Node.js modules..."
rm -rf src/node_modules

echo "✅ Project cleaned."