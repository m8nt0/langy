| Adapter                                               | Transport                          | Pattern                      | Use Case                              | Abstraction Level |
| ----------------------------------------------------- | ---------------------------------- | ---------------------------- | ------------------------------------- | ----------------- |
| **HTTP**                                              | TCP                                | Request/Response             | REST APIs, traditional web calls      | Medium            |
| **WebSocket**                                         | TCP                                | Full-duplex (push/pull)      | Real-time apps (chat, games)          | Medium            |
| **IPC (Inter-Process Communication)**                 | Shared memory / pipes / OS signals | Event-based or message-based | Desktop apps (Electron, OS modules)   | Low               |
| **P2P (Peer-to-Peer)**                                | Varies (UDP, TCP, WebRTC)          | Distributed / Mesh           | Decentralized networks (WebRTC, IPFS) | Medium to High    |
| **WebRTC**                                            | UDP/STUN/ICE                       | Peer-to-peer                 | Real-time audio/video/data            | Medium            |
| **MQTT / AMQP**                                       | TCP                                | Pub/Sub (brokered)           | IoT, messaging systems                | High              |
| **Service Workers / BroadcastChannel / SharedWorker** | Browser APIs                       | Event-based / Channel-based  | Web app messaging                     | Medium            |
| **gRPC**                                              | HTTP/2                             | RPC (Remote Procedure Call)  | Microservices, performant APIs        | High              |
| **ZMQ / nanomsg / NATS**                              | Varies                             | Pub/Sub, Req/Rep, Bus, etc.  | High-performance messaging            | Medium to High    |

<!-- ------------------------------------------ -->

infrastructure/networking/
├── transports/              # Layer 4-5: How data moves
│   ├── tcp/
│   │   ├── TCPTransport.ts
│   │   └── index.ts
│   ├── udp/
│   │   ├── UDPTransport.ts
│   │   └── index.ts
│   ├── websocket/
│   │   ├── WebSocketTransport.ts
│   │   └── index.ts
│   ├── ipc/
│   │   ├── IPCTransport.ts
│   │   ├── NamedPipeTransport.ts
│   │   ├── SharedMemoryTransport.ts
│   │   └── index.ts
│   ├── p2p/
│   │   ├── WebRTCTransport.ts
│   │   ├── LibP2PTransport.ts
│   │   └── index.ts
│   └── index.ts
├── protocols/               # Layer 6-7: Message format/semantics  
│   ├── http/
│   │   ├── HTTPProtocol.ts
│   │   ├── HTTP2Protocol.ts
│   │   └── index.ts
│   ├── grpc/
│   │   ├── GRPCProtocol.ts
│   │   └── index.ts
│   ├── graphql/
│   │   ├── GraphQLProtocol.ts
│   │   └── index.ts
│   ├── custom/
│   │   ├── BinaryProtocol.ts
│   │   ├── JSONProtocol.ts
│   │   └── index.ts
│   └── index.ts
├── patterns/                # Communication patterns
│   ├── request-response/
│   │   ├── RequestResponsePattern.ts
│   │   └── index.ts
│   ├── publish-subscribe/
│   │   ├── PubSubPattern.ts
│   │   └── index.ts
│   ├── message-queue/
│   │   ├── MessageQueuePattern.ts
│   │   └── index.ts
│   ├── streaming/
│   │   ├── StreamingPattern.ts
│   │   └── index.ts
│   └── index.ts
├── adapters/                # Bridge between your app and networking
│   ├── NetworkAdapter.ts    # Base adapter interface
│   ├── ClientAdapter.ts     # For client-side connections
│   ├── ServerAdapter.ts     # For server-side connections
│   ├── P2PAdapter.ts        # For peer-to-peer connections
│   └── index.ts
├── discovery/               # Service/peer discovery
│   ├── DNSDiscovery.ts
│   ├── mDNSDiscovery.ts
│   ├── DHTDiscovery.ts
│   └── index.ts
├── security/                # Network security concerns
│   ├── TLSWrapper.ts
│   ├── EncryptionLayer.ts
│   ├── AuthenticationLayer.ts
│   └── index.ts
└── index.ts