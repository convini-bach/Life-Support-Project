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

      {/* SECTION 2: 独自解説コンテンツ (AdSenseポリシー対策) */}
      <section className="glass-card animate-fade-in" style={{ 
        marginTop: '6rem', 
        marginBottom: '8rem', 
        padding: 'clamp(2rem, 5vw, 4rem)',
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(59, 130, 246, 0.2)',
        borderRadius: '40px',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'left',
        maxWidth: '900px',
        margin: '6rem auto 8rem'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)', zIndex: 0 }}></div>
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 className="gradient-text" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 'bold', marginBottom: '2rem', lineHeight: '1.3' }}>
            精密なプロファイリングが拓く、<br />AIとの共創の未来
          </h2>
          <p style={{ color: '#60a5fa', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '3rem', borderLeft: '4px solid #3b82f6', paddingLeft: '1rem' }}>
            あなたの「今」を、最高の知恵へと変換するために
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', color: '#cbd5e1', lineHeight: '2.0', fontSize: '1.05rem' }}>
            <div>
              <h3 style={{ color: 'white', fontSize: '1.3rem', marginBottom: '1rem', fontWeight: 'bold' }}>なぜ「基本データ」の入力が、AIの知能を研ぎ澄ますのか</h3>
              <p>
                コンピュータの世界には「Garbage In, Garbage Out（ゴミを入れればゴミが出る）」という有名な言葉があります。どれほど高性能なAIであっても、その判断材料となる「入力データ」が曖昧であれば、返ってくる答えもまた、誰にでも当てはまるような凡庸なものになってしまいます。
              </p>
              <p>
                このLife-Diagnosis（健康解析）で、私たちが身長、体重、そして「最近気になること」という基本プロファイルをあえて入念に伺うのは、AIに「あなたの身体という宇宙」の基準点（アンカー）を教え込むためです。
              </p>
              <p>
                例えば、同じ「倦怠感」という悩みでも、20代の活動的な男性と、50代で座り仕事中心の女性では、その背景にあるリスクも解決策も全く異なります。プロファイリングは、AIを「一般論を語る百科事典」から「あなた専用の専属コーチ」へと変貌させるための、聖なる儀式なのです。
              </p>
            </div>

            <div>
              <h3 style={{ color: 'white', fontSize: '1.3rem', marginBottom: '1rem', fontWeight: 'bold' }}>AIを単なる「道具」から「パートナー」へ</h3>
              <p>
                私が著書『AI実践辞典』で提唱しているビジョンは、AIを単に指示待ちの道具として使うのではなく、想いを同期し、共感し合える「パートナー」として育てることです。
              </p>
              <p>
                このアプリにおけるAI伴走者は、あなたの過去の履歴、現在の目標、そして将来の不安をすべて学習し、文脈（コンテキスト）を理解した上でアドバイスを行います。あなたが正直に自分の悩み（concern）を打ち明けるほど、AIはあなたの「第二の脳」として深く機能し始めます。
              </p>
              <p>
                それは、鏡を見るような体験です。自分一人では気づけなかった体調の変化や、生活習慣の歪みを、AIという曇りのない鏡が映し出してくれる。その客観性こそが、私たちに冷静な判断力と、改善への勇気を与えてくれます。
              </p>
            </div>

            <div>
              <h3 style={{ color: 'white', fontSize: '1.3rem', marginBottom: '1rem', fontWeight: 'bold' }}>健康の主権を、自分の手に取り戻す</h3>
              <p>
                Life Support Projectが掲げる「Local-First」という設計思想は、あなたのデータはあなただけのものであるべきだ、という強い意志に基づいています。
              </p>
              <p>
                これまでの健康管理は、病院の検査結果や保険会社の査定など、自分の外側にある大きなシステムに委ねられてきました。しかし、AIという高度な解析力を個人が手に入れた今、私たちは自分の健康の主権（セルフ・ソブリン）を自分自身に取り戻すことができます。
              </p>
              <p>
                日々の小さな記録をAIと共有し、自分に最適化された知恵を積み上げていく。そのプロセスは、10年後の自分自身を「最高の状態」で守り抜くための確かな戦略となります。私たちは、AIと共に生きることで、かつてないほど自由に、そして健やかに、自分の人生をデザインできる時代に生きているのです。
              </p>
            </div>
          </div>
        </div>
      </section>

      <div style={{ textAlign: 'center', paddingBottom: '5rem' }}>
        <Link href="/" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.9rem' }}>
          &larr; ポータルに戻る
        </Link>
      </div>

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
