import { Metadata } from 'next';
import BlogCard from '@/components/BlogCard';
import { blogPosts } from '@/data/siteData';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Articles, creative workflow journeys, and lessons learned by Rishabh Naik.',
};

export default function BlogPage() {
  return (
    <section className="section" style={{ backgroundColor: '#f8fafc', minHeight: '80vh' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 60px' }}>
          <span
            style={{
              fontSize: '13px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#0e79dd',
              padding: '6px 14px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(14, 121, 221, 0.08)',
              display: 'inline-block',
              marginBottom: '16px',
            }}
          >
            Articles & Thoughts
          </span>
          <h1
            style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 800,
              color: '#0f172a',
              marginBottom: '16px',
              letterSpacing: '-0.02em',
            }}
          >
            Blog
          </h1>
          <p style={{ fontSize: '18px', color: '#64748b' }}>
            Documenting digital art methods, engineering projects, personal reflections, and weekly learnings.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
          }}
        >
          {blogPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
