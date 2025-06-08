▶️ /ports

    What goes here: Interfaces (abstractions) to external systems

    Example: StoragePort.ts, SearchPort.ts, VisualizerApiPort.ts

    Why: The application layer should only know about what it needs, not how it’s implemented.

    Use: You inject implementations (like ElasticSearchAdapter) from outside the core.