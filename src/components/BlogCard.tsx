'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/data/siteData';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <article
      className="card-base"
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '16px',
        overflow: 'hidden',
        height: '100%',
      }}
    >
      {/* Blog Thumbnail */}
      <Link
        href={`/blog/${post.slug}`}
        style={{
          position: 'relative',
          width: '100%',
          height: '220px',
          backgroundColor: '#e2e8f0',
          overflow: 'hidden',
          display: 'block',
        }}
      >
        {!imageError && post.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.image}
            alt={post.title}
            onError={() => setImageError(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.4s ease',
            }}
            loading="lazy"
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, #00b5f5 0%, #002a8f 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
            }}
          >
            <BookOpen size={48} color="#ffffff" opacity={0.8} />
          </div>
        )}
      </Link>

      {/* Card Body */}
      <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        {/* Meta info (Date + Read time) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            fontSize: '13px',
            color: '#64748b',
            marginBottom: '14px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Calendar size={14} color="#0e79dd" />
            <span>{post.date}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Clock size={14} color="#0e79dd" />
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: '22px',
            fontWeight: 700,
            color: '#0f172a',
            marginBottom: '12px',
            lineHeight: 1.3,
          }}
        >
          <Link
            href={`/blog/${post.slug}`}
            style={{ color: 'inherit', textDecoration: 'none' }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#0e79dd')}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#0f172a')}
          >
            {post.title}
          </Link>
        </h3>

        {/* Summary */}
        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#64748b',
            marginBottom: '24px',
            flexGrow: 1,
          }}
        >
          {post.summary}
        </p>

        {/* Read More Link */}
        <div>
          <Link
            href={`/blog/${post.slug}`}
            className="btn btn-main btn-main-sm"
            style={{ textDecoration: 'none' }}
          >
            <span>Read Article</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </article>
  );
}
