import { Metadata } from 'next';
import { legalData } from '@/data/siteData';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy and data protection terms for Rishabh Naik Portfolio.',
};

export default function PrivacyPolicyPage() {
  const { privacyPolicy } = legalData;

  return (
    <section className="section" style={{ backgroundColor: '#ffffff', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <h1
          style={{
            fontSize: 'clamp(32px, 5vw, 44px)',
            fontWeight: 800,
            color: '#0f172a',
            marginBottom: '12px',
          }}
        >
          {privacyPolicy.title}
        </h1>
        <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '40px' }}>
          Last updated: {privacyPolicy.lastUpdated}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {privacyPolicy.sections.map((sec) => (
            <div key={sec.heading}>
              <h2
                style={{
                  fontSize: '22px',
                  fontWeight: 700,
                  color: '#0f172a',
                  marginBottom: '12px',
                }}
              >
                {sec.heading}
              </h2>
              <p style={{ fontSize: '16px', lineHeight: 1.7, color: '#334155' }}>
                {sec.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
