🔹 value-objects/ – What shapes the domain but has no identity

    What goes here: Immutable business concepts without identity

    Example: FilterCriteria.ts, NavigationContext.ts, ViewerData.ts

    Why: These represent concepts like “range”, “criteria”, “mode”, etc.

    Rule: Always immutable. Equality is based on values, not IDs.