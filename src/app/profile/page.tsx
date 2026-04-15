"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { storage, STORAGE_KEYS, HealthData, exportDataJSON, exportMealsCSV, importDataJSON } from "@/lib/storage";
import ScrollPicker from "@/components/ScrollPicker";

export default function ProfilePage() {
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(65.0);
  const [birthYear, setBirthYear] = useState(1990);
  const [gender, setGender] = useState<"male" | "female">("male");
  const [activityLevel, setActivityLevel] = useState<"low" | "normal" | "high">("normal");
  const [concern, setConcern] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  // AI settings
  const [apiKey, setApiKey] = useState("");
  const [selectedModel, setSelectedModel] = useState("gemini-2.5-flash");
  const [isTesting, setIsTesting] = useState(false);
  const [availableModels, setAvailableModels] = useState<{ id: string; name: string }[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Picker items
  const heightItems = Array.from({ length: 151 }, (_, i) => 100 + i);
  const weightItems = Array.from({ length: 1701 }, (_, i) => parseFloat((30 + i * 0.1).toFixed(1)));
  const yearItems = Array.from({ length: 107 }, (_, i) => 1920 + i).reverse();

  useEffect(() => {
    const savedData = storage.get<HealthData>(STORAGE_KEYS.HEALTH_DATA);
    if (savedData) {
      if (savedData.height) setHeight(parseFloat(savedData.height));
      if (savedData.weight) setWeight(parseFloat(savedData.weight));
      if (savedData.concern) setConcern(savedData.concern);
      if (savedData.birthYear) setBirthYear(savedData.birthYear);
      if (savedData.gender) setGender(savedData.gender);
      if (savedData.activityLevel) setActivityLevel(savedData.activityLevel);
    }

    const savedKey = storage.get<string>(STORAGE_KEYS.API_KEY);
    if (savedKey) setApiKey(savedKey);

    const savedModel = storage.get<string>(STORAGE_KEYS.SELECTED_MODEL);
    if (savedModel) {
      const validModels = ["gemini-2.5-flash", "gemini-2.5-pro", "gemini-3.1-pro-preview", "gemini-3.1-flash-lite-preview"];
      if (!validModels.includes(savedModel)) {
        setSelectedModel("gemini-2.5-flash");
        storage.set(STORAGE_KEYS.SELECTED_MODEL, "gemini-2.5-flash");
      } else {
        setSelectedModel(savedModel);
      }
    }
  }, []);

  const handleSave = () => {
    storage.set(STORAGE_KEYS.HEALTH_DATA, {
      height: height.toString(),
      weight: weight.toString(),
      concern,
      birthYear,
      gender,
      activityLevel
    });
    
    storage.set(STORAGE_KEYS.API_KEY, apiKey.trim());
    storage.set(STORAGE_KEYS.SELECTED_MODEL, selectedModel);

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const testConnection = async () => {
    const trimmedKey = apiKey.trim();
    if (!trimmedKey) {
      alert("APIキーを入力してください。");
      return;
    }

    setIsTesting(true);
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${trimmedKey}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      
      const models = data.models
        .filter((m: any) => m.supportedGenerationMethods.includes("generateContent"))
        .map((m: any) => ({
          id: m.name.split('/').pop(),
          name: m.displayName
        }));
      
      setAvailableModels(models);
      alert("接続テストに成功しました。利用可能なモデル一覧を更新しました。");
    } catch (e: any) {
      alert("接続に失敗しました: " + e.message);
    } finally {
      setIsTesting(false);
    }
  };

  const handleExportJSON = () => {
    const json = exportDataJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';
    a.href = url;
    a.download = `nutrivision_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportCSV = () => {
    const csv = exportMealsCSV();
    if (!csv) {
      alert("書き出す食事履歴がありません。");
      return;
    }
    const blob = new Blob(["\uFEFF" + csv], { type: 'text/csv;charset=utf-8' }); 
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';
    a.href = url;
    a.download = `nutrivision_meals_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (importDataJSON(content)) {
        alert("データの復元が完了しました。ページをリロードします。");
        window.location.reload();
      } else {
        alert("復元に失敗しました。ファイル形式を確認してください。");
      }
    };
    reader.readAsText(file);
  };

  const handleClearAll = () => {
    if (confirm("【警告】すべての履歴（食事・運動・体重）を完全に消去しますか？\nこの操作は取り消せません。")) {
      storage.remove(STORAGE_KEYS.ANALYSIS_HISTORY);
      storage.remove(STORAGE_KEYS.EXERCISE_HISTORY);
      storage.remove(STORAGE_KEYS.WEIGHT_HISTORY);
      alert("すべての履歴を消去しました。");
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Sticky Top Nav */}
      <nav style={{ 
        padding: '0.8rem 1rem', 
        display: 'flex', 
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(10, 15, 28, 0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)'
      }}>
        <Link href="/nutri-vision" style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          &larr; <span style={{ marginLeft: '0.4rem' }}>戻る</span>
        </Link>
        <span style={{ marginLeft: '1.2rem', color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>設定 & データ管理</span>
      </nav>

      <main className="container" style={{ paddingTop: '2rem' }}>
        <header style={{ marginBottom: '3rem' }}>
          <h1 className="gradient-text" style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>設定 & データ管理</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>自分に合わせたカスタマイズと、大切なデータのバックアップ。</p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
          
          <section className="glass-card animate-fade-in">
            <h2 style={{ fontSize: '1.1rem', marginBottom: '2rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>📏</span> 身体データ
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              <ScrollPicker label="身長" items={heightItems} value={height} onChange={setHeight} unit="cm" />
              <ScrollPicker label="体重" items={weightItems} value={weight} onChange={setWeight} unit="kg" />
              <ScrollPicker label="誕生年" items={yearItems} value={birthYear} onChange={setBirthYear} unit="年" />
            </div>
            
            <div style={{ marginTop: '2.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1rem' }}>性別 / 活動レベル</label>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                {(['male', 'female'] as const).map(g => (
                  <button key={g} onClick={() => setGender(g)} style={{ flex: 1, padding: '0.8rem', borderRadius: '8px', border: '1px solid', borderColor: gender === g ? 'var(--primary)' : '#334155', background: gender === g ? 'rgba(59, 130, 246, 0.1)' : 'transparent', color: gender === g ? 'white' : '#64748b', cursor: 'pointer' }}>
                    {g === 'male' ? '男性' : '女性'}
                  </button>
                ))}
              </div>
              <select 
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value as any)}
                style={{ width: '100%', padding: '0.8rem', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: 'white', cursor: 'pointer' }}
              >
                <option value="low">低い（デスクワーク中心）</option>
                <option value="normal">普通（立ち仕事や軽い運動）</option>
                <option value="high">高い（活発な運動・重労働）</option>
              </select>
            </div>
          </section>

          <section className="glass-card animate-fade-in" style={{ border: '1px solid rgba(16, 185, 129, 0.2)' }}>
            <h2 style={{ fontSize: '1.1rem', marginBottom: '2rem', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>🧠</span> AIパートナー設定
            </h2>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Gemini API キー</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input 
                  type="password" 
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="AI Studioから取得したキー"
                  style={{ flex: 1, padding: '0.8rem', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: 'white' }}
                />
                <button className="btn-primary" onClick={testConnection} disabled={isTesting} style={{ padding: '0 1rem', background: '#1e293b', border: '1px solid #334155', width: 'auto' }}>
                  {isTesting ? "テスト中" : "接続"}
                </button>
              </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem' }}>利用するモデル</label>
              <select 
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                style={{ width: '100%', padding: '0.8rem', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: 'white' }}
              >
                <option value="gemini-2.5-flash">Gemini 2.5 Flash (安定・高速)</option>
                <option value="gemini-3.1-pro-preview">Gemini 3.1 Pro (次世代・高性能)</option>
                <option value="gemini-3.1-flash-lite-preview">Gemini 3.1 Flash-Lite (最速)</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem' }}>分析時の優先事項</label>
              <textarea 
                value={concern}
                onChange={(e) => setConcern(e.target.value)}
                placeholder="例：タンパク質を多めに、塩分を控えたい..."
                rows={3}
                style={{ width: '100%', padding: '0.8rem', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: 'white', resize: 'none' }}
              />
            </div>
          </section>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', justifyContent: 'center', paddingBottom: '4rem', borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: '4rem' }}>
          <button className="btn-primary" onClick={handleSave} style={{ minWidth: '240px', padding: '1.2rem' }}>
            すべての設定を保存
          </button>
          {isSaved && (
            <span className="animate-fade-in" style={{ color: 'var(--accent)', fontWeight: 'bold' }}>
              ✓ 保存完了
            </span>
          )}
        </div>

        <section className="glass-card animate-fade-in" style={{ marginBottom: '4rem', padding: '2rem', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', fontWeight: 'bold', color: '#ef4444' }}>📦 データ管理・バックアップ</h2>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '2rem' }}>アプリ上のすべてのデータ（設定・履歴）を保存したり、以前の状態に戻したりできます。</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.5rem' }}>エクスポート（ダウンロード）</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <button onClick={handleExportJSON} style={{ padding: '0.8rem', background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: 'white', cursor: 'pointer', fontSize: '0.85rem' }}>
                  JSON形式で保存 (復元用)
                </button>
                <button onClick={handleExportCSV} style={{ padding: '0.8rem', background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: 'white', cursor: 'pointer', fontSize: '0.85rem' }}>
                  CSV形式で保存 (閲覧用)
                </button>
              </div>
            </div>
            
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.5rem' }}>インポート（復元）</div>
              <button onClick={() => fileInputRef.current?.click()} style={{ width: '100%', padding: '0.8rem', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid #3b82f6', borderRadius: '8px', color: '#60a5fa', cursor: 'pointer', fontSize: '0.85rem' }}>
                JSONから復元する
              </button>
              <input type="file" ref={fileInputRef} hidden accept=".json" onChange={handleImportJSON} />
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(239, 68, 68, 0.1)', paddingTop: '1.5rem' }}>
            <button onClick={handleClearAll} style={{ background: 'transparent', border: '1px solid #ef4444', color: '#ef4444', padding: '0.8rem 1.5rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>
              すべての記録（歴史）を完全消去
            </button>
          </div>
        </section>

        <footer style={{ marginTop: '4rem', color: '#475569', fontSize: '0.8rem', textAlign: 'center', paddingBottom: '2rem' }}>
          &copy; 2026 Life Support Project. All data is managed Local-First.
        </footer>
      </main>
    </div>
  );
}
