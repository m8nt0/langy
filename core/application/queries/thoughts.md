🔸 queries/ — Read actions (get something)

Purpose:
Provides read-only access to data, often formatted for UI or APIs.
Does not change state.

Each file implements query handlers that fetch and return data from the domain via repositories.
Examples:

    NavigationQueries.ts: Get navigation paths, breadcrumbs, etc.

    TechObjectQueries.ts: Fetch lists or details of tech objects.

    ViewerQueries.ts: Return information needed to render specific viewer types.

Why it matters:
Keeps reads and writes separate, leading to simpler logic, better scaling, and more predictable side-effects.