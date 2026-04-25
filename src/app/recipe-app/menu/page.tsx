"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { loadFridgeData, saveFridgeData, FridgeItem } from '../lib/fridge-logic';
import { loadFamilyData, FamilyMember } from '../lib/family-logic';
import { subtractQuantity, parseQuantity } from '../lib/quantity-logic';
import { loadWeeklyPlan, saveWeeklyPlan, WeeklyPlan, DayOfWeek, DAYS_JP, loadPlannerSettings, savePlannerSettings, DayPlan } from '../lib/planner-logic';

type RecipeCategory = 'meat' | 'fish' | 'vegetable' | 'noodle' | 'other';
const DAY_ORDER: DayOfWeek[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

interface Recipe {
  id: string;
  name: string;
  description: string;
  category: RecipeCategory;
  ingredients: {
    name: string;
    amountPerPerson: number;
    unit: string;
  }[];
  steps: string[];
  url?: string;
  source?: string;
  image: string;
}

const SLOT_JP: Record<string, string> = {
  main: '主菜', side1: '副菜1', side2: '副菜2', side3: '副菜3', soup: '汁物'
};

const MOCK_RECIPES: Recipe[] = [
  {
    id: 'curry',
    name: '時短！ポークカレー',
    category: 'meat',
    description: '冷蔵庫の余り野菜をたっぷり使った定番メニュー。',
    ingredients: [
      { name: '豚肉', amountPerPerson: 100, unit: 'g' },
      { name: 'キャベツ', amountPerPerson: 50, unit: 'g' },
    ],
    steps: ['材料を切る', '肉と野菜を炒める', '水とルウを加えて煮込む'],
    image: '🍛'
  },
  {
    id: 'stir-fry',
    name: '肉野菜炒め',
    category: 'meat',
    description: '強火でサッと炒めるだけ。AI推奨の野菜を摂取。',
    ingredients: [
      { name: '豚肉', amountPerPerson: 80, unit: 'g' },
      { name: 'キャベツ', amountPerPerson: 100, unit: 'g' },
    ],
    steps: ['材料を切る', '強火で炒める'],
    image: '🍳'
  },
  {
    id: 'saba-misoni',
    name: 'さばのみそ煮',
    category: 'fish',
    description: '買い物当日の新鮮なさばで作るのが一番。',
    ingredients: [
      { name: 'さば', amountPerPerson: 1, unit: '切れ' },
    ],
    steps: ['さばを湯通しする', '味噌で煮る'],
    image: '🐟'
  },
  {
    id: 'salad',
    name: 'キャベツの塩昆布和え',
    category: 'vegetable',
    description: 'あと一品に最適。火を使わずパパッと完成。',
    ingredients: [
      { name: 'キャベツ', amountPerPerson: 50, unit: 'g' },
    ],
    steps: ['キャベツを切る', '塩昆布と和える'],
    image: '🥗'
  },
  {
    id: 'miso-soup',
    name: '具だくさん味噌汁',
    category: 'other',
    description: '余った野菜を全部入れて栄養満点。',
    ingredients: [
      { name: '玉ねぎ', amountPerPerson: 0.2, unit: '個' },
    ],
    steps: ['だしを取る', '野菜を煮る', '味噌を溶く'],
    image: '🥣'
  }
];

export default function MenuPage() {
  const [family, setFamily] = useState<FamilyMember[]>([]);
  const [fridgeItems, setFridgeItems] = useState<FridgeItem[]>([]);
  const [weeklyPlan, setWeeklyPlan] = useState<WeeklyPlan>({});
  const [recipes, setRecipes] = useState<Recipe[]>(MOCK_RECIPES);
  const [shoppingDays, setShoppingDays] = useState<DayOfWeek[]>([]);
  const [filter, setFilter] = useState<RecipeCategory | 'all' | 'main' | 'side' | 'soup'>('all');
  const [selectedSlot, setSelectedSlot] = useState<keyof DayPlan>('main');
  const [isApplying, setIsApplying] = useState<string | null>(null);
  const [registeringRecipe, setRegisteringRecipe] = useState<Recipe | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setFamily(loadFamilyData());
    setFridgeItems(loadFridgeData());
    setWeeklyPlan(loadWeeklyPlan());
    setShoppingDays(loadPlannerSettings().shoppingDays);
    
    const savedMenu = localStorage.getItem('smart-kitchen-suggested-menu');
    if (savedMenu) {
      try {
        const parsed = JSON.parse(savedMenu);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setRecipes([...MOCK_RECIPES, ...parsed]);
        }
      } catch (e) {
        console.error("Failed to parse suggested menu", e);
      }
    }
  }, []);

  const applyRecipe = (recipe: Recipe) => {
    setIsApplying(recipe.id);
    const personCount = family.length || 1;
    let updatedFridge = [...fridgeItems];
    let logs: string[] = [];

    recipe.ingredients.forEach(ing => {
      const itemIndex = updatedFridge.findIndex(item => item.name.includes(ing.name));
      if (itemIndex > -1) {
        const item = updatedFridge[itemIndex];
        const newQuantityStr = subtractQuantity(item.quantity, ing.amountPerPerson, personCount);
        const consumed = ing.amountPerPerson * personCount;
        logs.push(`${ing.name}: ${consumed}${ing.unit} を使用`);
        const { value } = parseQuantity(newQuantityStr);
        if (value <= 0) {
          updatedFridge.splice(itemIndex, 1);
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
    setTimeout(() => setIsApplying(null), 1000);
  };

  const setRecipeToDay = (day: DayOfWeek, recipe: Recipe) => {
    const currentDayPlan = weeklyPlan[day] || {};
    const newPlan = { 
      ...weeklyPlan, 
      [day]: { ...currentDayPlan, [selectedSlot]: recipe.id } 
    };
    setWeeklyPlan(newPlan);
    saveWeeklyPlan(newPlan);
    setMessage(`${DAYS_JP[day]}の${SLOT_JP[selectedSlot as string]}に「${recipe.name}」を登録しました。`);
  };

  const clearSlot = (day: DayOfWeek, slot: keyof DayPlan) => {
    const currentDayPlan = { ...(weeklyPlan[day] || {}) };
    delete currentDayPlan[slot];
    const newPlan = { ...weeklyPlan, [day]: currentDayPlan };
    setWeeklyPlan(newPlan);
    saveWeeklyPlan(newPlan);
  };

  const toggleShoppingDay = (day: DayOfWeek) => {
    const newDays = shoppingDays.includes(day)
      ? shoppingDays.filter(d => d !== day)
      : [...shoppingDays, day];
    setShoppingDays(newDays);
    savePlannerSettings({ shoppingDays: newDays });
  };

  const getFilteredRecipes = () => {
    return recipes.filter(r => {
      if (filter === 'all') return true;
      if (filter === 'main') return r.category === 'meat' || r.category === 'fish';
      if (filter === 'side') return r.category === 'vegetable' || r.category === 'other';
      if (filter === 'soup') return r.name.includes('汁') || r.name.includes('スープ');
      return r.category === filter;
    });
  };

  const filteredRecipes = getFilteredRecipes();

  const getFreshnessStatus = (day: DayOfWeek, dayPlan: DayPlan) => {
    if (!dayPlan || shoppingDays.length === 0) return null;
    const recipeId = dayPlan.main;
    if (!recipeId) return null;
    const recipe = recipes.find(r => r.id === recipeId);
    if (!recipe) return null;

    const todayIdx = DAY_ORDER.indexOf(day);
    let lastShoppingIdx = -1;
    for (let i = 0; i < 7; i++) {
      const checkIdx = (todayIdx - i + 7) % 7;
      if (shoppingDays.includes(DAY_ORDER[checkIdx])) {
        lastShoppingIdx = checkIdx;
        break;
      }
    }
    if (lastShoppingIdx === -1) return null;
    const diff = (todayIdx - lastShoppingIdx + 7) % 7;

    if (recipe.category === 'fish') {
      if (diff <= 1) return { status: 'optimal', message: '✨ 魚:鮮度バッチリ' };
      return { status: 'warning', message: '⚠️ 魚:鮮度が心配' };
    }
    if (recipe.category === 'meat') {
      if (diff <= 3) return { status: 'optimal', message: '✨ 肉:鮮度良好' };
      return { status: 'warning', message: '⚠️ 肉:鮮度が心配' };
    }
    return null;
  };

  return (
    <main className="container min-h-screen" style={{ paddingBottom: '5rem' }}>
      <header style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '2rem', color: '#fff', marginBottom: '0.5rem' }}>1週間の献立プランナー</h1>
          <p className="text-muted">「主菜・副菜・汁物」を自由に組み合わせて、理想の食卓をデザインしましょう。</p>
        </div>
        <Link href="/recipe-app/shopping-list" className="btn-primary" style={{ padding: '0.8rem 1.5rem', textDecoration: 'none', background: 'var(--recipe-primary)', color: '#000', fontWeight: 'bold', borderRadius: '12px' }}>
          🛒 買い物リストを表示
        </Link>
      </header>

      <section className="glass-card" style={{ padding: '1.2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
        <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--recipe-primary)' }}>🛒 買い物に行く日:</div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {(Object.keys(DAYS_JP) as DayOfWeek[]).map(day => (
            <button key={day} onClick={() => toggleShoppingDay(day)} style={{ padding: '0.4rem 0.8rem', borderRadius: '20px', fontSize: '0.75rem', background: shoppingDays.includes(day) ? 'var(--recipe-primary)' : 'rgba(255,255,255,0.05)', color: shoppingDays.includes(day) ? '#000' : '#fff', border: '1px solid ' + (shoppingDays.includes(day) ? 'var(--recipe-primary)' : 'rgba(255,255,255,0.1)'), cursor: 'pointer' }}>{DAYS_JP[day]}</button>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.9rem', color: '#94a3b8', marginRight: '0.5rem' }}>登録先スロットを選択:</span>
        {(Object.keys(SLOT_JP) as (keyof DayPlan)[]).map(slot => (
          <button 
            key={slot}
            onClick={() => setSelectedSlot(slot)}
            style={{ 
              padding: '0.5rem 1.2rem', borderRadius: '10px', fontSize: '0.85rem',
              background: selectedSlot === slot ? 'var(--recipe-primary)' : 'rgba(255,255,255,0.05)',
              color: selectedSlot === slot ? '#000' : '#fff',
              border: 'none', cursor: 'pointer', fontWeight: 'bold'
            }}
          >
            {SLOT_JP[slot]}
          </button>
        ))}
      </section>

      <section className="glass-card" style={{ padding: '1.5rem', marginBottom: '3rem', background: 'rgba(255,255,255,0.02)' }}>
        <h2 style={{ fontSize: '1rem', marginBottom: '1.5rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Weekly Schedule</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
          {(Object.keys(DAYS_JP) as DayOfWeek[]).map(day => (
            <div key={day} style={{ 
              background: 'rgba(255,255,255,0.03)', borderRadius: '12px', padding: '1rem', 
              border: shoppingDays.includes(day) ? '1px solid var(--recipe-primary)' : '1px solid rgba(255,255,255,0.05)', 
              textAlign: 'center', minHeight: '220px', display: 'flex', flexDirection: 'column', position: 'relative'
            }}>
              {shoppingDays.includes(day) && <div style={{ position: 'absolute', top: '-10px', right: '-5px', fontSize: '1.2rem' }}>🛒</div>}
              <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: day === 'sun' ? '#f87171' : day === 'sat' ? '#60a5fa' : '#64748b', marginBottom: '0.5rem' }}>{DAYS_JP[day]}</div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', flex: 1 }}>
                {(Object.keys(SLOT_JP) as (keyof DayPlan)[]).map(slot => (
                  <div key={slot} style={{ 
                    fontSize: '0.7rem', padding: '0.4rem', borderRadius: '6px',
                    background: selectedSlot === slot ? 'rgba(16, 185, 129, 0.08)' : 'transparent',
                    border: '1px solid ' + (selectedSlot === slot ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.02)'),
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                  }}>
                    <span style={{ color: '#64748b' }}>{SLOT_JP[slot][0]}:</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', maxWidth: '80%' }}>
                      <span style={{ color: weeklyPlan[day]?.[slot] ? '#fff' : '#334155', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {weeklyPlan[day]?.[slot] ? (recipes.find(r => r.id === weeklyPlan[day]![slot])?.name || '登録済') : '---'}
                      </span>
                      {weeklyPlan[day]?.[slot] && (
                        <button onClick={() => clearSlot(day, slot)} style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', fontSize: '0.7rem' }}>×</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {weeklyPlan[day] && getFreshnessStatus(day, weeklyPlan[day]) && (
                <div style={{ fontSize: '0.6rem', padding: '0.2rem 0.4rem', borderRadius: '4px', marginTop: '0.5rem', color: getFreshnessStatus(day, weeklyPlan[day])?.status === 'warning' ? '#f87171' : '#10b981', background: getFreshnessStatus(day, weeklyPlan[day])?.status === 'warning' ? 'rgba(248, 113, 113, 0.1)' : 'rgba(16, 185, 129, 0.1)' }}>{getFreshnessStatus(day, weeklyPlan[day])?.message}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {message && (
        <div className="glass-card" style={{ padding: '1.2rem', marginBottom: '2rem', borderLeft: '4px solid var(--recipe-primary)', background: 'rgba(16, 185, 129, 0.1)', whiteSpace: 'pre-wrap', fontSize: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{message}</span>
          <button onClick={() => setMessage(null)} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '0.2rem 0.6rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.7rem' }}>閉じる</button>
        </div>
      )}

      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.2rem' }}>AIおすすめレシピ</h2>
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {(['all', 'main', 'side', 'soup', 'meat', 'fish', 'vegetable'] as const).map(cat => (
              <button key={cat} onClick={() => setFilter(cat)} style={{ padding: '0.3rem 0.8rem', borderRadius: '8px', fontSize: '0.7rem', background: filter === cat ? 'var(--recipe-primary)' : 'rgba(255,255,255,0.05)', color: filter === cat ? '#000' : '#94a3b8', border: 'none', cursor: 'pointer' }}>
                {cat === 'all' ? 'すべて' : cat === 'main' ? '主菜' : cat === 'side' ? '副菜' : cat === 'soup' ? '汁物' : cat === 'meat' ? '肉' : cat === 'fish' ? '魚' : '野菜'}
              </button>
            ))}
          </div>
        </div>
        
        <div style={{ display: 'flex', overflowX: 'auto', gap: '1.5rem', paddingBottom: '1rem', scrollbarWidth: 'thin' }}>
          {filteredRecipes.map(recipe => (
            <div key={recipe.id} className="glass-card" style={{ minWidth: '320px', padding: '1.2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ fontSize: '2.5rem', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>{recipe.image}</div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1rem', color: 'var(--recipe-primary)', marginBottom: '0.2rem' }}>{recipe.name}</h3>
                  <p style={{ fontSize: '0.75rem', color: '#94a3b8', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{recipe.description}</p>
                </div>
              </div>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                {recipe.ingredients.slice(0, 3).map(ing => (
                  <span key={ing.name} style={{ fontSize: '0.65rem', background: 'rgba(255,255,255,0.05)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>{ing.name}</span>
                ))}
                {recipe.ingredients.length > 3 && <span style={{ fontSize: '0.65rem', color: '#64748b' }}>他</span>}
              </div>

              <div>
                <button 
                  onClick={() => setRegisteringRecipe(recipe)}
                  style={{ 
                    width: '100%', padding: '0.8rem', borderRadius: '10px', 
                    background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)',
                    color: '#10b981', fontSize: '0.9rem', fontWeight: 'bold', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
                  }}
                >
                  📅 献立に登録
                </button>
              </div>

              <div style={{ marginTop: 'auto', display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => applyRecipe(recipe)} disabled={isApplying !== null} className="btn-primary" style={{ flex: 1, padding: '0.5rem', fontSize: '0.75rem' }}>{isApplying === recipe.id ? '...' : '作る'}</button>
                <button onClick={() => setExpandedId(expandedId === recipe.id ? null : recipe.id)} style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.05)', border: 'none', color: '#fff', borderRadius: '6px', fontSize: '0.75rem', cursor: 'pointer' }}>{expandedId === recipe.id ? '閉じる' : '手順'}</button>
              </div>

              {expandedId === recipe.id && (
                <div className="glass-card" style={{ marginTop: '0.5rem', padding: '0.8rem', background: 'rgba(255,255,255,0.02)', fontSize: '0.75rem', color: '#cbd5e1' }}>
                  <ol style={{ paddingLeft: '1rem', margin: 0 }}>
                    {recipe.steps?.map((step, idx) => (<li key={idx} style={{ marginBottom: '0.3rem' }}>{step}</li>))}
                  </ol>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 登録用モーダル */}
      {registeringRecipe && (
        <div style={{ 
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)',
          zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
        }}>
          <div className="glass-card" style={{ width: '100%', maxWidth: '400px', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#fff', textAlign: 'center' }}>
              {registeringRecipe.name}
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', textAlign: 'center', marginBottom: '2rem' }}>
              どの曜日の <span style={{ color: 'var(--recipe-primary)', fontWeight: 'bold' }}>{SLOT_JP[selectedSlot as string]}</span> に登録しますか？
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              {(Object.keys(DAYS_JP) as DayOfWeek[]).map(day => (
                <button 
                  key={day}
                  onClick={() => {
                    setRecipeToDay(day, registeringRecipe);
                    setRegisteringRecipe(null);
                  }}
                  style={{ 
                    padding: '1.2rem', borderRadius: '15px', fontSize: '1.1rem', fontWeight: 'bold',
                    background: weeklyPlan[day]?.[selectedSlot] === registeringRecipe.id ? 'var(--recipe-primary)' : 'rgba(255,255,255,0.05)',
                    color: weeklyPlan[day]?.[selectedSlot] === registeringRecipe.id ? '#000' : '#fff',
                    border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer'
                  }}
                >
                  {DAYS_JP[day]}
                </button>
              ))}
            </div>

            <button 
              onClick={() => setRegisteringRecipe(null)}
              style={{ 
                width: '100%', marginTop: '2rem', padding: '1rem', borderRadius: '12px',
                background: 'rgba(248, 113, 113, 0.1)', border: 'none', color: '#f87171',
                fontWeight: 'bold', cursor: 'pointer'
              }}
            >
              キャンセル
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
