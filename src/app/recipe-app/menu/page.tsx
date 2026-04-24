"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { loadFridgeData, saveFridgeData, FridgeItem } from '../lib/fridge-logic';
import { loadFamilyData, FamilyMember } from '../lib/family-logic';
import { subtractQuantity, parseQuantity } from '../lib/quantity-logic';

interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: {
    name: string;
    amountPerPerson: number;
    unit: string;
  }[];
  image: string;
}

const MOCK_RECIPES: Recipe[] = [
  {
    id: 'curry',
    name: '時短！コク旨ポークカレー',
    description: '冷蔵庫の余り野菜をたっぷり使った、家族みんなが喜ぶ定番メニュー。',
    ingredients: [
      { name: '豚肉', amountPerPerson: 100, unit: 'g' },
      { name: 'キャベツ', amountPerPerson: 50, unit: 'g' },
      { name: '玉ねぎ', amountPerPerson: 0.5, unit: '個' },
    ],
    image: '🍛'
  },
  {
    id: 'stir-fry',
    name: 'たっぷり野菜の肉野菜炒め',
    description: '強火でサッと炒めるだけ。AIが推奨する「今日食べるべき野菜」を美味しく摂取。',
    ingredients: [
      { name: '豚肉', amountPerPerson: 80, unit: 'g' },
      { name: 'キャベツ', amountPerPerson: 100, unit: 'g' },
    ],
    image: '🍳'
  }
];

export default function MenuPage() {
  const [family, setFamily] = useState<FamilyMember[]>([]);
  const [fridgeItems, setFridgeItems] = useState<FridgeItem[]>([]);
  const [isApplying, setIsApplying] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setFamily(loadFamilyData());
    setFridgeItems(loadFridgeData());
  }, []);

  const applyRecipe = (recipe: Recipe) => {
    setIsApplying(recipe.id);
    const personCount = family.length || 1; // 家族未設定の場合は1人分
    
    let updatedFridge = [...fridgeItems];
    let logs: string[] = [];

    recipe.ingredients.forEach(ing => {
      // 部分一致で食材を探す（例：「豚肉」が「豚肉（バラ）」にマッチ）
      const itemIndex = updatedFridge.findIndex(item => item.name.includes(ing.name));
      
      if (itemIndex > -1) {
        const item = updatedFridge[itemIndex];
        const newQuantityStr = subtractQuantity(item.quantity, ing.amountPerPerson, personCount);
        
        // ログ記録
        const consumed = ing.amountPerPerson * personCount;
        logs.push(`${ing.name}: ${consumed}${ing.unit} を使用`);

        // 在庫更新
        const { value } = parseQuantity(newQuantityStr);
        if (value <= 0) {
          updatedFridge.splice(itemIndex, 1); // 使い切った
          logs.push(`-> ${ing.name} を使い切りました！`);
        } else {
          updatedFridge[itemIndex] = { ...item, quantity: newQuantityStr };
        }
      } else {
        logs.push(`${ing.name}: 在庫がありません`);
      }
    });

    setFridgeItems(updatedFridge);
    saveFridgeData(updatedFridge);
    setMessage(`${recipe.name} を作りました！\n${logs.join('\n')}`);
    
    setTimeout(() => {
      setIsApplying(null);
    }, 1000);
  };

  return (
    <main className="container min-h-screen" style={{ paddingBottom: '5rem' }}>
      <header style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2rem', color: '#fff', marginBottom: '0.5rem' }}>本日の献立提案</h1>
        <p className="text-muted">家族 {family.length || 1} 人分の必要量を、冷蔵庫の在庫から自動的に計算します。</p>
      </header>

      {message && (
        <div className="glass-card" style={{ 
          padding: '1.5rem', marginBottom: '2rem', borderLeft: '4px solid var(--recipe-primary)',
          background: 'rgba(16, 185, 129, 0.1)', whiteSpace: 'pre-wrap', fontSize: '0.9rem'
        }}>
          {message}
          <button onClick={() => setMessage(null)} style={{ display: 'block', marginTop: '1rem', background: 'none', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '0.3rem 0.8rem', borderRadius: '6px', cursor: 'pointer' }}>閉じる</button>
        </div>
      )}

      <div className="responsive-grid-800">
        <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>AIおすすめレシピ</h2>
          {MOCK_RECIPES.map(recipe => (
            <div key={recipe.id} className="glass-card" style={{ display: 'flex', gap: '1.5rem', padding: '1.5rem', alignItems: 'center' }}>
              <div style={{ fontSize: '3rem', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.03)', borderRadius: '16px' }}>
                {recipe.image}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--recipe-primary)' }}>{recipe.name}</h3>
                <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '1rem' }}>{recipe.description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                  {recipe.ingredients.map(ing => (
                    <span key={ing.name} style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
                      {ing.name} {ing.amountPerPerson}{ing.unit}
                    </span>
                  ))}
                </div>
                <button 
                  onClick={() => applyRecipe(recipe)}
                  disabled={isApplying !== null}
                  className="btn-primary" 
                  style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}
                >
                  {isApplying === recipe.id ? '調理中...' : 'この料理を作る（在庫を減らす）'}
                </button>
              </div>
            </div>
          ))}
        </section>

        <section>
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>🧊</span> 現在の在庫状況
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {fridgeItems.length === 0 ? (
                <p style={{ color: '#475569', fontSize: '0.85rem' }}>冷蔵庫が空です。</p>
              ) : (
                fridgeItems.slice(0, 5).map(item => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', padding: '0.4rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <span>{item.name}</span>
                    <span style={{ fontWeight: 'bold', color: 'var(--recipe-primary)' }}>{item.quantity}</span>
                  </div>
                ))
              )}
              {fridgeItems.length > 5 && <Link href="/recipe-app/fridge" style={{ fontSize: '0.75rem', color: '#10b981', textAlign: 'center', marginTop: '0.5rem' }}>すべて見る &rarr;</Link>}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
