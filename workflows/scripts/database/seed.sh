#!/bin/bash
set -e
echo "🌱 Seeding database with initial data..."

export PGPASSWORD=${PGPASSWORD:-"devpass"}
DB_USER=${PG_USER:-"devuser"}
DB_NAME=${PG_DB:-"langy_db"}
DB_HOST=${PG_HOST:-"localhost"}
DB_PORT=${PG_PORT:-"5432"}

FIXTURES_DIR="$(dirname "$0")/../../tests/fixtures/data"

if [ ! -d "$FIXTURES_DIR" ]; then
    echo "❌ Fixtures directory not found at $FIXTURES_DIR"
    exit 1
fi

# *******************************
# Example of seeding tech_objects. This is a simplified example.
# A more robust solution would use a Node.js script to parse JSON and generate INSERT 
# statements.
# echo "Seeding tech_objects..."
# # This is a placeholder for a more robust seeding script (e.g., using Node.js)
# # that reads from `tests/fixtures/data/tech-objects.json`.
# psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -c "INSERT INTO 
# tech_objects (name, level, metadata) VALUES ('Svelte', 2, '{\"description\": \"A radical 
# new approach to building user interfaces\"}');"
# psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -c "INSERT INTO 
# tech_objects (name, level, metadata) VALUES ('PostgreSQL', 3, '{\"description\": \"The 
# world''s most advanced open source relational database\"}');"

# *******************************

# Check if Node.js is available for JSON parsing
if command -v node >/dev/null 2>&1; then
    echo "Using Node.js to seed from JSON fixtures..."
    
    # Create a temporary Node.js script to parse JSON and generate SQL
    cat > /tmp/seed_script.js << 'EOF'
const fs = require('fs');
const path = require('path');

const fixturesDir = process.argv[2];
const techObjectsFile = path.join(fixturesDir, 'tech-objects.json');

if (!fs.existsSync(techObjectsFile)) {
    console.error('Tech objects file not found:', techObjectsFile);
    process.exit(1);
}

const techObjects = JSON.parse(fs.readFileSync(techObjectsFile, 'utf8'));

console.log('-- Generated SQL for tech_objects seeding');
console.log('BEGIN;');

techObjects.forEach((obj, index) => {
    const metadata = JSON.stringify(obj.metadata).replace(/'/g, "''");
    console.log(`INSERT INTO tech_objects (name, level, metadata) VALUES ('${obj.name}', ${obj.level}, '${metadata}');`);
});

console.log('COMMIT;');
EOF

    # Generate and execute SQL
    node /tmp/seed_script.js "$FIXTURES_DIR" | psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME"
    
    # Clean up
    rm /tmp/seed_script.js
    
else
    echo "Node.js not available, using fallback seeding..."
    # Fallback to hardcoded inserts
    psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -c "INSERT INTO tech_objects (name, level, metadata) VALUES ('Svelte', 2, '{\"description\": \"A radical new approach to building user interfaces\"}');"
    psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -c "INSERT INTO tech_objects (name, level, metadata) VALUES ('PostgreSQL', 3, '{\"description\": \"The world''s most advanced open source relational database\"}');"
fi

echo "✅ Database seeding complete."