🔸 commands/ — Write actions (do something)

Purpose:
Represents intent to perform an action that modifies system state — often triggered by users or external inputs.

Each file contains one or more Command classes or handlers that initiate a process.
Examples:

    NavigationCommands.ts: Handles things like “go to next node”, “navigate up/down”.

    TechObjectCommands.ts: Create, update, delete TechObject entities.

    ViewerCommands.ts: Controls how the viewer should change (e.g., change view mode).

Why it matters:
Commands don’t return data; they trigger state changes. This fits CQRS (Command Query Responsibility Segregation).