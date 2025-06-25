#!/bin/bash
set -e
echo "🔍 Linting and formatting code..."

# This assumes you have ESLint and Prettier configured in your src/package.json
cd "$(dirname "$0")/../../../src"

if [ -f "package.json" ]; then
    # Run Prettier to format code
    npm run format

    # Run ESLint to find and fix problems
    npm run lint -- --fix
else
    echo "⚠️ Warning: src/package.json not found. Cannot run linter or formatter."
fi

echo "✅ Linting and formatting complete."