📁 services/ — Domain Logic That Doesn't Belong in Entities

Use these when logic:

    Doesn’t naturally belong to a single entity.

    Crosses entity boundaries.

    Is stateless and reusable.

Files:

    AbstractionService.ts: Might handle logic related to determining or navigating abstraction levels.

    FilterService.ts: Builds or applies filter logic (probably reuses Filter value objects).

    NavigationService.ts: Handles domain-level logic for traversing objects or levels.

    ViewerService.ts: Provides rules for viewer behavior or mapping domain states to viewer types.

    index.ts: Central exports.

📌 Purpose: Keep entities slim, and encapsulate cohesive, reusable domain logic.