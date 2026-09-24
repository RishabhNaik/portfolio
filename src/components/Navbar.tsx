'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { siteConfig } from '@/data/siteData';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : '#ffffff',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(226, 232, 240, 0.8)' : '1px solid transparent',
        transition: 'all 0.3s ease',
        boxShadow: isScrolled ? '0 4px 20px -2px rgba(0, 0, 0, 0.05)' : 'none',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px' }}>
        {/* Brand Logo */}
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none',
            color: '#0f172a',
            fontWeight: 700,
            fontSize: '22px',
            letterSpacing: '-0.02em',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              overflow: 'hidden',
              boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#f8fafc',
            }}
          >
            <Image
              src={siteConfig.logo}
              alt={siteConfig.title}
              width={34}
              height={34}
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
          <span>{siteConfig.title}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '8px',
          }}
          className="desktop-nav"
        >
          {siteConfig.navLinks.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                style={{
                  padding: '8px 18px',
                  borderRadius: '9999px',
                  fontSize: '15px',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? '#0e79dd' : '#475569',
                  backgroundColor: isActive ? 'rgba(14, 121, 221, 0.08)' : 'transparent',
                  transition: 'all 0.2s ease',
                  textDecoration: 'none',
                }}
              >
                {item.name}
              </Link>
            );
          })}

          <Link
            href="https://drive.google.com/file/d/1RRsOacEYqRz0nDekhrGLhBBGmVlIoTuC/view"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-main-sm"
            style={{ marginLeft: '12px', textDecoration: 'none' }}
          >
            <span>Resume</span>
            <ArrowUpRight size={16} />
          </Link>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            border: '1px solid #e2e8f0',
            backgroundColor: '#ffffff',
            color: '#1e293b',
            cursor: 'pointer',
          }}
          className="mobile-toggle"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            borderTop: '1px solid #e2e8f0',
            backgroundColor: '#ffffff',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
          }}
          className="mobile-menu"
        >
          {siteConfig.navLinks.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  padding: '12px 16px',
                  borderRadius: '10px',
                  fontSize: '16px',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? '#0e79dd' : '#334155',
                  backgroundColor: isActive ? 'rgba(14, 121, 221, 0.08)' : '#f8fafc',
                  display: 'block',
                  textDecoration: 'none',
                }}
              >
                {item.name}
              </Link>
            );
          })}

          <Link
            href="https://drive.google.com/file/d/1RRsOacEYqRz0nDekhrGLhBBGmVlIoTuC/view"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ marginTop: '8px', justifyContent: 'center', textDecoration: 'none' }}
          >
            <span>View Resume</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      )}

      <style jsx>{`
        @media (min-width: 769px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
          .mobile-menu {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
