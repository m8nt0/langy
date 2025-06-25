#!/bin/bash
set -e
echo " backing up database..."

export PGPASSWORD=${PGPASSWORD:-"devpass"}
DB_USER=${PG_USER:-"devuser"}
DB_NAME=${PG_DB:-"langy_db"}
DB_HOST=${PG_HOST:-"localhost"}
DB_PORT=${PG_PORT:-"5432"}

BACKUP_DIR="$(dirname "$0")/../../.backups"
mkdir -p "$BACKUP_DIR"

FILENAME="backup-$(date +'%Y-%m-%dT%H-%M-%S').sqlc"
BACKUP_PATH="$BACKUP_DIR/$FILENAME"

echo "Creating backup of '$DB_NAME' to '$BACKUP_PATH'..."
pg_dump -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" --format=c --blobs > "$BACKUP_PATH"

echo "✅ Backup complete: $FILENAME"