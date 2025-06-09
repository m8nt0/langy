// src/core/infrastructure/persistence/migrations/001_initial_schema.ts
export const initialSchema = {
    id: '001_initial_schema',
    description: 'Create initial tables for tech objects, levels, and basic structure',

    up: async (db: any) => {
        // Create levels table
        await db.query(`
        CREATE TABLE IF NOT EXISTS levels (
          id VARCHAR(255) PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          level_number INTEGER NOT NULL UNIQUE,
          description TEXT,
          config JSONB DEFAULT '{}',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

        // Create tech_objects table
        await db.query(`
        CREATE TABLE IF NOT EXISTS tech_objects (
          id VARCHAR(255) PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          type VARCHAR(100) NOT NULL,
          level INTEGER NOT NULL,
          versions JSONB DEFAULT '[]',
          metadata JSONB DEFAULT '{}',
          content JSONB DEFAULT '{}',
          relationships JSONB DEFAULT '[]',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (level) REFERENCES levels(level_number)
        )
      `);

        // Create indexes
        await db.query('CREATE INDEX IF NOT EXISTS idx_tech_objects_level ON tech_objects(level)');
        await db.query('CREATE INDEX IF NOT EXISTS idx_tech_objects_name ON tech_objects(name)');
        await db.query('CREATE INDEX IF NOT EXISTS idx_tech_objects_type ON tech_objects(type)');

        // Insert default levels
        const levels = [
            { id: 'programming-languages', name: 'Programming Languages', level_number: 1, description: 'Core programming languages' },
            { id: 'libraries', name: 'Libraries', level_number: 2, description: 'Code libraries and packages' },
            { id: 'frameworks', name: 'Frameworks', level_number: 3, description: 'Development frameworks' },
            { id: 'applications', name: 'Applications', level_number: 4, description: 'Applications and tools' }
        ];

        for (const level of levels) {
            await db.query(
                'INSERT INTO levels (id, name, level_number, description) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING',
                [level.id, level.name, level.level_number, level.description]
            );
        }
    },

    down: async (db: any) => {
        await db.query('DROP TABLE IF EXISTS tech_objects');
        await db.query('DROP TABLE IF EXISTS levels');
    }
};