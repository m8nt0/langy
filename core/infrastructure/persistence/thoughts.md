📚 persistence/

Implements data access and state persistence for domain models.
adapters/ — Different storage backends for structured data

    DatabaseAdapter.ts: For SQL/NoSQL databases.

    FileSystemAdapter.ts: For writing structured data to files.

    BlockchainAdapter.ts: Writes state to blockchains (e.g., for immutability).

    LocalStorageAdapter.ts: Browser/desktop key-value store.

    IPFSAdapter.ts: Stores structured data on IPFS.

    index.ts: Barrel file.

migrations/ — Schema and data evolution

    001_initial_schema.ts, 002_add_relationships.ts: SQL or schema scripts (for DB or other storage types).

    index.ts: Central registry of migrations.

repositories/ — Implements domain/repositories interfaces

    LevelRepository.ts, TechObjectRepository.ts, etc.: Real implementations, e.g., save(), findById().

    index.ts: Barrel export.

📌 Purpose: Actual implementation of the domain’s repository contracts.