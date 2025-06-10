🔹 value-objects/ – What shapes the domain but has no identity

    What goes here: Immutable business concepts without identity

    📌 Purpose: Value objects are immutable, comparable, and encapsulate validation/rules.

    Rule: Always immutable. Equality is based on values, not IDs.

📁 value-objects/ — Tiny Immutable Types with Rules

These are smaller domain types that represent a concept but do not have identity.

Files:

    AbstractionLevel.ts: Represents a level of abstraction as a value (e.g., low, high).

    Filter.ts: A structured object representing filter criteria.

    NavigationPath.ts: A domain concept for a path in a tree or graph structure.

    TechObjectId.ts: A typed ID (vs. a raw string), enforcing domain rules.

    VersionNumber.ts: Handles version increments, comparisons, etc.

    Viewer.ts: Likely an enum or structured view selector.

    index.ts: Centralized exports.

    thoughts.md: Notes for design clarity.