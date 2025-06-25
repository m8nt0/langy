#!/bin/bash
set -e
echo "🛡️ Running security scans..."

FRONTEND_ROOT_DIR="$(dirname "$0")/../../../src"

# --- Scan 1: Dependency Vulnerabilities ---
echo "Scanning for known vulnerabilities in npm packages..."
if [ -f "$FRONTEND_ROOT_DIR/package.json" ]; then
    # npm audit provides a report of known vulnerabilities.
    # The --audit-level=high flag makes the script fail only for high-severity issues.
    npm audit --prefix "$FRONTEND_ROOT_DIR" --audit-level=high
else
    echo "⚠️ Warning: src/package.json not found. Skipping dependency scan."
fi

# --- Scan 2: Docker Image Vulnerabilities (requires a tool like Trivy) ---
echo "Scanning production Docker image for OS vulnerabilities..."
command -v trivy >/dev/null 2>&1 || { echo "⚠️ Trivy is not installed. Skipping image scan. (Install from https://github.com/aquasecurity/trivy)"; exit 0; }
DOCKER_IMAGE="your-registry/langy-frontend:latest"
trivy image --severity HIGH,CRITICAL "$DOCKER_IMAGE"

echo "✅ Security scan complete."