'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/data/siteData';
import { Instagram, Twitter, Linkedin, Heart } from 'lucide-react';

export default function Footer() {
  const renderSocialIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'instagram':
        return <Instagram size={20} />;
      case 'twitter':
        return <Twitter size={20} />;
      case 'linkedin':
        return <Linkedin size={20} />;
      default:
        return null;
    }
  };

  return (
    <footer
      style={{
        backgroundColor: '#f1f5f9',
        borderTop: '1px solid #e2e8f0',
        padding: '60px 0 40px',
        marginTop: 'auto',
      }}
    >
      <div className="container" style={{ textAlign: 'center' }}>
        {/* Brand Logo & Name */}
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '20px',
            textDecoration: 'none',
            color: '#0f172a',
            fontWeight: 700,
            fontSize: '20px',
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              position: 'relative',
              borderRadius: '8px',
              overflow: 'hidden',
              background: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              src={siteConfig.logo}
              alt={siteConfig.title}
              width={28}
              height={28}
              style={{ objectFit: 'contain' }}
            />
          </div>
          <span>{siteConfig.title}</span>
        </Link>

        {/* Footer Navigation Links */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '24px',
            marginBottom: '28px',
          }}
        >
          {siteConfig.footerLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              style={{
                fontSize: '15px',
                color: '#64748b',
                fontWeight: 500,
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#0e79dd')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#64748b')}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Social Icons with Gradient Style */}
        <div className="footer-social-icons">
          {siteConfig.socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label={social.name}
            >
              {renderSocialIcon(social.name)}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div
          style={{
            marginTop: '28px',
            paddingTop: '24px',
            borderTop: '1px solid #e2e8f0',
            fontSize: '14px',
            color: '#94a3b8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
          }}
        >
          <span>{siteConfig.copyright}</span>
          <span>•</span>
          <span>Crafted with</span>
          <Heart size={14} color="#ef4444" fill="#ef4444" />
        </div>
      </div>
    </footer>
  );
}
