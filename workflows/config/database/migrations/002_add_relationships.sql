-- 002_add_relationships.sql
-- Relationships are not stored in a separate table in this perfected design.
-- They are part of the `viewers_data` JSONB column in `tech_versions` for efficiency.
-- However, we can add GIN indexes to make querying these relationships extremely fast.

-- This index allows fast searching within the 'structure' viewer's relationships.
CREATE INDEX idx_gin_structure_relationships ON tech_versions USING GIN ((viewers_data -> 'structure' -> 'relationships'));

-- This index allows fast searching within the 'experience' viewer's relationships.
CREATE INDEX idx_gin_experience_relationships ON tech_versions USING GIN ((viewers_data -> 'experience' -> 'relationships'));

-- Add additional GIN indexes for other viewers as needed for performance.
-- CREATE INDEX idx_gin_paradigm_relationships ON tech_versions USING GIN ((viewers_data -> 'paradigm' -> 'relationships'));
-- CREATE INDEX idx_gin_system_relationships ON tech_versions USING GIN ((viewers_data -> 'system' -> 'relationships'));
-- CREATE INDEX idx_gin_temporal_relationships ON tech_versions USING GIN ((viewers_data -> 'temporal' -> 'relationships'));
-- CREATE INDEX idx_gin_usecase_relationships ON tech_versions USING GIN ((viewers_data -> 'useCase' -> 'relationships'));

COMMENT ON COLUMN tech_versions.viewers_data IS 'Contains all 6 viewer data structures, including all relationship types. Indexed with GIN for fast lookups.';