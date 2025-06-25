#!/bin/bash
set -e
echo "🚀 Starting full build for all platforms..."

SCRIPT_DIR="$(dirname "$0")"

# --- Build Web ---
echo "--- Building Web ---"
bash "$SCRIPT_DIR/build-web.sh"
echo "--------------------"
echo ""

# --- Build Desktop ---
echo "--- Building Desktop ---"
bash "$SCRIPT_DIR/build-desktop.sh"
echo "--------------------"
echo ""

# --- Build Mobile (Placeholder) ---
# echo "--- Building Mobile ---"
# bash "$SCRIPT_DIR/build-mobile.sh"
# echo "--------------------"
# echo ""

echo "✅ Full build process complete."