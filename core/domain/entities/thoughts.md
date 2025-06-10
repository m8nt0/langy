🔹 entities/ – Who/What is in your system

    Tip: Entities can reference each other but must not depend on external services.

    📌 Purpose: Models with identity, state, and behavior. Not just data — they encapsulate logic.

📁 entities/ — Core Business Objects (Rich Models)

These are the main nouns of your domain — the complex objects with identity and behavior.

Files:

    Abstraction.ts: Likely defines a concept abstraction (e.g., generalization level of a tech object).

    Level.ts: A structural or hierarchical level entity (e.g., abstraction levels, tree depths).

    Relationship.ts: Models relationships between tech objects (e.g., parent-child, dependencies).

    TechObject.ts: A central domain object — probably represents a piece of technology, component, or idea in your system.

    Version.ts: Represents a versioned state of something — tracks changes or evolution.

    index.ts: Aggregates exports.

    thoughts.md: Notes on design decisions or domain explorations.


