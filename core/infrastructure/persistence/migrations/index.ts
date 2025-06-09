// src/core/infrastructure/persistence/migrations/index.ts
import { initialSchema } from './001_initial_schema';
import { addRelationships } from './002_add_relationships';

export const migrations = [
    initialSchema,
    addRelationships
];

export class MigrationRunner {
    constructor(private db: any) { }

    async runMigrations(): Promise<void> {
        // Create migrations table if it doesn't exist
        await this.db.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id VARCHAR(255) PRIMARY KEY,
        applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

        // Get applied migrations
        const applied = await this.db.query('SELECT id FROM migrations');
        const appliedIds = new Set(applied.map((row: any) => row.id));

        // Run pending migrations
        for (const migration of migrations) {
            if (!appliedIds.has(migration.id)) {
                console.log(`Running migration: ${migration.id}`);
                await migration.up(this.db);
                await this.db.query('INSERT INTO migrations (id) VALUES ($1)', [migration.id]);
                console.log(`Completed migration: ${migration.id}`);
            }
        }
    }

    async rollback(migrationId: string): Promise<void> {
        const migration = migrations.find(m => m.id === migrationId);
        if (!migration) {
            throw new Error(`Migration ${migrationId} not found`);
        }

        await migration.down(this.db);
        await this.db.query('DELETE FROM migrations WHERE id = $1', [migrationId]);
        console.log(`Rolled back migration: ${migrationId}`);
    }
}
