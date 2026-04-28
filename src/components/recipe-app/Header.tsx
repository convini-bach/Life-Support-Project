"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function RecipeAppHeader() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // ハイドレーションエラー防止
  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { name: '冷蔵庫', href: '/recipe-app/fridge', icon: '🧊' },
    { name: '家族設定', href: '/recipe-app/settings', icon: '👤' },
    { name: '献立', href: '/recipe-app/menu', icon: '📅' },
    { name: '今日のレシピ', href: '/recipe-app/recipe', icon: '🍳' },
    { name: '買い物リスト', href: '/recipe-app/shopping-list', icon: '🛒' },
  ];

  return (
    <header style={{ 
      padding: '1rem', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.8rem',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      position: 'sticky',
      top: 0,
      background: '#0a0c10',
      backdropFilter: 'blur(12px)',
      zIndex: 1000,
      boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
      width: '100%'
    }}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
        <Link href="/" style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#fff', textDecoration: 'none', letterSpacing: '-0.02em' }}>
          Smart Kitchen
        </Link>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Link 
            href="/nutri-vision" 
            className="glass-card" 
            style={{ 
              padding: '0.4rem 0.8rem', 
              fontSize: '0.75rem', 
              background: 'rgba(16, 185, 129, 0.1)', 
              borderColor: 'rgba(16, 185, 129, 0.3)',
              color: '#10b981',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: '600'
            }}
          >
            🥗 AI解析へ
          </Link>
        </div>
      </div>

      <nav className="hide-scrollbar" style={{ 
        display: 'flex', 
        gap: '1rem', 
        width: '100%', 
        maxWidth: '1200px',
        margin: '0 auto',
        overflowX: 'auto', 
        paddingBottom: '0.2rem',
        WebkitOverflowScrolling: 'touch'
      }}>
        {navItems.map(item => (
          <Link 
            key={item.href} 
            href={item.href}
            style={{ 
              color: (mounted && pathname === item.href) ? '#fff' : '#94a3b8', 
              textDecoration: 'none',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontWeight: (mounted && pathname === item.href) ? '700' : '500',
              whiteSpace: 'nowrap',
              padding: '0.4rem 0.7rem',
              background: (mounted && pathname === item.href) ? 'rgba(74, 222, 128, 0.1)' : 'transparent',
              borderRadius: '8px',
              transition: 'all 0.2s ease'
            }}
          >
            <span style={{ fontSize: '1.1rem' }}>{item.icon}</span> {item.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}
