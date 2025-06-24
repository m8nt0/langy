-- 001_initial_schema.sql
-- Creates the core tables for TechObjects and their versions.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE tech_objects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL UNIQUE,
    level INT NOT NULL,
    metadata JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE tech_versions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tech_object_id UUID NOT NULL REFERENCES tech_objects(id) ON DELETE CASCADE,
    parent_version_id UUID REFERENCES tech_versions(id) ON DELETE CASCADE,
    version VARCHAR(100) NOT NULL,
    metadata JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    -- All viewer data for a specific version is stored in a single JSONB column
    -- This is highly flexible and performant for querying nested properties.
    viewers_data JSONB
);

CREATE INDEX idx_tech_versions_tech_object_id ON tech_versions(tech_object_id);
CREATE INDEX idx_tech_versions_parent_id ON tech_versions(parent_version_id);

-- Trigger to auto-update the 'updated_at' timestamp
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp_tech_objects
BEFORE UPDATE ON tech_objects
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();

CREATE TRIGGER set_timestamp_tech_versions
BEFORE UPDATE ON tech_versions
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();