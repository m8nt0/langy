#!/bin/bash
set -e
echo "🏥 Performing health checks..."

# --- Configuration ---
PROD_URL="http://your-production-domain.com" # Replace with your actual production URL
DB_HOST=${PG_HOST:-"your-prod-db-host"}      # Replace with your production DB host

# --- Check 1: Frontend Liveness ---
echo "Checking frontend application status at $PROD_URL..."
# Use curl to check if the frontend returns a 200 OK status.
if curl -s --head --request GET "$PROD_URL" | grep "200 OK" > /dev/null; then
    echo "✅ Frontend is responsive."
else
    echo "❌ Frontend is not responding with a 200 OK status."
    exit 1
fi

# --- Check 2: Database Connectivity ---
echo "Checking database connection to $DB_HOST..."
# Use pg_isready utility to check if the PostgreSQL server is accepting connections.
if pg_isready -h "$DB_HOST" -t 5; then
    echo "✅ Database is accepting connections."
else
    echo "❌ Could not connect to the database at $DB_HOST."
    exit 1
fi

echo "✅ All health checks passed successfully."