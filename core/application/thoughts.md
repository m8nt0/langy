📁 application/ — The Orchestrator Layer

Purpose:
This layer orchestrates domain logic in response to user actions or system events. It translates external inputs (like UI or API calls) into meaningful use cases, using DTOs, commands, and queries.
It does not contain core business rules (those live in domain/), but coordinates them.

Think of it as the “glue” between the outside world and your inner domain model.