📁 repositories/ — Abstract Interfaces for Persistence

These are contracts, not implementations.

Files:

    ITechObjectRepository.ts, ILevelRepository.ts, IRelationshipRepository.ts: Define methods like findById, save, delete, etc.

    index.ts: Aggregated exports.

📌 Purpose: Allow the domain and application layers to remain agnostic of storage — implemented in infrastructure/persistence.