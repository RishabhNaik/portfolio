import { Metadata } from 'next';
import GalleryGrid from '@/components/GalleryGrid';
import { galleryItems } from '@/data/siteData';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Creative artworks, portraits, and Sushiksha scholarship cohort gallery by Rishabh Naik.',
};

export default function GalleryPage() {
  return (
    <section className="section" style={{ backgroundColor: '#ffffff', minHeight: '80vh' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 50px' }}>
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
            Visual Portfolio
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
            Gallery
          </h1>
          <p style={{ fontSize: '18px', color: '#64748b' }}>
            A visual showcase of digital artwork, character illustrations, and Sushiksha cohort portraits.
          </p>
        </div>

        {/* Gallery Grid */}
        <GalleryGrid items={galleryItems} />
      </div>
    </section>
  );
}
