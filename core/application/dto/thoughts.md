🔸 dto/ — Data Transfer Objects

Purpose:
Defines structured input/output types passed between layers (e.g., from UI to application, or from application to infrastructure).

They are pure data containers, no logic.
Examples:

    FilterDto.ts: Structure of a filter input/output.

    NavigationDto.ts: Data needed to describe a navigation step.

    TechObjectDto.ts: Used for create/update tech object requests.

    ViewerDto.ts: Formats for viewer state, input, or output.

Why it matters:
DTOs ensure type safety, clear boundaries, and loose coupling between layers.