#!/bin/bash
set -e
echo "Building desktop application (Tauri)..."

FRONTEND_ROOT_DIR="$(dirname "$0")/../../../src"

if [ ! -d "$FRONTEND_ROOT_DIR" ]; then
    echo "❌ Frontend source directory not found at $FRONTEND_ROOT_DIR"
    exit 1
fi

echo "📦 Ensuring web dependencies are installed..."
npm install --prefix "$FRONTEND_ROOT_DIR"

echo "🛠️ Building desktop app with Tauri..."
# This command invokes the Tauri CLI to bundle the web frontend
# into a native desktop executable for the current platform (Windows, macOS, Linux).
# It reads the configuration from `workflows/config/deployment/local/native/tauri.config.js`.
npx tauri build --project-dir "$FRONTEND_ROOT_DIR"

echo "✅ Desktop build complete. Artifacts are in '$FRONTEND_ROOT_DIR/target/release/bundle/'"