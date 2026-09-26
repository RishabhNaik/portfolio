import { Metadata } from "next";
import Link from "next/link";
import { Download, Briefcase, GraduationCap, MapPin, Mail, Github, Linkedin, ArrowRight, Code2, Server, Database, Cloud, Cpu } from "lucide-react";
import { EditorialNav } from "@/components/navigation/EditorialNav";
import "@/app/editorial-pages.css";

export const metadata: Metadata = {
  title: "About — Rishabh Naik",
  description:
    "Full-Stack Software Developer & Product Engineer building production web applications, backend services, and autonomous AI agents at Anantaloop.",
};

const SKILL_GROUPS = [
  {
    name: "Frontend Architecture",
    icon: Code2,
    skills: ["React.js", "Next.js (App Router)", "TypeScript", "JavaScript (ES6+)", "TailwindCSS", "HTML5/CSS3"],
  },
  {
    name: "Backend & Systems",
    icon: Server,
    skills: ["NestJS", "Node.js", "Express.js", "REST APIs", "Microservices", "JWT & RBAC Auth"],
  },
  {
    name: "Databases & Storage",
    icon: Database,
    skills: ["PostgreSQL", "MongoDB", "Redis (Caching)", "Prisma ORM", "TypeORM", "Schema Design"],
  },
  {
    name: "Cloud & DevOps",
    icon: Cloud,
    skills: ["AWS (EC2, S3)", "Docker", "Nginx", "Git / GitHub Actions", "CI/CD Pipelines", "Linux"],
  },
  {
    name: "AI & Emerging",
    icon: Cpu,
    skills: ["Model Context Protocol (MCP)", "Autonomous AI Agents", "LLM Tool Calling", "Vector Search"],
  },
];

