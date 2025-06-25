#!/bin/bash
set -e
echo "🚀 Deploying to local Docker environment..."

# Navigate to the root of the repo
cd "$(dirname "$0")/../../../"

PROD_COMPOSE_FILE="workflows/config/deployment/local/docker/docker-compose.prod.yml"

if [ ! -f "$PROD_COMPOSE_FILE" ]; then
    echo "❌ Production Docker Compose file not found at $PROD_COMPOSE_FILE"
    exit 1
fi

echo "🐳 Building and starting production containers..."
# This command builds the multi-stage Dockerfile and starts the Nginx server
# with the production-built Svelte app, plus the database.
docker-compose -f "$PROD_COMPOSE_FILE" up --build -d

echo "✅ Local production deployment complete."
echo "🟢 Application is available at http://localhost:8080"