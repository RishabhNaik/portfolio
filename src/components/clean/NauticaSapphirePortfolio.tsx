"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Download,
  Briefcase,
  GraduationCap,
  MapPin,
  Mail,
  Phone,
  Github,
  Linkedin,
  Send,
  CheckCircle2,
  Copy,
  Check,
  Menu,
  X,
  Code2,
  Server,
  Database,
  Cloud,
  Cpu,
  Layers,
  Sparkles,
  ShieldCheck,
  ExternalLink,
  MessageCircle,
} from "lucide-react";
import { cinematicAudioHaptics } from "@/utils/cinematicAudioHaptics";
import { contactData } from "@/data/siteData";

// ─── Core Software Projects ──────────────────────────────────────────────────
const FEATURED_PROJECTS = [
  {
    id: "impetus-sports-platform",
    num: "01",
    tagline: "FULL-STACK · PRODUCTION SAAS",
    title: "Impetus Sports Management Platform",
    company: "Anantaloop · Production",
    timeline: "2024 – Present",
    description:
      "Scalable multi-tenant sports management platform for athletes, academies, coaches, and parents. Replaced spreadsheet tracking with automated bracket scheduling, roster management, and standardized physical assessments.",
    contribution:
      "Architected athlete management, tournament scheduling, team formation, and physical assessment REST APIs with NestJS, React, and PostgreSQL.",
    tags: ["NestJS", "React", "TypeScript", "PostgreSQL", "AWS EC2", "REST APIs"],
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1400&auto=format&fit=crop",
    highlight: true,
  },
  {
    id: "ai-agent-mcp-workflows",
    num: "02",
    tagline: "AI SYSTEMS · AGENTIC WORKFLOWS",
    title: "Autonomous AI Agents & MCP Architecture",
    company: "Frontier Engineering",
    timeline: "2024",
    description:
      "Autonomous tool-calling framework using the Model Context Protocol (MCP). Enables Large Language Models to discover tools, execute parameterized database queries, and trigger external APIs with schema guards.",
    contribution:
      "Built custom MCP tool servers in TypeScript and Python, designed Zod/Pydantic validation guards, and engineered two-stage vector tool retrieval to prune context overhead by 45%.",
    tags: ["AI Agents", "MCP Protocol", "TypeScript", "Python", "PostgreSQL", "LLMs"],
    imageUrl:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1400&auto=format&fit=crop",
    highlight: true,
  },
  {
    id: "harvest-flow-growteq",
    num: "03",
    tagline: "FULL-STACK · ENTERPRISE WORKFLOW",
    title: "Harvest Flow / Growteq Supply Platform",
    company: "Growteq Agricultural Systems",
    timeline: "2023 – 2024",
    description:
      "Enterprise agricultural supply chain platform managing produce dispatch manifests, automated supplier invoice generation, warehouse reconciliation, and farm procurement dashboards.",
    contribution:
      "Engineered produce dispatch logging, automated PDF tax invoicing with tax computations, and atomic PostgreSQL transactions to prevent inventory deduction race conditions.",
    tags: ["React", "Node.js", "Express", "PostgreSQL", "Prisma", "Docker"],
    imageUrl:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1400&auto=format&fit=crop",
    highlight: false,
  },
  {
    id: "konkani-dialect-map",
    num: "04",
    tagline: "GEOSPATIAL · LINGUISTIC ARCHIVE",
    title: "Konkani Dialect Geospatial Platform",
    company: "Community Linguistic Archive",
    timeline: "2021",
    description:
      "Interactive web platform preserving regional Konkani dialects through geospatial polygon mapping, community audio recording pipelines, and location-based phonetic comparison.",
    contribution:
      "Developed the full-stack architecture from scratch: interactive Leaflet.js mapping, browser Web Audio recording uploads, and content retrieval APIs in Django and SQLite.",
    tags: ["Django", "Python", "JavaScript", "Leaflet.js", "Firebase", "SQLite"],
    imageUrl:
      "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1400&auto=format&fit=crop",
    highlight: false,
  },
];

