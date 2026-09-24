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
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Code2,
  Server,
  Cloud,
  Sparkles,
  ExternalLink,
  Bot,
  Terminal,
  Cpu,
  CornerDownLeft,
} from "lucide-react";
import { cinematicAudioHaptics } from "@/utils/cinematicAudioHaptics";
import { contactData } from "@/data/siteData";

// ─── Data ────────────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    id: "impetus-sports-platform",
    title: "Impetus Sports Management Platform",
    category: "Full-Stack · Production",
    year: "2024–Present",
    description:
      "Scalable sports management system for athletes, coaches, and parents. Built athlete management, tournament scheduling, team formation, and physical assessment modules.",
    tags: ["NestJS", "React", "PostgreSQL", "AWS", "REST APIs"],
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    company: "Anantaloop",
    highlight: true,
  },
  {
    id: "ai-agent-mcp-workflows",
    title: "Autonomous AI Agents & MCP Architecture",
    category: "AI Systems · Agentic",
    year: "2024",
    description:
      "Engineered autonomous AI tool-calling workflows utilizing Model Context Protocol (MCP) servers to bridge Large Language Models directly with external APIs and databases.",
    tags: ["AI Agents", "MCP Protocol", "TypeScript", "Python", "LLMs"],
    imageUrl:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    company: "Frontier Engineering",
    highlight: true,
  },
  {
    id: "konkani-dialect-map",
    title: "Konkani Dialect Map",
    category: "Geospatial · Community",
    year: "2021",
    description:
      "Web platform preserving regional Konkani dialects through an interactive map with community-contributed audio recordings and location-based language discovery.",
    tags: ["Django", "Python", "JavaScript", "Firebase", "SQLite"],
    imageUrl:
      "https://images.unsplash.com/photo-1604357209793-fca5dca89f97?q=80&w=1200&auto=format&fit=crop",
    company: "Community Project",
    highlight: false,
  },
  {
    id: "ethereum-blockchain-inventory",
    title: "Blockchain Inventory Sharing",
    category: "Web3 · Smart Contracts",
    year: "2022–2023",
    description:
      "Decentralized inventory management using Ethereum smart contracts for secure, transparent multi-party sharing and tamper-proof verification.",
    tags: ["Solidity", "Ethereum", "Python", "MongoDB", "Web3.js"],
    imageUrl:
      "https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=1200&auto=format&fit=crop",
    company: "UG Final Year Capstone",
    highlight: false,
  },
  {
    id: "uiux-projects",
    title: "UI / UX Design Projects",
    category: "Design · Product",
    year: "2024",
    description:
      "Wireframes, prototypes, and high-fidelity designs focused on usability, clarity, and visual hierarchy. More to be added soon.",
    tags: ["Figma", "UI Design", "Prototyping", "User Research"],
    imageUrl:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1200&auto=format&fit=crop",
    company: "Coming Soon",
    comingSoon: true,
  },
];

const SKILLS = {
  frontend: ["Next.js", "React", "TypeScript", "JavaScript", "HTML / CSS"],
  backend: ["Node.js", "NestJS", "Python", "Django", "Flask", "REST APIs"],
  infra: ["PostgreSQL", "MongoDB", "Redis", "AWS", "GCP", "Docker", "Git"],
};

const EXPLORING = ["AI Agents", "Model Context Protocol (MCP)", "Prompt Engineering", "System Design", "DevOps"];

// ─── Component ───────────────────────────────────────────────────────────────

