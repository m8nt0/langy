#!/bin/bash
set -e
echo "📚 Generating source code documentation..."

FRONTEND_ROOT_DIR="$(dirname "$0")/../../../src"

# This assumes you have TypeDoc installed and configured in your project
command -v typedoc >/dev/null 2>&1 || { echo "⚠️ TypeDoc is not installed (run 'npm install typedoc --save-dev'). Aborting."; exit 1; }

# Generate documentation for the entire 'core' and 'interfaces' directories
typedoc --out docs/source-api-docs "$FRONTEND_ROOT_DIR/core" "$FRONTEND_ROOT_DIR/interfaces"

echo "✅ Documentation generated in 'docs/source-api-docs'"