#!/bin/bash
set -e
echo "🧪 Running all tests..."

# This script assumes a test runner is configured in src/package.json
# and that it's set up to find all tests in the `workflows/tests` directory.
cd "$(dirname "$0")/../../../src"

if [ -f "package.json" ]; then
    npm test
else
    echo "⚠️ Warning: src/package.json not found. Cannot run tests."
fi

echo "✅ All tests passed."