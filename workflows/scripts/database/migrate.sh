#!/bin/bash
set -e
echo "Applying database migrations..."

# --- Load DB config from environment or config file ---
# This makes the script flexible for different environments (local vs. CI)
export PGPASSWORD=${PGPASSWORD:-"devpass"}
DB_USER=${PG_USER:-"devuser"}
DB_NAME=${PG_DB:-"langy_db"}
DB_HOST=${PG_HOST:-"localhost"}
DB_PORT=${PG_PORT:-"5432"}

MIGRATIONS_DIR="$(dirname "$0")/../../config/database/migrations"

if [ ! -d "$MIGRATIONS_DIR" ]; then
    echo "❌ Migrations directory not found at $MIGRATIONS_DIR"
    exit 1
fi

echo "Connecting to database '$DB_NAME' on '$DB_HOST:$DB_PORT'..."

# Apply all .sql files in order
for MIGRATION_FILE in $(ls -v "$MIGRATIONS_DIR"/*.sql); do
    echo "Applying migration: $(basename "$MIGRATION_FILE")..."
    psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -a -f "$MIGRATION_FILE"
done

echo "✅ All migrations applied successfully."