"use client";

import { useState, useRef, useEffect } from "react";
import { storage, STORAGE_KEYS, HealthData, AnalysisResult, ExerciseLog, MealCategory, ExerciseType, WeightLog, getLocalDateString } from "@/lib/storage";
import { calculateTargets, NutritionTargets } from "@/lib/nutrition-calculator";
import { calculateBurnedCalories, EXERCISE_LABELS } from "@/lib/exercise-calculator";
import ScrollPicker from "@/components/ScrollPicker";
import Link from "next/link";
import { useUser, SignInButton } from "@clerk/nextjs";
import { useI18n } from "@/lib/i18n";
import TabNavigation from "@/components/TabNavigation";
import AffiliateCard from "@/components/AffiliateCard";

import { getRecommendations, RecommendationItem } from "@/lib/recommendation";

type TabType = 'meal' | 'exercise' | 'weight';
const APP_VERSION = "2604172230"; // YYMMDDHHMM表示用

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

export default function NutriVision() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAdShowing, setIsAdShowing] = useState(false);
  const [adCountdown, setAdCountdown] = useState(7);
  const [countdown, setCountdown] = useState(10);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [targets, setTargets] = useState<NutritionTargets | null>(null);
  const [apiKey, setApiKey] = useState("");
  const [selectedModel, setSelectedModel] = useState("gemini-3.0-flash");
  
  const { lang, t } = useI18n();
  
  // Clerk Hook
  const { user, isLoaded, isSignedIn } = useUser();

  const hasDevMode = !!user?.publicMetadata?.hasDevMode;

  // Notification State
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: "", visible: false });

  // UI State
  const [activeTab, setActiveTab] = useState<TabType>('meal');
  const [recommendation, setRecommendation] = useState<RecommendationItem | null>(null);
  
  useEffect(() => {
    const ctx = activeTab === 'meal' ? 'nutrition' : activeTab === 'exercise' ? 'fitness' : 'weight';
    setRecommendation(getRecommendations(ctx)[0]);
  }, [activeTab]);

  const [todaysTotals, setTodaysTotals] = useState({ calories: 0, protein: 0, fat: 0, carbs: 0, salt: 0, fiber: 0, vegetables: 0 });
  const [mode, setMode] = useState<"image" | "text">("image");
  const [textInput, setTextInput] = useState("");
  const [mealSource, setMealSource] = useState<'home' | 'restaurant' | 'takeout'>('home');
  const [mealCategory, setMealCategory] = useState<MealCategory>('昼食');
  const [selectedDate, setSelectedDate] = useState(getLocalDateString());

  // Exercise Log State
  const [exerciseCalories, setExerciseCalories] = useState(0);
  const [selectedExerciseType, setSelectedExerciseType] = useState<ExerciseType>('walking');
  const [exerciseMinutes, setExerciseMinutes] = useState(0);

  // Voice Recognition State
  const [isRecording, setIsRecording] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState("");
  const recognitionRef = useRef<any>(null);

  // Weight Tracking State
  const [currentWeight, setCurrentWeight] = useState(65.0);
  const weightItems = Array.from({ length: 1701 }, (_, i) => parseFloat((30 + i * 0.1).toFixed(1)));



  const fileInputRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const showToast = (message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 3000);
  };

  const toggleVoiceInput = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      return;
    }

    const SpeechRecognition = typeof window !== 'undefined' ? (window.SpeechRecognition || window.webkitSpeechRecognition) : null;
    if (!SpeechRecognition) {
      showToast(t('analysis.voice.not_supported'));
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = lang === 'ja' ? 'ja-JP' : 'en-US';
      recognition.interimResults = true;
      recognition.continuous = true;

      recognition.onstart = () => {
        setIsRecording(true);
        setVoiceTranscript("");
      };
      recognition.onend = () => {
        setIsRecording(false);
        // 録音終了時に確定させる（自然に切れた場合も含む）
        setVoiceTranscript(prev => {
          if (prev.trim()) {
            setTextInput(current => current + (current ? ' ' : '') + prev.trim());
          }
          return "";
        });
      };
      interface SpeechRecognitionErrorEvent {
        error: string;
      }
      interface SpeechRecognitionEvent {
        results: {
          [key: number]: {
            [key: number]: {
              transcript: string;
            };
          };
          length: number;
        };
      }

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error("Speech recognition error", event.error);
        setIsRecording(false);
        if (event.error !== 'no-speech' && event.error !== 'aborted') {
          showToast(t('analysis.voice.error'));
        }
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let sessionTranscript = '';
        for (let i = 0; i < event.results.length; ++i) {
          sessionTranscript += event.results[i][0].transcript;
        }
        setVoiceTranscript(sessionTranscript);
      };

      recognition.start();
      recognitionRef.current = recognition;
    } catch (e) {
      console.error(e);
      showToast(t('analysis.voice.error'));
    }
  };

  const handleDateShortcut = (offset: number) => {
    const d = new Date();
    d.setDate(d.getDate() - offset);
    // ローカル時間で YYYY-MM-DD 形式を作成
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    setSelectedDate(`${year}-${month}-${day}`);
  };

  // 解析結果が出た際の自動スクロール
  useEffect(() => {
    if (analysisResult && resultRef.current) {
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 500);
    }
  }, [analysisResult]);

  // カウントダウンタイマー
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAnalyzing && countdown > 0) {
      timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [isAnalyzing, countdown]);

  // データロード
  const loadData = () => {
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

    const history = storage.get<AnalysisResult[]>(STORAGE_KEYS.ANALYSIS_HISTORY) || [];
    const todaysHistory = history.filter(item => item.date.startsWith(selectedDate));
    
    const totals = todaysHistory.reduce((acc, item) => ({
      calories: acc.calories + item.calories,
      protein: acc.protein + item.nutrients.protein,
      fat: acc.fat + item.nutrients.fat,
      carbs: acc.carbs + item.nutrients.carbs,
      salt: acc.salt + item.nutrients.salt,
      fiber: acc.fiber + item.nutrients.fiber,
      vegetables: acc.vegetables + (item.nutrients.vegetablesTotal || 0),
    }), { calories: 0, protein: 0, fat: 0, carbs: 0, salt: 0, fiber: 0, vegetables: 0 });
    
    setTodaysTotals(totals);

    const exerciseHistory = storage.get<ExerciseLog[]>(STORAGE_KEYS.EXERCISE_HISTORY) || [];
    const todaysExercise = exerciseHistory.filter(item => item.date.startsWith(selectedDate));
    const totalBurned = todaysExercise.reduce((sum, item) => sum + item.burnedCalories, 0);
    setExerciseCalories(totalBurned);

    const weightHistory = storage.get<WeightLog[]>(STORAGE_KEYS.WEIGHT_HISTORY) || [];
    const todaysWeightData = weightHistory.find(item => item.date.startsWith(selectedDate));
    if (todaysWeightData) {
      setCurrentWeight(todaysWeightData.weight);
    } else if (profile) {
      setCurrentWeight(parseFloat(profile.weight));
    }

    const savedApiKey = storage.get<string>(STORAGE_KEYS.API_KEY);
    if (savedApiKey) setApiKey(savedApiKey);

    const savedModel = storage.get<string>(STORAGE_KEYS.SELECTED_MODEL);
    if (savedModel) {
      // 2026年時点の有効なモデル名のホワイトリスト
      const validModels = ["gemini-3.0-flash", "gemini-3.1-pro-preview", "gemini-1.5-flash", "gemini-1.5-pro"];
      
      if (!validModels.includes(savedModel)) {
        // リストにない（廃止済みや誤った）名称の場合は、安定版に強制リセット
        setSelectedModel("gemini-3.0-flash");
        storage.set(STORAGE_KEYS.SELECTED_MODEL, "gemini-3.0-flash");
      } else {
        setSelectedModel(savedModel);
      }
    }
  };

  useEffect(() => {
    loadData();
  }, [analysisResult, selectedDate]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const startAnalysis = async () => {
    if (mode === "image" && !selectedImage) return;
    if (mode === "text" && !textInput) return;

    // 開発者モード（自前キー）のチェック
    if (hasDevMode && !apiKey) {
      showToast(lang === 'ja' ? "開発者モードです。設定画面で自分のAPIキーを入力してください。" : "Developer mode active. Please set your own API key in settings.");
      return;
    }

    // 広告視聴シミュレーション（通常の無料・プレミアムユーザーのみ適用、開発者モードはスキップ）
    if (!hasDevMode) {
      setIsAdShowing(true);
      setAdCountdown(7);
      
      const adInterval = setInterval(() => {
        setAdCountdown(prev => {
          if (prev <= 1) {
            clearInterval(adInterval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      await new Promise(resolve => setTimeout(resolve, 7000));
      setIsAdShowing(false);
    }

    setIsAnalyzing(true);
    setCountdown(10);
    setAnalysisResult(null);
    setIsEditing(false);

    try {
      const profile = storage.get<HealthData>(STORAGE_KEYS.HEALTH_DATA);
      const profileContext = profile 
        ? `ユーザー特性: ${profile.gender === 'male' ? '男性' : '女性'}, ${profile.birthYear ? new Date().getFullYear() - profile.birthYear : '不明'}歳。目標: ${profile.concern}` 
        : "";

      const prompt = lang === 'en' ? `
        Analyze the following meal and output in JSON.
        ${profileContext}
        Meal Source: ${mealSource} (home, restaurant, takeout)
        Meal Category: ${mealCategory}
        Additional Info: ${textInput}

        Strict JSON format:
        {
          "name": "Meal Name",
          "calories": number,
          "nutrients": {
            "protein": number(g), "fat": number(g), "carbs": number(g),
            "salt": number(g), "fiber": number(g), "vegetablesTotal": number(g), "vegetablesGreenYellow": number(g)
          },
          "advice": {
            "evaluation": "Detailed evaluation of nutritional balance (approx 150 chars)",
            "improvements": ["Action 1", "Action 2"],
            "message": "A friendly and sharp closing message like a professional coach."
          }
        }
        Note: Output should be in English.
      ` : `
        以下の食事を解析し、JSON出力してください。
        ${profileContext}
        食事タイプ: ${mealSource} (home:自炊, restaurant:外食, takeout:テイクアウト)
        食事カテゴリ: ${mealCategory}
        補足情報: ${textInput}

        出力JSONフォーマット厳守:
        {
          "name": "料理名",
          "calories": 数値,
          "nutrients": {
            "protein": 数値(g), "fat": 数値(g), "carbs": 数値(g),
            "salt": 数値(g), "fiber": 数値(g), "vegetablesTotal": 数値(g), "vegetablesGreenYellow": 数値(g)
          },
          "advice": {
            "evaluation": "今回の食事の栄養バランスや選択についての具体的な評価（150字程度）",
            "improvements": ["具体的な改善アクション1", "改善アクション2"],
            "message": "保険代理店のプロのような親身で鋭い『問いかけ』を含む締めくくりのメッセージ"
          }
        }
        ※注意: JSONの文字列内で実際の改行を使用せず、改行が必要な箇所には \\n を使用してください。出力は日本語でお願いします。
      `;

      let jsonText = "";

      // 1. 開発者モード（自前キー）の場合：直接実行
      if (hasDevMode && apiKey) {
        const { GoogleGenerativeAI } = await import("@google/generative-ai");
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: selectedModel });
        
        let result;
        if (mode === "image" && selectedImage) {
          const base64Data = selectedImage.split(",")[1];
          result = await model.generateContent([
            prompt,
            { inlineData: { data: base64Data, mimeType: "image/jpeg" } }
          ]);
        } else {
          result = await model.generateContent(prompt);
        }
        const response = await result.response;
        jsonText = response.text();
      } 
      // 2. 無料またはプレミアムユーザーの場合：サーバープロキシ経由
      else {
        const res = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            appId: 'nutri-vision',
            mode,
            prompt,
            image: mode === "image" ? selectedImage : null,
            model: selectedModel
          })
        });

        if (!res.ok) {
          const errText = await res.text();
          throw new Error(errText || "サーバー解析中にエラーが発生しました。");
        }

        const data = await res.json();
        jsonText = data.text;
      }

      const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("AI解析に失敗しました。JSONが見つかりません。");
      
      const cleanedJsonStr = jsonMatch[0]
        .replace(/[\u0000-\u001F\u007F-\u009F]/g, (match) => {
          if (match === '\n' || match === '\r') return ' '; 
          if (match === '\t') return '\\t';
          return '';
        });
      
      const data = JSON.parse(cleanedJsonStr);
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
      const finalResult: AnalysisResult = {
        id: Date.now(),
        date: selectedDate + "T" + timeStr,
        mealSource,
        mealCategory,
        ...data
      };

      setAnalysisResult(finalResult);
      saveToHistory(finalResult);

      showToast(t('analysis.toast.success'));
    } catch (e) {
      console.error(e);
      const message = e instanceof Error ? e.message : "不明なエラー";
      let errorMsg = `解析エラー: ${message}`;
      if (message.includes("429") || message.toLowerCase().includes("quota") || message.includes("limit reached")) {
        if (message.includes("50 requests")) {
          errorMsg = t('analysis.error.safety_limit');
        } else {
          errorMsg = t('analysis.error.quota');
        }
      } else if (message.includes("API key")) {
        errorMsg = lang === 'ja' ? "APIキーが無効、または設定されていません。" : "API key is invalid or not set.";
      }
      showToast(errorMsg);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const saveToHistory = (result: AnalysisResult) => {
    const history = storage.get<AnalysisResult[]>(STORAGE_KEYS.ANALYSIS_HISTORY) || [];
    const index = history.findIndex(item => item.id === result.id);
    if (index > -1) {
      history[index] = result;
    } else {
      history.unshift(result);
    }
    storage.set(STORAGE_KEYS.ANALYSIS_HISTORY, history);
  };

  const handleEditResult = (field: string, value: string | number) => {
    if (!analysisResult) return;
    const updated = { ...analysisResult };
    if (field.includes(".")) {
      const [p1, p2] = field.split(".");
      if (p1 === "nutrients") {
        (updated.nutrients as Record<string, number>)[p2] = parseFloat(String(value)) || 0;
      }
    } else if (field === "name") {
      updated.name = String(value);
    } else {
      (updated as Record<string, any>)[field] = parseFloat(String(value)) || 0;
    }
    setAnalysisResult(updated);
  };

  const handleSaveExercise = () => {
    if (exerciseMinutes <= 0) return;
    
    const profile = storage.get<HealthData>(STORAGE_KEYS.HEALTH_DATA);
    const weightVal = profile ? parseFloat(profile.weight) : 65;
    const burned = calculateBurnedCalories(selectedExerciseType, exerciseMinutes, weightVal);
    
    const log: ExerciseLog = {
      id: Date.now(),
      date: selectedDate + "T" + new Date().toTimeString().split(' ')[0],
      type: selectedExerciseType,
      minutes: exerciseMinutes,
      burnedCalories: burned
    };

    const history = storage.get<ExerciseLog[]>(STORAGE_KEYS.EXERCISE_HISTORY) || [];
    history.unshift(log);
    storage.set(STORAGE_KEYS.EXERCISE_HISTORY, history);
    
    setExerciseMinutes(0);
    loadData();
    showToast(t('exercise.toast.success'));
  };

  const handleSaveWeight = () => {
    const weightHistory = storage.get<WeightLog[]>(STORAGE_KEYS.WEIGHT_HISTORY) || [];
    const existingIndex = weightHistory.findIndex(item => item.date.startsWith(selectedDate));
    
    const newEntry: WeightLog = {
      id: Date.now(),
      date: selectedDate + "T09:00:00",
      weight: currentWeight
    };

    if (existingIndex > -1) {
      weightHistory[existingIndex] = newEntry;
    } else {
      weightHistory.push(newEntry);
    }
    
    storage.set(STORAGE_KEYS.WEIGHT_HISTORY, weightHistory);
    showToast(t('weight.toast.success'));
  };

  const netCalories = todaysTotals.calories - exerciseCalories;

  const getBarColor = (current: number, target: number) => {
    const ratio = (current / target) * 100;
    const diff = Math.abs(ratio - 100);
    if (diff <= 20) return 'var(--primary)';
    if (diff <= 30) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Toast Notification */}
      {toast.visible && (
        <div style={{
          position: 'fixed', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(16, 185, 129, 0.95)', color: 'white', padding: '0.8rem 1.5rem',
          borderRadius: '12px', zIndex: 1000, boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
          fontWeight: 'bold', backdropFilter: 'blur(8px)', animation: 'fadeIn 0.3s ease-out'
        }}>
          {toast.message}
        </div>
      )}

      {/* Ad Simulation Overlay */}
      {isAdShowing && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.95)', zIndex: 10000,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(20px)', animation: 'fadeIn 0.3s'
        }}>
          <div style={{ position: 'relative', width: '320px', height: '180px', borderRadius: '16px', overflow: 'hidden', background: '#0f172a', border: '2px solid var(--primary)', marginBottom: '2rem', boxShadow: '0 0 50px rgba(16, 185, 129, 0.3)' }}>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1e293b' }}>
               <img src="/images/ad-placeholder.png" alt="Ad Placeholder" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} />
               <div style={{ position: 'absolute', fontSize: '2rem', color: 'white', fontWeight: 'bold' }}>ADVERTISING</div>
            </div>
          </div>
          <h2 style={{ fontSize: '1.2rem', color: 'white', marginBottom: '1rem', textAlign: 'center' }}>
            {lang === 'ja' ? 'AIエンジンを準備しています...' : 'Preparing AI Engine...'}
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', textAlign: 'center', marginBottom: '2rem', maxWidth: '300px' }}>
            {lang === 'ja' ? '無料で高品質な解析を提供するために、短い読み込み時間にご協力ください。' : 'Please support our free service by waiting for a short loading time.'}
          </p>
          <div style={{ 
            width: '60px', height: '60px', borderRadius: '50%', border: '4px solid rgba(255,255,255,0.1)',
            borderTopColor: 'var(--primary)', animation: 'spin 1s linear infinite', marginBottom: '1.5rem'
          }}></div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)', fontFamily: 'monospace' }}>
            {adCountdown}s
          </div>
        </div>
      )}

      {/* Shared Navigation */}
      <TabNavigation />

      {/* Adjust padding to account for fixed header + Browser UI on mobile */}
      <main className="container" style={{ paddingTop: '8.5rem' }}>
        <div style={{ fontSize: '0.65rem', color: '#475569', textAlign: 'right', marginBottom: '0.5rem', fontFamily: 'monospace' }}>
          ver.{APP_VERSION}
        </div>
        
        {/* SECTION 1: 今日の充足状況 (閲覧のみ) */}
        {targets && (
          <section className="glass-card animate-fade-in" style={{ marginBottom: '2.5rem', padding: '1.5rem', borderColor: 'rgba(16, 185, 129, 0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
              <div>
                <h2 style={{ fontSize: '1rem', color: 'var(--primary)', fontWeight: 'bold' }}>
                  {(() => {
                    const [y, m, d] = selectedDate.split('-').map(Number);
                    return new Date(y, m - 1, d).toLocaleDateString(lang === 'ja' ? 'ja-JP' : 'en-US', { month: 'long', day: 'numeric' });
                  })()} {lang === 'ja' ? 'の状況' : 'Status'}
                </h2>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: getBarColor(netCalories, targets.energy) }}>
                  {netCalories.toFixed(0)} <span style={{ fontSize: '0.8rem', fontWeight: 'normal', color: '#64748b' }}>/ {targets.energy} kcal</span>
                </div>
              </div>
            </div>

            <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden', marginBottom: '2rem' }}>
              <div style={{ width: `${Math.min(100, Math.max(0, (netCalories / targets.energy) * 100))}%`, height: '100%', background: getBarColor(netCalories, targets.energy), transition: 'width 0.5s ease-out' }}></div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
              {[
                { label: t('nutrient.protein'), cur: todaysTotals.protein, target: targets.protein.min, unit: 'g' },
                { label: t('nutrient.fat'), cur: todaysTotals.fat, target: targets.fat.min, unit: 'g' },
                { label: t('nutrient.carbs'), cur: todaysTotals.carbs, target: targets.carbs.min, unit: 'g' },
                { label: t('nutrient.salt'), cur: todaysTotals.salt, target: targets.salt, unit: 'g' },
                { label: t('nutrient.fiber'), cur: todaysTotals.fiber, target: targets.fiber, unit: 'g' },
                { label: t('nutrient.vegetables'), cur: todaysTotals.vegetables, target: targets.vegetables, unit: 'g' },
              ].map(n => {
                const ratio = Math.min(100, (n.cur / n.target) * 100);
                const color = getBarColor(n.cur, n.target);
                return (
                  <div key={n.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.4rem' }}>
                      <span style={{ color: '#94a3b8' }}>{n.label}</span>
                      <span style={{ fontWeight: '600' }}>{n.cur.toFixed(n.label === '塩分' ? 1 : 0)}{n.unit}</span>
                    </div>
                    <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ width: `${ratio}%`, height: '100%', background: color, transition: 'width 0.8s' }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* SECTION 2: 記録ハブ (日付選択 -> 種類選択 -> 入力) */}
        <section className="glass-card" style={{ marginBottom: '3rem', padding: '2rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>📝</span> {
              activeTab === 'meal' ? (lang === 'ja' ? '食事を記録する' : 'Log Meal') :
              activeTab === 'exercise' ? t('exercise.title') :
              (lang === 'ja' ? '体重を記録する' : 'Log Weight')
            }
          </h2>

          {/* 1. 日付選択 */}
          <div style={{ marginBottom: '2rem', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
            <label style={{ display: 'block', fontSize: '0.7rem', color: '#64748b', marginBottom: '0.8rem', fontWeight: 'bold' }}>{t('history.modal.date')}</label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
               {[
                { label: lang === 'ja' ? '一昨日' : '2 days ago', offset: 2 },
                { label: lang === 'ja' ? '昨日' : 'Yesterday', offset: 1 },
                { label: lang === 'ja' ? '今日' : 'Today', offset: 0 }
              ].map(btn => {
                const d = new Date();
                d.setDate(d.getDate() - btn.offset);
                const compareStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
                const isActive = selectedDate === compareStr;
                return (
                  <button key={btn.offset} onClick={() => handleDateShortcut(btn.offset)} style={{
                    padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid',
                    borderColor: isActive ? 'var(--primary)' : '#334155',
                    background: isActive ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                    color: isActive ? 'white' : '#64748b',
                    fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s'
                  }}>
                    {btn.label}
                  </button>
                );
              })}
              <input 
                type="date" 
                value={selectedDate} 
                onChange={(e) => setSelectedDate(e.target.value)}
                style={{ background: '#0f172a', border: '1px solid #334155', color: 'white', borderRadius: '8px', padding: '0.45rem 0.8rem', fontSize: '0.9rem' }}
              />
            </div>
          </div>

          {/* 2. 入力種類選択タブ */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem' }}>
            {(['meal', 'exercise', 'weight'] as TabType[]).map(tab => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                style={{ 
                  flex: 1, padding: '0.8rem', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold',
                  background: activeTab === tab ? 'var(--primary)' : 'rgba(255,255,255,0.02)',
                  color: activeTab === tab ? 'white' : '#64748b',
                  transition: 'all 0.3s'
                }}
              >
                {tab === 'meal' ? '🍱 ' + t('nav.meal') : tab === 'exercise' ? '🏃 ' + t('nav.exercise') : '⚖️ ' + t('nav.weight')}
              </button>
            ))}
          </div>

          {/* 3. 動的入力フォーム */}
          <div className="animate-fade-in" key={activeTab}>
            {activeTab === 'meal' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.7rem', color: '#64748b', marginBottom: '0.6rem' }}>{t('analysis.timing')}</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                      {(['朝食', '昼食', '夕食', '間食'] as MealCategory[]).map(cat => (
                        <button key={cat} onClick={() => setMealCategory(cat)} style={{ 
                            padding: '0.5rem', borderRadius: '6px', border: '1px solid', cursor: 'pointer', fontSize: '0.75rem',
                            borderColor: mealCategory === cat ? 'var(--primary)' : '#334155',
                            background: mealCategory === cat ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                            color: mealCategory === cat ? 'white' : '#64748b'
                        }}>{t(`exercise.cate.${cat === '朝食' ? 'breakfast' : cat === '昼食' ? 'lunch' : cat === '夕食' ? 'dinner' : 'snack'}`)}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.7rem', color: '#64748b', marginBottom: '0.6rem' }}>{t('analysis.source')}</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.5rem' }}>
                      {[ { id: 'home', l: t('analysis.source.home') }, { id: 'restaurant', l: t('analysis.source.restaurant') }, { id: 'takeout', l: t('analysis.source.takeout') } ].map(s => (
                        <button key={s.id} onClick={() => setMealSource(s.id as any)} style={{ 
                            padding: '0.5rem', borderRadius: '6px', border: '1px solid', cursor: 'pointer', fontSize: '0.75rem',
                            borderColor: mealSource === s.id ? 'var(--primary)' : '#334155',
                            background: mealSource === s.id ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                            color: mealSource === s.id ? 'white' : '#64748b'
                        }}>{s.l}</button>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                  <button onClick={() => setMode("image")} style={{ flex: 1, padding: '0.6rem', color: mode === 'image' ? 'var(--primary)' : '#64748b', background: mode === 'image' ? 'rgba(16, 185, 129, 0.05)' : 'transparent', border: '1px solid', borderColor: mode === 'image' ? 'var(--primary)' : '#334155', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>{t('analysis.mode.image')}</button>
                  <button onClick={() => setMode("text")} style={{ flex: 1, padding: '0.6rem', color: mode === 'text' ? 'var(--primary)' : '#64748b', background: mode === 'text' ? 'rgba(16, 185, 129, 0.05)' : 'transparent', border: '1px solid', borderColor: mode === 'text' ? 'var(--primary)' : '#334155', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>{t('analysis.mode.text')}</button>
                </div>

                {mode === 'image' && (
                  <div onClick={() => fileInputRef.current?.click()} style={{ width: '100%', aspectRatio: '16/9', background: '#0f172a', border: '2px dashed #334155', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', overflow: 'hidden', marginBottom: '1rem' }}>
                    {selectedImage ? <img src={selectedImage} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ textAlign: 'center', color: '#475569' }}><span style={{ fontSize: '2rem' }}>🖼️</span><br />{t('analysis.tap_to_select')}</div>}
                  </div>
                )}
                
                <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                  <textarea 
                    placeholder={mode === 'image' ? t('analysis.placeholder.image') : t('analysis.placeholder.text')}
                    value={textInput + (isRecording && voiceTranscript ? (textInput ? '\n' : '') + '... ' + voiceTranscript : '')} 
                    onChange={(e) => !isRecording && setTextInput(e.target.value)}
                    readOnly={isRecording}
                    style={{ 
                      width: '100%', height: mode === 'image' ? '120px' : '200px', 
                      background: isRecording ? 'rgba(15, 23, 42, 0.8)' : '#0f172a', 
                      border: isRecording ? '2px solid #ef4444' : '1px solid #334155', 
                      borderRadius: '12px', 
                      color: 'white', padding: '1rem', paddingRight: '1rem', fontSize: '0.95rem',
                      transition: 'all 0.3s',
                      boxShadow: isRecording ? '0 0 20px rgba(239, 68, 68, 0.2)' : 'none'
                    }}
                  />
                  
                  <div style={{ 
                    display: 'flex', gap: '1rem', marginTop: '0.8rem', justifyContent: 'flex-end', alignItems: 'center'
                  }}>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 'bold' }}>
                      {t('analysis.voice.guide')}
                    </span>
                    {!isRecording ? (
                      <button
                        onClick={toggleVoiceInput}
                        className="btn-secondary"
                        style={{
                          display: 'flex', alignItems: 'center', gap: '0.5rem',
                          padding: '0.6rem 1.2rem', borderRadius: '20px', border: '1px solid #334155',
                          fontSize: '0.85rem'
                        }}
                      >
                        🎙️ {t('analysis.voice.start')}
                      </button>
                    ) : (
                      <button
                        onClick={toggleVoiceInput}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '0.5rem',
                          padding: '0.6rem 1.2rem', borderRadius: '20px', 
                          background: '#ef4444', color: 'white', border: 'none',
                          fontSize: '0.85rem', fontWeight: 'bold', cursor: 'pointer',
                          boxShadow: '0 4px 15px rgba(239, 68, 68, 0.4)',
                          animation: 'pulse 1.5s infinite'
                        }}
                      >
                        ⏹️ {t('analysis.voice.stop')}
                      </button>
                    )}
                  </div>

                  {isRecording && (
                    <div style={{
                      position: 'absolute', top: '-1.5rem', left: '0',
                      fontSize: '0.75rem', color: '#ef4444', fontWeight: 'bold',
                      display: 'flex', alignItems: 'center', gap: '0.4rem'
                    }}>
                      <span style={{ width: '8px', height: '8px', background: '#ef4444', borderRadius: '50%', animation: 'pulse 1s infinite' }}></span>
                      {t('analysis.voice.recording')}
                    </div>
                  )}
                </div>

                <input type="file" hidden ref={fileInputRef} accept="image/*" onChange={handleImageChange} />
                


                {!isSignedIn ? (
                  <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', border: '1px dashed var(--primary)', background: 'rgba(16, 185, 129, 0.05)', marginTop: '2rem' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>🔐</div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem', color: 'white' }}>
                      {lang === 'ja' ? '解析にはログインが必要です' : 'Login Required to Analyze'}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: '1.6', marginBottom: '2rem' }}>
                      {lang === 'ja' ? '無料で高品質なAI解析を提供し、あなたの解析履歴を安全に保存するために、アカウントのログインをお願いしています。' : 'We require an account to provide free high-quality AI analysis and securely save your analysis history.'}
                    </p>
                    <SignInButton mode="modal">
                      <button className="btn-primary" style={{ width: '100%', padding: '1rem' }}>
                        {lang === 'ja' ? 'ログイン / 新規登録して始める' : 'Login / Sign Up to Start'}
                      </button>
                    </SignInButton>
                  </div>
                ) : (
                  <button 
                    className="btn-primary" 
                    onClick={startAnalysis} 
                    disabled={isAnalyzing} 
                    style={{ width: '100%', padding: '1rem' }}
                  >
                    {isAnalyzing ? `${t('analysis.button.analyzing')} (${countdown}s)` : t('analysis.button.start')}
                  </button>
                )}
              </div>
            )}

            {activeTab === 'exercise' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.8rem', marginBottom: '2rem' }}>
                  {(['walking', 'cycling', 'gym', 'swimming'] as ExerciseType[]).map(type => (
                    <button key={type} onClick={() => setSelectedExerciseType(type)} style={{ 
                        padding: '1rem', borderRadius: '12px', border: '1px solid', cursor: 'pointer', fontSize: '0.9rem',
                        borderColor: selectedExerciseType === type ? '#3b82f6' : '#334155',
                        background: selectedExerciseType === type ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                        color: selectedExerciseType === type ? 'white' : '#64748b'
                    }}>{EXERCISE_LABELS[type]}</button>
                  ))}
                </div>
                
                <div style={{ marginBottom: '2rem' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#64748b', marginBottom: '1rem' }}>{t('exercise.time')}: <span style={{ color: 'white', fontSize: '1.2rem', fontWeight: 'bold' }}>{exerciseMinutes}</span> {t('exercise.minutes')}</label>
                  <div style={{ display: 'flex', gap: '0.8rem' }}>
                    {[15, 30, 60].map(mins => <button key={mins} onClick={() => setExerciseMinutes(prev => prev + mins)} style={{ flex: 1, padding: '0.8rem', background: '#1e293b', border: '1px solid #334155', borderRadius: '10px', color: 'white', cursor: 'pointer', fontSize: '0.9rem' }}>+{mins}</button>)}
                    <button onClick={() => setExerciseMinutes(0)} style={{ padding: '0.8rem 1.5rem', background: 'transparent', border: '1px solid #475569', borderRadius: '10px', color: '#64748b', cursor: 'pointer', fontSize: '0.9rem' }}>{t('exercise.clear')}</button>
                  </div>
                </div>

                <button className="btn-primary" onClick={handleSaveExercise} disabled={exerciseMinutes <= 0} style={{ width: '100%', padding: '1rem', background: 'linear-gradient(135deg, #3b82f6, #60a5fa)' }}>{t('exercise.button.save')}</button>
              </div>
            )}

            {activeTab === 'weight' && (
              <div>
                <div style={{ marginBottom: '2rem' }}>
                  <ScrollPicker items={weightItems} value={currentWeight} onChange={setCurrentWeight} unit="kg" height="150px" />
                </div>
                <button className="btn-primary" onClick={handleSaveWeight} style={{ width: '100%', padding: '1rem' }}>{t('weight.button.save')}</button>
              </div>
            )}
          </div>
        </section>

        {/* Affiliate Recommendation */}
        {recommendation && (
          <div className="animate-fade-in" style={{ marginBottom: '2rem', padding: '0 1rem' }}>
            <AffiliateCard 
              item={recommendation} 
              label={lang === 'ja' ? '解析結果におすすめ' : 'Recommended for you'} 
            />
          </div>
        )}

        {/* SECTION 3: 解析結果表示エリア */}
        <div ref={resultRef} style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%', marginBottom: '4rem' }}>
          {analysisResult ? (
            <div className="glass-card animate-fade-in" style={{ width: '100%', border: '1px solid var(--primary)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                <div style={{ flex: 1 }}>
                  {isEditing ? <input className="input-field" value={analysisResult.name} onChange={(e) => handleEditResult("name", e.target.value)} style={{ fontSize: '1.4rem', fontWeight: 'bold' }} /> : <h3 style={{ fontSize: '1.6rem', fontWeight: 'bold' }}>{analysisResult.name}</h3>}
                  <div style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '1.2rem', marginTop: '0.4rem' }}>{analysisResult.calories.toFixed(0)} kcal</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', alignItems: 'flex-end' }}>
                  <button onClick={() => { if (isEditing) saveToHistory(analysisResult); setIsEditing(!isEditing); }} style={{ fontSize: '0.8rem', background: '#334155', color: 'white', border: 'none', padding: '0.4rem 1rem', borderRadius: '6px', cursor: 'pointer' }}>{isEditing ? t('analysis.result.confirm') : t('analysis.result.edit')}</button>
                  {!isEditing && (
                    <button onClick={() => { saveToHistory(analysisResult); showToast(t('analysis.toast.success')); }} style={{ fontSize: '0.75rem', background: 'var(--primary)', color: 'white', border: 'none', padding: '0.4rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                      {t('analysis.result.save')}
                    </button>
                  )}
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                {[ { label: t('nutrient.protein'), key: 'protein', unit: 'g', target: targets?.protein.min }, { label: t('nutrient.fat'), key: 'fat', unit: 'g', target: targets?.fat.min }, { label: t('nutrient.carbs'), key: 'carbs', unit: 'g', target: targets?.carbs.min }, { label: t('nutrient.salt'), key: 'salt', unit: 'g', target: targets?.salt }, { label: t('nutrient.fiber'), key: 'fiber', unit: 'g', target: targets?.fiber }, { label: t('nutrient.vegetables'), key: 'vegetablesTotal', unit: 'g', target: targets?.vegetables } ].map(n => {
                  const val = (analysisResult.nutrients as any)[n.key];
                  const target = n.target || 1;
                  const ratio = Math.min(100, Math.round((val / target) * 100));
                  return (
                    <div key={n.key}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.8rem' }}>
                        <span style={{ color: 'white' }}>{n.label}</span>
                        <span style={{ color: '#94a3b8' }}>{val.toFixed(n.key === 'salt' ? 1 : 0)}{n.unit} ({ratio}%)</span>
                      </div>
                      <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: `${ratio}%`, height: '100%', background: getBarColor(val, target), transition: 'width 0.8s' }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ background: 'rgba(16, 185, 129, 0.05)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(16, 185, 129, 0.1)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 'bold', marginBottom: '0.8rem' }}>{t('analysis.result.advice')}</div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  {typeof analysisResult.advice === 'string' ? (
                    <div style={{ lineHeight: '1.8', color: '#cbd5e1', fontSize: '0.95rem', whiteSpace: 'pre-wrap' }}>
                      {analysisResult.advice}
                    </div>
                  ) : (
                    <>
                      <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px' }}>
                        <div style={{ fontSize: '0.7rem', color: 'var(--primary)', marginBottom: '0.5rem', fontWeight: 'bold' }}>{t('analysis.result.evaluation')}</div>
                        <div style={{ lineHeight: '1.7', color: '#cbd5e1', fontSize: '0.9rem' }}>{analysisResult.advice.evaluation}</div>
                      </div>
                      
                      {(analysisResult.advice.improvements?.length ?? 0) > 0 && (
                        <div style={{ padding: '0 0.5rem' }}>
                          <div style={{ fontSize: '0.7rem', color: 'var(--accent)', marginBottom: '0.8rem', fontWeight: 'bold' }}>{t('analysis.result.improvement')}</div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                            {analysisResult.advice.improvements.map((imp, idx) => (
                              <div key={idx} style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start', fontSize: '0.85rem', color: '#cbd5e1' }}>
                                <span style={{ color: 'var(--accent)' }}>✦</span>
                                <span>{imp}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem', fontStyle: 'italic' }}>
                        <div style={{ lineHeight: '1.7', color: '#94a3b8', fontSize: '0.9rem' }}>{analysisResult.advice.message}</div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : null}

          <Link href="/nutri-vision/history" className="glass-card" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textDecoration: 'none', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(99, 102, 241, 0.1))' }}>
            <div>
              <div style={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.2rem' }}>📊 {t('nav.history')}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{lang === 'ja' ? 'カレンダーから過去の記録を振り返る' : 'Look back on past records from the calendar'}</div>
            </div>
            <span style={{ color: 'var(--primary)', fontSize: '1.5rem' }}>&rarr;</span>
          </Link>
        </div>
      </main>


    </div>
  );
}
