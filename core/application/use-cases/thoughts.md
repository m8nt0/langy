🔸 use-cases/ — Business scenarios (core app logic)

Purpose:
Each file represents a specific action a user or system can perform — a unit of application logic.
Use-cases orchestrate domain entities, services, and repositories, typically triggered by commands or queries.

Organized by domain feature:

<!--  -->
📁 filters/

Handles logic around filter creation and application.

    ApplyFilterUseCase.ts: Applies a filter to data or views.

    CombineFiltersUseCase.ts: Merges multiple filters logically.

    CreateFilterUseCase.ts: Constructs new filter objects based on inputs.

<!--  -->
📁 navigation/

Controls how users or systems move through hierarchical structures.

    AbstractDownUseCase.ts: Navigate “down” the abstraction hierarchy.

    AbstractUpUseCase.ts: Navigate “up” the hierarchy.

    GetNavigationPathUseCase.ts: Returns full navigation path for an item.

    NavigateHorizontalUseCase.ts: Move across same-level entities.

<!--  -->
📁 tech-objects/

CRUD and interaction logic for your core domain entity: TechObject.

    CreateTechObjectUseCase.ts: Validate, create, and persist new object.

    DeleteTechObjectUseCase.ts: Remove object, emit events.

    GetTechObjectUseCase.ts: Retrieve a specific object.

    UpdateTechObjectUseCase.ts: Validate and apply changes.

<!--  -->
📁 viewers/

Handles logic for different viewer modes (ways of presenting or interacting with the data).

    AbstractionViewerUseCase.ts: View abstraction layers.

    ExprienceViewerUseCase.ts (probably typo, should be Experience): Timeline or journey-based viewing.

    ParadigmViewerUseCase.ts: View by conceptual paradigms.

    SystemViewerUseCase.ts: View by system relationships.

    TimelineViewerUseCase.ts: Time-based visualization.

    UseCaseViewerUseCase.ts: View from the perspective of use-cases themselves.

Why it matters:
Use-cases are your application logic drivers — the only place where logic like “first do this, then validate, then save, then notify” exists.

They bridge commands/queries and the domain layer.