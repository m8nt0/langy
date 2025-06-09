// src/core/infrastructure/persistence/migrations/002_add_relationships.ts
export const addRelationships = {
    id: '002_add_relationships',
    description: 'Add relationships table and enhance tech objects',

    up: async (db: any) => {
        // Create relationships table
        await db.query(`
        CREATE TABLE IF NOT EXISTS relationships (
          id VARCHAR(255) PRIMARY KEY,
          source_id VARCHAR(255) NOT NULL,
          target_id VARCHAR(255) NOT NULL,
          type VARCHAR(100) NOT NULL,
          strength DECIMAL(3,2) DEFAULT 1.0,
          metadata JSONB DEFAULT '{}',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (source_id) REFERENCES tech_objects(id) ON DELETE CASCADE,
          FOREIGN KEY (target_id) REFERENCES tech_objects(id) ON DELETE CASCADE
        )
      `);

        // Create indexes for relationships
        await db.query('CREATE INDEX IF NOT EXISTS idx_relationships_source ON relationships(source_id)');
        await db.query('CREATE INDEX IF NOT EXISTS idx_relationships_target ON relationships(target_id)');
        await db.query('CREATE INDEX IF NOT EXISTS idx_relationships_type ON relationships(type)');

        // Add full-text search to tech_objects
        await db.query('CREATE INDEX IF NOT EXISTS idx_tech_objects_search ON tech_objects USING gin(to_tsvector(\'english\', name || \' \' || coalesce((metadata->>\'description\'), \'\')))');
    },

    down: async (db: any) => {
        await db.query('DROP TABLE IF EXISTS relationships');
        await db.query('DROP INDEX IF EXISTS idx_tech_objects_search');
    }
};