export const NauticaSapphirePortfolio: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [projectPage, setProjectPage] = useState(0);
  const [activeNav, setActiveNav] = useState("home");

  // ─── AI Career Intelligence State ──────────────────────────────────────────
  const [aiInput, setAiInput] = useState("");
  const [aiResponse, setAiResponse] = useState<string>(
    "Hello! I am Rishabh's AI Career Assistant. Ask me about his Anantaloop production experience, system architecture, tech stack, or full-time availability."
  );
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [activeAiPrompt, setActiveAiPrompt] = useState<string>("anantaloop");

  const AI_KNOWLEDGE: Record<string, string> = {
    anantaloop:
      "At Anantaloop (Apr 2024–Present), Rishabh builds production-ready features for Impetus — a sports management platform serving athletes, coaches, and parents. He architected modules for athlete management, tournament scheduling, dynamic team formation, and physical assessments using NestJS, React, PostgreSQL, and AWS.",
    architecture:
      "Rishabh engineers scalable full-stack applications with clean architecture: NestJS and Node.js for high-throughput REST APIs, Next.js/React for reactive UI, PostgreSQL and MongoDB for data persistence, Redis for caching, and AWS for cloud deployments.",
    ai:
      "Rishabh explores and builds with Autonomous AI Agents and the Model Context Protocol (MCP) — engineering systems where LLMs reliably call external tools, query live databases, and automate complex workflows with structured precision.",
    education:
      "Rishabh earned his Bachelor of Engineering (B.E.) in Computer Science & Engineering from Sambhram Institute of Technology (VTU) in 2023 with a 7.75 CGPA. His capstone was a Decentralized Inventory Sharing system using Ethereum smart contracts.",
    availability:
      "Rishabh is currently based in Bangalore, Karnataka, India and is open to Full-Stack and Backend Software Engineering roles (Bangalore on-site / hybrid / remote). Contact: rishabhnaik37@gmail.com | +91 63609 08381.",
  };

  const handleAiAsk = (key: string, customQuestion?: string) => {
    cinematicAudioHaptics.playTactileClick();
    setIsAiThinking(true);
    setActiveAiPrompt(key);
    if (customQuestion) setAiInput(customQuestion);

    setTimeout(() => {
      let answer = AI_KNOWLEDGE[key];
      if (!answer && customQuestion) {
        const q = customQuestion.toLowerCase();
        if (q.includes("anantaloop") || q.includes("work") || q.includes("job") || q.includes("experience")) {
          answer = AI_KNOWLEDGE.anantaloop;
        } else if (q.includes("stack") || q.includes("tech") || q.includes("architecture") || q.includes("backend")) {
          answer = AI_KNOWLEDGE.architecture;
        } else if (q.includes("ai") || q.includes("agent") || q.includes("mcp") || q.includes("llm")) {
          answer = AI_KNOWLEDGE.ai;
        } else if (q.includes("college") || q.includes("education") || q.includes("degree") || q.includes("cgpa")) {
          answer = AI_KNOWLEDGE.education;
        } else {
          answer = AI_KNOWLEDGE.availability;
        }
      }
      setAiResponse(answer || AI_KNOWLEDGE.anantaloop);
      setIsAiThinking(false);
    }, 280);
  };

  const handleSpotlightMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "experience", "projects", "education", "contact"];
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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    try {
      await fetch(contactData.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });
    } catch { /* fail silently */ }
    setFormStatus("success");
    setFormData({ name: "", email: "", message: "" });
  };

  const totalPages = Math.ceil(PROJECTS.length / 2);
  const displayedProjects = PROJECTS.slice(projectPage * 2, projectPage * 2 + 2);

  const NAV_LINKS = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "education", label: "Education" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className="arch-page">

      {/* ═══════════════════════════════════════════════════════════════
          HERO CARD — rounded frame, full background image
      ═══════════════════════════════════════════════════════════════ */}
      <section className="arch-hero-section" id="home">

        {/* Floating Nav — inside the hero card */}
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
              <a
                href="mailto:rishabhnaik37@gmail.com"
                className="arch-nav-contact"
              >
                +91 63609 08381
              </a>
              <a
                href="/Rishabh_Naik_Resume.pdf"
                download="Rishabh_Naik_Resume.pdf"
                className="arch-btn-dark"
                onClick={() => cinematicAudioHaptics.playTactileClick()}
              >
                Download CV
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
          <h1 className="arch-hero-title">
            Rishabh Naik —<br />
            Full-Stack Developer<br />
            & AI Systems Builder.
          </h1>
          <p className="arch-hero-sub">
            Building production-grade software at Anantaloop with Next.js,
            React, Node.js, Python, and AWS.
          </p>
          <div className="arch-hero-actions">
            <a href="#projects" className="arch-btn-white">
              View My Work
            </a>
            <a href="#contact" className="arch-hero-link">
              Let&apos;s Connect <ArrowUpRight size={16} />
            </a>
          </div>

          {/* Floating sapphire crystal stats capsule */}
          <div className="arch-hero-stats-capsule">
            <div className="arch-hero-stat">
              <span className="arch-hero-stat-num">1+</span>
              <span className="arch-hero-stat-lbl">Year at Anantaloop</span>
            </div>
            <div className="arch-hero-stat-sep" />
            <div className="arch-hero-stat">
              <span className="arch-hero-stat-num">Prod</span>
              <span className="arch-hero-stat-lbl">Full-Stack & APIs</span>
            </div>
            <div className="arch-hero-stat-sep" />
            <div className="arch-hero-stat">
              <span className="arch-hero-stat-num">3+</span>
              <span className="arch-hero-stat-lbl">Shipped Platforms</span>
            </div>
            <div className="arch-hero-stat-sep" />
            <div className="arch-hero-stat">
              <span className="arch-hero-stat-num">7.75</span>
              <span className="arch-hero-stat-lbl">B.E. CGPA</span>
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

        {/* ─── ABOUT ─── */}
        <section className="arch-section arch-about-section" id="about">
        <div className="arch-container">
          <div className="arch-section-eyebrow">· Who I am</div>
          <p className="arch-about-editorial">
            I&apos;m a{" "}
            <strong>Full-Stack Software Developer</strong>{" "}
            based in Bangalore, currently building scalable sports management products at{" "}
            <strong>Anantaloop</strong>.
            {" "}From back-end APIs to{" "}
            <strong>polished UI</strong>,{" "}
            I work across the full stack with{" "}
            <strong>Purpose And Precision</strong>{" "}
            to ship software that just works.
          </p>

          {/* ─── Modern AI Bento Grid ─── */}
          <div className="arch-bento-grid">
            {/* Tile 1: Interactive AI Career Assistant (Wide) */}
            <div className="arch-bento-card arch-bento-ai" onMouseMove={handleSpotlightMove}>
              <div className="arch-bento-ai-header">
                <div className="arch-bento-badge">
                  <span className="arch-bento-pulse" />
                  <span>RISHABH AI INTELLIGENCE</span>
                </div>
                <span className="arch-bento-mono">MODEL: RESUME-v2.6 // PROMPT-READY</span>
              </div>

              <h3 className="arch-bento-ai-title">
                Ask about my experience, architecture, or stack.
              </h3>

              {/* Quick AI Prompt Pills */}
              <div className="arch-bento-prompts">
                <button
                  type="button"
                  className={`arch-bento-prompt-chip ${activeAiPrompt === "anantaloop" ? "active" : ""}`}
                  onClick={() => handleAiAsk("anantaloop")}
                >
                  ⚡ Anantaloop Impact
                </button>
                <button
                  type="button"
                  className={`arch-bento-prompt-chip ${activeAiPrompt === "architecture" ? "active" : ""}`}
                  onClick={() => handleAiAsk("architecture")}
                >
                  🛠️ Systems Architecture
                </button>
                <button
                  type="button"
                  className={`arch-bento-prompt-chip ${activeAiPrompt === "ai" ? "active" : ""}`}
                  onClick={() => handleAiAsk("ai")}
                >
                  🤖 AI Agents & MCP
                </button>
                <button
                  type="button"
                  className={`arch-bento-prompt-chip ${activeAiPrompt === "availability" ? "active" : ""}`}
                  onClick={() => handleAiAsk("availability")}
                >
                  📍 Availability & Roles
                </button>
              </div>

              {/* Interactive Query Input */}
              <form
                className="arch-bento-input-row"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (aiInput.trim()) handleAiAsk("custom", aiInput);
                }}
              >
                <div className="arch-bento-input-wrap">
                  <Terminal size={15} className="arch-bento-input-icon" />
                  <input
                    type="text"
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    placeholder="Or type a custom question (e.g. 'What database does he use?')..."
                    className="arch-bento-input"
                  />
                </div>
                <button type="submit" className="arch-bento-submit-btn" aria-label="Send Query">
                  <CornerDownLeft size={14} />
                  <span>Ask AI</span>
                </button>
              </form>

              {/* AI Terminal Output Response */}
              <div className="arch-bento-ai-console">
                <div className="arch-bento-console-top">
                  <div className="arch-bento-console-dots">
                    <span className="dot red" />
                    <span className="dot yellow" />
                    <span className="dot green" />
                  </div>
                  <span className="arch-bento-console-title">assistant@rishabhnaik:~$ response.output</span>
                  <button
                    type="button"
                    className="arch-bento-console-copy"
                    onClick={() => handleCopy(aiResponse, "ai_resp")}
                    title="Copy Answer"
                  >
                    {copiedField === "ai_resp" ? <Check size={12} color="#16a34a" /> : <Copy size={12} />}
                  </button>
                </div>
                <div className="arch-bento-console-text">
                  {isAiThinking ? (
                    <div className="arch-bento-thinking">
                      <span className="ai-typing-dot" />
                      <span className="ai-typing-dot" />
                      <span className="ai-typing-dot" />
                      <span>Synthesizing response from verified portfolio data...</span>
                    </div>
                  ) : (
                    <p>{aiResponse}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Tile 2: Production Impact at Anantaloop */}
            <div className="arch-bento-card" onMouseMove={handleSpotlightMove}>
              <div className="arch-bento-icon-box">
                <Briefcase size={20} />
              </div>
              <div className="arch-bento-cat">Production Role</div>
              <h4 className="arch-bento-h">Software Developer</h4>
              <p className="arch-bento-company">Anantaloop · Bangalore, India</p>
              <p className="arch-bento-p">
                Building scalable sports management products with <strong>NestJS, React, PostgreSQL, and AWS</strong>.
              </p>
              <div className="arch-bento-metric-row">
                <div className="arch-bento-metric">
                  <span className="metric-val">1+</span>
                  <span className="metric-lbl">Year In Prod</span>
                </div>
                <div className="arch-bento-metric">
                  <span className="metric-val">4+</span>
                  <span className="metric-lbl">Core Modules</span>
                </div>
              </div>
            </div>

            {/* Tile 3: Core Architecture & Stack */}
            <div className="arch-bento-card" onMouseMove={handleSpotlightMove}>
              <div className="arch-bento-icon-box">
                <Cpu size={20} />
              </div>
              <div className="arch-bento-cat">Full-Stack Systems</div>
              <h4 className="arch-bento-h">Robust Architecture</h4>
              <p className="arch-bento-p">
                Production-grade backend APIs paired with fast, modern web interfaces and reliable cloud deployments.
              </p>
              <div className="arch-bento-chips">
                <span className="arch-bento-chip">NestJS</span>
                <span className="arch-bento-chip">React / Next.js</span>
                <span className="arch-bento-chip">PostgreSQL</span>
                <span className="arch-bento-chip">AWS Cloud</span>
                <span className="arch-bento-chip">Docker</span>
              </div>
            </div>

            {/* Tile 4: AI & Frontier Engineering */}
            <div className="arch-bento-card" onMouseMove={handleSpotlightMove}>
              <div className="arch-bento-icon-box">
                <Sparkles size={20} />
              </div>
              <div className="arch-bento-cat">Frontier Exploration</div>
              <h4 className="arch-bento-h">AI Agents & MCP</h4>
              <p className="arch-bento-p">
                Engineering autonomous agentic workflows and Model Context Protocol servers to bridge LLMs with real tools.
              </p>
              <div className="arch-bento-chips">
                <span className="arch-bento-chip arch-bento-chip--glow">AI Agents</span>
                <span className="arch-bento-chip arch-bento-chip--glow">MCP Protocol</span>
                <span className="arch-bento-chip">Prompt Systems</span>
                <span className="arch-bento-chip">B.E. 7.75 CGPA</span>
              </div>
            </div>
          </div>

          <div className="arch-about-socials">
            <a href="https://www.linkedin.com/in/rishabhnaik/" target="_blank" rel="noopener noreferrer" className="arch-social-pill">
              <Linkedin size={15} /> LinkedIn <ExternalLink size={12} />
            </a>
            <a href="https://github.com/RishabhNaik" target="_blank" rel="noopener noreferrer" className="arch-social-pill">
              <Github size={15} /> GitHub <ExternalLink size={12} />
            </a>
            <a href="/Rishabh_Naik_Resume.pdf" download="Rishabh_Naik_Resume.pdf" className="arch-social-pill">
              <Download size={15} /> Resume PDF
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          EXPERIENCE
      ═══════════════════════════════════════════════════════════════ */}
      <section className="arch-section arch-alt" id="experience">
        <div className="arch-container">
          <div className="arch-section-eyebrow">· Where I&apos;ve worked</div>
          <h2 className="arch-section-title">Work Experience.</h2>

          <div className="arch-exp-card">
            <div className="arch-exp-left">
              <div className="arch-exp-years">Apr 2024 – Present</div>
              <div className="arch-exp-loc"><MapPin size={13} /> Bangalore</div>
            </div>
            <div className="arch-exp-right">
              <h3 className="arch-exp-role">Software Developer</h3>
              <p className="arch-exp-company">Anantaloop</p>
              <ul className="arch-exp-bullets">
                <li>Built production-ready features for <strong>Impetus</strong> — a sports management platform for athletes, coaches, and parents — including athlete management, tournament scheduling, team formation, and physical assessment modules.</li>
                <li>Developed scalable full-stack features using <strong>NestJS, React, PostgreSQL, and AWS</strong>, delivering robust REST APIs in close collaboration with product and design teams.</li>
                <li>Translated complex business requirements into maintainable software with clean architecture from concept to deployment.</li>
              </ul>
              <div className="arch-tag-row">
                {["NestJS", "React", "TypeScript", "PostgreSQL", "AWS", "REST APIs"].map((t) => (
                  <span key={t} className="arch-tag">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          PROJECTS
      ═══════════════════════════════════════════════════════════════ */}
      <section className="arch-section" id="projects">
        <div className="arch-container">
          <div className="arch-section-row">
            <div>
              <div className="arch-section-eyebrow">· Things I&apos;ve built</div>
              <h2 className="arch-section-title">Selected Projects.</h2>
            </div>
            <p className="arch-section-desc">
              Production platforms, community tools, and experiments in blockchain and AI systems.
            </p>
          </div>

          <div className="arch-project-grid">
            {displayedProjects.map((proj, i) => (
              <div key={proj.id} className={`arch-project-card ${proj.highlight ? "arch-project-card--featured" : ""}`}>
                <div className="arch-project-img-wrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={proj.imageUrl} alt={proj.title} className="arch-project-img" loading="lazy" />
                  <div className="arch-project-img-overlay" />
                  {proj.comingSoon && <div className="arch-coming-badge">Coming Soon</div>}
                  {proj.highlight && <div className="arch-featured-badge">Featured</div>}
                  <div className="arch-project-num">0{projectPage * 2 + i + 1}</div>
                </div>
                <div className="arch-project-body">
                  <div className="arch-project-meta-row">
                    <span className="arch-project-cat">{proj.category}</span>
                    <span className="arch-project-year">{proj.year}</span>
                  </div>
                  <h3 className="arch-project-title">{proj.title}</h3>
                  <p className="arch-project-desc">{proj.description}</p>
                  <div className="arch-tag-row">
                    {proj.tags.map((t) => <span key={t} className="arch-tag">{t}</span>)}
                  </div>
                  <div className="arch-project-footer-row">
                    <span className="arch-project-company">{proj.company}</span>
                    {!proj.comingSoon && (
                      <Link href={`/projects/${proj.id}`} className="arch-project-cta">
                        Details <ArrowUpRight size={14} />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="arch-project-pager">
            <button
              type="button"
              className="arch-pager-arrow"
              disabled={projectPage === 0}
              onClick={() => { cinematicAudioHaptics.playTactileClick(); setProjectPage((p) => Math.max(0, p - 1)); }}
              aria-label="Prev"
            ><ChevronLeft size={18} /></button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                type="button"
                className={`arch-pager-dot ${projectPage === i ? "active" : ""}`}
                onClick={() => { cinematicAudioHaptics.playTactileClick(); setProjectPage(i); }}
                aria-label={`Page ${i + 1}`}
              />
            ))}
            <button
              type="button"
              className="arch-pager-arrow"
              disabled={projectPage === totalPages - 1}
              onClick={() => { cinematicAudioHaptics.playTactileClick(); setProjectPage((p) => Math.min(totalPages - 1, p + 1)); }}
              aria-label="Next"
            ><ChevronRight size={18} /></button>
          </div>
        </div>
      </section>



      {/* ═══════════════════════════════════════════════════════════════
          EDUCATION
      ═══════════════════════════════════════════════════════════════ */}
      <section className="arch-section" id="education">
        <div className="arch-container">
          <div className="arch-section-eyebrow">· Academic background</div>
          <h2 className="arch-section-title">Education.</h2>

          <div className="arch-edu-card">
            <div className="arch-edu-icon"><GraduationCap size={26} /></div>
            <div className="arch-edu-content">
              <div className="arch-edu-header-row">
                <div>
                  <h3 className="arch-edu-degree">B.E. Computer Science Engineering</h3>
                  <p className="arch-edu-school">Sambhram Institute of Technology · VTU</p>
                </div>
                <div className="arch-edu-badges">
                  <span className="arch-edu-years-badge">2019 – 2023</span>
                  <span className="arch-edu-cgpa-badge">CGPA 7.75</span>
                </div>
              </div>
              <p className="arch-edu-detail">
                Focused on Data Structures & Algorithms, Distributed Computing, Database Management Systems, and Software Architecture.
              </p>
              <div className="arch-edu-capstone">
                <strong>Capstone:</strong> Blockchain Decentralized Inventory Sharing using Ethereum Smart Contracts
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          CONTACT
      ═══════════════════════════════════════════════════════════════ */}
      <section className="arch-section arch-alt" id="contact">
        <div className="arch-container">
          <div className="arch-section-eyebrow">· Get in touch</div>
          <div className="arch-contact-grid">
            <div className="arch-contact-left">
              <h2 className="arch-section-title">
                Open to opportunities.<br />
                <span className="arch-muted">Let&apos;s talk.</span>
              </h2>
              <p className="arch-contact-tagline">
                Available for full-stack engineering roles, collaborative software projects, and interesting technical conversations.
              </p>

              <div className="arch-contact-items">
                <div className="arch-contact-item">
                  <div className="arch-contact-ico"><Mail size={18} /></div>
                  <div className="arch-contact-detail">
                    <div className="arch-contact-lbl">Email</div>
                    <a href="mailto:rishabhnaik37@gmail.com" className="arch-contact-val">rishabhnaik37@gmail.com</a>
                  </div>
                  <button type="button" className="arch-copy-btn" onClick={() => handleCopy("rishabhnaik37@gmail.com", "email")} title="Copy">
                    {copiedField === "email" ? <Check size={14} color="#16a34a" /> : <Copy size={14} />}
                  </button>
                </div>
                <div className="arch-contact-item">
                  <div className="arch-contact-ico"><Phone size={18} /></div>
                  <div className="arch-contact-detail">
                    <div className="arch-contact-lbl">Phone</div>
                    <a href="tel:+916360908381" className="arch-contact-val">+91 63609 08381</a>
                  </div>
                  <button type="button" className="arch-copy-btn" onClick={() => handleCopy("6360908381", "phone")} title="Copy">
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
                <a href="https://www.linkedin.com/in/rishabhnaik/" target="_blank" rel="noopener noreferrer" className="arch-social-btn">
                  <Linkedin size={16} /> LinkedIn
                </a>
                <a href="https://github.com/RishabhNaik" target="_blank" rel="noopener noreferrer" className="arch-social-btn">
                  <Github size={16} /> GitHub
                </a>
                <a href="/Rishabh_Naik_Resume.pdf" download className="arch-social-btn arch-social-btn--primary">
                  <Download size={16} /> Resume PDF
                </a>
              </div>
            </div>

            <div className="arch-form-card">
              {formStatus === "success" ? (
                <div className="arch-form-success">
                  <CheckCircle2 size={48} color="#16a34a" />
                  <h4>Message Sent!</h4>
                  <p>I&apos;ll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="arch-form">
                  <h3 className="arch-form-title">Send a message</h3>
                  <div className="arch-form-group">
                    <label htmlFor="c-name" className="arch-form-label">Name</label>
                    <input id="c-name" type="text" required placeholder="Your name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="arch-form-input" />
                  </div>
                  <div className="arch-form-group">
                    <label htmlFor="c-email" className="arch-form-label">Email</label>
                    <input id="c-email" type="email" required placeholder="your@email.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="arch-form-input" />
                  </div>
                  <div className="arch-form-group">
                    <label htmlFor="c-msg" className="arch-form-label">Message</label>
                    <textarea id="c-msg" rows={4} required placeholder="Tell me about the role or opportunity..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="arch-form-input" />
                  </div>
                  <button type="submit" className="arch-form-submit" disabled={formStatus === "submitting"}>
                    <span>{formStatus === "submitting" ? "Sending…" : "Send Message"}</span>
                    <Send size={15} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════════════ */}
      <footer className="arch-footer">
        <div className="arch-container">
          <div className="arch-footer-inner">
            <div className="arch-footer-brand">
              <span className="arch-footer-mark">✦</span>
              <span className="arch-footer-name">Rishabh Naik</span>
              <span className="arch-footer-role">Software Developer · Bangalore</span>
            </div>
            <div className="arch-footer-links">
              <a href="mailto:rishabhnaik37@gmail.com" className="arch-footer-link">Email</a>
              <a href="https://www.linkedin.com/in/rishabhnaik/" target="_blank" rel="noopener noreferrer" className="arch-footer-link">LinkedIn</a>
              <a href="https://github.com/RishabhNaik" target="_blank" rel="noopener noreferrer" className="arch-footer-link">GitHub</a>
              <button type="button" className="arch-footer-link" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Back to top ↑</button>
            </div>
          </div>
          <div className="arch-footer-copy">© {new Date().getFullYear()} Rishabh Naik · Built with Next.js</div>
        </div>
      </footer>
    </div>
  );
};
