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
        ? "回数制限の管理とセキュリティのため、解析にはログインが必要です。アカウントを作成して、あなたのデータを安全に管理しましょう。" 
        : "Sign in is required for analysis and limit tracking. Create an account to manage your data securely.",
      image: "/images/guide/portal.png",
      alt: "Portal & Login"
    },
    {
      title: lang === 'ja' ? "2. スタイルに合わせたプラン選択" : "2. Choose Your Plan",
      desc: lang === 'ja'
        ? "無料枠（1日3回）、プレミアム（無制限）、開発者モード（自前APIキーで無制限）の3つから選べます。ライフスタイルに合わせてアップグレード可能です。"
        : "Choose from 3 tiers: Free (3/day), Premium (Unlimited), or Dev Mode (Unlimited via own API key). Upgrade anytime.",
      image: "/images/guide/pricing.png",
      alt: "Pricing Plans"
    },
    {
      title: lang === 'ja' ? "3. AIによるプロフェッショナル解析" : "3. AI Professional Analysis",
      desc: lang === 'ja'
        ? "画像・テキスト・音声🎙️で食事を記録。AIが一瞬で栄養成分を解析し、プロのコーチのような視点でパーソナライズされた助言をお届けします。"
        : "Log via image, text, or voice 🎙️. AI instantly analyzes nutrients and provides personalized professional coaching advice.",
      image: "/images/guide/nutri-vision.png",
      alt: "Analysis Interface"
    },
    {
      title: lang === 'ja' ? "4. 状況確認と詳細設定" : "4. Status & Settings",
      desc: lang === 'ja'
        ? "プロフィール画面では、本日の残り利用回数や加入中のプランを確認できます。開発者モードの方は、ここで自分のAPIキーを登録してください。"
        : "In the Profile screen, check today's remaining uses and your plan status. Dev Mode users can register their private API keys here.",
      image: "/images/guide/profile.png",
      alt: "Profile & Settings"
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
