"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { loadFridgeData, FridgeItem } from '../lib/fridge-logic';
import { loadFamilyData, FamilyMember } from '../lib/family-logic';
import { parseQuantity } from '../lib/quantity-logic';
import { loadWeeklyPlan, WeeklyPlan, DayOfWeek, DAYS_JP, loadPlannerSettings, DayPlan } from '../lib/planner-logic';

const DAY_ORDER: DayOfWeek[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

export default function ShoppingListPage() {
  const [family, setFamily] = useState<FamilyMember[]>([]);
  const [fridgeItems, setFridgeItems] = useState<FridgeItem[]>([]);
  const [weeklyPlan, setWeeklyPlan] = useState<WeeklyPlan>({});
  const [shoppingDays, setShoppingDays] = useState<DayOfWeek[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setFamily(loadFamilyData());
    setFridgeItems(loadFridgeData());
    setWeeklyPlan(loadWeeklyPlan());
    setShoppingDays(loadPlannerSettings().shoppingDays);
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return <div className="container p-8">読み込み中...</div>;

  // 買い物リストの計算 (MenuPageから移植し、複数スロットに対応)
  const calculateShoppingList = () => {
    const needed: Record<string, { amount: number, unit: string }> = {};
    const personCount = family.length || 1;

    // 1. 次回の買い物日を特定
    const todayIdx = new Date().getDay();
    let nextShoppingIdx = -1;
    for (let i = 0; i < 7; i++) {
      const checkIdx = (todayIdx + i) % 7;
      if (shoppingDays.includes(DAY_ORDER[checkIdx])) {
        nextShoppingIdx = checkIdx;
        break;
      }
    }

    if (nextShoppingIdx === -1) return { toBuy: [], targetDays: [] };

    // 2. その次の買い物日を特定
    let nextNextShoppingIdx = -1;
    for (let i = 1; i <= 7; i++) {
      const checkIdx = (nextShoppingIdx + i) % 7;
      if (shoppingDays.includes(DAY_ORDER[checkIdx])) {
        nextNextShoppingIdx = checkIdx;
        break;
      }
    }

    // 3. 対象期間内のレシピを抽出
    const targetDays: DayOfWeek[] = [];
    let currentIdx = nextShoppingIdx;
    while (currentIdx !== nextNextShoppingIdx) {
      targetDays.push(DAY_ORDER[currentIdx]);
      currentIdx = (currentIdx + 1) % 7;
    }

    // AI提案メニューとモックレシピの両方から探す必要があるが、
    // 本来はレシピマスターデータが必要。今回は簡易的にlocalStorageから取得
    const savedMenu = localStorage.getItem('smart-kitchen-suggested-menu');
    const allRecipes = savedMenu ? JSON.parse(savedMenu) : [];
    // モックレシピも統合（本来は共通ライブラリ化すべき）
    const MOCK_RECIPES = [
      { id: 'curry', name: 'ポークカレー', ingredients: [{ name: '豚肉', amountPerPerson: 100, unit: 'g' }, { name: 'キャベツ', amountPerPerson: 50, unit: 'g' }] },
      { id: 'stir-fry', name: '肉野菜炒め', ingredients: [{ name: '豚肉', amountPerPerson: 80, unit: 'g' }, { name: 'キャベツ', amountPerPerson: 100, unit: 'g' }] },
      { id: 'saba-misoni', name: 'さばのみそ煮', ingredients: [{ name: 'さば', amountPerPerson: 1, unit: '切れ' }] },
      { id: 'pasta', name: '和風きのこパスタ', ingredients: [{ name: 'パスタ', amountPerPerson: 100, unit: 'g' }, { name: 'しめじ', amountPerPerson: 50, unit: 'g' }] },
    ];
    const masterRecipes = [...allRecipes, ...MOCK_RECIPES];

    targetDays.forEach(day => {
      const dayPlan = weeklyPlan[day] || {};
      ['main', 'side', 'soup'].forEach(slot => {
        const recipeId = (dayPlan as any)[slot];
        if (!recipeId) return;
        const recipe = masterRecipes.find(r => r.id === recipeId);
        if (!recipe) return;

        recipe.ingredients.forEach((ing: any) => {
          if (!needed[ing.name]) {
            needed[ing.name] = { amount: 0, unit: ing.unit };
          }
          needed[ing.name].amount += ing.amountPerPerson * personCount;
        });
      });
    });

    // 4. 在庫を差し引く
    const toBuy: { name: string, amount: number, unit: string }[] = [];
    Object.entries(needed).forEach(([name, req]) => {
      const stockItem = fridgeItems.find(item => item.name.includes(name));
      let stockValue = 0;
      if (stockItem) {
        const { value } = parseQuantity(stockItem.quantity);
        stockValue = value;
      }

      if (req.amount > stockValue) {
        toBuy.push({ 
          name, 
          amount: Math.round((req.amount - stockValue) * 10) / 10, 
          unit: req.unit 
        });
      }
    });

    return { toBuy, targetDays };
  };

  const { toBuy: shoppingList, targetDays } = calculateShoppingList();

  return (
    <main className="container min-h-screen" style={{ paddingBottom: '5rem' }}>
      <header style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2rem', color: '#fff', marginBottom: '0.5rem' }}>🛒 買い物リスト</h1>
        <p className="text-muted">
          {targetDays.length > 0 
            ? `${DAYS_JP[targetDays[0]]}から${DAYS_JP[DAY_ORDER[(DAY_ORDER.indexOf(targetDays[targetDays.length - 1]) + 1) % 7]]}までの献立に必要な材料です。`
            : '献立を登録すると、不足分がここに表示されます。'}
        </p>
      </header>

      <div className="responsive-grid-800">
        <div className="glass-card" style={{ padding: '2rem' }}>
          {shoppingList.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>✨</div>
              <h2 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '1rem' }}>リストは空です</h2>
              <p style={{ color: '#64748b' }}>全ての材料が冷蔵庫に揃っているか、まだ献立が登録されていません。</p>
              <Link href="/recipe-app/menu" className="btn-primary" style={{ display: 'inline-block', marginTop: '2rem', padding: '0.8rem 2rem', textDecoration: 'none' }}>
                献立を立てる
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {shoppingList.map(item => (
                <div key={item.name} style={{ 
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                  padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px',
                  borderLeft: '4px solid var(--recipe-primary)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <input type="checkbox" style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
                    <span style={{ fontSize: '1.1rem', color: '#fff' }}>{item.name}</span>
                  </div>
                  <span style={{ fontWeight: 'bold', color: 'var(--recipe-primary)', fontSize: '1.1rem' }}>
                    {item.amount}{item.unit}
                  </span>
                </div>
              ))}
              
              <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                <button 
                  className="btn-primary" 
                  style={{ flex: 1, padding: '1rem' }}
                  onClick={() => alert('LINEに送信しました（モック）')}
                >
                  📱 LINEに送る
                </button>
                <button 
                  style={{ flex: 1, padding: '1rem', background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  onClick={() => window.print()}
                >
                  🖨️ 印刷する
                </button>
              </div>
            </div>
          )}
        </div>

        <aside>
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '1.5rem', color: '#94a3b8' }}>対象期間の献立</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {targetDays.map(day => (
                <div key={day} style={{ fontSize: '0.85rem', color: '#cbd5e1', padding: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ fontWeight: 'bold', color: 'var(--recipe-primary)', marginRight: '0.5rem' }}>{DAYS_JP[day]}</span>
                  {Object.values(weeklyPlan[day] || {}).filter(Boolean).length > 0 
                    ? Object.values(weeklyPlan[day] || {}).filter(Boolean).join(', ')
                    : '未設定'}
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
