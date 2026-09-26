import { SoftwareProject } from "@/types/project";

export const PROJECTS_DATA: SoftwareProject[] = [
  {
    id: "impetus-sports-platform",
    title: "Impetus Sports Management Platform",
    date: "2024 – Present",
    category: "Full-Stack · Production SaaS",
    role: "Full-Stack Software Developer",
    company: "Anantaloop",
    location: "Bangalore, India",
    status: "Live in Production",
    description:
      "A scalable multi-tenant sports management platform for athletes, coaches, academies, and parents. Powers tournament scheduling, athlete rosters, physical assessments, and team formation.",
    synopsis:
      "Architected and deployed full-stack modules using NestJS, React, PostgreSQL, and AWS, replacing legacy paper and spreadsheet tracking with real-time digital workflows.",
    problem:
      "Sports academies, coaches, and tournament directors relied on disjointed spreadsheets and manual messaging to coordinate athlete rosters, schedule tournament brackets, and record physical fitness assessments, causing scheduling conflicts and lost athlete evaluation history.",
    product:
      "A unified, role-based web platform where academies manage student-athletes, coaches build teams and record standardized physical tests, and tournament organizers automatically generate brackets and match schedules.",
    contribution:
      "Personally engineered the core athlete management, tournament scheduling, team formation, and physical assessment modules. Designed relational database schemas in PostgreSQL, implemented secure role-based REST APIs with NestJS, and built interactive dashboards with React and TypeScript.",
    architecture: {
      frontend: ["React.js", "TypeScript", "TailwindCSS", "Vite", "React Query"],
      backend: ["NestJS", "Node.js", "TypeScript", "RESTful APIs", "Class-Validator"],
      database: ["PostgreSQL", "TypeORM", "Database Indexing & Migrations"],
      cloud: ["AWS EC2", "AWS S3", "Docker", "Nginx", "GitHub Actions CI/CD"],
    },
    technicalDecisions: [
      {
        title: "NestJS for Modular Backend Architecture",
        rationale:
          "Adopted NestJS for its opinionated module structure, dependency injection, and native TypeScript support, enabling distinct domain boundaries for athletes, tournaments, and assessments.",
      },
      {
        title: "PostgreSQL Relational Schema with Foreign Constraints",
        rationale:
          "Selected PostgreSQL over NoSQL to enforce strict referential integrity across tournaments, teams, match brackets, and historical athlete fitness benchmarks.",
      },
      {
        title: "Role-Based Access Control (RBAC) Guard Pipeline",
        rationale:
          "Implemented custom NestJS execution guards and JWT middleware to separate privileges between platform super-admins, academy managers, coaches, and parents.",
      },
    ],
    results: [
      "Delivered 4 core business modules to production on AWS.",
      "Reduced tournament scheduling and bracket setup time by over 70%.",
      "Standardized 10+ physical fitness assessment metrics for tracking athlete progress over time.",
      "Maintained 99.9% API uptime with sub-120ms average response times across queries.",
    ],
    learnings:
      "Designing complex tournament bracket generation requires careful state machine modeling to handle byes, forfeits, and multi-day venue constraints gracefully.",
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop",
    heroImageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop",
    coverImageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop",
    tags: ["NestJS", "React", "TypeScript", "PostgreSQL", "AWS", "REST APIs"],
    screenshots: [
      {
        url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop",
        caption: "Academy Dashboard: Real-time overview of active athletes, coaches, and ongoing tournaments.",
        tag: "Dashboard UI",
      },
      {
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",
        caption: "Tournament Management & Bracketing: Automated scheduling engine with conflict detection.",
        tag: "Scheduling Engine",
      },
      {
        url: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1600&auto=format&fit=crop",
        caption: "Physical Assessment Tracker: Standardized metrics for speed, agility, and stamina benchmarks.",
        tag: "Analytics & Benchmarks",
      },
    ],
    technicalSpecs: {
      frontend: "React 18 / TypeScript",
      backend: "NestJS / Node.js",
      database: "PostgreSQL Relational DB",
      infrastructure: "AWS EC2 / S3 / Docker",
      architecture: "Modular Monolith / REST",
      auth: "JWT + Role-Based Access Control",
      location: "Bangalore, India",
    },
    printX: 10, printY: 12, printWidth: 480, rotation: 0, zIndex: 1,
  },

  {
    id: "ai-agent-mcp-workflows",
    title: "Autonomous AI Agents & MCP Architecture",
    date: "2024",
    category: "AI Systems · Agentic Workflows",
    role: "AI Systems & Backend Engineer",
    company: "Frontier Engineering",
    location: "Bangalore, India",
    status: "Active Research / Prototype",
    description:
      "Engineered an autonomous AI agent system utilizing the Model Context Protocol (MCP). Enables Large Language Models to discover tools, execute multi-step database queries, and perform safe real-world actions with structured verification.",
    synopsis:
      "Built custom MCP tool servers in TypeScript and Python that connect LLMs to PostgreSQL databases and external APIs with sandboxed execution, schema validation, and context pruning.",
    problem:
      "Standard LLM chat interfaces cannot directly interact with private company databases or trigger external APIs safely without risking hallucinated parameters, SQL injection, or runaway agent loops.",
    product:
      "A developer framework and runtime dashboard where autonomous agents use Model Context Protocol (MCP) specifications to inspect schemas, execute parameterized read/write database actions, and chain tools together with human-in-the-loop review.",
    contribution:
      "Built the MCP tool server implementation, defined JSON schemas for tool definitions, implemented context-pruning algorithms to prevent token overflow during long agent trajectories, and developed a local debugging terminal interface.",
    architecture: {
      ai: ["Anthropic Claude 3.5 API", "OpenAI Function Calling", "LangChain / LangGraph", "Vector Embeddings"],
      backend: ["TypeScript", "Python 3.11", "FastAPI", "Model Context Protocol (MCP) SDK"],
      database: ["PostgreSQL (pgvector)", "Redis Memory Cache"],
      cloud: ["Docker Containerization", "Local Sandbox Environment"],
    },
    technicalDecisions: [
      {
        title: "Model Context Protocol (MCP) as Standard Interface",
        rationale:
          "Used Anthropic's open Model Context Protocol to decouple tool implementation from LLM providers, allowing tools to be shared seamlessly across local clients, CLI agents, and web dashboards.",
      },
      {
        title: "Deterministic Schema Validation with Zod / Pydantic",
        rationale:
          "Enforced strict runtime validation on all agent-generated function arguments before query execution, eliminating malformed SQL parameters and catastrophic mutations.",
      },
      {
        title: "Hierarchical Tool Selection",
        rationale:
          "Rather than loading 50+ tool definitions into the prompt, engineered a two-stage vector index to dynamically retrieve only the most relevant 5 tool schemas based on the user intent.",
      },
    ],
    results: [
      "Engineered 12+ functional MCP tools spanning SQL query execution, file system operations, and API fetching.",
      "Achieved 94% first-pass tool execution accuracy using structured error feedback loops.",
      "Reduced prompt token consumption by 45% using dynamic tool retrieval rather than static inclusion.",
    ],
    learnings:
      "LLMs excel at multi-step reasoning when errors are piped back into the conversation context as actionable tool-call feedback rather than generic failure messages.",
    imageUrl:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop",
    heroImageUrl:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop",
    coverImageUrl:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop",
    tags: ["AI Agents", "MCP Protocol", "TypeScript", "Python", "PostgreSQL", "LLMs"],
    screenshots: [
      {
        url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop",
        caption: "Agent Trajectory Console: Real-time visualization of tool selection, reasoning, and database queries.",
        tag: "Agent Runtime",
      },
      {
        url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1600&auto=format&fit=crop",
        caption: "MCP Tool Server Registry: Structured schemas and sandboxed permission guards.",
        tag: "MCP Server",
      },
    ],
    technicalSpecs: {
      frontend: "Next.js / TailwindCSS Dashboard",
      backend: "TypeScript / Python FastAPI",
      database: "PostgreSQL + pgvector",
      infrastructure: "Docker Containers / Local Sandbox",
      architecture: "Model Context Protocol (MCP) + Agentic Loop",
      auth: "API Key Authentication",
      location: "Bangalore, India",
    },
    printX: 55, printY: 10, printWidth: 420, rotation: 0, zIndex: 2,
  },

  {
    id: "harvest-flow-growteq",
    title: "Harvest Flow / Growteq Supply Platform",
    date: "2023 – 2024",
    category: "Full-Stack · Enterprise Workflow",
    role: "Full-Stack Software Developer",
    company: "Growteq Agricultural Systems",
    location: "Bangalore, India",
    status: "Production Deployed",
    description:
      "Enterprise agricultural supply chain platform managing produce dispatch workflows, supplier invoice generation, inventory tracking, and farm procurement dashboards.",
    synopsis:
      "Engineered real-world business software converting unstructured farm pickup logs into automated digital dispatch manifests, weight reconciliation, and GST-compliant invoicing.",
    problem:
      "Agricultural distribution hubs faced massive discrepancies between field procurement weights, truck dispatch logs, and receiving warehouse entries, causing billing disputes and delayed supplier payouts.",
    product:
      "A unified operations dashboard and mobile-friendly field portal for weighing station operators, logistics coordinators, and accounting teams to track crops from farm gate to wholesale distribution.",
    contribution:
      "Developed the dispatch management workflow, dynamic invoice generation engine with tax computation, warehouse stock reconciliation tables, and REST API endpoints using React, Node.js, and PostgreSQL.",
    architecture: {
      frontend: ["React.js", "TypeScript", "Material UI", "React Hook Form"],
      backend: ["Node.js", "Express.js", "TypeScript", "PDF Generation Service"],
      database: ["PostgreSQL", "Prisma ORM", "Redis Session Store"],
      cloud: ["Docker", "Nginx Reverse Proxy", "AWS S3 Document Storage"],
    },
    technicalDecisions: [
      {
        title: "ACID Transactions for Inventory Deduction",
        rationale:
          "Wrapped dispatch order creation and warehouse stock deductions in atomic PostgreSQL transactions to prevent race conditions during concurrent bulk dispatches.",
      },
      {
        title: "Serverless PDF Invoice Generation Pipeline",
        rationale:
          "Offloaded high-volume PDF receipt and tax invoice generation to a background worker queue, preventing API latency spikes for warehouse staff.",
      },
    ],
    results: [
      "Streamlined dispatch logging across 15+ agricultural hubs.",
      "Eliminated invoice weight reconciliation delays from 48 hours to under 5 minutes.",
      "Handled thousands of metric tons in verified agricultural dispatches with zero stock discrepancy.",
    ],
    learnings:
      "Field software must be designed with extreme tolerance for unstable network connections and rapid keyboard-first data entry.",
    imageUrl:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1600&auto=format&fit=crop",
    heroImageUrl:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1600&auto=format&fit=crop",
    coverImageUrl:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1600&auto=format&fit=crop",
    tags: ["React", "Node.js", "Express", "PostgreSQL", "Docker", "REST APIs"],
    screenshots: [
      {
        url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1600&auto=format&fit=crop",
        caption: "Procurement Dispatch Center: Real-time truck load tracking and weight certificate verification.",
        tag: "Logistics UI",
      },
      {
        url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1600&auto=format&fit=crop",
        caption: "Automated Invoice Generator: Instant weight reconciliation and tax breakdown.",
        tag: "Invoice Engine",
      },
    ],
    technicalSpecs: {
      frontend: "React / TypeScript / Material UI",
      backend: "Node.js / Express.js",
      database: "PostgreSQL (Prisma ORM)",
      infrastructure: "AWS S3 / Docker / Nginx",
      architecture: "RESTful Service Architecture",
      auth: "Session Tokens & Role Permissions",
      location: "Bangalore, India",
    },
    printX: 30, printY: 45, printWidth: 400, rotation: 0, zIndex: 3,
  },

  {
    id: "konkani-dialect-map",
    title: "Konkani Dialect Geospatial Archive",
    date: "2021",
    category: "Geospatial · Linguistic Platform",
    role: "Full-Stack Developer",
    company: "Community Linguistic Archive",
    location: "Karnataka / Goa, India",
    status: "Deployed / Archival",
    description:
      "An interactive web platform preserving regional Konkani dialects through geographic mapping, community-contributed audio recordings, and phonetic transcription discovery.",
    synopsis:
      "Engineered an interactive geospatial web application using Django, JavaScript, Leaflet, and SQLite, enabling native speakers across coastal India to record, locate, and explore dialect variations.",
    problem:
      "Vulnerable regional dialects of the Konkani language were undocumented and scattered across regional clusters with no centralized, searchable audio archive.",
    product:
      "An open-access interactive map interface where visitors click geographic regions to listen to phonetic audio recordings, compare dialect phrases, and contribute verified local speech samples.",
    contribution:
      "Built the full stack from concept to deployment: interactive Leaflet mapping, audio recording and upload workflows, admin moderation dashboards, and REST API endpoints in Django.",
    architecture: {
      frontend: ["JavaScript (ES6)", "Leaflet.js Mapping", "HTML5 Web Audio API", "CSS3"],
      backend: ["Django", "Python", "REST APIs"],
      database: ["SQLite / PostgreSQL", "Firebase Cloud Storage"],
      cloud: ["Nginx", "Linux VPS Hosting"],
    },
    technicalDecisions: [
      {
        title: "Browser-Native Web Audio Recording",
        rationale:
          "Used HTML5 MediaRecorder API to record high-fidelity voice samples in-browser without requiring mobile app installations.",
      },
      {
        title: "GeoJSON Spatial Coordinates",
        rationale:
          "Structured linguistic zones using GeoJSON polygon boundaries to deliver instant map rendering and regional clustering.",
      },
    ],
    results: [
      "Digitized and mapped dozens of localized Konkani dialect variants across coastal Karnataka and Goa.",
      "Provided an intuitive audio-visual educational portal for linguistic preservation.",
    ],
    learnings:
      "Handling user-uploaded media requires strict client-side compression and server-side validation to prevent storage bloat.",
    imageUrl:
      "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1600&auto=format&fit=crop",
    heroImageUrl:
      "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1600&auto=format&fit=crop",
    coverImageUrl:
      "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1600&auto=format&fit=crop",
    tags: ["Django", "Python", "JavaScript", "Leaflet.js", "Firebase", "Geospatial"],
    screenshots: [
      {
        url: "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1600&auto=format&fit=crop",
        caption: "Geospatial Interactive Map: Regional dialect zones and audio playback nodes.",
        tag: "Interactive Map",
      },
    ],
    technicalSpecs: {
      frontend: "JavaScript / Leaflet.js / Web Audio",
      backend: "Django / Python",
      database: "PostgreSQL / SQLite",
      infrastructure: "Firebase Storage / Linux Nginx",
      architecture: "Geospatial REST Web Application",
      auth: "Django Auth & Moderation Pipeline",
      location: "Karnataka / Goa",
    },
    printX: 20, printY: 55, printWidth: 380, rotation: 0, zIndex: 4,
  },

  {
    id: "ethereum-blockchain-inventory",
    title: "Ethereum Blockchain Inventory Sharing",
    date: "2022 – 2023",
    category: "Web3 · Smart Contracts · Capstone",
    role: "Smart Contract & Backend Developer",
    company: "Sambhram Institute of Technology",
    location: "Bangalore, India",
    status: "UG Final Year Capstone Project",
    description:
      "A decentralized inventory management system using Ethereum smart contracts for transparent, tamper-proof multi-organization inventory sharing and verification.",
    synopsis:
      "Developed Solidity smart contracts and Web3.js integration connected to Python and MongoDB for immutable inventory state verification across multiple business entities.",
    problem:
      "Multi-party inventory agreements between suppliers and retailers frequently encounter disputes regarding stock discrepancies, delivery timestamps, and unauthorized record tampering.",
    product:
      "A decentralized application (DApp) where organizations register inventory batches, verify transfers via cryptographically signed smart contract events, and maintain a shared tamper-proof ledger.",
    contribution:
      "Authored Solidity smart contracts, automated testing with Truffle and Ganache, integrated Web3.js event listeners, and developed the Python middleware for off-chain metadata caching in MongoDB.",
    architecture: {
      backend: ["Solidity", "Web3.js", "Python", "Flask"],
      database: ["Ethereum EVM Ledger", "MongoDB (Off-chain Cache)"],
      cloud: ["Truffle Suite", "Ganache Local Testnet"],
    },
    technicalDecisions: [
      {
        title: "Hybrid On-chain / Off-chain Data Storage",
        rationale:
          "Stored only cryptographic hashes, stock counts, and ownership addresses on-chain to minimize Ethereum gas fees, while caching rich metadata off-chain in MongoDB.",
      },
    ],
    results: [
      "Completed and defended as UG Computer Science Final Year Capstone with distinction.",
      "Simulated multi-organization supply workflows with zero unauthorized state mutations.",
    ],
    learnings:
      "Smart contract development demands defensive programming and formal verification since deployed code cannot be patched easily.",
    imageUrl:
      "https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=1600&auto=format&fit=crop",
    heroImageUrl:
      "https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=1600&auto=format&fit=crop",
    coverImageUrl:
      "https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=1600&auto=format&fit=crop",
    tags: ["Solidity", "Ethereum", "Python", "MongoDB", "Web3.js", "Smart Contracts"],
    screenshots: [
      {
        url: "https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=1600&auto=format&fit=crop",
        caption: "Smart Contract State Inspector: Cryptographic audit trail of inventory ownership transfers.",
        tag: "DApp Explorer",
      },
    ],
    technicalSpecs: {
      frontend: "React / Web3.js",
      backend: "Solidity / Python Flask",
      database: "Ethereum Ledger / MongoDB",
      infrastructure: "Truffle / Ganache EVM Testnet",
      architecture: "Decentralized Smart Contract DApp",
      auth: "Ethereum Public Key Cryptography",
      location: "Bangalore, India",
    },
    printX: 65, printY: 50, printWidth: 380, rotation: 0, zIndex: 5,
  },
];
