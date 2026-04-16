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
  const [isLocked, setIsLocked] = useState(true); // 誤操作防止用のロック状態
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
    if (!isReady || !scrollRef.current || isLocked) return;
    
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
          overflowY: isLocked ? 'hidden' : 'auto', 
          scrollSnapType: 'y mandatory',
          background: 'rgba(255, 255, 255, 0.05)', // 背景を少し明るくして視認性アップ
          borderRadius: '12px',
          border: '1px solid rgba(255,255,255,0.1)',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          cursor: isLocked ? 'pointer' : 'default'
        }}
        ref={scrollRef}
        onScroll={handleScroll}
        onClick={() => isLocked && setIsLocked(false)}
        className="hide-scrollbar"
      >
        {/* Lock Overlay */}
        {isLocked && (
          <div style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            background: 'rgba(10, 15, 28, 0.6)', backdropFilter: 'blur(2px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 10, borderRadius: '12px'
          }}>
            <div style={{ background: 'var(--primary)', color: 'white', padding: '0.4rem 0.8rem', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 'bold' }}>
              タップして開始
            </div>
          </div>
        )}

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
              color: value === item ? 'white' : '#475569', // 選択時の色を白にしてコントラスト強化
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
          borderTop: '2px solid var(--primary)', // 枠を太くして強調
          borderBottom: '2px solid var(--primary)',
          background: 'rgba(16, 185, 129, 0.15)',
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
