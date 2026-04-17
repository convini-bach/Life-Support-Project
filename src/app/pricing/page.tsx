"use client";

import { useI18n } from "@/lib/i18n";
import Link from "next/link";
import TabNavigation from "@/components/TabNavigation";

export default function PricingPage() {
  const { lang, t } = useI18n();

  const plans = [
    {
      name: lang === 'ja' ? "Free (無料)" : "Free Plan",
      price: "¥0",
      description: lang === 'ja' ? "基本機能を体験できます" : "Experience basic features",
      features: [
        lang === 'ja' ? "1日3回までのAI解析" : "Up to 3 AI analyses per day",
        lang === 'ja' ? "直近3日間の履歴閲覧" : "View history for the last 3 days",
        lang === 'ja' ? "基本栄養素のグラフ表示" : "Basic nutrient graphs",
        lang === 'ja' ? "Local-Firstなプライバシー保護" : "Local-First privacy protection",
      ],
      button: lang === 'ja' ? "無料で始める" : "Start for Free",
      href: "/nutri-vision",
      highlight: false
    },
    {
      name: lang === 'ja' ? "Premium (プレミアム)" : "Premium Plan",
      price: "¥500",
      period: lang === 'ja' ? "/月 (税込)" : "/mo (tax incl.)",
      description: lang === 'ja' ? "徹底的な健康管理とコーチング" : "In-depth health management",
      features: [
        lang === 'ja' ? "AI解析が無制限" : "Unlimited AI analysis",
        lang === 'ja' ? "すべての過去履歴を閲覧可能" : "Full access to all history",
        lang === 'ja' ? "プロ級のパーソナライズ解析" : "Professional-grade advice",
        lang === 'ja' ? "体重予測・傾向分析(将来実装)" : "Weight forecasting (future update)",
        lang === 'ja' ? "広告・制限なしのシームレス体験" : "Zero limits & Ad-free experience",
      ],
      button: lang === 'ja' ? "プレミアムに登録" : "Upgrade to Premium",
      href: "/profile",
      highlight: true
    }
  ];

  return (
    <main className="container" style={{ paddingTop: '8.5rem', paddingBottom: '8rem' }}>
      <TabNavigation />
      <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{t('nav.pricing')}</h1>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>
          {lang === 'ja' ? "あなたの健康を、AIが一生涯サポートします。" : "AI-powered lifelong support for your health."}
        </p>
      </header>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2.5rem',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        {plans.map((plan, idx) => (
          <div key={idx} className="glass-card animate-fade-in" style={{
            padding: '2.5rem',
            border: plan.highlight ? '2px solid var(--primary)' : '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            transform: plan.highlight ? 'scale(1.03)' : 'none',
            zIndex: plan.highlight ? 1 : 0
          }}>
            {plan.highlight && (
              <div style={{
                position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)',
                background: 'var(--primary)', color: 'white', padding: '2px 12px', borderRadius: '12px',
                fontSize: '0.75rem', fontWeight: 'bold'
              }}>RECOMMENDED</div>
            )}
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{plan.name}</h2>
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{plan.price}</span>
              {plan.period && <span style={{ color: '#64748b', fontSize: '0.9rem' }}>{plan.period}</span>}
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '2rem', height: '3rem' }}>{plan.description}</p>
            
            <div style={{ marginBottom: '2.5rem', flex: 1 }}>
              {plan.features.map((feature, fIdx) => (
                <div key={fIdx} style={{ display: 'flex', gap: '0.8rem', marginBottom: '0.8rem', fontSize: '0.9rem', color: '#cbd5e1' }}>
                  <span style={{ color: 'var(--primary)' }}>✓</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <Link href={plan.href} className={plan.highlight ? "btn-primary" : "btn-secondary"} style={{ textAlign: 'center', textDecoration: 'none' }}>
              {plan.button}
            </Link>
          </div>
        ))}
      </div>

      <section style={{ marginTop: '6rem', maxWidth: '800px', margin: '6rem auto 0' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '2rem', textAlign: 'center' }}>
          {lang === 'ja' ? "よくあるご質問" : "Frequently Asked Questions"}
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {[
            {
              q: lang === 'ja' ? "解約はいつでも可能ですか？" : "Can I cancel at any time?",
              a: lang === 'ja' ? "はい、サブスクリプションは設定画面からいつでも解約可能です。期間終了まで機能をご利用いただけます。" : "Yes, you can cancel your subscription at any time from the settings. You can continue to use the features until the end of the period."
            },
            {
              q: lang === 'ja' ? "データはどこに保存されますか？" : "Where is my data stored?",
              a: lang === 'ja' ? "Local-First 原則に基づき、あなたの健康データはあなたのブラウザ内にのみ保存されます。当社サーバーがそれらを収集することはありません。" : "Based on the Local-First principle, your health data is stored only in your browser. Our servers do not collect it."
            }
          ].map((item, i) => (
            <div key={i}>
              <h4 style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: 'white' }}>Q. {item.q}</h4>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.6' }}>{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
