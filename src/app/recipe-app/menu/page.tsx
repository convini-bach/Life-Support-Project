"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { loadFridgeData, saveFridgeData, FridgeItem } from '../lib/fridge-logic';
import { loadFamilyData, FamilyMember } from '../lib/family-logic';
import { subtractQuantity, parseQuantity } from '../lib/quantity-logic';
import { loadWeeklyPlan, saveWeeklyPlan, WeeklyPlan, DayOfWeek, DAYS_JP, loadPlannerSettings, savePlannerSettings } from '../lib/planner-logic';

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

const MOCK_RECIPES: Recipe[] = [
  {
    id: 'curry',
    name: '時短！コク旨ポークカレー',
    category: 'meat',
    description: '冷蔵庫の余り野菜をたっぷり使った、家族みんなが喜ぶ定番メニュー。',
    ingredients: [
      { name: '豚肉', amountPerPerson: 100, unit: 'g' },
      { name: 'キャベツ', amountPerPerson: 50, unit: 'g' },
      { name: '玉ねぎ', amountPerPerson: 0.5, unit: '個' },
    ],
    steps: [
      '玉ねぎをくし切りに、キャベツはザク切りにする。',
      '鍋で豚肉を炒め、色が変わったら野菜を加えてさらに炒める。',
      '水を加えて煮込み、アクを取ったらカレールウを溶かし入れる。'
    ],
    url: 'https://www.kikkoman.co.jp/homecooking/search/index.html?search_type=recipe&word=ポークカレー',
    source: 'キッコーマン ホームクッキング',
    image: '🍛'
  },
  {
    id: 'stir-fry',
    name: 'たっぷり野菜の肉野菜炒め',
    category: 'meat',
    description: '強火でサッと炒めるだけ。AIが推奨する「今日食べるべき野菜」を美味しく摂取。',
    ingredients: [
      { name: '豚肉', amountPerPerson: 80, unit: 'g' },
      { name: 'キャベツ', amountPerPerson: 100, unit: 'g' },
    ],
    steps: [
      'キャベツと豚肉を食べやすい大きさに切る。',
      'フライパンに油を引き、豚肉を強火でカリッとするまで炒める。',
      'キャベツを加え、強火で一気に炒め合わせ、塩コショウで味を整える。'
    ],
    url: 'https://www.kikkoman.co.jp/homecooking/search/index.html?search_type=recipe&word=肉野菜炒め',
    source: 'キッコーマン ホームクッキング',
    image: '🍳'
  },
  {
    id: 'saba-misoni',
    name: 'さばのみそ煮',
    category: 'fish',
    description: '定番の和食。買い物当日の新鮮なさばで作るのが一番です。',
    ingredients: [
      { name: 'さば', amountPerPerson: 1, unit: '切れ' },
    ],
    steps: ['さばを湯通しする', '味噌、酒、砂糖、水で煮る'],
    image: '🐟'
  },
  {
    id: 'pasta',
    name: '和風きのこパスタ',
    category: 'noodle',
    description: 'パスタは常備品でパパッと作れる週末の味方。',
    ingredients: [
      { name: 'パスタ', amountPerPerson: 100, unit: 'g' },
      { name: 'しめじ', amountPerPerson: 50, unit: 'g' },
    ],
    steps: ['パスタを茹でる', '具材を炒めて醤油で味付け'],
    image: '🍝'
  }
];

