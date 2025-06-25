#!/bin/bash
set -e
echo "🚀 Launching local development environment..."

# Navigate to the correct directory to find docker-compose
cd "$(dirname "$0")/../../../" # Go to the root of the repo

DEV_COMPOSE_FILE="workflows/config/deployment/local/docker/docker-compose.dev.yml"

if [ ! -f "$DEV_COMPOSE_FILE" ]; then
    echo "❌ Docker compose file not found at $DEV_COMPOSE_FILE"
    exit 1
fi

echo "🐳 Starting services with Docker Compose..."
# -d runs in detached mode
# --build forces a rebuild of the image if the Dockerfile has changed
docker-compose -f "$DEV_COMPOSE_FILE" up --build -d

echo "✅ Services are starting up."
echo "🟢 Svelte frontend will be available at http://localhost:5173"
echo "🟢 PostgreSQL database is running on port 5432"
echo "To stop the services, run: docker-compose -f $DEV_COMPOSE_FILE down"