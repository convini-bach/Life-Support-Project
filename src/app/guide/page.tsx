"use client";

import { useI18n } from "@/lib/i18n";
import TabNavigation from "@/components/TabNavigation";

import Link from "next/link";

export default function GuidePage() {
  const { lang, t } = useI18n();

  const sections = [
    {
      title: lang === 'ja' ? "1. ログインして準備する" : "1. Login & Get Ready",
      desc: lang === 'ja' 
        ? "高精度なAI解析の結果を保存し、いつでも振り返るためにログインが必要です。アカウントを作成すると、あなたのデータはクラウドで安全に同期されます。" 
        : "Sign in to save your AI analysis results and look back at them anytime. Creating an account keeps your data safely synced in the cloud.",
      image: "/images/guide/guide_login.png",
      alt: "Portal & Login"
    },
    {
      title: lang === 'ja' ? "2. プロフィールを設定する" : "2. Set Up Your Profile",
      desc: lang === 'ja'
        ? "「設定」タブから身長、体重、活動レベルを登録しましょう。これにより、AIがあなたに最適な目標摂取カロリーやアドバイスを自動計算します。"
        : "Register your height, weight, and activity level in the Settings tab. This allows the AI to automatically calculate your optimal target calories and advice.",
      image: "/images/guide/guide_profile.png",
      alt: "Profile & Settings"
    },
    {
      title: lang === 'ja' ? "3. AIによる食事解析" : "3. AI Meal Analysis",
      desc: lang === 'ja'
        ? "「食事」タブから画像・テキスト・音声🎙️で記録。AIが一瞬で栄養成分を解析し、プロのコーチのような視点でパーソナライズされた助言をお届けします。"
        : "Log via image, text, or voice 🎙️ in the Meal tab. AI instantly analyzes nutrients and provides personalized professional coaching advice.",
      image: "/images/guide/guide_analysis.png",
      alt: "Analysis Interface"
    },
    {
      title: lang === 'ja' ? "4. 統計・履歴で振り返る" : "4. Review in Statistics & History",
      desc: lang === 'ja'
        ? "「統計・履歴」タブでは、カレンダーでの食事管理や、体重の推移グラフを確認できます。PFCバランスの達成度を視覚的に把握し、健康管理を継続しましょう。"
        : "In the Statistics & History tab, view your meal calendar and weight trend chart. Visually track your PFC balance achievement and stay consistent.",
      image: "/images/guide/guide_history.png",
      alt: "History & Statistics"
    }
  ];

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: '5rem' }}>
      <TabNavigation />
      
      <main className="container" style={{ paddingTop: '8.5rem', maxWidth: '900px' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 className="gradient-text" style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            {t('nav.guide')}
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>
            {lang === 'ja' ? "Nutri-Visionを最大限に活用するためのステップをご案内します。" : "Step-by-step guide to maximize your Nutri-Vision experience."}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
          {sections.map((section, idx) => (
            <section key={idx} className="glass-card animate-fade-in" style={{ padding: '0', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ padding: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '1rem' }}>{section.title}</h2>
                <p style={{ color: '#cbd5e1', lineHeight: '1.8', marginBottom: '1.5rem' }}>{section.desc}</p>
              </div>
              <div style={{ position: 'relative', width: '100%', background: '#0a0f1c', padding: '1rem' }}>
                <img 
                  src={section.image} 
                  alt={section.alt} 
                  style={{ 
                    maxHeight: '600px',
                    width: 'auto', 
                    margin: '0 auto',
                    display: 'block',
                    borderRadius: '8px', 
                    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }} 
                />
              </div>
            </section>
          ))}
        </div>

        <div style={{ marginTop: '5rem', textAlign: 'center' }}>
          <Link href="/" className="btn-primary" style={{ padding: '1rem 2.5rem', borderRadius: '30px', textDecoration: 'none', display: 'inline-block' }}>
            {lang === 'ja' ? "アプリを使い始める" : "Start Using the App"}
          </Link>
        </div>
      </main>

    </div>
  );
}
