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
        ? "回数制限の管理とセキリティのため、解析にはログインが必要です。プロフィール画面からアカウントを作成して始めましょう。" 
        : "Sign in is required for analysis and limit tracking. Create an account in the Profile screen to get started.",
      image: "/images/guide/portal.png",
      alt: "Portal & Login"
    },
    {
      title: lang === 'ja' ? "2. スタイルに合わせたプラン選択" : "2. Choose Your Plan",
      desc: lang === 'ja'
        ? "無料枠（1日3回）、プレミアム（無制限）、開発者モード（自前APIキーで無制限）の3つから選べます。自分にぴったりのスタイルで見つけてください。"
        : "Choose from 3 tiers: Free (3/day), Premium (Unlimited), or Dev Mode (Unlimited via own API key). Pick the style that fits you.",
      image: "/images/guide/pricing.png",
      alt: "Pricing Plans"
    },
    {
      title: lang === 'ja' ? "3. 多彩な方法で解析・記録" : "3. Capture & Analyze",
      desc: lang === 'ja'
        ? "写真、テキスト、そして『一品ずつお話しください』と書かれた音声入力🎙️ボタン。AIがあなたの食事を瞬時にプロの視点で解析します。"
        : "Use photos, text, or the Voice Input 🎙️ button. The AI analyzes your meals instantly from a professional coach's perspective.",
      image: "/images/guide/nutri-vision.png",
      alt: "Analysis Interface"
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
