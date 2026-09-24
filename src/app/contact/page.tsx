import { Metadata } from 'next';
import ContactSection from '@/components/ContactSection';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Rishabh Naik for digital art, design assets, web development or collaborations.',
};

export default function ContactPage() {
  return (
    <>
      {/* Page Header */}
      <section style={{ backgroundColor: '#ffffff', paddingTop: '60px', paddingBottom: '20px' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '720px' }}>
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
            Get In Touch
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
            Contact
          </h1>
          <p style={{ fontSize: '18px', color: '#64748b' }}>
            Reach out for commissioned artwork, digital illustrations, web development projects, or general inquiries.
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <ContactSection />
    </>
  );
}
