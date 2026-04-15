"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollPickerProps {
  items: (string | number)[];
  value: string | number;
  onChange: (value: any) => void;
  unit?: string;
  label?: string;
  height?: string;
}

export default function ScrollPicker({ items, value, onChange, unit, label, height = "180px" }: ScrollPickerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const isScrollingRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const itemHeight = 40; // 1項目の高さpx

  useEffect(() => {
    // 外部（プロップス）からvalueが変わった時に位置を合わせる
    // ユーザー自身がスクロール中（isScrollingRef.current === true）なら位置を強制リセットしない
    const index = items.indexOf(value);
    if (index !== -1 && scrollRef.current && !isScrollingRef.current) {
      scrollRef.current.scrollTop = index * itemHeight;
    }
  }, [value, items]);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const handleScroll = () => {
    if (!isReady || !scrollRef.current) return;
    
    isScrollingRef.current = true;

    // スクリプトによる位置補正を一時停止するタイマー
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 150);

    const scrollTop = scrollRef.current.scrollTop;
    const index = Math.round(scrollTop / itemHeight);
    const selectedValue = items[index];
    
    if (selectedValue !== undefined && selectedValue !== value) {
      onChange(selectedValue);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      {label && <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>{label} ({unit})</div>}
      <div 
        style={{ 
          position: 'relative', 
          width: '100%', 
          height: height, 
          overflowY: 'auto', 
          scrollSnapType: 'y mandatory',
          background: 'rgba(0,0,0,0.2)',
          borderRadius: '12px',
          border: '1px solid rgba(255,255,255,0.05)',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
        ref={scrollRef}
        onScroll={handleScroll}
        className="hide-scrollbar"
      >
        {/* スナップを確実に中央に配置するためのパディング */}
        <div style={{ height: (parseInt(height) - itemHeight) / 2 }} />
        
        {items.map((item, idx) => (
          <div 
            key={idx} 
            style={{ 
              height: itemHeight, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              scrollSnapAlign: 'center',
              scrollSnapStop: 'always',
              fontSize: value === item ? '1.2rem' : '0.9rem',
              fontWeight: value === item ? 'bold' : 'normal',
              color: value === item ? 'var(--primary)' : '#475569',
              transition: 'all 0.1s', // 高速なレスポンスのため時間を短縮
              opacity: value === item ? 1 : 0.4
            }}
          >
            {item}
          </div>
        ))}
        
        <div style={{ height: (parseInt(height) - itemHeight) / 2 }} />
        
        {/* Selection Highlight (中央の枠) */}
        <div style={{ 
          position: 'absolute', 
          top: (parseInt(height) - itemHeight) / 2, 
          left: 0, 
          width: '100%', 
          height: itemHeight, 
          borderTop: '1px solid rgba(16, 185, 129, 0.3)',
          borderBottom: '1px solid rgba(16, 185, 129, 0.3)',
          background: 'rgba(16, 185, 129, 0.08)',
          pointerEvents: 'none',
          zIndex: 0
        }} />
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