// ─── Additional Projects Archive ─────────────────────────────────────────────
const ARCHIVE_PROJECTS = [
  {
    title: "Ethereum Blockchain Inventory Sharing",
    category: "Web3 · Smart Contracts · Capstone",
    tech: "Solidity · Ethereum · Python · MongoDB",
    year: "2023",
    id: "ethereum-blockchain-inventory",
    note: "UG Final Year Capstone with Distinction",
  },
  {
    title: "Konkani Dialect Geospatial Archive",
    category: "Geospatial · Web Audio",
    tech: "Django · Python · Leaflet.js · SQLite",
    year: "2021",
    id: "konkani-dialect-map",
    note: "Linguistic Audio Preservation",
  },
  {
    title: "Harvest Flow Procurement Portal",
    category: "Enterprise SaaS · Logistics",
    tech: "React · Node.js · PostgreSQL · Docker",
    year: "2024",
    id: "harvest-flow-growteq",
    note: "15+ Agricultural Hubs Deployed",
  },
];

// ─── Grouped Technical Skills ────────────────────────────────────────────────
const SKILLS_GROUPED = [
  {
    category: "Frontend Development",
    icon: Layers,
    items: [
      { name: "React.js", usage: "Impetus, Harvest Flow" },
      { name: "Next.js", usage: "Portfolio, Web Apps" },
      { name: "TypeScript", usage: "Strict Typing, Full-Stack" },
      { name: "JavaScript (ES6+)", usage: "Interactive Systems" },
      { name: "HTML5 / CSS3", usage: "Modern Semantic UI" },
      { name: "TailwindCSS / MUI", usage: "Rapid Dashboard UI" },
    ],
  },
  {
    category: "Backend & Systems",
    icon: Server,
    items: [
      { name: "NestJS", usage: "Modular Impetus Services" },
      { name: "Node.js", usage: "High-Throughput APIs" },
      { name: "Python", usage: "Django, FastAPI, Scripting" },
      { name: "RESTful APIs", usage: "Schema Design & Validation" },
      { name: "Microservice Concepts", usage: "Domain Separation" },
      { name: "Role-Based Auth (RBAC)", usage: "JWT & Guard Pipelines" },
    ],
  },
  {
    category: "Databases & Caching",
    icon: Database,
    items: [
      { name: "PostgreSQL", usage: "Production Relational Schemas" },
      { name: "TypeORM / Prisma", usage: "Migrations & Data Access" },
      { name: "MongoDB", usage: "Document Storage & Metadata" },
      { name: "Redis", usage: "Session State & API Caching" },
      { name: "SQLite", usage: "Lightweight Embedded Stores" },
    ],
  },
  {
    category: "Cloud & Infrastructure",
    icon: Cloud,
    items: [
      { name: "AWS (EC2, S3)", usage: "Production Cloud Hosting" },
      { name: "Docker", usage: "Containerized Environments" },
      { name: "Nginx", usage: "Reverse Proxy & SSL" },
      { name: "Git / GitHub", usage: "Version Control & Branching" },
      { name: "Linux / Bash", usage: "Server Configuration" },
    ],
  },
  {
    category: "AI & Emerging Systems",
    icon: Cpu,
    items: [
      { name: "AI Agents", usage: "Multi-Step Tool Orchestration" },
      { name: "Model Context Protocol", usage: "MCP Tool Server Specs" },
      { name: "LLM Function Calling", usage: "Structured JSON Output" },
      { name: "Prompt Engineering", usage: "Few-Shot Context Pipelines" },
    ],
  },
];

