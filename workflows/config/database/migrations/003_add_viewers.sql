-- 003_add_viewers.sql
-- The viewer data is already part of the `viewers_data` JSONB column.
-- This file can be used to create materialized views for complex, pre-computed
-- analytics or reporting if needed in the future.

-- Example: A materialized view to quickly find all technologies that are "beginner friendly".
/*
CREATE MATERIALIZED VIEW mv_beginner_friendly_tech AS
SELECT
    tv.id as version_id,
    to_obj.name,
    tv.version
FROM
    tech_versions tv
JOIN
    tech_objects to_obj ON tv.tech_object_id = to_obj.id,
    jsonb_to_recordset(tv.viewers_data -> 'experience' -> 'relationships') as rel(type text, objectId uuid)
WHERE
    rel.type = 'BEGINNER_FRIENDLY_THAN';

-- Don't forget to refresh the view periodically
-- REFRESH MATERIALIZED VIEW mv_beginner_friendly_tech;
*/

SELECT 'Viewers are integrated into the main table schema. No separate view creation needed at this time.';