"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { suggestExpiryDate, formatDate, FoodCategory, CATEGORY_MAP, FridgeItem, loadFridgeData, saveFridgeData } from '../lib/fridge-logic';
import AffiliateCard from '@/components/recipe-app/AffiliateCard';

export default function FridgePage() {
  const [items, setItems] = useState<FridgeItem[]>([]);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expiryDate, setExpiryDate] = useState(formatDate(new Date()));
  const [category, setCategory] = useState<FoodCategory>('main');
  const [isBatchAnalyzing, setIsBatchAnalyzing] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // 初回読み込み
  useEffect(() => {
    const data = loadFridgeData();
    if (data.length > 0) {
      setItems(data);
    }
    setIsLoaded(true);
  }, []);

  // 変更時に保存
  useEffect(() => {
    if (isLoaded) {
      saveFridgeData(items);
    }
  }, [items, isLoaded]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    if (val.length >= 2) {
      const suggestion = suggestExpiryDate(val);
      setExpiryDate(formatDate(suggestion.date));
      setCategory(suggestion.category);
    }
  };

  const analyzeAllWithAI = async () => {
    if (items.length === 0 || isBatchAnalyzing) return;
    setIsBatchAnalyzing(true);

    try {
      const res = await fetch('/api/recipe-app/analyze-food', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          foods: items.map(i => ({ id: i.id, name: i.name })) 
        }),
      });
      const results = await res.json();

      if (Array.isArray(results)) {
        const updatedItems = items.map(item => {
          const result = results.find(r => r.id === item.id);
          if (result) {
            const date = new Date();
            date.setDate(date.getDate() + result.days);
            return {
              ...item,
              expiryDate: formatDate(date),
              category: result.category as FoodCategory,
              advice: result.advice,
              isAnalyzed: true
            };
          }
          return item;
        });
        setItems(updatedItems);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsBatchAnalyzing(false);
    }
  };

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    const newItem: FridgeItem = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      quantity,
      expiryDate,
      category,
    };

    setItems([newItem, ...items]);
    setName('');
    setQuantity('');
    setExpiryDate(formatDate(new Date()));
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  // カテゴリごとにグループ化
  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<FoodCategory, FridgeItem[]>);

  return (
    <main className="container min-h-screen" style={{ paddingBottom: '5rem' }}>
      <section className="glass-card" style={{ 
        background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)', 
        borderLeft: '4px solid var(--recipe-primary)',
        marginBottom: '2rem',
        padding: '1.5rem'
      }}>
        <h2 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '0.5rem' }}>✨</span> 冷蔵庫のデトックス
        </h2>
        <p className="text-muted" style={{ fontSize: '0.95rem' }}>
          まずは入力、最後に AI で監修。カテゴリ分けでさらに使いやすく。
        </p>
      </section>

      <div className="responsive-grid-800">
        <section style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>食材を追加する</h3>
            <form onSubmit={addItem} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.4rem' }}>カテゴリ</label>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {(Object.keys(CATEGORY_MAP) as FoodCategory[]).map(key => (
                    <button
                      key={key} type="button"
                      onClick={() => setCategory(key)}
                      style={{
                        padding: '0.5rem 1rem', borderRadius: '12px', border: '1px solid',
                        borderColor: category === key ? CATEGORY_MAP[key].color : 'rgba(148, 163, 184, 0.2)',
                        background: category === key ? `${CATEGORY_MAP[key].color}22` : 'transparent',
                        color: category === key ? CATEGORY_MAP[key].color : '#94a3b8',
                        cursor: 'pointer', fontSize: '0.8rem', flex: '1 1 auto'
                      }}
                    >
                      {CATEGORY_MAP[key].icon} {CATEGORY_MAP[key].label}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.4rem', marginTop: '0.5rem' }}>食材名</label>
                <input 
                  type="text" value={name} onChange={handleNameChange}
                  placeholder="例: 豚肉、キャベツ"
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px' }}
                  required
                />
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.4rem' }}>分量</label>
                  <input 
                    type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)}
                    placeholder="例: 400g、3切れ"
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.4rem' }}>賞味期限</label>
                  <input 
                    type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px' }}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem', padding: '0.75rem', fontWeight: '600' }}>
                冷蔵庫に入れる
              </button>
            </form>
          </div>

          <div className="monetization-section" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontSize: '1rem', color: '#64748b' }}>🛒 今週のストック推奨</h3>
            <AffiliateCard 
              title="明治 北海道十勝カマンベールチーズ 100g×3個"
              price="￥1,458"
              imageUrl="https://m.media-amazon.com/images/I/71uV6W6nC2L._AC_SL1500_.jpg"
              affiliateUrl="https://amzn.to/3Q..."
              platform="amazon"
              label="おつまみ・副菜に"
            />
          </div>
        </section>

        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem' }}>冷蔵庫の中身 ({items.length})</h3>
            {items.length > 0 && (
              <button 
                onClick={analyzeAllWithAI}
                disabled={isBatchAnalyzing}
                style={{ 
                  background: isBatchAnalyzing ? 'rgba(255,255,255,0.05)' : 'var(--recipe-primary)',
                  color: isBatchAnalyzing ? '#475569' : '#000',
                  border: 'none', padding: '0.5rem 1rem', borderRadius: '12px',
                  fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer'
                }}
              >
                {isBatchAnalyzing ? '⌛ AIが全体を監修中...' : '✨ まとめてAI判別'}
              </button>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {items.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--recipe-muted)', border: '2px dashed rgba(255,255,255,0.1)', borderRadius: '16px' }}>
                冷蔵庫はまだ空っぽです。
              </div>
            ) : (
              (Object.keys(CATEGORY_MAP) as FoodCategory[]).map(catKey => {
                const catItems = groupedItems[catKey] || [];
                if (catItems.length === 0) return null;
                
                return (
                  <div key={catKey}>
                    <h4 style={{ fontSize: '0.9rem', color: CATEGORY_MAP[catKey].color, marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {CATEGORY_MAP[catKey].icon} {CATEGORY_MAP[catKey].label} ({catItems.length})
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                      {catItems.sort((a, b) => a.expiryDate.localeCompare(b.expiryDate)).map(item => (
                        <div key={item.id} className="glass-card" style={{ 
                          display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem',
                          borderLeft: item.isAnalyzed ? `4px solid ${CATEGORY_MAP[item.category].color}` : '1px solid rgba(148, 163, 184, 0.1)'
                        }}>
                          <div>
                            <div style={{ fontWeight: '600', color: '#fff' }}>
                              {item.name} {item.isAnalyzed && <span style={{ fontSize: '0.7rem' }}>✅</span>}
                            </div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--recipe-muted)' }}>
                              {item.quantity} · <span style={{ color: new Date(item.expiryDate) < new Date() ? '#f87171' : CATEGORY_MAP[item.category].color }}>
                                期限: {item.expiryDate}
                              </span>
                            </div>
                            {item.advice && <div style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.5)', marginTop: '0.2rem' }}>💡 {item.advice}</div>}
                          </div>
                          <button onClick={() => removeItem(item.id)} style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer' }}>×</button>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