// ─── Component ───────────────────────────────────────────────────────────────
export const NauticaSapphirePortfolio: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [activeNav, setActiveNav] = useState("home");

  const handleSpotlightMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "projects", "experience", "skills", "architecture", "about", "contact"];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 140) {
          setActiveNav(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopy = (text: string, field: string) => {
    cinematicAudioHaptics.playTactileClick();
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const [lastSentWaUrl, setLastSentWaUrl] = useState("");

  const getWhatsAppMessageTemplate = (name: string, email: string, message: string) => {
    const cleanName = name.trim() || "[Your Name]";
    const cleanEmail = email.trim() || "[your@email.com]";
    const cleanMsg = message.trim() || "[Tell me about the engineering role, team, or project...]";
    return `*Hello Rishabh,*\n\n*Name:* ${cleanName}\n*Email:* ${cleanEmail}\n\n*Message:*\n${cleanMsg}\n\n───────────────\n_Sent via Rishabh Naik Portfolio_`;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");

    const template = getWhatsAppMessageTemplate(formData.name, formData.email, formData.message);
    const waNumber = "916360908381";
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(template)}`;
    setLastSentWaUrl(waUrl);

    try {
      if (contactData.formEndpoint) {
        await fetch(contactData.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ ...formData, channel: "whatsapp" }),
        });
      }
    } catch { /* fail silently */ }

    // Open WhatsApp with pre-filled message template
    window.open(waUrl, "_blank", "noopener,noreferrer");

    setFormStatus("success");
  };

  const NAV_LINKS = [
    { id: "projects", label: "Work" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "architecture", label: "Architecture" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className="arch-page">
      {/* ═══════════════════════════════════════════════════════════════
          1. HERO SECTION — Clear Software Developer Positioning
      ═══════════════════════════════════════════════════════════════ */}
      <section className="arch-hero-section" id="home">
        {/* Floating Nav */}
        <header className="arch-nav">
          <div className="arch-nav-inner">
            <Link href="/" className="arch-brand">
              <span className="arch-brand-mark">✦</span>
              <span className="arch-brand-name">Rishabh Naik</span>
            </Link>

            <nav className="arch-nav-links">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className={`arch-nav-link ${activeNav === link.id ? "active" : ""}`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="arch-nav-right">
              <a href="tel:+916360908381" className="arch-nav-contact">
                +91 63609 08381
              </a>
              <a
                href="/Rishabh_Naik_Resume.pdf"
                download="Rishabh_Naik_Resume.pdf"
                className="arch-btn-dark"
                onClick={() => cinematicAudioHaptics.playTactileClick()}
              >
                <Download size={14} /> Download Resume
              </a>
              <button
                type="button"
                className="arch-mobile-toggle"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <nav className="arch-mobile-drawer">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className="arch-mobile-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/Rishabh_Naik_Resume.pdf"
                download="Rishabh_Naik_Resume.pdf"
                className="arch-mobile-resume"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Download size={15} /> Download Resume
              </a>
            </nav>
          )}
        </header>

        {/* Hero Content */}
        <div className="arch-hero-body">
          {/* Small Eyebrow as specified in Section 4 */}
          <div className="arch-hero-eyebrow">
            <span>FULL-STACK SOFTWARE DEVELOPER</span>
          </div>

          {/* Main Heading as specified in Section 4 */}
          <h1 className="arch-hero-title">
            I build production web applications<br />
            and backend systems.
          </h1>

          {/* Supporting Text */}
          <p className="arch-hero-sub">
            Building scalable software at <strong>Anantaloop</strong> with React, Next.js, NestJS, Node.js,
            PostgreSQL, and AWS — with an emerging specialization in Autonomous AI Agents and Model Context Protocol (MCP).
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="arch-hero-actions">
            <a href="#projects" className="arch-btn-white">
              View My Work
            </a>
            <a
              href="/Rishabh_Naik_Resume.pdf"
              download="Rishabh_Naik_Resume.pdf"
              className="arch-hero-link"
            >
              <Download size={15} /> Download Resume
            </a>
          </div>

          {/* Availability Status Line as specified in Section 4 */}
          <div className="arch-hero-status-pill">
            <span className="arch-status-dot" />
            <span>Available for Full-Stack & Backend Engineering Roles · Bangalore / Remote</span>
          </div>

          {/* Floating Sapphire Engineering Stats Capsule */}
          <div className="arch-hero-stats-capsule">
            <div className="arch-hero-stat">
              <span className="arch-hero-stat-num">Full-Stack</span>
              <span className="arch-hero-stat-lbl">Production Systems</span>
            </div>
            <div className="arch-hero-stat-sep" />
            <div className="arch-hero-stat">
              <span className="arch-hero-stat-num">NestJS · React</span>
              <span className="arch-hero-stat-lbl">Node · TypeScript</span>
            </div>
            <div className="arch-hero-stat-sep" />
            <div className="arch-hero-stat">
              <span className="arch-hero-stat-num">PostgreSQL</span>
              <span className="arch-hero-stat-lbl">AWS Cloud · Docker</span>
            </div>
            <div className="arch-hero-stat-sep" />
            <div className="arch-hero-stat">
              <span className="arch-hero-stat-num">7.75 CGPA</span>
              <span className="arch-hero-stat-lbl">B.E. Computer Science</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          CONTENT SECTIONS WITH ANIMATED GRADIENT & TEXTURE BACKGROUND
      ═══════════════════════════════════════════════════════════════ */}
      <div className="arch-content-wrapper">
        {/* Animated Gradient Aurora Mesh & Tactile Noise Texture */}
        <div className="arch-gradient-bg" aria-hidden="true">
          <div className="arch-gradient-blob arch-blob-1" />
          <div className="arch-gradient-blob arch-blob-2" />
          <div className="arch-gradient-blob arch-blob-3" />
          <div className="arch-gradient-blob arch-blob-4" />
          <div className="arch-texture-overlay" />
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            2. SELECTED WORK (The Largest Section on Homepage)
        ═══════════════════════════════════════════════════════════════ */}
        <section className="arch-section" id="projects">
          <div className="arch-container">
            <div className="arch-section-row">
              <div>
                <div className="arch-section-eyebrow">· Case Studies & Production Systems</div>
                <h2 className="arch-section-title">Selected Work.</h2>
              </div>
              <p className="arch-section-desc">
                Production platforms, autonomous AI systems, and enterprise workflow software built with real ownership.
              </p>
            </div>

            {/* Major Project Cards */}
            <div className="arch-selected-work-grid">
              {FEATURED_PROJECTS.map((proj) => (
                <article
                  key={proj.id}
                  className={`arch-work-card ${proj.highlight ? "arch-work-card--featured" : ""}`}
                  onMouseMove={handleSpotlightMove}
                >
                  <div className="arch-work-img-container">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={proj.imageUrl}
                      alt={proj.title}
                      className="arch-work-img"
                      loading="lazy"
                    />
                    <div className="arch-work-img-overlay" />
                    <span className="arch-work-num">{proj.num}</span>
                    <span className="arch-work-tagline">{proj.tagline}</span>
                  </div>

                  <div className="arch-work-body">
                    <div className="arch-work-meta-row">
                      <span className="arch-work-company">{proj.company}</span>
                      <span className="arch-work-timeline">{proj.timeline}</span>
                    </div>

                    <h3 className="arch-work-title">
                      <Link href={`/projects/${proj.id}`}>{proj.title}</Link>
                    </h3>

                    <p className="arch-work-desc">{proj.description}</p>

                    {/* Personal Contribution Box */}
                    <div className="arch-work-contribution">
                      <span className="arch-contribution-label">What I Personally Built:</span>
                      <p className="arch-contribution-text">{proj.contribution}</p>
                    </div>

                    <div className="arch-tag-row">
                      {proj.tags.map((t) => (
                        <span key={t} className="arch-tag">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="arch-work-footer">
                      <Link href={`/projects/${proj.id}`} className="arch-work-cta">
                        <span>View Engineering Case Study</span>
                        <ArrowUpRight size={16} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            3. WORK EXPERIENCE — Ownership & Achievement Bullets
        ═══════════════════════════════════════════════════════════════ */}
        <section className="arch-section arch-alt" id="experience">
          <div className="arch-container">
            <div className="arch-section-eyebrow">· Production Track Record</div>
            <h2 className="arch-section-title">Work Experience.</h2>

            <div className="arch-exp-card" onMouseMove={handleSpotlightMove}>
              <div className="arch-exp-left">
                <div className="arch-exp-company-block">
                  <h3 className="arch-exp-company">Anantaloop</h3>
                  <div className="arch-exp-loc">
                    <MapPin size={13} /> Bangalore, India
                  </div>
                </div>
                <div className="arch-exp-years">Apr 2024 – Present</div>
                <div className="arch-exp-status-tag">Full-Time Production Role</div>
              </div>

              <div className="arch-exp-right">
                <div className="arch-exp-header-row">
                  <div>
                    <h4 className="arch-exp-role">Software Developer</h4>
                    <p className="arch-exp-product-tag">Product: Impetus Sports Management Platform</p>
                  </div>
                </div>

                <ul className="arch-exp-bullets">
                  <li>
                    Architected and shipped core production modules for <strong>Impetus</strong> — a sports management platform serving athletes, coaches, and parents — including athlete registration, tournament scheduling, team formation, and standardized physical assessments.
                  </li>
                  <li>
                    Developed scalable full-stack features using <strong>NestJS, React, TypeScript, and PostgreSQL</strong>, delivering robust RESTful APIs with strict schema validation and role-based access control (RBAC).
                  </li>
                  <li>
                    Built responsive, high-performance web interfaces with <strong>React and Vite</strong>, implementing interactive tournament bracket visualization, data tables, and athlete evaluation tracking.
                  </li>
                  <li>
                    Managed cloud infrastructure on <strong>AWS</strong>, configuring containerized services with Docker, Nginx reverse proxying, and database migration pipelines ensuring 99.9% platform availability.
                  </li>
                  <li>
                    Collaborated directly with product managers and UI designers to translate intricate business requirements into maintainable, well-tested code from concept to deployment.
                  </li>
                </ul>

                <div className="arch-tag-row">
                  {["NestJS", "React", "TypeScript", "PostgreSQL", "AWS EC2 / S3", "Docker", "REST APIs", "RBAC"].map(
                    (t) => (
                      <span key={t} className="arch-tag">
                        {t}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            4. TECHNICAL SKILLS — Grouped & Evidence-Based
        ═══════════════════════════════════════════════════════════════ */}
        <section className="arch-section" id="skills">
          <div className="arch-container">
            <div className="arch-section-eyebrow">· Technical Toolkit</div>
            <h2 className="arch-section-title">Technical Skills.</h2>
            <p className="arch-section-desc">
              Demonstrated technologies across production deployments, enterprise workflows, and active research.
            </p>

            <div className="arch-skills-grid">
              {SKILLS_GROUPED.map((group) => {
                const IconComponent = group.icon;
                return (
                  <div key={group.category} className="arch-skill-card" onMouseMove={handleSpotlightMove}>
                    <div className="arch-skill-card-header">
                      <div className="arch-skill-icon">
                        <IconComponent size={20} />
                      </div>
                      <h3 className="arch-skill-cat-title">{group.category}</h3>
                    </div>

                    <div className="arch-skill-items">
                      {group.items.map((item) => (
                        <div key={item.name} className="arch-skill-item">
                          <span className="arch-skill-name">{item.name}</span>
                          <span className="arch-skill-usage">{item.usage}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            5. ENGINEERING & SYSTEM ARCHITECTURE
        ═══════════════════════════════════════════════════════════════ */}
        <section className="arch-section arch-alt" id="architecture">
          <div className="arch-container">
            <div className="arch-section-eyebrow">· System Design & Capabilities</div>
            <h2 className="arch-section-title">How I Build Systems.</h2>
            <p className="arch-section-desc">
              Clean separation of concerns, strict type safety, data integrity, and modern AI integration.
            </p>

            <div className="arch-arch-diagram-card" onMouseMove={handleSpotlightMove}>
              <div className="arch-diagram-header">
                <span className="arch-diagram-badge">PRODUCTION SYSTEM ARCHITECTURE</span>
                <span className="arch-diagram-meta">END-TO-END FLOW</span>
              </div>

              <div className="arch-diagram-flow">
                <div className="arch-flow-node">
                  <div className="arch-node-icon"><Layers size={20} /></div>
                  <div className="arch-node-title">Client Layer</div>
                  <div className="arch-node-desc">React · Next.js · TypeScript</div>
                  <div className="arch-node-sub">Reactive UI & State</div>
                </div>

                <div className="arch-flow-arrow">──►</div>

                <div className="arch-flow-node arch-flow-node--highlight">
                  <div className="arch-node-icon"><Server size={20} /></div>
                  <div className="arch-node-title">API & Backend</div>
                  <div className="arch-node-desc">NestJS · Node.js · REST</div>
                  <div className="arch-node-sub">RBAC & Domain Logic</div>
                </div>

                <div className="arch-flow-arrow">──►</div>

                <div className="arch-flow-node">
                  <div className="arch-node-icon"><Database size={20} /></div>
                  <div className="arch-node-title">Data & Cache</div>
                  <div className="arch-node-desc">PostgreSQL · Redis</div>
                  <div className="arch-node-sub">ACID Migrations & Indexing</div>
                </div>

                <div className="arch-flow-arrow">──►</div>

                <div className="arch-flow-node arch-flow-node--ai">
                  <div className="arch-node-icon"><Cpu size={20} /></div>
                  <div className="arch-node-title">AI & Agentic Tools</div>
                  <div className="arch-node-desc">Model Context Protocol</div>
                  <div className="arch-node-sub">Tool Calling & Reasoning</div>
                </div>

                <div className="arch-flow-arrow">──►</div>

                <div className="arch-flow-node">
                  <div className="arch-node-icon"><Cloud size={20} /></div>
                  <div className="arch-node-title">Cloud Infrastructure</div>
                  <div className="arch-node-desc">AWS EC2 / S3 · Docker</div>
                  <div className="arch-node-sub">CI/CD & 99.9% Uptime</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            6. MORE WORK — Project Archive
        ═══════════════════════════════════════════════════════════════ */}
        <section className="arch-section" id="archive">
          <div className="arch-container">
            <div className="arch-section-row">
              <div>
                <div className="arch-section-eyebrow">· Additional Technical Work</div>
                <h2 className="arch-section-title">Project Archive.</h2>
              </div>
              <Link href="/projects" className="arch-archive-link">
                <span>View Full Projects Directory</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="arch-archive-table">
              {ARCHIVE_PROJECTS.map((item) => (
                <div key={item.id} className="arch-archive-row">
                  <div className="arch-archive-col-title">
                    <Link href={`/projects/${item.id}`} className="arch-archive-row-title">
                      {item.title}
                    </Link>
                    <span className="arch-archive-row-note">{item.note}</span>
                  </div>
                  <div className="arch-archive-col-cat">{item.category}</div>
                  <div className="arch-archive-col-tech">{item.tech}</div>
                  <div className="arch-archive-col-year">{item.year}</div>
                  <div className="arch-archive-col-link">
                    <Link href={`/projects/${item.id}`} className="arch-archive-btn">
                      <ArrowUpRight size={15} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            7. ABOUT & WORKING STYLE
        ═══════════════════════════════════════════════════════════════ */}
        <section className="arch-section arch-alt" id="about">
          <div className="arch-container">
            <div className="arch-section-eyebrow">· Background & Mindset</div>
            <h2 className="arch-section-title">About Me.</h2>

            <div className="arch-about-layout">
              <div className="arch-about-prose">
                <p className="arch-about-lead">
                  I&apos;m a <strong>Full-Stack Software Developer</strong> based in Bangalore with a strong product mindset.
                  At <strong>Anantaloop</strong>, I transform complex business logic and operational chaos into maintainable, high-performance web software.
                </p>
                <p className="arch-about-text">
                  I care deeply about software that genuinely works in production — architecting clean REST APIs with NestJS, modeling normalized databases in PostgreSQL, and delivering reactive, accessible interfaces in React. Outside core full-stack development, I actively engineer autonomous AI agent workflows and Model Context Protocol (MCP) servers.
                </p>
                <div className="arch-about-badges-row">
                  <div className="arch-about-badge-item">
                    <GraduationCap size={16} className="arch-badge-icon" />
                    <span>B.E. Computer Science · Sambhram (VTU) · 7.75 CGPA</span>
                  </div>
                  <div className="arch-about-badge-item">
                    <MapPin size={16} className="arch-badge-icon" />
                    <span>Bangalore, Karnataka, India</span>
                  </div>
                  <div className="arch-about-badge-item">
                    <Briefcase size={16} className="arch-badge-icon" />
                    <span>Software Developer at Anantaloop</span>
                  </div>
                </div>
              </div>

              <div className="arch-about-sidebar">
                <div className="arch-quick-resume-card" onMouseMove={handleSpotlightMove}>
                  <h3 className="arch-resume-card-title">Looking for Rishabh&apos;s CV?</h3>
                  <p className="arch-resume-card-p">
                    Verified resume with full work history, technical skills, and educational credentials.
                  </p>
                  <a
                    href="/Rishabh_Naik_Resume.pdf"
                    download="Rishabh_Naik_Resume.pdf"
                    className="arch-resume-download-btn"
                  >
                    <Download size={16} />
                    <span>Download Resume (PDF)</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ═══════════════════════════════════════════════════════════════
            9. CONTACT — Simple & Recruiter Direct
        ═══════════════════════════════════════════════════════════════ */}
        <section className="arch-section arch-alt" id="contact">
          <div className="arch-container">
            <div className="arch-section-eyebrow">· Get in Touch</div>
            <div className="arch-contact-grid">
              <div className="arch-contact-left">
                <h2 className="arch-section-title">
                  Have a role, project, or problem that needs solving?<br />
                  <span className="arch-muted">Let&apos;s talk.</span>
                </h2>
                <p className="arch-contact-tagline">
                  Available for Full-Stack Software Developer roles, backend engineering positions, and high-impact technical collaborations in Bangalore or Remote.
                </p>

                <div className="arch-contact-items">
                  <div className="arch-contact-item">
                    <div className="arch-contact-ico"><Mail size={18} /></div>
                    <div className="arch-contact-detail">
                      <div className="arch-contact-lbl">Email</div>
                      <a href="mailto:rishabhnaik37@gmail.com" className="arch-contact-val">
                        rishabhnaik37@gmail.com
                      </a>
                    </div>
                    <button
                      type="button"
                      className="arch-copy-btn"
                      onClick={() => handleCopy("rishabhnaik37@gmail.com", "email")}
                      title="Copy Email"
                    >
                      {copiedField === "email" ? <Check size={14} color="#16a34a" /> : <Copy size={14} />}
                    </button>
                  </div>

                  <div className="arch-contact-item">
                    <div className="arch-contact-ico"><Phone size={18} /></div>
                    <div className="arch-contact-detail">
                      <div className="arch-contact-lbl">Phone</div>
                      <a href="tel:+916360908381" className="arch-contact-val">
                        +91 63609 08381
                      </a>
                    </div>
                    <button
                      type="button"
                      className="arch-copy-btn"
                      onClick={() => handleCopy("+916360908381", "phone")}
                      title="Copy Phone"
                    >
                      {copiedField === "phone" ? <Check size={14} color="#16a34a" /> : <Copy size={14} />}
                    </button>
                  </div>

                  <div className="arch-contact-item">
                    <div className="arch-contact-ico"><MapPin size={18} /></div>
                    <div className="arch-contact-detail">
                      <div className="arch-contact-lbl">Location</div>
                      <span className="arch-contact-val">Bangalore, Karnataka, India</span>
                    </div>
                  </div>
                </div>

                <div className="arch-socials-row">
                  <a
                    href="https://www.linkedin.com/in/rishabhnaik/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="arch-social-btn"
                  >
                    <Linkedin size={16} /> LinkedIn
                  </a>
                  <a
                    href="https://github.com/RishabhNaik"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="arch-social-btn"
                  >
                    <Github size={16} /> GitHub
                  </a>
                  <a
                    href="/Rishabh_Naik_Resume.pdf"
                    download="Rishabh_Naik_Resume.pdf"
                    className="arch-social-btn arch-social-btn--primary"
                  >
                    <Download size={16} /> Download Resume
                  </a>
                </div>
              </div>

              <div className="arch-form-card" onMouseMove={handleSpotlightMove}>
                {formStatus === "success" ? (
                  <div className="arch-form-success">
                    <CheckCircle2 size={46} color="#25D366" />
                    <h4>WhatsApp Message Prepared!</h4>
                    <p>WhatsApp was opened in a new tab with your pre-filled message template.</p>
                    <div className="arch-wa-success-preview">
                      <pre>{getWhatsAppMessageTemplate(formData.name, formData.email, formData.message)}</pre>
                    </div>
                    <div className="arch-wa-actions">
                      {lastSentWaUrl && (
                        <a
                          href={lastSentWaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="arch-btn-wa-reopen"
                        >
                          <MessageCircle size={16} />
                          <span>Open WhatsApp Again</span>
                          <ExternalLink size={13} />
                        </a>
                      )}
                      <button
                        type="button"
                        className="arch-btn-wa-reset"
                        onClick={() => {
                          setFormStatus("idle");
                          setFormData({ name: "", email: "", message: "" });
                        }}
                      >
                        Send Another Message
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="arch-form">
                    <div className="arch-form-header-row">
                      <div>
                        <h3 className="arch-form-title">Send a Direct Message</h3>
                        <p className="arch-form-subtitle">
                          Formats your inquiry into a structured WhatsApp template and connects directly to Rishabh.
                        </p>
                      </div>
                      <div className="arch-wa-badge">
                        <span className="arch-wa-dot" />
                        <span>WhatsApp</span>
                      </div>
                    </div>

                    <div className="arch-form-group">
                      <label htmlFor="c-name" className="arch-form-label">
                        Name
                      </label>
                      <input
                        id="c-name"
                        type="text"
                        required
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="arch-form-input"
                      />
                    </div>
                    <div className="arch-form-group">
                      <label htmlFor="c-email" className="arch-form-label">
                        Email
                      </label>
                      <input
                        id="c-email"
                        type="email"
                        required
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="arch-form-input"
                      />
                    </div>
                    <div className="arch-form-group">
                      <label htmlFor="c-msg" className="arch-form-label">
                        Message
                      </label>
                      <textarea
                        id="c-msg"
                        rows={4}
                        required
                        placeholder="Tell me about the engineering role, team, or project..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="arch-form-input"
                      />
                    </div>

                    {/* Live WhatsApp Message Template Preview */}
                    <div className="arch-wa-preview-container">
                      <div className="arch-wa-preview-header">
                        <div className="arch-wa-preview-label">
                          <MessageCircle size={13} color="#25D366" />
                          <span>WhatsApp Message Preview</span>
                        </div>
                        <button
                          type="button"
                          className="arch-wa-copy-btn"
                          onClick={() =>
                            handleCopy(
                              getWhatsAppMessageTemplate(formData.name, formData.email, formData.message),
                              "wa_template"
                            )
                          }
                        >
                          {copiedField === "wa_template" ? (
                            <>
                              <Check size={12} color="#16a34a" /> Copied
                            </>
                          ) : (
                            <>
                              <Copy size={12} /> Copy Template
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="arch-wa-preview-content">
                        {getWhatsAppMessageTemplate(formData.name, formData.email, formData.message)}
                      </pre>
                    </div>

                    <button type="submit" className="arch-form-submit arch-form-submit-wa" disabled={formStatus === "submitting"}>
                      <MessageCircle size={16} />
                      <span>{formStatus === "submitting" ? "Opening WhatsApp…" : "Send via WhatsApp"}</span>
                      <Send size={14} />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          10. FOOTER — Minimal & Clean
      ═══════════════════════════════════════════════════════════════ */}
      <footer className="arch-footer">
        <div className="arch-container">
          <div className="arch-footer-inner">
            <div className="arch-footer-brand">
              <span className="arch-footer-mark">✦</span>
              <span className="arch-footer-name">Rishabh Naik</span>
              <span className="arch-footer-role">Full-Stack Software Developer · Bangalore, India</span>
            </div>
            <div className="arch-footer-links">
              <a href="mailto:rishabhnaik37@gmail.com" className="arch-footer-link">
                Email
              </a>
              <a
                href="https://www.linkedin.com/in/rishabhnaik/"
                target="_blank"
                rel="noopener noreferrer"
                className="arch-footer-link"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/RishabhNaik"
                target="_blank"
                rel="noopener noreferrer"
                className="arch-footer-link"
              >
                GitHub
              </a>
              <a
                href="/Rishabh_Naik_Resume.pdf"
                download="Rishabh_Naik_Resume.pdf"
                className="arch-footer-link"
              >
                Resume
              </a>
              <button
                type="button"
                className="arch-footer-link"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Back to top ↑
              </button>
            </div>
          </div>
          <div className="arch-footer-copy">
            © {new Date().getFullYear()} Rishabh Naik · Built with Next.js & React
          </div>
        </div>
      </footer>
    </div>
  );
};
