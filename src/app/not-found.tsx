import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <section
      className="section"
      style={{
        backgroundColor: '#ffffff',
        minHeight: '75vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className="container" style={{ textAlign: 'center', maxWidth: '600px' }}>
        <h1
          style={{
            fontSize: '96px',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #00b5f5, #002a8f)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1,
            marginBottom: '20px',
          }}
        >
          404
        </h1>
        <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>
          Page Not Found
        </h2>
        <p style={{ fontSize: '16px', color: '#64748b', marginBottom: '32px' }}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
          <Link href="/" className="btn btn-primary">
            <Home size={18} />
            <span>Go to Homepage</span>
          </Link>
          <Link href="/projects" className="btn btn-outline">
            <ArrowLeft size={18} />
            <span>Explore Projects</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
