'use client';

import React from 'react';
import Link from 'next/link';
import { homepageData } from '@/data/siteData';
import { Palette, Globe, Layers, ArrowRight } from 'lucide-react';

export default function Services() {
  const { about_product } = homepageData;

  const getServiceIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Palette size={32} color="#0e79dd" />;
      case 1:
        return <Globe size={32} color="#2ed8b6" />;
      case 2:
        return <Layers size={32} color="#ff9f43" />;
      default:
        return <Palette size={32} color="#0e79dd" />;
    }
  };

  const getIconBackground = (index: number) => {
    switch (index) {
      case 0:
        return 'rgba(14, 121, 221, 0.1)';
      case 1:
        return 'rgba(46, 216, 182, 0.12)';
      case 2:
        return 'rgba(255, 159, 67, 0.12)';
      default:
        return 'rgba(14, 121, 221, 0.1)';
    }
  };

  return (
    <section className="section" style={{ backgroundColor: '#ffffff' }}>
      <div className="container">
        {/* Section Heading */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 60px' }}>
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 800,
              color: '#0f172a',
              marginBottom: '16px',
              letterSpacing: '-0.02em',
            }}
          >
            {about_product.title}
          </h2>
          <p style={{ fontSize: '17px', color: '#64748b' }}>
            {about_product.subtitle}
          </p>
        </div>

        {/* Services 3-Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
          }}
        >
          {about_product.items.map((item, index) => (
            <div
              key={item.title}
              className="card-base"
              style={{
                padding: '40px 32px',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '16px',
                position: 'relative',
              }}
            >
              {/* Top Category Badge & Icon */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '24px',
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '16px',
                    backgroundColor: getIconBackground(index),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {getServiceIcon(index)}
                </div>

                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    padding: '6px 12px',
                    borderRadius: '9999px',
                    backgroundColor: '#f1f5f9',
                    color: '#475569',
                  }}
                >
                  {item.category}
                </span>
              </div>

              {/* Title */}
              <h3
                style={{
                  fontSize: '22px',
                  fontWeight: 700,
                  color: '#0f172a',
                  marginBottom: '14px',
                }}
              >
                {item.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: '15px',
                  lineHeight: 1.7,
                  color: '#64748b',
                  marginBottom: '28px',
                  flexGrow: 1,
                }}
              >
                {item.content}
              </p>

              {/* Button */}
              {item.button.enable && (
                <div>
                  <Link
                    href={item.button.link}
                    className="btn btn-main btn-main-sm"
                    style={{ textDecoration: 'none' }}
                  >
                    <span>{item.button.label}</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
