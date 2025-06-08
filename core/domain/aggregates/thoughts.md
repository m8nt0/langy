There should be an aggregate root for each set of major -> minor -> patch in each level

🔹 aggregates/ – Logical boundaries of business rules

    What goes here: Aggregates = clusters of entities + business rules + invariants

    Example: TechEcosystem.ts, AbstractionHierarchy.ts

    Why: They enforce consistency boundaries. You interact with aggregates as the root of operations.

    Example Rule: "You can’t remove a version unless all libraries using it are removed."