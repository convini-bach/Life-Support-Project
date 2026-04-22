"use client";

import { RecommendationItem } from "@/lib/recommendation";

interface AffiliateCardProps {
  item: RecommendationItem;
  label?: string;
}

export default function AffiliateCard({ item, label }: AffiliateCardProps) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(16, 185, 129, 0.2)',
      borderRadius: '20px',
      overflow: 'hidden',
      marginTop: '2rem',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '1.2rem',
      padding: '1.2rem',
      position: 'relative',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
    }}>
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        right: 0, 
        background: 'linear-gradient(90deg, var(--primary), #059669)', 
        color: 'white', 
        fontSize: '0.65rem', 
        padding: '0.25rem 0.75rem', 
        borderBottomLeftRadius: '12px', 
        fontWeight: 'bold',
        letterSpacing: '0.05em'
      }}>
        {label || "Recommended"}
      </div>
      <div style={{ 
        flexShrink: 0, 
        width: '110px', 
        height: '110px', 
        borderRadius: '14px', 
        overflow: 'hidden', 
        background: '#fff',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={item.imageUrl} 
          alt={item.title} 
          style={{ width: '90%', height: '90%', objectFit: 'contain' }} 
        />
      </div>
      <div style={{ flex: 1 }}>
        <h4 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.4rem', color: 'white' }}>{item.title}</h4>
        <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.8rem', lineHeight: '1.5' }}>{item.description}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--primary)' }}>{item.price}</span>
          <a
            href={item.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '0.5rem 1.2rem',
              background: 'white',
              color: '#0f172a',
              borderRadius: '25px',
              fontSize: '0.8rem',
              fontWeight: 'bold',
              textDecoration: 'none',
              boxShadow: '0 4px 12px rgba(255,255,255,0.2)',
              transition: 'transform 0.2s'
            }}
          >
            Amazonで見る
          </a>
        </div>
      </div>
    </div>
  );
}
