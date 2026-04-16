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
  const [isExpanded, setIsExpanded] = useState(false); // タップで展開するためのステート
  const isScrollingRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const itemHeight = 40; // 1項目の高さpx

  useEffect(() => {
    // 展開された時に位置を合わせる
    if (isExpanded) {
      const index = items.indexOf(value);
      if (index !== -1 && scrollRef.current && !isScrollingRef.current) {
        scrollRef.current.scrollTop = index * itemHeight;
      }
    }
  }, [value, items, isExpanded]);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const handleScroll = () => {
    if (!isReady || !scrollRef.current || !isExpanded) return;
    
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
      {label && <label style={{ display: 'block', width: '100%', fontSize: '0.7rem', color: isExpanded ? 'var(--primary)' : '#64748b', marginBottom: '0.4rem', fontWeight: 'bold', textAlign: 'left', paddingLeft: '4px' }}>{label}</label>}
      {/* Collapsed View (数値カード) */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          width: '100%',
          padding: '0.8rem 1rem',
          background: isExpanded ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
          border: '1px solid',
          borderColor: isExpanded ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s',
          marginBottom: isExpanded ? '0.5rem' : '0'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.2rem', width: '100%', justifyContent: 'center' }}>
          <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white' }}>{value}</span>
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{unit}</span>
          <span style={{ marginLeft: 'auto', fontSize: '0.6rem', color: '#475569' }}>{isExpanded ? '▲' : '▼'}</span>
        </div>
      </button>

      {/* Expanded Picker View */}
      {isExpanded && (
        <div 
          style={{ 
            position: 'relative', 
            width: '100%', 
            height: height, 
            overflowY: 'auto', 
            scrollSnapType: 'y mandatory',
            background: 'rgba(10, 15, 28, 0.4)',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.1)',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            animation: 'fadeIn 0.2s ease-out'
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
                color: value === item ? 'white' : '#475569',
                transition: 'all 0.1s',
                opacity: value === item ? 1 : 0.3
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
            borderTop: '2px solid var(--primary)',
            borderBottom: '2px solid var(--primary)',
            background: 'rgba(16, 185, 129, 0.15)',
            pointerEvents: 'none',
            zIndex: 0
          }} />
        </div>
      )}
    </div>
  );
}