export default function MenuPage() {
  const [family, setFamily] = useState<FamilyMember[]>([]);
  const [fridgeItems, setFridgeItems] = useState<FridgeItem[]>([]);
  const [weeklyPlan, setWeeklyPlan] = useState<WeeklyPlan>(loadWeeklyPlan());
  const [recipes, setRecipes] = useState<Recipe[]>(MOCK_RECIPES);
  const [shoppingDays, setShoppingDays] = useState<DayOfWeek[]>([]);
  const [filter, setFilter] = useState<RecipeCategory | 'all'>('all');
  const [isApplying, setIsApplying] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setFamily(loadFamilyData());
    setFridgeItems(loadFridgeData());
    setWeeklyPlan(loadWeeklyPlan());
    setShoppingDays(loadPlannerSettings().shoppingDays);
    
    // AI提案メニューがあれば読み込む
    const savedMenu = localStorage.getItem('smart-kitchen-suggested-menu');
    if (savedMenu) {
      try {
        const parsed = JSON.parse(savedMenu);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setRecipes(parsed);
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
    
    setTimeout(() => {
      setIsApplying(null);
    }, 1000);
  };

  const setRecipeToDay = (day: DayOfWeek, recipe: Recipe) => {
    const newPlan = { ...weeklyPlan, [day]: recipe.id };
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

  const filteredRecipes = recipes.filter(r => filter === 'all' || r.category === filter);

  // 買い物リストの計算
  const calculateShoppingList = () => {
    const needed: Record<string, { amount: number, unit: string }> = {};
    const personCount = family.length || 1;

    // 1. 次回の買い物日を特定
    const todayIdx = new Date().getDay(); // 0 (Sun) - 6 (Sat)
    
    // 今日以降で最も近い買い物日を探す
    let nextShoppingIdx = -1;
    for (let i = 0; i < 7; i++) {
      const checkIdx = (todayIdx + i) % 7;
      if (shoppingDays.includes(DAY_ORDER[checkIdx])) {
        nextShoppingIdx = checkIdx;
        break;
      }
    }

    if (nextShoppingIdx === -1) return []; // 買い物日が設定されていない

    // 2. その次の買い物日を特定（買い出しの対象期間を決定）
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

    // デバッグ用: 対象期間をログ出し（後で削除可能）
    console.log("Target Days for Shopping:", targetDays);

    // 対象期間の材料を集計
    targetDays.forEach(day => {
      const recipeId = weeklyPlan[day];
      if (!recipeId) return;
      const recipe = recipes.find(r => r.id === recipeId);
      if (!recipe) return;

      recipe.ingredients.forEach(ing => {
        if (!needed[ing.name]) {
          needed[ing.name] = { amount: 0, unit: ing.unit };
        }
        needed[ing.name].amount += ing.amountPerPerson * personCount;
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
        <h1 style={{ fontSize: '2rem', color: '#fff', marginBottom: '0.5rem' }}>1週間の献立プランナー</h1>
        <p className="text-muted">レシピを選んでカレンダーを埋めましょう。買い物日を設定すると、鮮度を考慮した提案が受けられます。</p>
      </header>

      {/* 買い物日設定 */}
      <section className="glass-card" style={{ padding: '1.2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
        <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--recipe-primary)' }}>🛒 買い物に行く日:</div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {(Object.keys(DAYS_JP) as DayOfWeek[]).map(day => (
            <button 
              key={day}
              onClick={() => toggleShoppingDay(day)}
              style={{ 
                padding: '0.4rem 0.8rem', borderRadius: '20px', fontSize: '0.75rem',
                background: shoppingDays.includes(day) ? 'var(--recipe-primary)' : 'rgba(255,255,255,0.05)',
                color: shoppingDays.includes(day) ? '#000' : '#fff',
                border: '1px solid ' + (shoppingDays.includes(day) ? 'var(--recipe-primary)' : 'rgba(255,255,255,0.1)'),
                cursor: 'pointer', transition: 'all 0.2s'
              }}
            >
              {DAYS_JP[day]}
            </button>
          ))}
        </div>
        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
          ※設定した日の前後に、肉や魚のレシピが優先的に提案されます。
        </div>
      </section>

      {/* 週間カレンダー */}
      <section className="glass-card" style={{ padding: '1.5rem', marginBottom: '3rem', background: 'rgba(255,255,255,0.02)' }}>
        <h2 style={{ fontSize: '1rem', marginBottom: '1.5rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Weekly Schedule</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem' }}>
          {(Object.keys(DAYS_JP) as DayOfWeek[]).map(day => (
            <div key={day} style={{ 
              background: 'rgba(255,255,255,0.03)', borderRadius: '12px', padding: '1rem', 
              border: shoppingDays.includes(day) ? '1px solid var(--recipe-primary)' : '1px solid rgba(255,255,255,0.05)', 
              textAlign: 'center', minHeight: '100px',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              position: 'relative',
              boxShadow: shoppingDays.includes(day) ? '0 0 15px rgba(16, 185, 129, 0.1)' : 'none'
            }}>
              {shoppingDays.includes(day) && (
                <div style={{ position: 'absolute', top: '-10px', right: '-5px', fontSize: '1.2rem' }}>🛒</div>
              )}
              <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: day === 'sun' ? '#f87171' : day === 'sat' ? '#60a5fa' : '#64748b' }}>
                {DAYS_JP[day]}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#fff', margin: '0.5rem 0', fontWeight: '600' }}>
                {weeklyPlan[day] ? (recipes.find(r => r.id === weeklyPlan[day])?.name || '不明なレシピ') : <span style={{ color: '#334155', fontWeight: '400' }}>未設定</span>}
              </div>
              {weeklyPlan[day] && (
                <button 
                  onClick={() => {
                    const newPlan = { ...weeklyPlan, [day]: null };
                    setWeeklyPlan(newPlan);
                    saveWeeklyPlan(newPlan);
                  }}
                  style={{ background: 'none', border: 'none', color: '#475569', fontSize: '0.7rem', cursor: 'pointer' }}
                >
                  取消
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <h2 style={{ fontSize: '1.2rem' }}>AIおすすめレシピ</h2>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {(['all', 'meat', 'fish', 'vegetable', 'noodle'] as const).map(cat => (
                <button 
                  key={cat} 
                  onClick={() => setFilter(cat)}
                  style={{ 
                    padding: '0.3rem 0.8rem', borderRadius: '8px', fontSize: '0.75rem',
                    background: filter === cat ? 'var(--recipe-primary)' : 'rgba(255,255,255,0.05)',
                    color: filter === cat ? '#000' : '#94a3b8',
                    border: 'none', cursor: 'pointer'
                  }}
                >
                  {cat === 'all' ? 'すべて' : cat === 'meat' ? '肉' : cat === 'fish' ? '魚' : cat === 'vegetable' ? '野菜' : '麺'}
                </button>
              ))}
            </div>
          </div>
          
          {filteredRecipes.map(recipe => (
            <div key={recipe.id} className="glass-card" style={{ display: 'flex', gap: '1.5rem', padding: '1.5rem', alignItems: 'center' }}>
              <div style={{ fontSize: '3rem', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.03)', borderRadius: '16px' }}>
                {recipe.image}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--recipe-primary)' }}>{recipe.name}</h3>
                <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '1rem' }}>{recipe.description}</p>
                
                {/* 献立に登録 */}
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.7rem', color: '#64748b', marginBottom: '0.4rem' }}>献立に登録:</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {(Object.keys(DAYS_JP) as DayOfWeek[]).map(day => (
                      <button 
                        key={day}
                        onClick={() => setRecipeToDay(day, recipe)}
                        style={{ 
                          fontSize: '0.7rem', background: weeklyPlan[day] === recipe.id ? 'var(--recipe-primary)' : 'rgba(255,255,255,0.05)',
                          color: weeklyPlan[day] === recipe.id ? '#000' : '#fff', padding: '0.2rem 0.5rem', borderRadius: '4px', border: 'none', cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        {DAYS_JP[day]}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                  {recipe.ingredients.map(ing => (
                    <span key={ing.name} style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
                      {ing.name} {ing.amountPerPerson}{ing.unit}
                    </span>
                  ))}
                </div>

                {/* 調理手順（アコーディオン） */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <button 
                    onClick={() => setExpandedId(expandedId === recipe.id ? null : recipe.id)}
                    style={{ 
                      background: 'rgba(16, 185, 129, 0.05)', 
                      border: '1px solid rgba(16, 185, 129, 0.2)', 
                      color: '#10b981', 
                      fontSize: '0.85rem', 
                      cursor: 'pointer', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.5rem', 
                      padding: '0.5rem 1rem',
                      borderRadius: '8px',
                      width: '100%',
                      justifyContent: 'center',
                      fontWeight: '600',
                      transition: 'all 0.2s'
                    }}
                    className="hover-lift"
                  >
                    <span>{expandedId === recipe.id ? '▼' : '📖'}</span> 
                    {expandedId === recipe.id ? '手順を閉じる' : '作り方の詳細（手順）はこちら'}
                  </button>
                  
                  {expandedId === recipe.id && (
                    <div className="glass-card" style={{ 
                      marginTop: '0.8rem', padding: '1rem', background: 'rgba(255,255,255,0.02)', 
                      fontSize: '0.85rem', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.05)' 
                    }}>
                      <ol style={{ paddingLeft: '1.2rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                        {recipe.steps?.map((step, idx) => (
                          <li key={idx} style={{ lineHeight: '1.6' }}>{step}</li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <button 
                    onClick={() => applyRecipe(recipe)}
                    disabled={isApplying !== null}
                    className="btn-primary" 
                    style={{ flex: 2, padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}
                  >
                    {isApplying === recipe.id ? '調理中...' : 'この料理を作る（在庫を減らす）'}
                  </button>
                  
                  {recipe.url && (
                    <a 
                      href={recipe.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="glass-card"
                      style={{ 
                        flex: 1, padding: '0.6rem', fontSize: '0.75rem', textAlign: 'center', 
                        textDecoration: 'none', color: '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}
                    >
                      🔗 公式レシピ
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </section>

        <section>
          <div className="glass-card" style={{ padding: '1.5rem', border: '1px solid rgba(16, 185, 129, 0.3)', background: 'rgba(16, 185, 129, 0.02)' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981' }}>
              <span>🛒</span> 自動買い物リスト
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {shoppingList.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem 1rem', color: '#64748b' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✨</div>
                  <p style={{ fontSize: '0.85rem' }}>
                    {targetDays.length > 0
                      ? `${targetDays.map(d => DAYS_JP[d]).join('・')}分の材料は在庫で揃っています！` 
                      : '献立を登録すると、不足分がここに表示されます。'}
                  </p>
                </div>
              ) : (
                <>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.8rem' }}>
                    次回の買い物（{targetDays[0] ? DAYS_JP[targetDays[0]] : '-'}）から、その次の買い物（{targetDays.length > 0 ? DAYS_JP[DAY_ORDER[(DAY_ORDER.indexOf(targetDays[targetDays.length - 1]) + 1) % 7]] : '-'}）までの不足分です：
                  </div>
                  {shoppingList.map(item => (
                    <div key={item.name} style={{ 
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                      fontSize: '0.9rem', padding: '0.6rem 0.8rem', background: 'rgba(255,255,255,0.03)', 
                      borderRadius: '8px', borderLeft: '3px solid var(--recipe-primary)' 
                    }}>
                      <span style={{ color: '#fff' }}>{item.name}</span>
                      <span style={{ fontWeight: 'bold', color: 'var(--recipe-primary)' }}>
                        {item.amount}{item.unit}
                      </span>
                    </div>
                  ))}
                  <button 
                    className="btn-primary" 
                    style={{ marginTop: '1rem', padding: '0.6rem', fontSize: '0.8rem' }}
                    onClick={() => alert('買い物リストをスマホに送信しました（モック）')}
                  >
                    買い物リストを送信
                  </button>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
