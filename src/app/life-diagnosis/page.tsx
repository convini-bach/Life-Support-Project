"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { storage, STORAGE_KEYS } from "@/lib/storage";

type HealthData = {
  height: string;
  weight: string;
  concern: string;
  birthYear: number;
  gender: "male" | "female";
  activityLevel: "low" | "normal" | "high";
};

export default function Home() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{ score: number; advice: string } | null>(null);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [birthYear, setBirthYear] = useState("1990");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [activityLevel, setActivityLevel] = useState<"low" | "normal" | "high">("normal");
  const [concern, setConcern] = useState("");

  useEffect(() => {
    // 保存されたデータの復旧試行
    const savedData = storage.get<HealthData>(STORAGE_KEYS.HEALTH_DATA);
    if (savedData) {
      setHeight(savedData.height || "");
      setWeight(savedData.weight || "");
      setConcern(savedData.concern || "");
      if (savedData.birthYear) setBirthYear(savedData.birthYear.toString());
      if (savedData.gender) setGender(savedData.gender);
      if (savedData.activityLevel) setActivityLevel(savedData.activityLevel);
    }
  }, []);

  const handleStartAnalysis = () => {
    if (!height || !weight || !birthYear) {
      alert("必須項目を入力してください。");
      return;
    }

    setIsAnalyzing(true);
    setResult(null);

    // データの保存（Local-First）
    storage.set(STORAGE_KEYS.HEALTH_DATA, { 
      height, 
      weight, 
      concern, 
      birthYear: parseInt(birthYear), 
      gender, 
      activityLevel 
    });

    // 解析シミュレーション（2.5秒）
    setTimeout(() => {
      setIsAnalyzing(false);
      setResult({
        score: Math.floor(Math.random() * 20) + 70, // 70-90のスコア
        advice: "あなたの現在のリズムは非常に素晴らしいですね。詳細なプロファイルに基づき、Nutri-Visionでの目標値も最適化されました。次は食事の写真を1枚、撮ってみませんか？"
      });
    }, 2500);
  };

  return (
    <main className="container min-h-screen">
      <nav style={{ padding: '1rem 0', marginBottom: '2rem' }}>
        <Link href="/" style={{ color: '#94a3b8', fontSize: '0.9rem', display: 'flex', alignItems: 'center' }}>
          &larr; ポータルに戻る
        </Link>
      </nav>

      <section className="text-center animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 className="gradient-text" style={{ fontSize: '3.5rem', lineHeight: '1.2', marginBottom: '1.5rem' }}>
          あなたの「今」を、<br />最高の知恵へ。
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.2rem', marginBottom: '3rem' }}>
          精密なプロファイル入力により、AI伴走の精度が劇的に向上します。
        </p>

        <div className="glass-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>健康解析を開始する</h2>
          <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '2rem' }}>
            現在の身長、体重、そして「最近気になること」を入力してください。<br />
            AIがあなたの伴走者として、最適なライフプランを提案します。
          </p>
          
          <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem', textAlign: 'left' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '0.8rem', color: '#94a3b8' }}>身長 (cm)</label>
                <input 
                  type="number" 
                  placeholder="170" 
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  style={{ width: '100%', padding: '0.8rem', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: 'white', marginTop: '0.4rem' }} 
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '0.8rem', color: '#94a3b8' }}>体重 (kg)</label>
                <input 
                  type="number" 
                  placeholder="65" 
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  style={{ width: '100%', padding: '0.8rem', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: 'white', marginTop: '0.4rem' }} 
                />
              </div>
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', color: '#94a3b8' }}>最近気になること</label>
              <textarea 
                placeholder="最近少し疲れやすくなった気がする..." 
                rows={3}
                value={concern}
                onChange={(e) => setConcern(e.target.value)}
                style={{ width: '100%', padding: '0.8rem', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: 'white', marginTop: '0.4rem', resize: 'none' }} 
              />
            </div>
          </div>

          <button 
            className="btn-primary" 
            onClick={handleStartAnalysis}
            disabled={isAnalyzing}
            style={{ width: '100%', fontSize: '1.1rem', zIndex: 100, position: 'relative' }}
          >
            {isAnalyzing ? "AI解析中..." : "解析を実行する"}
          </button>

          {/* 解析結果カードの出現 */}
          {result && (
            <div className="animate-fade-in" style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <div style={{ position: 'relative', width: '80px', height: '80px' }}>
                  <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%' }}>
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#1e293b" strokeWidth="2" />
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--primary)" strokeWidth="2" strokeDasharray={`${result.score}, 100`} />
                  </svg>
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontWeight: 'bold' }}>{result.score}</div>
                </div>
                <div style={{ marginLeft: '1.5rem', textAlign: 'left' }}>
                  <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>未来健康スコア</div>
                  <div style={{ fontSize: '1.2rem', color: 'white', fontWeight: 'bold' }}>良好なリズムです</div>
                </div>
              </div>
              <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '1.5rem', borderRadius: '16px', textAlign: 'left', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--primary)', marginBottom: '0.5rem', fontWeight: '600' }}>伴走者からの問いかけ</div>
                <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: '#e2e8f0' }}>{result.advice}</p>
              </div>
            </div>
          )}
        </div>
      </section>



      {/* Background Decor */}
      <div style={{
        position: 'fixed',
        top: '10%',
        left: '5%',
        width: '300px',
        height: '300px',
        background: 'var(--primary-glow)',
        filter: 'blur(100px)',
        zIndex: -1,
        borderRadius: '50%'
      }}></div>
      <div style={{
        position: 'fixed',
        bottom: '10%',
        right: '5%',
        width: '400px',
        height: '400px',
        background: 'rgba(99, 102, 241, 0.2)',
        filter: 'blur(120px)',
        zIndex: -1,
        borderRadius: '50%'
      }}></div>
    </main>
  );
}
