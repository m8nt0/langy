🌐 networking/

Handles communication protocols and message transport between components or services.
adapters/ — Transport layer implementations

    HTTPAdapter.ts: Connects via HTTP (calls APIs, receives requests).

    WebSocketAdapter.ts: Bi-directional real-time messaging.

    IPCAdapter.ts: Inter-process communication (e.g., Electron, Node clusters).

    P2PAdapter.ts: Direct peer-to-peer messaging.

    index.ts: Barrel export for adapters.

protocols/ — Standard protocol formats

    GraphQLProtocol.ts: GraphQL request/response structure & handling.

    gRPCProtocol.ts: gRPC bindings for remote procedure calls.

    RESTProtocol.ts: RESTful API structure/handlers.

    index.ts: Protocol exports.

📌 Purpose: Defines how the app communicates externally or internally — flexible in transport and format.