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
    { name: '買い物リスト', href: '/recipe-app/shopping-list', icon: '🛒' },
  ];

  if (!mounted) return (
    <header style={{ padding: '1rem 2rem', height: '60px', background: 'rgba(10, 12, 16, 0.8)' }} />
  );

  return (
    <header style={{ 
      padding: '1rem 2rem', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      marginBottom: '2rem',
      position: 'sticky',
      top: 0,
      background: 'rgba(10, 12, 16, 0.8)',
      backdropFilter: 'blur(12px)',
      zIndex: 100
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <Link href="/" style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--recipe-primary)', textDecoration: 'none' }}>
          Smart Kitchen
        </Link>
        <nav style={{ display: 'flex', gap: '1.5rem' }}>
          {navItems.map(item => (
            <Link 
              key={item.href} 
              href={item.href}
              style={{ 
                color: pathname === item.href ? '#fff' : '#94a3b8', 
                textDecoration: 'none',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontWeight: pathname === item.href ? '600' : '400'
              }}
            >
              <span>{item.icon}</span> {item.name}
            </Link>
          ))}
        </nav>
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link 
          href="/nutri-vision" 
          className="glass-card" 
          style={{ 
            padding: '0.5rem 1rem', 
            fontSize: '0.8rem', 
            background: 'rgba(16, 185, 129, 0.1)', 
            borderColor: 'rgba(16, 185, 129, 0.3)',
            color: '#10b981',
            textDecoration: 'none'
          }}
        >
          🥗 Nutri-Visionへ
        </Link>
      </div>
    </header>
  );
}
