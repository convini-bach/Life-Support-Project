"use client";

import { RecommendationItem } from "@/lib/recommendation";

export default function AffiliateCard({ item }: { item: RecommendationItem }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(16, 185, 129, 0.2)',
      borderRadius: '16px',
      overflow: 'hidden',
      marginTop: '2rem',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '1rem',
      padding: '1rem',
      position: 'relative'
    }}>
      <div style={{ position: 'absolute', top: 0, right: 0, background: 'rgba(16, 185, 129, 0.2)', color: 'var(--primary)', fontSize: '0.65rem', padding: '0.2rem 0.5rem', borderBottomLeftRadius: '8px', fontWeight: 'bold' }}>
        Sponsored
      </div>
      <div style={{ flexShrink: 0, width: '100px', height: '100px', borderRadius: '12px', overflow: 'hidden', background: '#0f172a' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div style={{ flex: 1 }}>
        <h4 style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '0.3rem', color: 'white' }}>{item.title}</h4>
        <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem', lineHeight: '1.4' }}>{item.description}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--accent)' }}>{item.price}</span>
          <a
            href={item.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '0.4rem 1rem',
              background: 'linear-gradient(135deg, var(--primary), #059669)',
              color: 'white',
              borderRadius: '20px',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              textDecoration: 'none',
              boxShadow: '0 4px 10px rgba(16, 185, 129, 0.3)'
            }}
          >
            Amazonで見る
          </a>
        </div>
      </div>
    </div>
  );
}
