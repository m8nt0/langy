#!/bin/bash
set -e
echo "Building web application (Svelte)..."

# --- Define Paths ---
# The root of the frontend project where package.json lives
FRONTEND_ROOT_DIR="$(dirname "$0")/../../../src"
# The specific Svelte project within the frontend
SVELTE_PROJECT_DIR="$FRONTEND_ROOT_DIR/interfaces/web/svelte"

if [ ! -d "$SVELTE_PROJECT_DIR" ]; then
    echo "❌ Svelte project directory not found at $SVELTE_PROJECT_DIR"
    exit 1
fi

echo "📦 Installing dependencies..."
npm install --prefix "$FRONTEND_ROOT_DIR"

echo "🛠️ Running Svelte production build..."
# Run the build script defined in the Svelte project's package.json
npm run build --prefix "$FRONTEND_ROOT_DIR"

echo "✅ Web build complete. Artifacts are in '$SVELTE_PROJECT_DIR/dist'"