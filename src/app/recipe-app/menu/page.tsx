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
  { id: 'curry', name: '時短！ポークカレー', category: 'meat', description: '余り野菜をたっぷり使った定番メニュー。', ingredients: [{ name: '豚肉', amountPerPerson: 100, unit: 'g' }, { name: 'キャベツ', amountPerPerson: 50, unit: 'g' }], steps: ['材料を切る', '肉と野菜を炒める', '水とルウを加えて煮込む'], image: '🍛' },
  { id: 'stir-fry', name: '肉野菜炒め', category: 'meat', description: '強火でサッと炒めるだけ。', ingredients: [{ name: '豚肉', amountPerPerson: 80, unit: 'g' }, { name: 'キャベツ', amountPerPerson: 100, unit: 'g' }], steps: ['材料を切る', '強火で炒める'], image: '🍳' },
  { id: 'saba-misoni', name: 'さばのみそ煮', category: 'fish', description: '新鮮なさばで作るのが一番。', ingredients: [{ name: 'さば', amountPerPerson: 1, unit: '切れ' }], steps: ['さばを湯通しする', '味噌で煮る'], image: '🐟' },
  { id: 'salad', name: 'キャベツの塩昆布和え', category: 'vegetable', description: 'あと一品に最適。火を使わず完成。', ingredients: [{ name: 'キャベツ', amountPerPerson: 50, unit: 'g' }], steps: ['キャベツを切る', '塩昆布と和える'], image: '🥗' },
  { id: 'soup-miso', name: '具だくさん味噌汁', category: 'other', description: '冷蔵庫の余り野菜を一掃。', ingredients: [{ name: 'キャベツ', amountPerPerson: 30, unit: 'g' }], steps: ['だしをとる', '具材を煮る', '味噌を溶く'], image: '🥣' },
  { id: 'hamburg', name: 'ふっくらハンバーグ', category: 'meat', description: '子供も大好き、肉汁たっぷり。', ingredients: [{ name: 'ひき肉', amountPerPerson: 120, unit: 'g' }], steps: ['玉ねぎを炒める', '肉と混ぜて成形', '焼く'], image: '🍔' },
  { id: 'salmon-foil', name: '鮭のホイル焼き', category: 'fish', description: '片付け簡単、野菜も一緒に。', ingredients: [{ name: '鮭', amountPerPerson: 1, unit: '切れ' }], steps: ['ホイルに並べる', 'バターをのせる', 'トースターで焼く'], image: '🍱' },
  { id: 'kinpira', name: 'きんぴらごぼう', category: 'vegetable', description: '作り置きに便利な定番副菜。', ingredients: [{ name: 'ごぼう', amountPerPerson: 30, unit: 'g' }], steps: ['細切りにする', '炒めて煮る'], image: '🥢' },
  { id: 'tonkatsu', name: 'サクサクとんかつ', category: 'meat', description: '晩ごはんの王様。', ingredients: [{ name: '豚ロース', amountPerPerson: 120, unit: 'g' }], steps: ['衣をつける', '油で揚げる'], image: '🥩' },
  { id: 'yakisoba', name: 'ソース焼きそば', category: 'meat', description: 'ランチにも最適な時短料理。', ingredients: [{ name: '焼きそば麺', amountPerPerson: 1, unit: '玉' }], steps: ['具を炒める', '麺を加えて蒸し焼き'], image: '🍝' },
  { id: 'karaage', name: '鶏の唐揚げ', category: 'meat', description: '秘伝のタレに漬け込んで。', ingredients: [{ name: '鶏もも肉', amountPerPerson: 150, unit: 'g' }], steps: ['タレに漬ける', '粉をまぶす', '揚げる'], image: '🍗' },
  { id: 'niku-jaga', name: '肉じゃが', category: 'meat', description: '家庭の味の代表格。', ingredients: [{ name: '牛肉', amountPerPerson: 80, unit: 'g' }], steps: ['具材を炒める', '煮汁で煮込む'], image: '🥘' },
  { id: 'mapo-tofu', name: '本格麻婆豆腐', category: 'meat', description: 'ピリ辛でご飯が進む。', ingredients: [{ name: '豆腐', amountPerPerson: 150, unit: 'g' }], steps: ['ソースを作る', '豆腐を加える'], image: '🌶️' },
  { id: 'ginger-pork', name: '豚の生姜焼き', category: 'meat', description: 'ご飯のお供に最高。', ingredients: [{ name: '豚肉', amountPerPerson: 120, unit: 'g' }], steps: ['タレを作る', '肉を焼く'], image: '🥓' },
  { id: 'tempura', name: '季節の天ぷら', category: 'vegetable', description: '旬の食材をサクッと。', ingredients: [{ name: '野菜', amountPerPerson: 100, unit: 'g' }], steps: ['衣を作る', '揚げる'], image: '🍤' },
  { id: 'oyakodon', name: 'ふわとろ親子丼', category: 'meat', description: '卵の加減がポイント。', ingredients: [{ name: '鶏肉', amountPerPerson: 100, unit: 'g' }], steps: ['だしで煮る', '卵でとじる'], image: '🍚' },
  { id: 'gyudon', name: '牛丼', category: 'meat', description: '忙しい時の強い味方。', ingredients: [{ name: '牛肉', amountPerPerson: 100, unit: 'g' }], steps: ['煮汁で煮る'], image: '🐮' },
  { id: 'carbonara', name: '濃厚カルボナーラ', category: 'other', description: '本格的な味わい。', ingredients: [{ name: 'パスタ', amountPerPerson: 100, unit: 'g' }], steps: ['パスタを茹でる', 'ソースと和える'], image: '🍝' },
  { id: 'omurice', name: 'オムライス', category: 'other', description: '卵の包み方がコツ。', ingredients: [{ name: '鶏肉', amountPerPerson: 50, unit: 'g' }], steps: ['ケチャップライスを作る', '卵で包む'], image: '🍳' },
  { id: 'gyoza', name: '手作り餃子', category: 'meat', description: 'みんなで包むと楽しい。', ingredients: [{ name: '豚ひき肉', amountPerPerson: 100, unit: 'g' }], steps: ['あんを包む', '蒸し焼きにする'], image: '🥟' },
  { id: 'soup-corn', name: 'コーンポタージュ', category: 'other', description: '甘くて優しいスープ。', ingredients: [{ name: 'コーン', amountPerPerson: 50, unit: 'g' }], steps: ['ミキサーにかける', '温める'], image: '🌽' },
  { id: 'soup-onion', name: 'オニオンスープ', category: 'other', description: '飴色玉ねぎの甘み。', ingredients: [{ name: '玉ねぎ', amountPerPerson: 100, unit: 'g' }], steps: ['玉ねぎを炒める', '煮込む'], image: '🧅' },
  { id: 'side-ohitashi', name: 'ほうれん草のお浸し', category: 'vegetable', description: 'さっぱり副菜。', ingredients: [{ name: 'ほうれん草', amountPerPerson: 50, unit: 'g' }], steps: ['茹でる', 'だしに浸す'], image: '🥬' },
  { id: 'side-namul', name: 'もやしのナムル', category: 'vegetable', description: 'シャキシャキ食感。', ingredients: [{ name: 'もやし', amountPerPerson: 100, unit: 'g' }], steps: ['茹でる', '調味料と和える'], image: '🥢' },
  { id: 'side-hijiki', name: 'ひじきの煮物', category: 'vegetable', description: '栄養満点。', ingredients: [{ name: 'ひじき', amountPerPerson: 20, unit: 'g' }], steps: ['戻す', '煮る'], image: '🖤' },
  { id: 'fish-buri', name: 'ぶりの照り焼き', category: 'fish', description: '甘辛タレが絶品。', ingredients: [{ name: 'ぶり', amountPerPerson: 1, unit: '切れ' }], steps: ['焼く', 'タレを絡める'], image: '🐟' },
  { id: 'fish-shioyaki', name: 'さんまの塩焼き', category: 'fish', description: '秋の味覚。', ingredients: [{ name: 'さんま', amountPerPerson: 1, unit: '尾' }], steps: ['塩を振る', '焼く'], image: '🍢' },
  { id: 'noodle-udon', name: '肉うどん', category: 'meat', description: 'あったまる一杯。', ingredients: [{ name: 'うどん麺', amountPerPerson: 1, unit: '玉' }], steps: ['だしを作る', '肉を煮る'], image: '🍜' },
  { id: 'noodle-ramen', name: '醤油ラーメン', category: 'meat', description: '自家製チャーシューと。', ingredients: [{ name: '中華麺', amountPerPerson: 1, unit: '玉' }], steps: ['スープを作る', '麺を茹でる'], image: '🍜' },
  { id: 'soup-minestrone', name: 'ミネストローネ', category: 'vegetable', description: 'トマトたっぷりのスープ。', ingredients: [{ name: 'トマト', amountPerPerson: 100, unit: 'g' }], steps: ['野菜を切る', '煮込む'], image: '🍅' },
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
  const [selectedDaysInModal, setSelectedDaysInModal] = useState<DayOfWeek[]>([]);
  const [selectedSlotInModal, setSelectedSlotInModal] = useState<keyof DayPlan>('main');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setFamily(loadFamilyData());
    setFridgeItems(loadFridgeData());
    setWeeklyPlan(loadWeeklyPlan());
    const settings = loadPlannerSettings();
    setShoppingDays(settings.shoppingDays);
  }, []);

  const toggleShoppingDay = (day: DayOfWeek) => {
    const newDays = shoppingDays.includes(day)
      ? shoppingDays.filter(d => d !== day)
      : [...shoppingDays, day];
    setShoppingDays(newDays);
    savePlannerSettings({ shoppingDays: newDays });
  };

  const setRecipeToDay = (day: DayOfWeek, recipe: Recipe) => {
    const newPlan = { ...weeklyPlan };
    if (!newPlan[day]) newPlan[day] = {};
    newPlan[day][selectedSlot] = recipe.id;
    setWeeklyPlan(newPlan);
    saveWeeklyPlan(newPlan);
    setMessage(${DAYS_JP[day]}のに「」を登録しました。);
  };

  const clearSlot = (day: DayOfWeek, slot: keyof DayPlan) => {
    const newPlan = { ...weeklyPlan };
    if (newPlan[day]) {
      delete newPlan[day][slot];
      setWeeklyPlan(newPlan);
      saveWeeklyPlan(newPlan);
    }
  };

  const applyRecipe = async (recipe: Recipe) => {
    setIsApplying(recipe.id);
    const newFridge = [...fridgeItems];
    
    recipe.ingredients.forEach(ing => {
      const idx = newFridge.findIndex(f => f.name === ing.name);
      if (idx !== -1) {
        const totalNeeded = ing.amountPerPerson * family.length;
        const current = parseQuantity(newFridge[idx].quantity);
        newFridge[idx].quantity = subtractQuantity(current, totalNeeded, ing.unit);
      }
    });

    setFridgeItems(newFridge);
    saveFridgeData(newFridge);
    
    setTimeout(() => {
      setIsApplying(null);
      setMessage(「」を調理しました。在庫を更新しました！);
    }, 1000);
  };

  const filteredRecipes = recipes.filter(r => {
    if (filter === 'all') return true;
    if (filter === 'main') return r.category === 'meat' || r.category === 'fish' || r.category === 'noodle';
    if (filter === 'side') return r.category === 'vegetable';
    if (filter === 'soup') return r.name.includes('汁') || r.name.includes('スープ') || r.name.includes('ポタージュ');
    return r.category === filter;
  });

  return (
    <main style={{ padding: '1rem', maxWidth: '800px', margin: '0 auto', paddingBottom: '5rem' }}>
      <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--recipe-primary)' }}>Menu Planner</h1>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>1週間の献立を組み立てましょう</p>
        </div>
        <Link href="/recipe-app" className="btn-primary" style={{ padding: '0.5rem 1rem', textDecoration: 'none' }}>冷蔵庫へ</Link>
      </header>

      <section className="glass-card" style={{ padding: '1.2rem', marginBottom: '2rem' }}>
        <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--recipe-primary)', marginBottom: '1rem' }}>🛒 買い物に行く日:</div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {DAY_ORDER.map(day => (
            <button key={day} onClick={() => toggleShoppingDay(day)} style={{ padding: '0.4rem 0.8rem', borderRadius: '20px', fontSize: '0.75rem', background: shoppingDays.includes(day) ? 'var(--recipe-primary)' : 'rgba(255,255,255,0.05)', color: shoppingDays.includes(day) ? '#000' : '#fff', border: '1px solid ' + (shoppingDays.includes(day) ? 'var(--recipe-primary)' : 'rgba(255,255,255,0.1)'), cursor: 'pointer' }}>{DAYS_JP[day]}</button>
          ))}
        </div>
      </section>

      {/* 登録先スロット選択 */}
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

      {/* 週間カレンダー (Stickyに設定) */}
      <section style={{ 
        position: 'sticky', 
        top: '60px', 
        zIndex: 50, 
        padding: '0.8rem 0',
        background: 'rgba(10, 12, 16, 0.95)', 
        backdropFilter: 'blur(12px)',
        margin: '0 -1rem 2rem -1rem',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
          <h2 style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Weekly Schedule</h2>
          <div style={{ fontSize: '0.7rem', color: 'var(--recipe-primary)', fontWeight: 'bold' }}>
            <span style={{ color: '#fff', marginRight: '0.4rem' }}>表示中:</span>
            {SLOT_JP[selectedSlot as string]}
          </div>
        </div>
        <div style={{ display: 'flex', overflowX: 'auto', gap: '0.5rem', paddingBottom: '0.5rem', scrollbarWidth: 'none' }}>
          {DAY_ORDER.map(day => {
            const currentRecipeId = weeklyPlan[day]?.[selectedSlot];
            const currentRecipe = recipes.find(r => r.id === currentRecipeId);
            
            return (
              <div key={day} style={{ 
                minWidth: '120px', flex: '0 0 auto',
                background: 'rgba(255,255,255,0.02)', borderRadius: '12px', padding: '0.6rem 0.5rem', 
                border: shoppingDays.includes(day) ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(255,255,255,0.05)', 
                textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.4rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: day === 'sun' ? '#f87171' : day === 'sat' ? '#60a5fa' : '#94a3b8' }}>{DAYS_JP[day]}</span>
                  {currentRecipeId && (
                    <button 
                      onClick={() => clearSlot(day, selectedSlot)} 
                      style={{ background: 'rgba(248, 113, 113, 0.1)', border: 'none', color: '#f87171', borderRadius: '4px', padding: '0.1rem 0.3rem', fontSize: '0.6rem', cursor: 'pointer' }}
                    >
                      消去
                    </button>
                  )}
                </div>

                <div style={{ 
                  fontSize: '0.75rem', color: currentRecipe ? '#fff' : '#334155', 
                  fontWeight: currentRecipe ? 'bold' : 'normal',
                  height: '1.2rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  background: currentRecipe ? 'rgba(255,255,255,0.03)' : 'transparent',
                  borderRadius: '4px', padding: '0 0.2rem'
                }}>
                  {currentRecipe ? currentRecipe.name : '---'}
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.2rem', marginTop: '0.2rem' }}>
                  {(Object.keys(SLOT_JP) as (keyof DayPlan)[]).map(slot => (
                    <div key={slot} style={{ 
                      width: '6px', height: '6px', borderRadius: '50%',
                      background: weeklyPlan[day]?.[slot] ? (selectedSlot === slot ? 'var(--recipe-primary)' : '#4ade80') : 'rgba(255,255,255,0.1)',
                      border: selectedSlot === slot ? '1px solid #fff' : 'none',
                      boxShadow: selectedSlot === slot && weeklyPlan[day]?.[slot] ? '0 0 5px var(--recipe-primary)' : 'none'
                    }} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {message && (
        <div className="glass-card" style={{ padding: '1.2rem', marginBottom: '2rem', borderLeft: '4px solid var(--recipe-primary)', background: 'rgba(16, 185, 129, 0.1)', whiteSpace: 'pre-wrap', fontSize: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{message}</span>
          <button onClick={() => setMessage(null)} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '0.2rem 0.6rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.7rem' }}>閉じる</button>
        </div>
      )}

      {/* レシピ一覧セクション */}
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
        
        {/* グリッド表示 */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', 
          gap: '1rem',
          paddingBottom: '2rem'
        }}>
          {filteredRecipes.map(recipe => (
            <div key={recipe.id} className="glass-card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>{recipe.image}</div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '0.9rem', color: 'var(--recipe-primary)', marginBottom: '0.2rem', lineHeight: '1.3' }}>{recipe.name}</h3>
                </div>
              </div>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.2rem', justifyContent: 'center' }}>
                {recipe.ingredients.slice(0, 2).map(ing => (
                  <span key={ing.name} style={{ fontSize: '0.6rem', background: 'rgba(255,255,255,0.05)', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>{ing.name}</span>
                ))}
              </div>

              <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <button 
                  onClick={() => {
                    setRegisteringRecipe(recipe);
                    setSelectedSlotInModal(selectedSlot);
                  }}
                  style={{ 
                    width: '100%', padding: '0.6rem', borderRadius: '8px', 
                    background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)',
                    color: '#10b981', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer'
                  }}
                >
                  📅 登録
                </button>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <button onClick={() => applyRecipe(recipe)} disabled={isApplying !== null} className="btn-primary" style={{ flex: 1, padding: '0.4rem', fontSize: '0.7rem' }}>{isApplying === recipe.id ? '...' : '作る'}</button>
                  <button onClick={() => setExpandedId(expandedId === recipe.id ? null : recipe.id)} style={{ padding: '0.4rem', background: 'rgba(255,255,255,0.05)', border: 'none', color: '#fff', borderRadius: '6px', fontSize: '0.7rem', cursor: 'pointer' }}>手順</button>
                </div>
              </div>

              {expandedId === recipe.id && (
                <div className="glass-card" style={{ marginTop: '0.5rem', padding: '0.6rem', background: 'rgba(255,255,255,0.02)', fontSize: '0.7rem', color: '#cbd5e1' }}>
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
          <div className="glass-card" style={{ width: '100%', maxWidth: '440px', padding: '1.5rem', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#fff', textAlign: 'center' }}>
              {registeringRecipe.name}
            </h3>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.5rem' }}>① 登録先スロット:</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {(Object.keys(SLOT_JP) as (keyof DayPlan)[]).map(slot => (
                  <button 
                    key={slot}
                    onClick={() => setSelectedSlotInModal(slot)}
                    style={{ 
                      flex: 1, minWidth: '70px', padding: '0.5rem', borderRadius: '8px', fontSize: '0.75rem',
                      background: selectedSlotInModal === slot ? 'var(--recipe-primary)' : 'rgba(255,255,255,0.05)',
                      color: selectedSlotInModal === slot ? '#000' : '#fff',
                      border: '1px solid ' + (selectedSlotInModal === slot ? 'var(--recipe-primary)' : 'rgba(255,255,255,0.1)'),
                      cursor: 'pointer', fontWeight: 'bold'
                    }}
                  >
                    {SLOT_JP[slot]}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.5rem' }}>② 曜日を選択（複数可）:</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.8rem' }}>
                {DAY_ORDER.map(day => (
                  <button 
                    key={day}
                    onClick={() => {
                      setSelectedDaysInModal(prev => 
                        prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
                      );
                    }}
                    style={{ 
                      padding: '1rem', borderRadius: '12px', fontSize: '1rem', fontWeight: 'bold',
                      background: selectedDaysInModal.includes(day) ? 'var(--recipe-primary)' : 'rgba(255,255,255,0.05)',
                      color: selectedDaysInModal.includes(day) ? '#000' : '#fff',
                      border: '1px solid ' + (selectedDaysInModal.includes(day) ? 'var(--recipe-primary)' : 'rgba(255,255,255,0.1)'),
                      cursor: 'pointer', position: 'relative'
                    }}
                  >
                    {DAYS_JP[day]}
                    {selectedDaysInModal.includes(day) && (
                      <span style={{ position: 'absolute', top: '3px', right: '8px', fontSize: '0.7rem' }}>✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1.5rem' }}>
              <button 
                onClick={() => {
                  setRegisteringRecipe(null);
                  setSelectedDaysInModal([]);
                }}
                style={{ 
                  flex: 1, padding: '1rem', borderRadius: '12px',
                  background: 'rgba(255,255,255,0.05)', border: 'none', color: '#94a3b8',
                  fontWeight: 'bold', cursor: 'pointer'
                }}
              >
                キャンセル
              </button>
              <button 
                disabled={selectedDaysInModal.length === 0}
                onClick={() => {
                  const currentWeeklyPlan = { ...weeklyPlan };
                  selectedDaysInModal.forEach(day => {
                    const currentDayPlan = currentWeeklyPlan[day] || {};
                    currentWeeklyPlan[day] = { ...currentDayPlan, [selectedSlotInModal]: registeringRecipe.id };
                  });
                  setWeeklyPlan(currentWeeklyPlan);
                  saveWeeklyPlan(currentWeeklyPlan);
                  
                  setMessage(${selectedDaysInModal.map(d => DAYS_JP[d]).join('、')}のに「」を登録しました。);
                  setRegisteringRecipe(null);
                  setSelectedDaysInModal([]);
                }}
                style={{ 
                  flex: 2, padding: '1rem', borderRadius: '12px',
                  background: selectedDaysInModal.length > 0 ? 'var(--recipe-primary)' : 'rgba(255,255,255,0.05)',
                  color: selectedDaysInModal.length > 0 ? '#000' : '#64748b',
                  fontWeight: 'bold', cursor: 'pointer', border: 'none'
                }}
              >
                {selectedDaysInModal.length > 0 ? ${selectedDaysInModal.length}件を登録する : '曜日を選択'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
