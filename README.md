# Langy: The Multi-Dimensional Knowledge Engine

**Langy is a revolutionary, open-source platform for navigating, comparing, and understanding the complex world of technology. It moves beyond simple lists and articles, providing a structured, multi-dimensional interface to explore the intricate relationships between programming languages, libraries, frameworks, and applications.**

At its core, Langy is not just a database of information; it is a dynamic engine for knowledge discovery. It empowers developers, architects, and learners to make informed decisions by visualizing technology through multiple analytical "lenses" and navigating the vast ecosystem based on deep, semantic relationships.

---

## Table of Contents

- [The Core Concepts](#the-core-concepts)
  - [1. The Four-Dimensional Framework](#1-the-four-dimensional-framework)
  - [2. The Six Universal Viewers](#2-the-six-universal-viewers)
  - [3. Relational Navigation & Filtering](#3-relational-navigation--filtering)
- [Architectural Deep Dive](#architectural-deep-dive)
  - [The Three Pillars of Langy](#the-three-pillars-of-langy)
  - [A Journey Through the Code](#a-journey-through-the-code)
- [How It Works: A User's Journey](#how-it-works-a-users-journey)
- [The Future Vision & Roadmap](#the-future-vision--roadmap)
- [Contributing](#contributing)

---

## The Core Concepts

Langy is built on three foundational principles that work together to create a unique and powerful user experience.

### 1. The Four-Dimensional Framework

All technologies, or **`TechObject`s**, exist within a four-dimensional space:

#### **Vertical Axis: Abstraction Hierarchy**
This represents the "stack" of technology, from foundational to applied.

- **Level 1: Programming Languages** (e.g., *Rust, TypeScript, Python*)
- **Level 2: Libraries** (e.g., *Tokio, React, NumPy*)
- **Level 3: Frameworks** (e.g., *Actix-Web, Next.js, Django*)
- **Level 4: Applications & Tools** (e.g., *Figma, Docker, VS Code*)

#### **Horizontal Axis: Version Granularity**
Every `TechObject` is a container for its entire version history, allowing for precise, granular analysis.

`TechObject` → `Major Version` → `Minor Version` → `Patch Version`
*(e.g., Python → 3.x → 3.12 → 3.12.1)*

### 2. The Six Universal Viewers

Instead of static pages, Langy uses six dynamic "lenses" to analyze any collection of `TechObject`s. The user can switch between these viewers at any time to gain different insights from the same set of data.

-   🕰️ **Temporal Viewer**: Visualizes timelines, evolution paths, and historical context.
-   🌲 **Structure Viewer**: Maps dependencies, influences, and ecosystem relationships (`DEPENDS_ON`, `EXTENDS_BY`, `IMPLEMENTS`).
-   📚 **Paradigm Viewer**: Compares design philosophies, mental models, and programming paradigms (`SHARES_PARADIGM`, `MENTAL_MODEL_CLASH`).
-   🧰 **System Viewer**: Analyzes runtime characteristics, performance profiles, and hardware compatibility (`SAME_RUNTIME`, `PERFORMANCE_FASTER`).
-   🌐 **Use-Case Viewer**: Explores target domains, scalability, and integration patterns (`SAME_DOMAIN`, `INTEGRATION_FRIENDLY`).
-   🧪 **Experience Viewer**: Assesses developer experience factors like learning curve, community health, and documentation quality (`LEARNING_EASIER`, `DOCUMENTATION_BETTER`).

### 3. Relational Navigation & Filtering

This is Langy's most powerful feature. Navigation is not just about clicking links; it's about asking questions.

-   **Abstraction Navigation**: Users move *up* the vertical axis by defining a relationship. For example, from *Python*, one can ask to see all Level 2 Libraries that are `LEARNING_EASIER` **and** share the `SAME_RUNTIME`.
-   **Dynamic Filtering**: The entire collection of `TechObject`s can be sliced and diced using a type-safe filtering engine. Users can construct complex queries that span all six viewer dimensions, such as: *"Show me all Programming Languages created after 2010 that have an 'ALIGNED_DESIGN_PHILOSOPHY' with Rust."*

---

## Architectural Deep Dive

Langy is engineered for scalability, maintainability, and platform independence using a clean, three-layered architecture.


/src
├── 🏛️ core/         # The Brain: Domain Logic & Use Cases (Platform-Agnostic)
├── 🖼️ interfaces/   # The Blueprint: UI & Adapters Contracts (Platform-Agnostic)
└── 🚀 platforms/     # The Body: Concrete Implementations (Web, Desktop, Mobile)


### The Three Pillars of Langy

1.  **`core`**: This is the heart of the application. Written in pure, dependency-free TypeScript, it contains all the business logic, entities, value objects, and use cases. It knows *what* the application does but has no knowledge of *how* it will be displayed. This guarantees that the core logic can be reused across any platform.

2.  **`interfaces`**: This is the universal contract layer. It defines the abstract "blueprints" for every piece of the user interface (`BaseCard`, `BaseViewer`), the state management system (`stores`, `actions`), and the platform-level adapters (`BaseStorageAdapter`, `BaseNavigationAdapter`). It ensures that every platform implementation will have a consistent structure and behavior.

3.  **`platforms`**: This is where the concrete implementations live. A `web` sub-directory might contain a React or Svelte project that implements the contracts from `interfaces` using web technologies. A `desktop` directory could do the same using Electron. This clean separation allows Langy to be deployed anywhere without changing a single line of the `core` logic.

### A Journey Through the Code

-   A user's query starts with a **`FilterCriterion`** (`/core/domain/value-objects/Filter.ts`), a type-safe object that prevents invalid filters.
-   A **Use Case** (`/core/application/use-cases`) orchestrates the request, using **Services** (`/core/domain/services`) like the `FilterService`.
-   The services operate on **Entities** (`/core/domain/entities/TechObject.ts`), which hold the rich `viewersData`.
-   The results are passed back to the `interfaces` layer and stored in a **Store** (`/interfaces/common/components/state/stores`).
-   A **Selector** (`/interfaces/common/components/state/selectors`) computes the derived state needed by the UI.
-   Finally, a concrete component from a `platforms` implementation renders the data provided by the selector.

---

## How It Works: A User's Journey

Let's trace a typical interaction to see how the architecture comes to life:

1.  **Navigation**: The user navigates to `/levels/1` (Programming Languages). The `RouteHandler` (`/interfaces/common/components/routing`) detects the change and mounts the `LevelPage`.
2.  **Data Fetching**: The `LevelPage.onMount()` method is called, which dispatches the `techObjectActions.fetchTechObjectsForLevel(1)` action.
3.  **State Update**: The action calls a use case from `core` to fetch the data, which is then placed into the `techObjectStore`.
4.  **Component Rendering**:
    -   The `ContentPane` layout component is subscribed to the `selectVisibleTechObjects` selector.
    -   The state update triggers the selector, which returns the list of Programming Languages.
    -   The `ContentPane` receives the new list and renders it as a grid of `TechObjectCard` components.
5.  **Switching Viewers**:
    -   The user clicks the "🕰️ Temporal" button in the `ToolsBar`.
    -   This calls `navigationActions.changeViewerMode('temporal')`, updating the `uiStore`.
    -   The `ContentPane`'s render logic now sees the new viewer mode. Instead of rendering cards, it instantiates and renders the `TimelineViewer` component. The viewer gets its specific data from the `selectActiveViewerData` selector, which automatically extracts the `temporal` data from the visible objects. The change is instantaneous and efficient.

---

## The Future Vision & Roadmap

Langy is a long-term project with a vision to become the definitive tool for understanding technology ecosystems.

-   **[Phase 1] Platform Implementation**: Complete the first concrete platform implementation in `/platforms/web/react`, bringing the `common` interfaces to life in a fully functional web application.
-   **[Phase 2] Data Persistence & Backend**: Implement a concrete `ITechObjectRepository` that connects to a real database (e.g., Firebase, PostgreSQL) to persist and serve the `TechObject` data.
-   **[Phase 3] Community-Sourced Data**: Build a system for the community to contribute, validate, and update the `viewerData` for all `TechObject`s, making Langy a living, breathing knowledge base.
-   **[Phase 4] AI-Powered Insights**: Implement the "AI Assistant" in the left sidebar. This assistant will have access to the `core` services and can help users construct complex filters, explain relationships, and summarize viewer data in natural language.
-   **[Phase 5] Cross-Platform Expansion**: Develop implementations for other platforms, such as a `desktop` app using Electron or a `mobile` app, reusing the exact same `core` and `interfaces` layers.

---

## Contributing

Langy is an ambitious project, and contributions are welcome. The best way to start is by:
1.  Setting up the project locally.
2.  Helping to implement the `react` platform in `/platforms/web/react`.
3.  Gathering and structuring `viewerData` for your favorite technologies into JSON files that can later be imported into the database.

(Detailed contribution guidelines will be added soon.)

