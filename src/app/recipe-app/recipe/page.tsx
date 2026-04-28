"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { loadWeeklyPlan, DayOfWeek, DAYS_JP, DayPlan } from '../lib/planner-logic';
import { loadFamilyData, FamilyMember } from '../lib/family-logic';
import { MOCK_RECIPES, Recipe } from '../lib/recipes';

const DAY_ORDER: DayOfWeek[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

function RecipeContent() {
  const searchParams = useSearchParams();
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>('mon');
  const [family, setFamily] = useState<FamilyMember[]>([]);
  const [weeklyPlan, setWeeklyPlan] = useState<any>({});
  const [allRecipes, setAllRecipes] = useState<Recipe[]>(MOCK_RECIPES);
  const [activeSlot, setActiveSlot] = useState<string>('main');

  useEffect(() => {
    // 今日の曜日を取得
    const today = new Date().getDay();
    const dayFromQuery = searchParams.get('day') as DayOfWeek;
    setSelectedDay(dayFromQuery || DAY_ORDER[today]);

    setFamily(loadFamilyData());
    setWeeklyPlan(loadWeeklyPlan());

    const savedCustom = localStorage.getItem('smart-kitchen-suggested-menu');
    if (savedCustom) {
      setAllRecipes([...MOCK_RECIPES, ...JSON.parse(savedCustom)]);
    }
  }, [searchParams]);

  const currentDayPlan = weeklyPlan[selectedDay] || {};
  const slots = ['main', 'side1', 'side2', 'side3', 'soup'];
  const activeRecipeId = currentDayPlan[activeSlot];
  const activeRecipe = allRecipes.find(r => r.id === activeRecipeId);

  const SLOT_JP: Record<string, string> = {
    main: '主菜', side1: '副菜1', side2: '副菜2', side3: '副菜3', soup: '汁物'
  };

  return (
    <main className="container" style={{ paddingBottom: '5rem' }}>
      <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', color: '#fff', marginBottom: '0.5rem' }}>🍳 調理モード</h1>
          <p className="text-muted">{DAYS_JP[selectedDay]}曜日の献立を表示中</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem', maxWidth: '100%' }}>
          {DAY_ORDER.map(day => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.8rem',
                background: selectedDay === day ? 'var(--recipe-primary)' : 'rgba(255,255,255,0.05)',
                color: selectedDay === day ? '#000' : '#fff',
                border: 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {DAYS_JP[day]}
            </button>
          ))}
        </div>
      </header>

      {/* スロット選択タブ */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
        {slots.map(slot => {
          const recipeId = currentDayPlan[slot];
          const recipe = allRecipes.find(r => r.id === recipeId);
          if (!recipeId && slot !== 'main') return null;

          return (
            <button
              key={slot}
              onClick={() => setActiveSlot(slot)}
              style={{
                padding: '0.8rem 1.5rem',
                borderRadius: '12px',
                background: activeSlot === slot ? 'rgba(74, 222, 128, 0.1)' : 'rgba(255,255,255,0.02)',
                border: activeSlot === slot ? '2px solid var(--recipe-primary)' : '1px solid rgba(255,255,255,0.05)',
                color: activeSlot === slot ? 'var(--recipe-primary)' : '#94a3b8',
                cursor: 'pointer',
                textAlign: 'left',
                minWidth: '140px',
                flex: '0 0 auto'
              }}
            >
              <div style={{ fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '0.2rem' }}>{SLOT_JP[slot]}</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: recipe ? '#fff' : '#475569' }}>
                {recipe ? recipe.name : '未設定'}
              </div>
            </button>
          );
        })}
      </div>

      {activeRecipe ? (
        <div className="animate-fade-in" key={activeRecipe.id}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {/* 左カラム: 情報と材料 */}
            <div>
              <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{activeRecipe.image}</div>
                <h2 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '1rem' }}>{activeRecipe.name}</h2>
                <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: '1.6' }}>{activeRecipe.description}</p>
                {activeRecipe.url && (
                  <a 
                    href={activeRecipe.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-primary" 
                    style={{ display: 'inline-block', marginTop: '1.5rem', textDecoration: 'none', background: '#3b82f6' }}
                  >
                    🌐 公式レシピを見る
                  </a>
                )}
              </div>

              <div className="glass-card" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--recipe-primary)', marginBottom: '1.2rem', display: 'flex', justifyContent: 'space-between' }}>
                  🛒 材料 <span>({family.length || 1}人分)</span>
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {activeRecipe.ingredients.map((ing, idx) => (
                    <label key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', cursor: 'pointer' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <input type="checkbox" style={{ width: '18px', height: '18px' }} />
                        <span style={{ color: '#fff' }}>{ing.name}</span>
                      </div>
                      <span style={{ fontWeight: 'bold', color: '#fff' }}>
                        {ing.amountPerPerson * (family.length || 1)}{ing.unit}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* 右カラム: 手順 */}
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--recipe-primary)', marginBottom: '1.5rem' }}>👨‍🍳 作り方</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {activeRecipe.steps.map((step, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ 
                      width: '28px', height: '28px', borderRadius: '50%', background: 'var(--recipe-primary)', 
                      color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                      fontWeight: 'bold', flexShrink: 0, fontSize: '0.9rem' 
                    }}>
                      {idx + 1}
                    </div>
                    <p style={{ color: '#cbd5e1', lineHeight: '1.7', fontSize: '1rem', paddingTop: '2px' }}>
                      {step}
                    </p>
                  </div>
                ))}
              </div>
              
              <div style={{ marginTop: '3rem', padding: '1.5rem', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '16px', border: '1px dashed rgba(16, 185, 129, 0.2)', textAlign: 'center' }}>
                <p style={{ color: 'var(--recipe-primary)', fontWeight: 'bold', marginBottom: '1rem' }}>完成！お疲れ様でした ✨</p>
                <Link href="/recipe-app/menu" className="btn-primary" style={{ padding: '0.6rem 1.5rem', textDecoration: 'none' }}>献立に戻る</Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '5rem 1rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '2rem' }}>🗓️</div>
          <h2 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '1rem' }}>この日の献立はまだ決まっていません</h2>
          <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>献立プランナーでメニューを選んでみましょう！</p>
          <Link href="/recipe-app/menu" className="btn-primary" style={{ padding: '1rem 2rem', textDecoration: 'none' }}>献立を立てに行く</Link>
        </div>
      )}
    </main>
  );
}

export default function RecipePage() {
  return (
    <Suspense fallback={<div className="container">読み込み中...</div>}>
      <RecipeContent />
    </Suspense>
  );
}
