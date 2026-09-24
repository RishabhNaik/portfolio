import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { blogPosts } from '@/data/siteData';
import { marked } from 'marked';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: post.image ? [{ url: post.image }] : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  // Parse markdown content to clean HTML
  const parsedHtml = await marked.parse(post.content);

  // Other posts for "Read next"
  const otherPosts = blogPosts.filter((p) => p.slug !== post.slug);

  return (
    <article style={{ backgroundColor: '#ffffff', minHeight: '80vh', padding: '60px 0 100px' }}>
      <div className="container" style={{ maxWidth: '840px' }}>
        {/* Back Link */}
        <Link
          href="/blog"
          className="back-link"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            fontWeight: 600,
            color: '#64748b',
            marginBottom: '32px',
            textDecoration: 'none',
          }}
        >
          <ArrowLeft size={16} />
          <span>Back to all posts</span>
        </Link>

        {/* Post Header */}
        <header style={{ marginBottom: '40px' }}>
          <h1
            style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 800,
              color: '#0f172a',
              lineHeight: 1.2,
              marginBottom: '20px',
              letterSpacing: '-0.02em',
            }}
          >
            {post.title}
          </h1>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '20px',
              color: '#64748b',
              fontSize: '14px',
              paddingBottom: '24px',
              borderBottom: '1px solid #e2e8f0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={16} color="#0e79dd" />
              <span>{post.date}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={16} color="#0e79dd" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </header>

        {/* Featured Image if present */}
        {post.image && (
          <div
            style={{
              borderRadius: '16px',
              overflow: 'hidden',
              marginBottom: '48px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
              maxHeight: '480px',
              backgroundColor: '#f8fafc',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.image}
              alt={post.title}
              style={{
                width: '100%',
                height: '100%',
                maxHeight: '480px',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>
        )}

        {/* Main Article Body */}
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: parsedHtml }}
        />

        {/* Post Footer & Other articles */}
        <div
          style={{
            marginTop: '60px',
            paddingTop: '40px',
            borderTop: '1px solid #e2e8f0',
          }}
        >
          <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#0f172a', marginBottom: '24px' }}>
            Read more articles
          </h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
            }}
          >
            {otherPosts.map((other) => (
              <Link
                key={other.slug}
                href={`/blog/${other.slug}`}
                className="related-post-card"
                style={{
                  display: 'block',
                  padding: '20px',
                  borderRadius: '12px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
              >
                <span style={{ fontSize: '12px', color: '#64748b' }}>{other.date}</span>
                <h4
                  style={{
                    fontSize: '17px',
                    fontWeight: 700,
                    color: '#0f172a',
                    marginTop: '6px',
                    marginBottom: '8px',
                  }}
                >
                  {other.title}
                </h4>
                <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
                  {other.summary.slice(0, 100)}...
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .back-link:hover {
          color: #0e79dd !important;
        }
        .related-post-card:hover {
          border-color: #0e79dd !important;
          background-color: #ffffff !important;
          transform: translateY(-2px);
        }
      `}</style>
    </article>
  );
}
