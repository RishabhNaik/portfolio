"use client";

import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Linkedin,
  Github,
  Instagram,
  Twitter,
  Send,
  CheckCircle2,
  Copy,
  Check,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { cinematicAudioHaptics } from "@/utils/cinematicAudioHaptics";
import { contactData } from "@/data/siteData";

export const BentoContact: React.FC = () => {
  const { office, socialLinks, formEndpoint } = contactData;
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, fieldName: string) => {
    cinematicAudioHaptics.playSlateTick();
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    cinematicAudioHaptics.playSlateTick();
    setStatus("submitting");
    try {
      await fetch(formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus("success");
    }
  };

  return (
    <section id="contact" className="bento-section">
      <div className="bento-container">
        {/* Section Header */}
        <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 48px" }}>
          <div className="bento-tag bento-tag-blue" style={{ marginBottom: "12px" }}>
            <Sparkles size={14} />
            <span>Connect & Collaborate</span>
          </div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 700, color: "#ffffff", letterSpacing: "-0.02em", marginBottom: "12px" }}>
            Get In Touch
          </h2>
          <p style={{ fontSize: "16px", color: "#B4C9D4" }}>
            Reach out for digital artwork commissions, video editing projects, web development, or creative collaborations.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="bento-grid">
          {/* Quick Contact Info Block (Span 5 cols) */}
          <div className="bento-card col-span-5" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "20px" }}>
            <div className="crystal-facet" />

            <div>
              <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#ffffff", marginBottom: "16px" }}>
                Direct Channels
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {/* Phone Pill */}
                <div
                  style={{
                    padding: "16px",
                    borderRadius: "14px",
                    background: "linear-gradient(135deg, rgba(25, 121, 209, 0.15), rgba(5, 24, 49, 0.8))",
                    border: "1px solid rgba(81, 171, 219, 0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(81, 171, 219, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#51ABDB" }}>
                      <Phone size={20} />
                    </div>
                    <div>
                      <span style={{ fontSize: "11px", color: "#8AA4B2", textTransform: "uppercase" }}>Phone</span>
                      <p style={{ fontSize: "15px", fontWeight: 700, color: "#ffffff", margin: 0 }}>+91 {office.mobile}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(office.mobile, "phone")}
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      background: "rgba(81, 171, 219, 0.15)",
                      border: "1px solid rgba(81, 171, 219, 0.3)",
                      color: "#51ABDB",
                      cursor: "pointer",
                    }}
                    title="Copy Phone Number"
                  >
                    {copiedField === "phone" ? <Check size={16} color="#2ed8b6" /> : <Copy size={16} />}
                  </button>
                </div>

                {/* Email Pill */}
                <div
                  style={{
                    padding: "16px",
                    borderRadius: "14px",
                    background: "linear-gradient(135deg, rgba(25, 121, 209, 0.15), rgba(5, 24, 49, 0.8))",
                    border: "1px solid rgba(81, 171, 219, 0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: 0 }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(46, 216, 182, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#2ed8b6", flexShrink: 0 }}>
                      <Mail size={20} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <span style={{ fontSize: "11px", color: "#8AA4B2", textTransform: "uppercase" }}>Email</span>
                      <p style={{ fontSize: "14px", fontWeight: 700, color: "#ffffff", margin: 0, wordBreak: "break-all" }}>{office.email}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(office.email, "email")}
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      background: "rgba(81, 171, 219, 0.15)",
                      border: "1px solid rgba(81, 171, 219, 0.3)",
                      color: "#51ABDB",
                      cursor: "pointer",
                      flexShrink: 0,
                    }}
                    title="Copy Email Address"
                  >
                    {copiedField === "email" ? <Check size={16} color="#2ed8b6" /> : <Copy size={16} />}
                  </button>
                </div>

                {/* Location Pill */}
                <div
                  style={{
                    padding: "16px",
                    borderRadius: "14px",
                    background: "linear-gradient(135deg, rgba(25, 121, 209, 0.15), rgba(5, 24, 49, 0.8))",
                    border: "1px solid rgba(81, 171, 219, 0.25)",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(255, 182, 77, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffcb80" }}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span style={{ fontSize: "11px", color: "#8AA4B2", textTransform: "uppercase" }}>Location</span>
                    <p style={{ fontSize: "15px", fontWeight: 700, color: "#ffffff", margin: 0 }}>{office.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Grid Badges */}
            <div>
              <span style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#8AA4B2", display: "block", marginBottom: "10px" }}>
                Social Profiles & Networks
              </span>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px" }}>
                {socialLinks.map((social) => (
                  <a
                    key={social.social}
                    href={social.hrf}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      background: "rgba(19, 56, 101, 0.3)",
                      border: "1px solid rgba(81, 171, 219, 0.2)",
                      color: "#E1ECFB",
                      fontSize: "12px",
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    <span>{social.social}</span>
                    <ExternalLink size={12} color="#51ABDB" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Message Form Block (Span 7 cols) */}
          <div className="bento-card bento-card-highlight col-span-7" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div className="crystal-facet" />

            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <Send size={16} color="#51ABDB" />
                <span style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#51ABDB" }}>
                  Instant Inquiry
                </span>
              </div>
              <h3 style={{ fontSize: "22px", fontWeight: 700, color: "#ffffff", marginBottom: "20px" }}>
                Send a Message
              </h3>

              {status === "success" ? (
                <div
                  style={{
                    padding: "32px",
                    borderRadius: "16px",
                    background: "rgba(46, 216, 182, 0.1)",
                    border: "1px solid rgba(46, 216, 182, 0.3)",
                    textAlign: "center",
                    color: "#2ed8b6",
                  }}
                >
                  <CheckCircle2 size={44} color="#2ed8b6" style={{ margin: "0 auto 12px" }} />
                  <h4 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "6px" }}>Message Sent!</h4>
                  <p style={{ fontSize: "14px", color: "#DFF0FA", margin: 0 }}>
                    Thank you! I will get back to you promptly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="bento-btn-secondary"
                    style={{ marginTop: "16px" }}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                    <div>
                      <label htmlFor="bento-name" style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#8AA4B2", marginBottom: "6px" }}>
                        Your Name
                      </label>
                      <input
                        id="bento-name"
                        type="text"
                        required
                        placeholder="e.g. Alex"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "12px 14px",
                          borderRadius: "10px",
                          background: "rgba(1, 20, 43, 0.6)",
                          border: "1px solid rgba(81, 171, 219, 0.25)",
                          color: "#ffffff",
                          fontSize: "14px",
                          outline: "none",
                        }}
                      />
                    </div>

                    <div>
                      <label htmlFor="bento-email" style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#8AA4B2", marginBottom: "6px" }}>
                        Your Email
                      </label>
                      <input
                        id="bento-email"
                        type="email"
                        required
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "12px 14px",
                          borderRadius: "10px",
                          background: "rgba(1, 20, 43, 0.6)",
                          border: "1px solid rgba(81, 171, 219, 0.25)",
                          color: "#ffffff",
                          fontSize: "14px",
                          outline: "none",
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="bento-msg" style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#8AA4B2", marginBottom: "6px" }}>
                      Project Details / Message
                    </label>
                    <textarea
                      id="bento-msg"
                      rows={4}
                      required
                      placeholder="Tell me about your project, timeline, or artwork inquiry..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "12px 14px",
                        borderRadius: "10px",
                        background: "rgba(1, 20, 43, 0.6)",
                        border: "1px solid rgba(81, 171, 219, 0.25)",
                        color: "#ffffff",
                        fontSize: "14px",
                        fontFamily: "inherit",
                        outline: "none",
                        resize: "vertical",
                      }}
                    />
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "4px" }}>
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="bento-btn-primary"
                      style={{ minWidth: "160px" }}
                    >
                      {status === "submitting" ? (
                        <span>Sending...</span>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send size={15} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
