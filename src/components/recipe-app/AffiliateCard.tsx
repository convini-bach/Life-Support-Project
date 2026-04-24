"use client";

import React from 'react';

interface AffiliateCardProps {
  title: string;
  price: string;
  imageUrl: string;
  affiliateUrl: string;
  platform: 'amazon' | 'rakuten';
  label?: string;
}

export default function AffiliateCard({ title, price, imageUrl, affiliateUrl, platform, label }: AffiliateCardProps) {
  return (
    <div className="glass-card" style={{ 
      display: 'flex', 
      padding: '1rem', 
      gap: '1rem', 
      alignItems: 'center',
      border: '1px solid rgba(74, 222, 128, 0.2)',
      background: 'linear-gradient(to right, #ffffff, #f0fdf4)'
    }}>
      <div style={{ width: '80px', height: '80px', flexShrink: 0, borderRadius: '8px', overflow: 'hidden', background: '#f8fafc' }}>
        <img src={imageUrl} alt={title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </div>
      
      <div style={{ flex: 1 }}>
        {label && <span style={{ fontSize: '0.7rem', color: '#15803d', fontWeight: '600', textTransform: 'uppercase' }}>{label}</span>}
        <h4 style={{ fontSize: '0.9rem', margin: '0.2rem 0', color: '#1e293b' }}>{title}</h4>
        <div style={{ fontWeight: '700', color: '#ef4444', marginBottom: '0.5rem' }}>{price}</div>
        
        <a 
          href={affiliateUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn-primary"
          style={{ 
            fontSize: '0.75rem', 
            padding: '0.4rem 0.8rem', 
            display: 'inline-block',
            textDecoration: 'none',
            background: platform === 'amazon' ? '#fbbf24' : '#ef4444' // Amazon Yellow / Rakuten Red
          }}
        >
          {platform === 'amazon' ? 'Amazonで見る' : '楽天で見る'}
        </a>
      </div>
    </div>
  );
}
