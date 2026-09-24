'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { homepageData } from '@/data/siteData';
import { ArrowRight, FileText, Sparkles, Palette, Code2 } from 'lucide-react';

export default function Hero() {
  const { banner } = homepageData;

  return (
    <section
      style={{
        position: 'relative',
        background: 'linear-gradient(135deg, #00b5f5 0%, #002a8f 100%)',
        color: '#ffffff',
        overflow: 'hidden',
        padding: '120px 0 130px',
      }}
      className="hero-section"
    >
      {/* Ambient background glow & circles */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          right: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-20%',
          left: '-10%',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 181, 245, 0.4) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div
          style={{
            maxWidth: '850px',
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          {/* Badge Pill */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 20px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '28px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            }}
          >
            <Sparkles size={16} color="#ffeaa7" />
            <span>Digital Artist & Engineer</span>
          </div>

          {/* Heading */}
          <h1
            style={{
              fontSize: 'clamp(42px, 7vw, 68px)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              marginBottom: '20px',
              color: '#ffffff',
              textShadow: '0 2px 10px rgba(0, 42, 143, 0.3)',
            }}
          >
            {banner.title}
          </h1>

          {/* Content Subheading */}
          <p
            style={{
              fontSize: 'clamp(20px, 3.5vw, 28px)',
              fontWeight: 600,
              color: 'rgba(255, 255, 255, 0.95)',
              marginBottom: '16px',
              lineHeight: 1.3,
            }}
          >
            {banner.content}
          </p>

          {/* Detailed Paragraph */}
          <p
            style={{
              fontSize: '17px',
              lineHeight: 1.7,
              color: 'rgba(255, 255, 255, 0.85)',
              maxWidth: '680px',
              margin: '0 auto 40px',
              fontWeight: 400,
            }}
          >
            {banner.subtext}
          </p>

          {/* Action Buttons */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            {banner.button.enable && (
              <a
                href={banner.button.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-hero-white"
              >
                <FileText size={18} />
                <span>{banner.button.label}</span>
              </a>
            )}

            <Link
              href="/gallery"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 30px',
                borderRadius: '9999px',
                fontSize: '15px',
                fontWeight: 600,
                color: '#ffffff',
                border: '2px solid rgba(255, 255, 255, 0.5)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(8px)',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.color = '#002a8f';
                e.currentTarget.style.borderColor = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
              }}
            >
              <Palette size={18} />
              <span>Explore Gallery</span>
            </Link>

            <Link
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 30px',
                borderRadius: '9999px',
                fontSize: '15px',
                fontWeight: 600,
                color: '#ffffff',
                border: '2px solid rgba(255, 255, 255, 0.5)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(8px)',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.color = '#002a8f';
                e.currentTarget.style.borderColor = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
              }}
            >
              <Code2 size={18} />
              <span>Contact Me</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
