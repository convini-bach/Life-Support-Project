"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { storage, STORAGE_KEYS, AnalysisResult, HealthData, ExerciseLog, MealCategory, WeightLog } from "@/lib/storage";
import { calculateTargets, NutritionTargets } from "@/lib/nutrition-calculator";
import { EXERCISE_LABELS } from "@/lib/exercise-calculator";
import ScrollPicker from "@/components/ScrollPicker";
import { useUser } from "@clerk/nextjs";
import TabNavigation from "@/components/TabNavigation";

type ViewMode = 'day' | 'week' | 'month';

const APP_VERSION = "2604162335";

export default function NutriHistory() {
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  const [exerciseHistory, setExerciseHistory] = useState<ExerciseLog[]>([]);
  const [weightHistory, setWeightHistory] = useState<WeightLog[]>([]);
  const [targets, setTargets] = useState<NutritionTargets | null>(null);
  
  // UI State
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [viewMode, setViewMode] = useState<ViewMode>('day');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Clerk Hook
  const { user } = useUser();
  const isPremium = !!user?.publicMetadata?.isPremium;

  // Editing state
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingType, setEditingType] = useState<'meal' | 'exercise' | 'weight' | null>(null);
  const [editValues, setEditValues] = useState<any>({});

  // Form Data
  const calItems = Array.from({ length: 601 }, (_, i) => i * 5);
  const saltItems = Array.from({ length: 201 }, (_, i) => parseFloat((i * 0.1).toFixed(1)));
  const nutrientItems = Array.from({ length: 201 }, (_, i) => i);
  const vegItems = Array.from({ length: 1001 }, (_, i) => i);

  const loadData = () => {
    const data = storage.get<AnalysisResult[]>(STORAGE_KEYS.ANALYSIS_HISTORY) || [];
    setHistory(data);

    const exData = storage.get<ExerciseLog[]>(STORAGE_KEYS.EXERCISE_HISTORY) || [];
    setExerciseHistory(exData);

    const wData = storage.get<WeightLog[]>(STORAGE_KEYS.WEIGHT_HISTORY) || [];
    setWeightHistory(wData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));

    const profile = storage.get<HealthData>(STORAGE_KEYS.HEALTH_DATA);
    if (profile && profile.birthYear && profile.gender && profile.activityLevel) {
      const nutritionTargets = calculateTargets({
        birthYear: profile.birthYear,
        gender: profile.gender,
        height: parseFloat(profile.height),
        weight: parseFloat(profile.weight),
        activityLevel: profile.activityLevel
      });
      setTargets(nutritionTargets);
    }
  };

  useEffect(() => {
    loadData();
  }, [editingId]);

  // Statistics Calculation
  const getStatsForRange = () => {
    if (!targets) return null;

    const baseDate = new Date(selectedDate);
    const rangeDays = viewMode === 'day' ? 1 : viewMode === 'week' ? 7 : 30;
    
    // 期間内の日付リストを作成 (降順)
    const filteredHistory = history.filter(item => {
      const itemDate = new Date(item.date.split('T')[0]);
      const diff = (baseDate.getTime() - itemDate.getTime()) / (1000 * 3600 * 24);
      return diff >= 0 && diff < rangeDays;
    });

    const filteredExercise = exerciseHistory.filter(item => {
      const itemDate = new Date(item.date.split('T')[0]);
      const diff = (baseDate.getTime() - itemDate.getTime()) / (1000 * 3600 * 24);
      return diff >= 0 && diff < rangeDays;
    });

    const totals = filteredHistory.reduce((acc, item) => ({
      calories: acc.calories + item.calories,
      protein: acc.protein + item.nutrients.protein,
      fat: acc.fat + item.nutrients.fat,
      carbs: acc.carbs + item.nutrients.carbs,
      salt: acc.salt + item.nutrients.salt,
      fiber: acc.fiber + item.nutrients.fiber,
      vegetables: acc.vegetables + (item.nutrients.vegetablesTotal || 0)
    }), { calories: 0, protein: 0, fat: 0, carbs: 0, salt: 0, fiber: 0, vegetables: 0 });

    const totalBurned = filteredExercise.reduce((sum, item) => sum + item.burnedCalories, 0);

    const avg = {
      calories: Math.round((totals.calories - totalBurned) / rangeDays),
      intake: Math.round(totals.calories / rangeDays),
      burned: Math.round(totalBurned / rangeDays),
      protein: Math.round(totals.protein / rangeDays),
      fat: Math.round(totals.fat / rangeDays),
      carbs: Math.round(totals.carbs / rangeDays),
      salt: Number((totals.salt / rangeDays).toFixed(1)),
      fiber: Number((totals.fiber / rangeDays).toFixed(1)),
      vegetables: Math.round(totals.vegetables / rangeDays)
    };

    const weightChange = targets ? Number(((avg.calories - targets.energy) * 30 / 7200).toFixed(1)) : 0;

    return { avg, totals, count: filteredHistory.length, filteredHistory, filteredExercise, weightChange };
  };

  const stats = getStatsForRange();

  // Calendar Logic
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));
    return days;
  };

  const startEdit = (item: any, type: 'meal' | 'exercise' | 'weight') => {
    setEditingId(item.id);
    setEditingType(type);
    setEditValues({ ...item });
  };

  const handleEditChange = (field: string, value: any) => {
    setEditValues((prev: any) => {
      const updated = { ...prev };
      if (field.includes('.')) {
        const [p1, p2] = field.split('.');
        updated[p1] = { ...updated[p1], [p2]: value };
      } else {
        updated[field] = value;
      }
      return updated;
    });
  };

  const saveEdit = () => {
    if (!editingId || !editingType) return;
    
    if (editingType === 'meal') {
      const newHistory = history.map(item => item.id === editingId ? { ...item, ...editValues } as AnalysisResult : item);
      storage.set(STORAGE_KEYS.ANALYSIS_HISTORY, newHistory);
      setHistory(newHistory);
    } else if (editingType === 'exercise') {
      const newHistory = exerciseHistory.map(item => item.id === editingId ? { ...item, ...editValues } as ExerciseLog : item);
      storage.set(STORAGE_KEYS.EXERCISE_HISTORY, newHistory);
      setExerciseHistory(newHistory);
    } else if (editingType === 'weight') {
      const newHistory = weightHistory.map(item => item.id === editingId ? { ...item, ...editValues } as WeightLog : item);
      storage.set(STORAGE_KEYS.WEIGHT_HISTORY, newHistory);
      setWeightHistory(newHistory);
    }
    
    setEditingId(null);
    setEditingType(null);
  };

  const deleteItem = (id: number) => {
    if (!confirm("この記録を削除しますか？")) return;
    const newHistory = history.filter(item => item.id !== id);
    storage.set(STORAGE_KEYS.ANALYSIS_HISTORY, newHistory);
    setHistory(newHistory);
  };

  const deleteExercise = (id: number) => {
    if (!confirm("この運動記録を削除しますか？")) return;
    const newHistory = exerciseHistory.filter(item => item.id !== id);
    storage.set(STORAGE_KEYS.EXERCISE_HISTORY, newHistory);
    setExerciseHistory(newHistory);
  };

  const getBarColor = (current: number, target: number) => {
    const ratio = (current / target) * 100;
    const diff = Math.abs(ratio - 100);
    if (diff <= 20) return 'var(--primary)';
    if (diff <= 30) return '#f59e0b';
    return '#ef4444';
  };

  const EditSaveButtons = () => (
    <div style={{ display: 'flex', gap: '0.6rem' }}>
      <button onClick={saveEdit} style={{ 
        padding: '0.5rem 1.2rem', background: 'var(--primary)', color: 'white', border: 'none', 
        borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold'
      }}>確定（保存）</button>
      <button onClick={() => setEditingId(null)} style={{ 
        padding: '0.5rem 1.2rem', background: '#334155', color: 'white', border: 'none', 
        borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' 
      }}>戻る</button>
    </div>
  );

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Shared Navigation */}
      <TabNavigation />

      <main className="container" style={{ paddingTop: '8.5rem' }}>
        <div style={{ fontSize: '0.65rem', color: '#475569', textAlign: 'right', marginBottom: '0.5rem', fontFamily: 'monospace' }}>
          ver.{APP_VERSION}
        </div>
        
        {/* SECTION 1: カレンダー */}
        <section className="glass-card animate-fade-in" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1.2rem' }}>&lsaquo;</button>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{currentMonth.getFullYear()}年 {currentMonth.getMonth() + 1}月</h2>
            <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1.2rem' }}>&rsaquo;</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.3rem', textAlign: 'center' }}>
            {['日', '月', '火', '水', '木', '金', '土'].map(d => (
              <div key={d} style={{ fontSize: '0.7rem', color: '#64748b', paddingBottom: '0.5rem' }}>{d}</div>
            ))}
            {generateCalendarDays().map((day, i) => {
              if (!day) return <div key={`empty-${i}`} />;
              const dateStr = day.toISOString().split('T')[0];
              const isSelected = selectedDate === dateStr;
              const hasData = history.some(item => item.date.startsWith(dateStr));
              
              const isSelectable = isPremium || (() => {
                const today = new Date();
                today.setHours(0,0,0,0);
                const d = new Date(dateStr);
                d.setHours(0,0,0,0);
                const diff = (today.getTime() - d.getTime()) / (1000 * 3600 * 24);
                return diff < 3;
              })();
              
              return (
                <button 
                  key={dateStr}
                  onClick={() => isSelectable ? setSelectedDate(dateStr) : null}
                  style={{
                    aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    borderRadius: '8px', border: 'none', cursor: isSelectable ? 'pointer' : 'not-allowed', fontSize: '0.85rem',
                    background: isSelected ? 'var(--primary)' : 'transparent',
                    color: isSelected ? 'white' : isSelectable ? '#cbd5e1' : '#334155',
                    position: 'relative',
                    transition: 'all 0.2s',
                    opacity: isSelectable ? 1 : 0.4
                  }}
                >
                  {day.getDate()}
                  {hasData && !isSelected && <div style={{ position: 'absolute', bottom: '4px', width: '4px', height: '4px', borderRadius: '2px', background: isSelectable ? 'var(--primary)' : '#475569' }} />}
                  {!isSelectable && <div style={{ position: 'absolute', top: '2px', right: '2px', fontSize: '0.6rem' }}>🔒</div>}
                </button>
              );
            })}
          </div>
        </section>

        {/* SECTION 2: 分析範囲切り替えタブ */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', background: 'rgba(255,255,255,0.02)', padding: '0.3rem', borderRadius: '10px' }}>
          {[
            { id: 'day', l: '特定日' },
            { id: 'week', l: '7日間平均' },
            { id: 'month', l: '30日間平均' }
          ].map(m => (
            <button 
              key={m.id} 
              onClick={() => setViewMode(m.id as ViewMode)}
              style={{
                flex: 1, padding: '0.7rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 'bold',
                background: viewMode === m.id ? 'var(--primary)' : 'transparent',
                color: viewMode === m.id ? 'white' : '#64748b',
                transition: 'all 0.3s'
              }}
            >
              {m.l}
            </button>
          ))}
        </div>

        {/* SECTION 3: 統計グラフ */}
        <section className="glass-card" style={{ marginBottom: '3rem', padding: '1.5rem', border: '1px solid rgba(16, 185, 129, 0.1)', position: 'relative', overflow: 'hidden' }}>
          {!targets ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>プロフィールを設定してください</div>
          ) : !stats ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>データがありません</div>
          ) : (
            <>
              {/* PAID MASK for Statistics */}
              {viewMode !== 'day' && !isPremium && (
                <div style={{ 
                  position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10,
                  background: 'rgba(10, 15, 28, 0.7)', backdropFilter: 'blur(8px)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>🔒</div>
                  <div style={{ fontWeight: 'bold', marginBottom: '1rem', color: 'white' }}>平均データはプレミアム限定です</div>
                  <Link href="/profile" className="btn-primary" style={{ textDecoration: 'none', padding: '0.6rem 1.2rem' }}>
                    プレミアムを試す
                  </Link>
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                <div>
                  <h3 style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '1.5rem' }}>
                    {viewMode === 'day' ? `${selectedDate} の状況` : `${selectedDate} から遡った${viewMode === 'week' ? '7' : '30'}日間の平均`}
                  </h3>
                  <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: getBarColor(stats.avg.calories, targets.energy) }}>
                      {stats.avg.calories} <span style={{ fontSize: '0.9rem', fontWeight: 'normal', color: '#64748b' }}>/ {targets.energy} kcal</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    {[
                      { label: 'タンパク質', cur: stats.avg.protein, target: targets.protein.min, unit: 'g' },
                      { label: '脂質', cur: stats.avg.fat, target: targets.fat.min, unit: 'g' },
                      { label: '炭水化物', cur: stats.avg.carbs, target: targets.carbs.min, unit: 'g' },
                      { label: '塩分', cur: stats.avg.salt, target: targets.salt, unit: 'g' },
                      { label: '食物繊維', cur: stats.avg.fiber, target: targets.fiber, unit: 'g' },
                      { label: '野菜量', cur: stats.avg.vegetables, target: targets.vegetables, unit: 'g' },
                    ].map(item => {
                      const ratio = Math.min(100, (item.cur / item.target) * 100);
                      const color = getBarColor(item.cur, item.target);
                      return (
                        <div key={item.label}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.4rem' }}>
                            <span>{item.label}</span>
                            <span style={{ color: color }}>
                              {(item.cur ?? 0).toFixed(item.label === '塩分' ? 1 : 0)}{item.unit} ({Math.round((item.cur / item.target) * 100)}%)
                            </span>
                          </div>
                          <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                            <div style={{ width: `${ratio}%`, height: '100%', background: color, transition: 'width 1s ease-out' }}></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '16px', flex: 1 }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 'bold', marginBottom: '1rem' }}>期間中の分析</div>
                    <div style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: '1.6' }}>
                      {stats.avg.calories > targets.energy ? "全体として目標カロリーを上回っています。" : "カロリー管理は非常に良好です。"}
                    </div>
                  </div>
                  
                  {/* WEIGHT PREDICTION BOX */}
                  <div style={{ background: 'rgba(16, 185, 129, 0.05)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(16, 185, 129, 0.1)', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 'bold', marginBottom: '1rem' }}>1ヶ月後の体重予測</div>
                    
                    {isPremium ? (
                      <div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: stats.weightChange > 0 ? '#ef4444' : 'var(--primary)' }}>
                          {stats.weightChange > 0 ? '+' : ''}{stats.weightChange} <span style={{ fontSize: '0.8rem' }}>kg</span>
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.5rem' }}>
                          現在のペースを継続した場合の予測です
                        </div>
                      </div>
                    ) : (
                      <div style={{ filter: 'blur(3px)', opacity: 0.5, userSelect: 'none' }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>-1.2 kg</div>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.5rem' }}>
                          プレミアムで予測を表示
                        </div>
                      </div>
                    )}
                    {!isPremium && <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>🔒</div>}
                  </div>
                </div>
              </div>
            </>
          )}
        </section>

        {/* SECTION 4: 選択期間の履歴リスト */}
        <div className="responsive-grid-800" style={{ alignItems: 'start' }}>
          <section>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>🍱</span> 食事の履歴 ({stats?.filteredHistory.length || 0}件)
            </h2>
            {stats && stats.filteredHistory.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {stats.filteredHistory.map((item) => (
                  <div key={item.id} className="glass-card" style={{ padding: '1.2rem', borderLeft: '3px solid var(--primary)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ color: '#64748b', fontSize: '0.7rem' }}>{new Date(item.date).toLocaleDateString('ja-JP')} ・ {item.mealCategory || '未分類'}</div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{item.name}</h3>
                        <div style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.9rem' }}>{(item.calories ?? 0).toFixed(0)} kcal</div>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => startEdit(item, 'meal')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>✏️</button>
                        <button onClick={() => deleteItem(item.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>🗑️</button>
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginTop: '0.5rem', background: 'rgba(255,255,255,0.02)', padding: '0.6rem', borderRadius: '6px' }}>
                      {[
                        { l: 'P', v: item.nutrients.protein, u: 'g' },
                        { l: 'F', v: item.nutrients.fat, u: 'g' },
                        { l: 'C', v: item.nutrients.carbs, u: 'g' },
                        { l: '塩', v: item.nutrients.salt, u: 'g' },
                        { l: '繊', v: item.nutrients.fiber, u: 'g' },
                        { l: '菜', v: item.nutrients.vegetablesTotal, u: 'g' },
                      ].map(n => (
                        <div key={n.l} style={{ fontSize: '0.65rem', color: '#94a3b8' }}>{n.l}: <span style={{ color: 'white' }}>{(n.v ?? 0).toFixed(n.l === '塩' ? 1 : 0)}{n.u}</span></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : <p style={{ color: '#64748b', textAlign: 'center', padding: '2rem' }}>記録がありません</p>}
          </section>

          <section>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>🏃</span> 運動の履歴 ({stats?.filteredExercise.length || 0}件)
            </h2>
            {stats && stats.filteredExercise.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {stats.filteredExercise.map((item) => (
                  <div key={item.id} className="glass-card" style={{ padding: '1.2rem', borderLeft: '3px solid #3b82f6' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ color: '#64748b', fontSize: '0.7rem' }}>{new Date(item.date).toLocaleDateString('ja-JP')}</div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{EXERCISE_LABELS[item.type]}</h3>
                        <div style={{ color: '#3b82f6', fontWeight: '600', fontSize: '0.9rem' }}>-{item.burnedCalories} kcal ・ {item.minutes}分</div>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => startEdit(item, 'exercise')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>✏️</button>
                        <button onClick={() => deleteExercise(item.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>🗑️</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : <p style={{ color: '#64748b', textAlign: 'center', padding: '2rem' }}>記録がありません</p>}
          </section>
        </div>

        {/* SECTION 5: 体重の履歴 */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>⚖️</span> 体重の履歴 ({weightHistory.length}件)
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {weightHistory.map(item => (
              <div key={item.id} className="glass-card" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ color: '#64748b', fontSize: '0.7rem' }}>{new Date(item.date).toLocaleDateString('ja-JP')}</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{item.weight} <span style={{ fontSize: '0.8rem', fontWeight: 'normal' }}>kg</span></div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => startEdit(item, 'weight')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>✏️</button>
                  <button onClick={() => {
                    if (confirm("この記録を削除しますか？")) {
                      const newHistory = weightHistory.filter(w => w.id !== item.id);
                      storage.set(STORAGE_KEYS.WEIGHT_HISTORY, newHistory);
                      setWeightHistory(newHistory);
                    }
                  }} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>🗑️</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EDIT MODAL */}
        {editingId && (
          <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 2000,
            background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'flex-end', justifyContent: 'center'
          }}>
            <div className="glass-card animate-slide-up" style={{ 
              width: '100%', maxWidth: '500px', borderBottomLeftRadius: 0, borderBottomRightRadius: 0,
              padding: '2rem', maxHeight: '90vh', overflowY: 'auto'
            }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '2rem', fontWeight: 'bold' }}>記録の編集</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.5rem' }}>日付</label>
                  <input 
                    type="date" 
                    value={editValues.date ? editValues.date.split('T')[0] : ''} 
                    onChange={(e) => handleEditChange('date', e.target.value + (editValues.date.includes('T') ? 'T' + editValues.date.split('T')[1] : ''))}
                    style={{ width: '100%', padding: '0.8rem', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: 'white' }}
                  />
                </div>

                {editingType === 'meal' && (
                  <>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.8rem' }}>食事のタイミング / 種類</label>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', marginBottom: '1rem' }}>
                        <select 
                          value={editValues.mealCategory || ''} 
                          onChange={(e) => handleEditChange('mealCategory', e.target.value)}
                          style={{ padding: '0.8rem', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: 'white' }}
                        >
                          {['朝食', '昼食', '夕食', '間食'].map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                        <select 
                          value={editValues.mealSource || ''} 
                          onChange={(e) => handleEditChange('mealSource', e.target.value)}
                          style={{ padding: '0.8rem', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: 'white' }}
                        >
                          <option value="home">自炊</option>
                          <option value="restaurant">外食</option>
                          <option value="takeout">惣菜</option>
                        </select>
                      </div>

                      <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.5rem' }}>料理名</label>
                      <input 
                        type="text" 
                        value={editValues.name || ''} 
                        onChange={(e) => handleEditChange('name', e.target.value)}
                        style={{ width: '100%', padding: '0.8rem', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: 'white', marginBottom: '1rem' }}
                      />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                      <ScrollPicker label="エネルギー" items={calItems} value={Math.round(editValues.calories || 0)} onChange={(v) => handleEditChange('calories', v)} unit="kcal" />
                      <ScrollPicker label="塩分" items={saltItems} value={editValues.nutrients?.salt || 0} onChange={(v) => handleEditChange('nutrients.salt', v)} unit="g" />
                      <ScrollPicker label="タンパク質" items={nutrientItems} value={editValues.nutrients?.protein || 0} onChange={(v) => handleEditChange('nutrients.protein', v)} unit="g" />
                      <ScrollPicker label="脂質" items={nutrientItems} value={editValues.nutrients?.fat || 0} onChange={(v) => handleEditChange('nutrients.fat', v)} unit="g" />
                      <ScrollPicker label="炭水化物" items={nutrientItems} value={editValues.nutrients?.carbs || 0} onChange={(v) => handleEditChange('nutrients.carbs', v)} unit="g" />
                      <ScrollPicker label="食物繊維" items={nutrientItems} value={editValues.nutrients?.fiber || 0} onChange={(v) => handleEditChange('nutrients.fiber', v)} unit="g" />
                      <ScrollPicker label="野菜量" items={vegItems} value={editValues.nutrients?.vegetablesTotal || 0} onChange={(v) => handleEditChange('nutrients.vegetablesTotal', v)} unit="g" />
                    </div>
                  </>
                )}

                {editingType === 'exercise' && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                    <ScrollPicker label="消費カロリー" items={calItems} value={editValues.burnedCalories || 0} onChange={(v) => handleEditChange('burnedCalories', v)} unit="kcal" />
                    <ScrollPicker label="時間" items={Array.from({length: 181}, (_, i) => i)} value={editValues.minutes || 0} onChange={(v) => handleEditChange('minutes', v)} unit="分" />
                  </div>
                )}

                {editingType === 'weight' && (
                  <ScrollPicker label="体重" items={Array.from({length: 1500}, (_, i) => parseFloat((30 + i * 0.1).toFixed(1)))} value={editValues.weight || 0} onChange={(v) => handleEditChange('weight', v)} unit="kg" />
                )}
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button className="btn-primary" onClick={saveEdit} style={{ flex: 2 }}>保存する</button>
                <button className="btn-secondary" onClick={() => { setEditingId(null); setEditingType(null); }} style={{ flex: 1 }}>キャンセル</button>
              </div>
            </div>
          </div>
        )}

        <footer style={{ marginTop: '4rem', paddingBottom: '2rem', textAlign: 'center', color: '#475569', fontSize: '0.8rem' }}>
          &copy; 2026 Life Support AI Ecosystem
        </footer>
      </main>
    </div>
  );
}
