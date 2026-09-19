import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Keith Hopkins — Commercial Operations, Risk Assessment & Strategic Consulting';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #120709 0%, #190a0c 50%, #221013 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
          padding: '60px',
        }}
      >
        {/* Subtle decorative glow */}
        <div
          style={{
            position: 'absolute',
            top: '50px',
            right: '150px',
            width: '350px',
            height: '350px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(231, 189, 68, 0.18), transparent 70%)',
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(231, 189, 68, 0.12)',
            border: '1px solid rgba(231, 189, 68, 0.4)',
            borderRadius: '9999px',
            padding: '8px 20px',
            fontSize: '18px',
            fontWeight: 700,
            color: '#e7bd44',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '28px',
          }}
        >
          Commercial · Risk · Strategy
        </div>

        {/* Brand Headline */}
        <div
          style={{
            fontSize: '68px',
            fontWeight: 800,
            color: '#ffffff',
            letterSpacing: '-0.02em',
            textAlign: 'center',
            lineHeight: 1.1,
            maxWidth: '1000px',
          }}
        >
          Keith Hopkins
        </div>

        {/* Gold Tagline */}
        <div
          style={{
            fontSize: '32px',
            fontWeight: 600,
            color: '#e7bd44',
            textAlign: 'center',
            marginTop: '20px',
            maxWidth: '850px',
            lineHeight: 1.3,
          }}
        >
          Commercial Operations, Risk Assessment &amp; Strategic Consulting
        </div>

        {/* Bottom Metrics Pill */}
        <div
          style={{
            display: 'flex',
            gap: '36px',
            marginTop: '44px',
            padding: '14px 32px',
            background: 'rgba(15, 22, 41, 0.8)',
            border: '1px solid rgba(231, 189, 68, 0.2)',
            borderRadius: '16px',
            color: '#d1d5db',
            fontSize: '16px',
          }}
        >
          <span>⭐ 15+ Years Experience</span>
          <span>•</span>
          <span>💼 10+ Enterprise Ventures</span>
          <span>•</span>
          <span>🏆 5/5 Client Satisfaction</span>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
