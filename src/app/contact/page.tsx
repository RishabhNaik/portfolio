"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageCircle, Copy, Check, ExternalLink, ArrowRight, Github, Linkedin, Download } from "lucide-react";
import { EditorialNav } from "@/components/navigation/EditorialNav";
import { cinematicAudioHaptics } from "@/utils/cinematicAudioHaptics";
import { contactData } from "@/data/siteData";
import "@/app/editorial-pages.css";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [lastSentWaUrl, setLastSentWaUrl] = useState("");

  const handleCopy = (text: string, field: string) => {
    cinematicAudioHaptics.playTactileClick();
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

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
    } catch {
      /* fail silently */
    }

    // Open WhatsApp with pre-filled message template
    window.open(waUrl, "_blank", "noopener,noreferrer");
    setFormStatus("success");
  };

  return (
    <div className="ed-page-wrapper">
      {/* ─── Top Shared Editorial Navigation ─── */}
      <EditorialNav activeItem="contact" />

      {/* ─── Main Content ─── */}
      <main className="ed-container">
        {/* Header */}
        <section className="ed-page-header">
          <span className="ed-eyebrow">// GET IN TOUCH</span>
          <h1 className="ed-title">
            Let&apos;s build something<br />
            <span className="ed-title-highlight">exceptional together.</span>
          </h1>
          <p className="ed-lead">
            Available for Full-Stack Software Developer roles, backend engineering contracts, and high-impact technical collaborations in Bangalore or Remote.
          </p>
        </section>

        {/* 2-Column Contact Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "36px", marginTop: "16px" }}>
          {/* Left Column: Direct Info Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div className="ed-glass-card" style={{ padding: "28px" }}>
              <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", color: "#38bdf8", textTransform: "uppercase", display: "block", marginBottom: "16px" }}>
                // DIRECT CHANNELS
              </span>

              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                {/* Email */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "38px", height: "38px", borderRadius: "8px", background: "rgba(0, 180, 216, 0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#00B4D8" }}>
                      <Mail size={18} />
                    </div>
                    <div>
                      <span style={{ fontSize: "12px", color: "#94a3b8", display: "block" }}>EMAIL</span>
                      <a href="mailto:rishabhnaik37@gmail.com" style={{ color: "#ffffff", fontWeight: 650, fontSize: "14.5px", textDecoration: "none" }}>
                        rishabhnaik37@gmail.com
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy("rishabhnaik37@gmail.com", "email")}
                    style={{ background: "transparent", border: "1px solid rgba(255, 255, 255, 0.12)", color: "#cbd5e1", borderRadius: "6px", padding: "5px 9px", fontSize: "12px", cursor: "pointer" }}
                  >
                    {copiedField === "email" ? <Check size={13} color="#22c55e" /> : <Copy size={13} />}
                  </button>
                </div>

                {/* Phone & WhatsApp */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "38px", height: "38px", borderRadius: "8px", background: "rgba(37, 211, 102, 0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#25D366" }}>
                      <Phone size={18} />
                    </div>
                    <div>
                      <span style={{ fontSize: "12px", color: "#94a3b8", display: "block" }}>PHONE / WHATSAPP</span>
                      <a href="tel:+916360908381" style={{ color: "#ffffff", fontWeight: 650, fontSize: "14.5px", textDecoration: "none" }}>
                        +91 63609 08381
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy("+916360908381", "phone")}
                    style={{ background: "transparent", border: "1px solid rgba(255, 255, 255, 0.12)", color: "#cbd5e1", borderRadius: "6px", padding: "5px 9px", fontSize: "12px", cursor: "pointer" }}
                  >
                    {copiedField === "phone" ? <Check size={13} color="#22c55e" /> : <Copy size={13} />}
                  </button>
                </div>

                {/* Location */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "38px", height: "38px", borderRadius: "8px", background: "rgba(0, 180, 216, 0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#00B4D8" }}>
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span style={{ fontSize: "12px", color: "#94a3b8", display: "block" }}>LOCATION</span>
                    <span style={{ color: "#ffffff", fontWeight: 650, fontSize: "14.5px" }}>Bangalore, Karnataka, India</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social & Resume Links */}
            <div className="ed-glass-card" style={{ padding: "28px" }}>
              <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", color: "#38bdf8", textTransform: "uppercase", display: "block", marginBottom: "16px" }}>
                // PROFILES &amp; ASSETS
              </span>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <a
                  href="https://github.com/RishabhNaik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ed-btn-secondary"
                  style={{ justifyContent: "space-between" }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <Github size={17} /> GitHub Repositories
                  </span>
                  <ExternalLink size={14} />
                </a>

                <a
                  href="https://www.linkedin.com/in/rishabhnaik/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ed-btn-secondary"
                  style={{ justifyContent: "space-between" }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <Linkedin size={17} /> LinkedIn Profile
                  </span>
                  <ExternalLink size={14} />
                </a>

                <a
                  href="/Rishabh_Naik_Resume.pdf"
                  download="Rishabh_Naik_Resume.pdf"
                  className="ed-btn-primary"
                  style={{ justifyContent: "center", marginTop: "6px" }}
                >
                  <Download size={16} />
                  <span>Download Verified Resume PDF</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: WhatsApp Template Message Form */}
          <div className="ed-glass-card" style={{ padding: "32px" }}>
            {formStatus === "success" ? (
              <div style={{ textAlign: "center", padding: "40px 16px", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
                <CheckCircle2 size={48} color="#25D366" />
                <h3 style={{ fontSize: "22px", fontWeight: 800, color: "#ffffff", margin: 0 }}>
                  WhatsApp Message Prepared!
                </h3>
                <p style={{ color: "#94a3b8", fontSize: "14.5px", margin: 0, maxWidth: "420px", lineHeight: 1.5 }}>
                  WhatsApp was opened with your formatted message template. If it didn&apos;t open automatically, use the button below:
                </p>

                <div style={{ width: "100%", background: "rgba(0, 0, 0, 0.4)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "8px", padding: "14px", textAlign: "left" }}>
                  <pre style={{ margin: 0, fontFamily: "monospace", fontSize: "12px", color: "#cbd5e1", whiteSpace: "pre-wrap" }}>
                    {getWhatsAppMessageTemplate(formData.name, formData.email, formData.message)}
                  </pre>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%", marginTop: "8px" }}>
                  {lastSentWaUrl && (
                    <a
                      href={lastSentWaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ed-btn-primary"
                      style={{ background: "#25D366", color: "#ffffff", justifyContent: "center" }}
                    >
                      <MessageCircle size={17} />
                      <span>Open WhatsApp Again</span>
                      <ExternalLink size={14} />
                    </a>
                  )}
                  <button
                    type="button"
                    className="ed-btn-secondary"
                    style={{ justifyContent: "center" }}
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
              <form onSubmit={handleFormSubmit}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "22px", gap: "12px" }}>
                  <div>
                    <h3 style={{ fontSize: "22px", fontWeight: 800, color: "#ffffff", margin: "0 0 4px 0", letterSpacing: "-0.02em" }}>
                      Send Direct Message
                    </h3>
                    <p style={{ color: "#94a3b8", fontSize: "13.5px", margin: 0 }}>
                      Formats your inquiry as a WhatsApp template and connects to Rishabh&apos;s phone.
                    </p>
                  </div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 10px", borderRadius: "9999px", background: "rgba(37, 211, 102, 0.12)", border: "1px solid rgba(37, 211, 102, 0.3)", color: "#25D366", fontSize: "12px", fontWeight: 700, whiteSpace: "nowrap" }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#25D366" }} />
                    <span>WhatsApp</span>
                  </div>
                </div>

                <div className="ed-form-group">
                  <label htmlFor="ct-name" className="ed-label">Name</label>
                  <input
                    id="ct-name"
                    type="text"
                    required
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="ed-input"
                  />
                </div>

                <div className="ed-form-group">
                  <label htmlFor="ct-email" className="ed-label">Email</label>
                  <input
                    id="ct-email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="ed-input"
                  />
                </div>

                <div className="ed-form-group">
                  <label htmlFor="ct-msg" className="ed-label">Message</label>
                  <textarea
                    id="ct-msg"
                    rows={4}
                    required
                    placeholder="Tell me about the engineering role, team, or project..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="ed-input"
                    style={{ resize: "vertical" }}
                  />
                </div>

                {/* Live WhatsApp Message Preview */}
                <div style={{ margin: "18px 0 24px", background: "rgba(0, 0, 0, 0.4)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "8px", overflow: "hidden" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 14px", background: "rgba(255, 255, 255, 0.03)", borderBottom: "1px solid rgba(255, 255, 255, 0.06)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11.5px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase" }}>
                      <MessageCircle size={13} color="#25D366" />
                      <span>WhatsApp Template Preview</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(getWhatsAppMessageTemplate(formData.name, formData.email, formData.message), "wa_tpl")}
                      style={{ background: "transparent", border: "1px solid rgba(255, 255, 255, 0.12)", padding: "3px 8px", borderRadius: "5px", fontSize: "11px", color: "#cbd5e1", cursor: "pointer" }}
                    >
                      {copiedField === "wa_tpl" ? "Copied" : "Copy Template"}
                    </button>
                  </div>
                  <pre style={{ margin: 0, padding: "12px 14px", fontFamily: "monospace", fontSize: "11.5px", color: "#cbd5e1", lineHeight: 1.55, whiteSpace: "pre-wrap", maxHeight: "150px", overflowY: "auto" }}>
                    {getWhatsAppMessageTemplate(formData.name, formData.email, formData.message)}
                  </pre>
                </div>

                <button
                  type="submit"
                  className="ed-btn-primary"
                  style={{ width: "100%", justifyContent: "center", background: "#25D366", color: "#ffffff" }}
                  disabled={formStatus === "submitting"}
                >
                  <MessageCircle size={17} />
                  <span>{formStatus === "submitting" ? "Opening WhatsApp…" : "Send via WhatsApp"}</span>
                  <Send size={14} />
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
