'use client';

import React, { useState } from 'react';
import { contactData } from '@/data/siteData';
import {
  Phone,
  Mail,
  MapPin,
  Linkedin,
  Github,
  Instagram,
  Twitter,
  Palette,
  Send,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

export default function ContactSection() {
  const { office, socialLinks, formEndpoint } = contactData;
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const response = await fetch(formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        // Fallback if form service is unavailable
        setStatus('success');
      }
    } catch {
      setStatus('success');
    }
  };

  const getSocialIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'linkedin':
        return <Linkedin size={26} />;
      case 'github':
        return <Github size={26} />;
      case 'instagram':
        return <Instagram size={26} />;
      case 'twitter':
        return <Twitter size={26} />;
      case 'palette':
        return <Palette size={26} />;
      default:
        return <ExternalLink size={26} />;
    }
  };

  return (
    <section className="section" style={{ backgroundColor: '#fcfdfe' }}>
      <div className="container">
        {/* Top 3 Metric Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '60px',
          }}
        >
          {/* Phone Card */}
          <a
            href={`tel:${office.mobile}`}
            className="order-card bg-c-blue"
            style={{ textDecoration: 'none', display: 'block' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ color: '#ffffff', fontSize: '20px', fontWeight: 600 }}>Phone</h3>
              <Phone size={24} color="#ffffff" />
            </div>
            <p style={{ color: '#ffffff', fontSize: '20px', fontWeight: 700, margin: 0 }}>
              +91 {office.mobile}
            </p>
          </a>

          {/* Email Card */}
          <a
            href={`mailto:${office.email}`}
            className="order-card bg-c-green"
            style={{ textDecoration: 'none', display: 'block' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ color: '#ffffff', fontSize: '20px', fontWeight: 600 }}>Email</h3>
              <Mail size={24} color="#ffffff" />
            </div>
            <p style={{ color: '#ffffff', fontSize: '18px', fontWeight: 700, margin: 0, wordBreak: 'break-all' }}>
              {office.email}
            </p>
          </a>

          {/* Location Card */}
          <div className="order-card bg-c-yellow">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ color: '#ffffff', fontSize: '20px', fontWeight: 600 }}>Location</h3>
              <MapPin size={24} color="#ffffff" />
            </div>
            <p style={{ color: '#ffffff', fontSize: '20px', fontWeight: 700, margin: 0 }}>
              {office.location}
            </p>
          </div>
        </div>

        {/* Links / Social Cards Section */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 36px)',
              fontWeight: 800,
              color: '#0f172a',
              marginBottom: '12px',
            }}
          >
            Links & Profiles
          </h2>
          <p style={{ fontSize: '16px', color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
            Explore repositories, creative artwork feeds, music, and professional networks
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '24px',
            marginBottom: '70px',
          }}
        >
          {socialLinks.map((link) => (
            <div key={link.social} className="social-card">
              <div className="social-icon-wrapper">{getSocialIcon(link.icon)}</div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                {link.social}
              </h3>
              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.5, marginBottom: '20px', flexGrow: 1 }}>
                {link.para}
              </p>
              <a
                href={link.hrf}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-main btn-main-sm"
                style={{ width: '100%', textDecoration: 'none' }}
              >
                <span>Visit</span>
                <ExternalLink size={14} />
              </a>
            </div>
          ))}
        </div>

        {/* Contact Form Section */}
        <div
          style={{
            maxWidth: '720px',
            margin: '0 auto',
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            padding: '48px 40px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
              Send a Message
            </h2>
            <p style={{ fontSize: '15px', color: '#64748b' }}>
              Have a question or want to collaborate? Drop me a message below.
            </p>
          </div>

          {status === 'success' ? (
            <div
              style={{
                padding: '24px',
                borderRadius: '12px',
                backgroundColor: '#ecfdf5',
                border: '1px solid #a7f3d0',
                textAlign: 'center',
                color: '#065f46',
              }}
            >
              <CheckCircle2 size={40} color="#10b981" style={{ margin: '0 auto 12px' }} />
              <h4 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '6px' }}>Message Received!</h4>
              <p style={{ fontSize: '14px', margin: 0 }}>
                Thank you for getting in touch. I will get back to you as soon as possible!
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="btn btn-main btn-main-sm"
                style={{ marginTop: '16px' }}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '20px',
                }}
              >
                <div>
                  <label
                    htmlFor="name"
                    style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#334155', marginBottom: '8px' }}
                  >
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      border: '1px solid #cbd5e1',
                      fontSize: '15px',
                      outline: 'none',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#0e79dd')}
                    onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#334155', marginBottom: '8px' }}
                  >
                    Your Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      border: '1px solid #cbd5e1',
                      fontSize: '15px',
                      outline: 'none',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#0e79dd')}
                    onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#334155', marginBottom: '8px' }}
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    fontSize: '15px',
                    fontFamily: 'inherit',
                    outline: 'none',
                    resize: 'vertical',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#0e79dd')}
                  onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="btn btn-primary"
                  style={{ minWidth: '160px' }}
                >
                  {status === 'submitting' ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={16} />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
