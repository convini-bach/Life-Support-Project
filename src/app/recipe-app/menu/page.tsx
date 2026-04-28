"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { loadFridgeData, saveFridgeData, FridgeItem } from '../lib/fridge-logic';
import { loadFamilyData, FamilyMember } from '../lib/family-logic';
import { subtractQuantity, parseQuantity } from '../lib/quantity-logic';
import { loadWeeklyPlan, saveWeeklyPlan, WeeklyPlan, DayOfWeek, DAYS_JP, loadPlannerSettings, savePlannerSettings, DayPlan } from '../lib/planner-logic';
import { Recipe, RecipeCategory, MOCK_RECIPES } from '../lib/recipes';



const DAY_ORDER: DayOfWeek[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const SLOT_JP: Record<string, string> = {
  main: '主菜', side1: '副菜1', side2: '副菜2', side3: '副菜3', soup: '汁物'
};

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

  const [customRecipes, setCustomRecipes] = useState<Recipe[]>([]);
  const [urlInput, setUrlInput] = useState('');
  const [suggestInput, setSuggestInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setFamily(loadFamilyData());
    setFridgeItems(loadFridgeData());
    setWeeklyPlan(loadWeeklyPlan());
    const settings = loadPlannerSettings();
    setShoppingDays(settings.shoppingDays);

    const savedCustom = localStorage.getItem('smart-kitchen-suggested-menu');
    if (savedCustom) setCustomRecipes(JSON.parse(savedCustom));
  }, []);

  const saveCustomRecipe = (recipe: Recipe) => {
    const newCustom = [...customRecipes, recipe];
    setCustomRecipes(newCustom);
    localStorage.setItem('smart-kitchen-suggested-menu', JSON.stringify(newCustom));
  };

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
    setMessage(`${DAYS_JP[day]}の${SLOT_JP[selectedSlot]}に「${recipe.name}」を登録しました。`);
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
      setMessage(`「${recipe.name}」を調理しました。在庫を更新しました！`);
    }, 1000);
  };

  const allRecipes = [...recipes, ...customRecipes];

  const filteredRecipes = allRecipes.filter(r => {
    if (filter === 'all') return true;
    if (filter === 'main') return r.category === 'meat' || r.category === 'fish' || r.category === 'noodle';
    if (filter === 'side') return r.category === 'vegetable';
    if (filter === 'soup') return r.name.includes('汁') || r.name.includes('スープ') || r.name.includes('ポタージュ');
    return r.category === filter;
  });

  const getSlotColor = (day: DayOfWeek, slot: keyof DayPlan) => {
    if (!weeklyPlan[day]?.[slot]) return '#1e293b';
    if (slot === 'main') return '#ef4444';
    if (slot === 'side1') return '#3b82f6';
    if (slot === 'side2') return '#06b6d4';
    if (slot === 'side3') return '#10b981';
    if (slot === 'soup') return '#f59e0b';
    return '#4ade80';
  };

  const handleUrlRegister = () => {
    if (!urlInput) return;
    setIsProcessing(true);
    // 擬似的なURL解析
    setTimeout(() => {
      const newRecipe: Recipe = {
        id: `url-${Date.now()}`,
        name: `ウェブで見つけたレシピ (${urlInput.split('/')[2] || '外部サイト'})`,
        description: 'URLから登録されたレシピです。',
        category: 'other',
        ingredients: [
          { name: 'メイン材料', amountPerPerson: 100, unit: 'g' },
          { name: '付け合わせ', amountPerPerson: 50, unit: 'g' }
        ],
        steps: ['URLを参照して調理してください', urlInput],
        image: '🔗',
        url: urlInput
      };
      saveCustomRecipe(newRecipe);
      setUrlInput('');
      setIsProcessing(false);
      setMessage(`URLから「${newRecipe.name}」を登録しました。`);
    }, 1500);
  };

  const handleSuggest = () => {
    if (!suggestInput) return;
    setIsProcessing(true);
    // 擬似的なAI提案
    setTimeout(() => {
      const newRecipe: Recipe = {
        id: `suggest-${Date.now()}`,
        name: `AI提案: ${suggestInput}風の一皿`,
        description: `${suggestInput}という気分に合わせてAIが考えたメニューです。`,
        category: 'meat',
        ingredients: [
          { name: 'お好みの肉', amountPerPerson: 120, unit: 'g' },
          { name: '旬の野菜', amountPerPerson: 80, unit: 'g' }
        ],
        steps: ['材料を揃える', '気分に合わせて味付けする', '愛情を込めて仕上げる'],
        image: '✨'
      };
      saveCustomRecipe(newRecipe);
      setSuggestInput('');
      setIsProcessing(false);
      setMessage(`AIが「${newRecipe.name}」を提案し、リストに追加しました！`);
    }, 1500);
  };

  return (
    <main style={{ padding: '1rem', maxWidth: '1200px', margin: '0 auto', paddingBottom: '5rem' }}>
      <div className="responsive-grid-800" style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '2rem', alignItems: 'start', marginTop: '1rem' }}>
        {/* 左サイドバー: 週間スケジュール */}
        <aside className="sidebar-sticky">
          <section className="glass-card" style={{ padding: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--recipe-primary)', marginBottom: '0.8rem' }}>🛒 買い物日:</div>
            <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
              {DAY_ORDER.map(day => (
                <button 
                  key={day} 
                  onClick={() => toggleShoppingDay(day)} 
                  style={{ 
                    padding: '0.3rem 0.6rem', borderRadius: '12px', fontSize: '0.7rem', 
                    background: shoppingDays.includes(day) ? 'var(--recipe-primary)' : 'rgba(255,255,255,0.05)', 
                    color: shoppingDays.includes(day) ? '#000' : '#fff', 
                    border: 'none', cursor: 'pointer' 
                  }}
                >
                  {DAYS_JP[day]}
                </button>
              ))}
            </div>
          </section>

          <section className="glass-card" style={{ padding: '1.2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Weekly Schedule</h2>
              <div style={{ fontSize: '0.7rem', color: 'var(--recipe-primary)', fontWeight: 'bold' }}>
                {SLOT_JP[selectedSlot as string]}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {DAY_ORDER.map(day => {
                const currentRecipeId = weeklyPlan[day]?.[selectedSlot];
                const currentRecipe = allRecipes.find(r => r.id === currentRecipeId);
                
                return (
                  <div key={day} style={{ 
                    width: '100%',
                    background: 'rgba(255,255,255,0.02)', borderRadius: '10px', padding: '0.6rem 0.8rem', 
                    border: shoppingDays.includes(day) ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(255,255,255,0.05)', 
                    display: 'flex', alignItems: 'center', gap: '0.8rem', justifyContent: 'space-between'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flex: 1, minWidth: 0 }}>
                      <div style={{ 
                        width: '28px', height: '28px', borderRadius: '50%', 
                        background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.7rem', fontWeight: 'bold', color: day === 'sun' ? '#f87171' : day === 'sat' ? '#60a5fa' : '#94a3b8',
                        flexShrink: 0
                      }}>
                        {DAYS_JP[day]}
                      </div>
                      
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ 
                          fontSize: '0.85rem', color: currentRecipe ? '#fff' : '#334155', 
                          fontWeight: currentRecipe ? 'bold' : 'normal',
                          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                        }}>
                          {currentRecipe ? currentRecipe.name : '---'}
                        </div>
                        
                        <div style={{ display: 'flex', gap: '0.3rem', marginTop: '0.2rem' }}>
                          {(Object.keys(SLOT_JP) as (keyof DayPlan)[]).map(slot => (
                            <div key={slot} style={{ 
                              width: '5px', height: '5px', borderRadius: '50%',
                              background: getSlotColor(day, slot),
                              border: selectedSlot === slot ? '1px solid #fff' : 'none'
                            }} />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.3rem', flexShrink: 0 }}>
                      {currentRecipeId && (
                        <>
                          <Link 
                            href={`/recipe-app/recipe?day=${day}`}
                            style={{ background: 'rgba(74, 222, 128, 0.1)', border: 'none', color: 'var(--recipe-primary)', borderRadius: '4px', padding: '0.2rem 0.5rem', fontSize: '0.65rem', cursor: 'pointer', textDecoration: 'none' }}
                          >
                            詳細
                          </Link>
                          <button 
                            onClick={() => clearSlot(day, selectedSlot)} 
                            style={{ background: 'rgba(248, 113, 113, 0.1)', border: 'none', color: '#f87171', borderRadius: '4px', padding: '0.2rem 0.5rem', fontSize: '0.65rem', cursor: 'pointer' }}
                          >
                            ×
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </aside>

        {/* 右メイン: レシピ検索・提案 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {message && (
            <div className="glass-card" style={{ padding: '1.2rem', borderLeft: '4px solid var(--recipe-primary)', background: 'rgba(16, 185, 129, 0.1)', whiteSpace: 'pre-wrap', fontSize: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>{message}</span>
              <button onClick={() => setMessage(null)} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '0.2rem 0.6rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.7rem' }}>閉じる</button>
            </div>
          )}

          {/* AI提案 & URL登録セクション */}
          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div className="glass-card" style={{ padding: '1.2rem' }}>
              <h3 style={{ fontSize: '0.9rem', marginBottom: '0.8rem', color: 'var(--recipe-primary)' }}>✨ AI提案</h3>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input 
                  type="text" 
                  value={suggestInput}
                  onChange={(e) => setSuggestInput(e.target.value)}
                  placeholder="さっぱりした鶏肉"
                  style={{ flex: 1, padding: '0.5rem', borderRadius: '8px', fontSize: '0.85rem' }}
                />
                <button 
                  onClick={handleSuggest} 
                  disabled={isProcessing || !suggestInput}
                  className="btn-primary" 
                  style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                >
                  提案
                </button>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '1.2rem' }}>
              <h3 style={{ fontSize: '0.9rem', marginBottom: '0.8rem', color: '#60a5fa' }}>🔗 URL登録</h3>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input 
                  type="text" 
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://..."
                  style={{ flex: 1, padding: '0.5rem', borderRadius: '8px', fontSize: '0.85rem' }}
                />
                <button 
                  onClick={handleUrlRegister} 
                  disabled={isProcessing || !urlInput}
                  style={{ padding: '0.5rem 1rem', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem' }}
                >
                  追加
                </button>
              </div>
            </div>
          </section>

          {/* 登録先スロット選択 */}
          <section className="glass-card" style={{ padding: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>スロット:</span>
            {(Object.keys(SLOT_JP) as (keyof DayPlan)[]).map(slot => (
              <button 
                key={slot}
                onClick={() => setSelectedSlot(slot)}
                style={{ 
                  padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.8rem',
                  background: selectedSlot === slot ? 'var(--recipe-primary)' : 'rgba(255,255,255,0.05)',
                  color: selectedSlot === slot ? '#000' : '#fff',
                  border: 'none', cursor: 'pointer', fontWeight: 'bold'
                }}
              >
                {SLOT_JP[slot]}
              </button>
            ))}
          </section>

          {/* レシピ一覧 */}
          <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.2rem', color: '#fff', margin: 0 }}>🥘 おすすめレシピ</h2>
              <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '0.2rem' }}>
                {['all', 'main', 'side', 'soup'].map(cat => (
                  <button key={cat} onClick={() => setFilter(cat as any)} style={{ padding: '0.3rem 0.8rem', borderRadius: '15px', fontSize: '0.7rem', background: filter === cat ? 'rgba(255,255,255,0.1)' : 'transparent', color: filter === cat ? 'var(--recipe-primary)' : '#94a3b8', border: '1px solid ' + (filter === cat ? 'var(--recipe-primary)' : 'rgba(255,255,255,0.1)'), cursor: 'pointer', whiteSpace: 'nowrap' }}>{cat === 'all' ? 'すべて' : cat === 'main' ? '主菜' : cat === 'side' ? '副菜' : '汁物'}</button>
                ))}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem', paddingBottom: '2rem' }}>
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
        </div>
      </div>

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
                  
                  setMessage(`${selectedDaysInModal.map(d => DAYS_JP[d]).join('、')}の${SLOT_JP[selectedSlotInModal]}に「${registeringRecipe.name}」を登録しました。`);
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
                {selectedDaysInModal.length > 0 ? `${selectedDaysInModal.length}件を登録する` : '曜日を選択'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
