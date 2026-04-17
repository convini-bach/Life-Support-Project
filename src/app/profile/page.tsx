"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { storage, STORAGE_KEYS, HealthData, exportDataJSON, exportMealsCSV, importDataJSON, getDailyUsageCount, getLocalDateString } from "@/lib/storage";
import ScrollPicker from "@/components/ScrollPicker";
import TabNavigation from "@/components/TabNavigation";
import { useSearchParams } from "next/navigation";
import { useI18n, Language } from "@/lib/i18n";
import { useUser, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

const APP_VERSION = "2604162400"; // YYMMDDHHMM

// Use a separate component to use useSearchParams to avoid wrapping the whole page in Suspense
function ProfileContent() {
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(65.0);
  const [birthYear, setBirthYear] = useState(1990);
  const [gender, setGender] = useState<"male" | "female">("male");
  const [activityLevel, setActivityLevel] = useState<"low" | "normal" | "high">("normal");
  const [concern, setConcern] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [selectedModel, setSelectedModel] = useState("gemini-2.5-flash");
  const [isTesting, setIsTesting] = useState(false);
  const { lang, setLang, t } = useI18n();
  const { user, isLoaded, isSignedIn } = useUser();
  const isPremium = !!user?.publicMetadata?.isPremium;
  const hasDevMode = !!user?.publicMetadata?.hasDevMode;
  const [dailyUsage, setDailyUsage] = useState(0);

  useEffect(() => {
    setDailyUsage(getDailyUsageCount());
  }, []);

  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("success")) {
      alert(lang === 'ja' ? "登録ありがとうございます！機能が有効化されました。" : "Thank you! Your features have been activated.");
      window.history.replaceState({}, '', '/profile');
    }
    if (searchParams.get("canceled")) {
      alert(lang === 'ja' ? "支払いがキャンセルされました。" : "Payment canceled.");
      window.history.replaceState({}, '', '/profile');
    }
  }, [searchParams, lang]);

  // AI settings
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
    a.download = `nutrivision_backup_${getLocalDateString()}.json`;
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
    a.download = `nutrivision_meals_${getLocalDateString()}.csv`;
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

  const handlePurchase = async (plan: 'premium' | 'devmode' = 'premium') => {
    if (!isSignedIn) {
      alert("購入の前にログイン（アカウント登録）が必要です。");
      return;
    }
    setIsPurchasing(true);
    try {
      const response = await fetch("/api/checkout", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan })
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (e) {
      console.error(e);
      alert("決済画面への移動に失敗しました。");
    } finally {
      setIsPurchasing(false);
    }
  };

  const handleClearAll = () => {
    if (confirm("【警告】すべての履歴（食事・運動・体重）を完全に消去しますか？\nこの操作は取り消せません。")) {
      storage.remove(STORAGE_KEYS.ANALYSIS_HISTORY);
      storage.remove(STORAGE_KEYS.EXERCISE_HISTORY);
      storage.remove(STORAGE_KEYS.WEIGHT_HISTORY);
      alert("すべての履歴を消去しました。");
    }
  };

  const getStatusLabel = () => {
    if (isPremium) return t('profile.status.premium');
    if (hasDevMode) return lang === 'ja' ? "開発者モード (自前APIキー)" : "Developer Mode (Own API)";
    return t('profile.status.free');
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Shared Navigation */}
      <TabNavigation />

      {/* Adjust padding to account for fixed header + Browser UI on mobile */}
      <main className="container" style={{ paddingTop: '8.5rem' }}>
        <div style={{ fontSize: '0.65rem', color: '#475569', textAlign: 'right', marginBottom: '0.5rem', fontFamily: 'monospace' }}>
          ver.{APP_VERSION}
        </div>
        <header style={{ marginBottom: '3rem' }}>
          <h1 className="gradient-text" style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>{t('profile.title')}</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>{t('profile.subtitle')}</p>
        </header>

        <section className="glass-card animate-fade-in" style={{ marginBottom: '3rem', padding: '1.5rem', border: '1px solid var(--primary)', background: 'rgba(16, 185, 129, 0.05)' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--primary)' }}>
            <span>💎</span> {t('profile.status.title')}
          </h2>
          {!isLoaded ? (
            <div style={{ color: '#64748b' }}>...</div>
          ) : !isSignedIn ? (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>{t('profile.no_account')}</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{t('profile.premium_benefit')}</div>
              </div>
              <div style={{ display: 'flex', gap: '0.8rem' }}>
                <SignInButton mode="modal">
                  <button style={{ padding: '0.6rem 1.2rem', borderRadius: '20px', background: 'transparent', border: '1px solid var(--primary)', color: 'var(--primary)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' }}>{t('profile.login')}</button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button style={{ padding: '0.6rem 1.2rem', borderRadius: '20px', background: 'var(--primary)', border: 'none', color: 'white', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' }}>{t('profile.signup')}</button>
                </SignUpButton>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <UserButton />
                <div>
                  <div style={{ fontSize: '0.9rem', color: '#cbd5e1', fontWeight: 'bold' }}>{user.fullName || user.emailAddresses[0].emailAddress}</div>
                  <div style={{ fontSize: '0.8rem', color: (isPremium || hasDevMode) ? 'var(--primary)' : '#64748b' }}>
                    {getStatusLabel()}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                {!isPremium && !hasDevMode && (
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{lang === 'ja' ? "今日の利用数" : "Today's usage"}</div>
                    <div style={{ fontSize: '1rem', fontWeight: 'bold', color: dailyUsage >= 3 ? '#ef4444' : 'var(--primary)' }}>{dailyUsage} / 3</div>
                  </div>
                )}
                <div style={{ display: 'flex', gap: '0.8rem' }}>
                  {!hasDevMode && (
                    <button
                      onClick={() => handlePurchase('devmode')}
                      disabled={isPurchasing}
                      style={{
                        padding: '0.6rem 1.2rem', borderRadius: '20px', border: '1px solid var(--primary)', cursor: 'pointer',
                        background: 'transparent', color: 'var(--primary)', fontWeight: 'bold', fontSize: '0.8rem',
                        opacity: isPurchasing ? 0.7 : 1, transition: 'all 0.2s'
                      }}
                    >
                      {isPurchasing ? (lang === 'ja' ? '準備中...' : 'Processing...') : (lang === 'ja' ? "開発者モード購入" : "Buy Dev Mode")}
                    </button>
                  )}
                  {!isPremium && (
                    <button
                      onClick={() => handlePurchase('premium')}
                      disabled={isPurchasing}
                      style={{
                        padding: '0.6rem 1.2rem', borderRadius: '20px', border: 'none', cursor: 'pointer',
                        background: 'var(--primary)', color: 'white', fontWeight: 'bold', fontSize: '0.8rem',
                        opacity: isPurchasing ? 0.7 : 1, transition: 'all 0.2s'
                      }}
                    >
                      {isPurchasing ? (lang === 'ja' ? '準備中...' : 'Processing...') : t('profile.button.upgrade')}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </section>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>

          <section className="glass-card animate-fade-in">
            <h2 style={{ fontSize: '1.1rem', marginBottom: '2rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>📏</span> {t('profile.health_data')}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              <ScrollPicker label={t('profile.height')} items={heightItems} value={height} onChange={setHeight} unit="cm" />
              <ScrollPicker label={t('nav.weight')} items={weightItems} value={weight} onChange={setWeight} unit="kg" />
              <ScrollPicker label={t('profile.birth_year')} items={yearItems} value={birthYear} onChange={setBirthYear} unit={t('history.calendar.year')} />
            </div>

            <div style={{ marginTop: '2.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1rem' }}>{t('profile.gender')} / {t('profile.activity')}</label>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                {(['male', 'female'] as const).map(g => (
                  <button key={g} onClick={() => setGender(g)} style={{ flex: 1, padding: '0.8rem', borderRadius: '8px', border: '1px solid', borderColor: gender === g ? 'var(--primary)' : '#334155', background: gender === g ? 'rgba(59, 130, 246, 0.1)' : 'transparent', color: gender === g ? 'white' : '#64748b', cursor: 'pointer' }}>
                    {g === 'male' ? t('profile.gender.male') : t('profile.gender.female')}
                  </button>
                ))}
              </div>
              <select
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value as any)}
                style={{ width: '100%', padding: '0.8rem', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: 'white', cursor: 'pointer' }}
              >
                <option value="low">{t('profile.activity.low')}</option>
                <option value="normal">{t('profile.activity.normal')}</option>
                <option value="high">{t('profile.activity.high')}</option>
              </select>
            </div>
          </section>

          {/* AI Settings (Dev Mode Only) */}
          {hasDevMode && (
            <section className="glass-card animate-fade-in" style={{ border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <h2 style={{ fontSize: '1.1rem', marginBottom: '2rem', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>🤖</span> {lang === 'ja' ? 'AIエンジン設定' : 'AI Engine Settings'}
              </h2>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem' }}>{t('profile.api_key')}</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder={t('profile.api_key_placeholder')}
                    style={{ flex: 1, padding: '0.8rem', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: 'white' }}
                  />
                  <button className="btn-primary" onClick={testConnection} disabled={isTesting} style={{ padding: '0 1rem', background: '#1e293b', border: '1px solid #334155', width: 'auto' }}>
                    {isTesting ? t('profile.connecting') : t('profile.connect')}
                  </button>
                </div>
                <div style={{ marginTop: '0.8rem', padding: '0.8rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', fontSize: '0.75rem', color: '#94a3b8', lineHeight: '1.6' }}>
                  <div style={{ color: 'var(--primary)', fontWeight: 'bold', marginBottom: '0.3rem' }}>💡 {t('profile.api_guide')}</div>
                  1. <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Google AI Studio</a> {lang === 'ja' ? 'にアクセス' : 'Access'}<br />
                  2. {t('profile.api_guide_step2')}<br />
                  3. {t('profile.api_guide_step3')}
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem' }}>{t('profile.model')}</label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  style={{ width: '100%', padding: '0.8rem', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: 'white' }}
                >
                  <option value="gemini-2.5-flash">Gemini 2.5 Flash</option>
                  <option value="gemini-3.1-pro-preview">Gemini 3.1 Pro</option>
                  <option value="gemini-3.1-flash-lite-preview">Gemini 3.1 Flash-Lite</option>
                </select>
              </div>
            </section>
          )}

          {/* User Preferences (Always visible) */}
          <section className="glass-card animate-fade-in">
            <h2 style={{ fontSize: '1.1rem', marginBottom: '2rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>👤</span> {lang === 'ja' ? '基本設定' : 'Preferences'}
            </h2>
            
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem' }}>{t('profile.language')}</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {(['ja', 'en'] as Language[]).map(l => (
                  <button key={l} onClick={() => setLang(l)} style={{ flex: 1, padding: '0.8rem', borderRadius: '8px', border: '1px solid', borderColor: lang === l ? 'var(--primary)' : '#334155', background: lang === l ? 'rgba(16, 185, 129, 0.1)' : 'transparent', color: lang === l ? 'white' : '#64748b', cursor: 'pointer', fontWeight: 'bold' }}>
                    {l === 'ja' ? '日本語' : 'English'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem' }}>{t('profile.concern')}</label>
              <textarea
                value={concern}
                onChange={(e) => setConcern(e.target.value)}
                placeholder={t('profile.concern_placeholder')}
                rows={3}
                style={{ width: '100%', padding: '0.8rem', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: 'white', resize: 'none' }}
              />
            </div>
          </section>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', justifyContent: 'center', paddingBottom: '4rem', borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: '4rem' }}>
          <button className="btn-primary" onClick={handleSave} style={{ minWidth: '240px', padding: '1.2rem' }}>
            {t('profile.button.save_all')}
          </button>
          {isSaved && (
            <span className="animate-fade-in" style={{ color: 'var(--accent)', fontWeight: 'bold' }}>
              ✓
            </span>
          )}
        </div>

        <section className="glass-card animate-fade-in" style={{ marginBottom: '4rem', padding: '2rem', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', fontWeight: 'bold', color: '#ef4444' }}>📦 {t('profile.data_management')}</h2>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '2rem' }}>{t('profile.subtitle')}</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <button onClick={handleExportJSON} style={{ padding: '0.8rem', background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: 'white', cursor: 'pointer', fontSize: '0.85rem' }}>
                  {t('profile.export.json')}
                </button>
                <button onClick={handleExportCSV} style={{ padding: '0.8rem', background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: 'white', cursor: 'pointer', fontSize: '0.85rem' }}>
                  {t('profile.export.csv')}
                </button>
              </div>
            </div>

            <div>
              <button onClick={() => fileInputRef.current?.click()} style={{ width: '100%', padding: '0.8rem', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid #3b82f6', borderRadius: '8px', color: '#60a5fa', cursor: 'pointer', fontSize: '0.85rem' }}>
                {t('profile.import')}
              </button>
              <input type="file" ref={fileInputRef} hidden accept=".json" onChange={handleImportJSON} />
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(239, 68, 68, 0.1)', paddingTop: '1.5rem' }}>
            <button onClick={handleClearAll} style={{ background: 'transparent', border: '1px solid #ef4444', color: '#ef4444', padding: '0.8rem 1.5rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>
              {t('profile.clear_all')}
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

export default function ProfilePage() {
  const { t } = useI18n();
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
        {t('common.loading')}
      </div>
    }>
      <ProfileContent />
    </Suspense>
  );
}