export default function AboutPage() {
  return (
    <div className="ed-page-wrapper">
      {/* ─── Top Shared Editorial Navigation ─── */}
      <EditorialNav activeItem="about" />

      {/* ─── Main Content ─── */}
      <main className="ed-container">
        {/* Header */}
        <section className="ed-page-header">
          <span className="ed-eyebrow">// ABOUT ME</span>
          <h1 className="ed-title">
            Designing &amp; building<br />
            <span className="ed-title-highlight">production software.</span>
          </h1>
          <p className="ed-lead">
            Full-Stack Software Developer &amp; Product Engineer based in Bangalore, specializing in scalable web applications, robust backend architectures, and emerging AI agent workflows.
          </p>
        </section>

        {/* 2-Column Overview */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "32px", marginBottom: "48px" }}>
          {/* Left: Engineering Philosophy & Bio */}
          <div className="ed-glass-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", color: "#38bdf8", textTransform: "uppercase", display: "block", marginBottom: "16px" }}>
                // BACKGROUND &amp; MINDSET
              </span>
              <h2 style={{ fontSize: "24px", fontWeight: 750, color: "#ffffff", margin: "0 0 16px 0", letterSpacing: "-0.02em" }}>
                Product-minded engineer with high craft standards.
              </h2>
              <div style={{ color: "#cbd5e1", fontSize: "15px", lineHeight: 1.7, display: "flex", flexDirection: "column", gap: "14px" }}>
                <p style={{ margin: 0 }}>
                  I work at <strong style={{ color: "#ffffff" }}>Anantaloop</strong>, engineering core production platforms like <strong>Impetus</strong> — a sports management SaaS handling athlete rosters, automated tournament scheduling, and standardized physical assessments.
                </p>
                <p style={{ margin: 0 }}>
                  Beyond traditional full-stack engineering, I actively build with <strong style={{ color: "#00B4D8" }}>Model Context Protocol (MCP)</strong> and autonomous AI agents, enabling language models to safely interface with live databases, execute tools, and automate business processes with schema-guarded reliability.
                </p>
                <p style={{ margin: 0 }}>
                  I hold a Bachelor of Engineering in Computer Science &amp; Engineering from Sambhram Institute of Technology (VTU) with a 7.75 CGPA.
                </p>
              </div>
            </div>

            <div style={{ marginTop: "28px", display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
              <a
                href="/Rishabh_Naik_Resume.pdf"
                download="Rishabh_Naik_Resume.pdf"
                className="ed-btn-primary"
              >
                <Download size={16} />
                <span>Download Resume</span>
              </a>
              <Link href="/contact" className="ed-btn-secondary">
                <span>Get in Touch</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Right: Quick Highlights Grid */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div className="ed-glass-card" style={{ padding: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(0, 180, 216, 0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#00B4D8" }}>
                  <Briefcase size={18} />
                </div>
                <div>
                  <span style={{ fontSize: "12px", color: "#94a3b8", fontWeight: 600 }}>CURRENT ROLE</span>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#ffffff", margin: 0 }}>Software Engineer · Anantaloop</h3>
                </div>
              </div>
              <p style={{ fontSize: "13.5px", color: "#94a3b8", margin: 0, lineHeight: 1.5 }}>
                Production full-stack engineering with NestJS, React, PostgreSQL, and AWS. April 2024 – Present.
              </p>
            </div>

            <div className="ed-glass-card" style={{ padding: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(0, 180, 216, 0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#00B4D8" }}>
                  <GraduationCap size={18} />
                </div>
                <div>
                  <span style={{ fontSize: "12px", color: "#94a3b8", fontWeight: 600 }}>EDUCATION</span>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#ffffff", margin: 0 }}>B.E. Computer Science · 7.75 CGPA</h3>
                </div>
              </div>
              <p style={{ fontSize: "13.5px", color: "#94a3b8", margin: 0, lineHeight: 1.5 }}>
                Sambhram Institute of Technology (VTU), 2019 – 2023. Capstone in Decentralized Inventory Sharing.
              </p>
            </div>

            <div className="ed-glass-card" style={{ padding: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(0, 180, 216, 0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#00B4D8" }}>
                  <MapPin size={18} />
                </div>
                <div>
                  <span style={{ fontSize: "12px", color: "#94a3b8", fontWeight: 600 }}>LOCATION &amp; STATUS</span>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#ffffff", margin: 0 }}>Bangalore, Karnataka, India</h3>
                </div>
              </div>
              <p style={{ fontSize: "13.5px", color: "#94a3b8", margin: 0, lineHeight: 1.5 }}>
                Available for Full-Stack &amp; Backend Engineering roles (Bangalore on-site / hybrid / remote).
              </p>
            </div>
          </div>
        </div>

        {/* Technical Skills Section */}
        <section style={{ marginTop: "56px" }}>
          <div style={{ marginBottom: "28px" }}>
            <span className="ed-eyebrow">// TECHNICAL STACK</span>
            <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#ffffff", margin: "0 0 8px 0", letterSpacing: "-0.02em" }}>
              Tools &amp; Technologies
            </h2>
            <p style={{ color: "#94a3b8", margin: 0, fontSize: "15px" }}>
              Technologies utilized in production systems and commercial projects.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
            {SKILL_GROUPS.map((group) => {
              const Icon = group.icon;
              return (
                <div key={group.name} className="ed-glass-card" style={{ padding: "24px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                    <Icon size={18} color="#00B4D8" />
                    <h3 style={{ fontSize: "14.5px", fontWeight: 750, color: "#ffffff", margin: 0 }}>
                      {group.name}
                    </h3>
                  </div>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                    {group.skills.map((skill) => (
                      <li key={skill} style={{ fontSize: "13.5px", color: "#cbd5e1", display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#00B4D8" }} />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <section
          className="ed-glass-card"
          style={{
            marginTop: "64px",
            padding: "44px 36px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "radial-gradient(circle at 50% 50%, rgba(0, 180, 216, 0.1) 0%, rgba(6, 8, 12, 0.6) 80%)",
            borderColor: "rgba(0, 180, 216, 0.25)",
          }}
        >
          <span className="ed-eyebrow">// COLLABORATION</span>
          <h2 style={{ fontSize: "clamp(26px, 3.2vw, 38px)", fontWeight: 800, color: "#ffffff", margin: "0 0 14px 0", letterSpacing: "-0.03em" }}>
            Have a project, role, or problem to solve?
          </h2>
          <p style={{ color: "#94a3b8", maxWidth: "520px", margin: "0 auto 28px", fontSize: "15.5px" }}>
            I am always open to exploring high-impact opportunities with ambitious teams and product builders.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="/contact" className="ed-btn-primary">
              <Mail size={16} />
              <span>Contact Rishabh</span>
            </Link>
            <Link href="/projects" className="ed-btn-secondary">
              <span>View Projects</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
