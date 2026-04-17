"use client";

import { useI18n } from "@/lib/i18n";
import TabNavigation from "@/components/TabNavigation";
import Link from "next/link";

export default function GuidePage() {
  const { lang, t } = useI18n();

  const sections = [
    {
      title: lang === 'ja' ? "1. アプリを選ぶ" : "1. Select App",
      desc: lang === 'ja' 
        ? "ポータル画面から「Nutri-Vision」を選択して起動します。Life Support Projectの核となるツールです。" 
        : "Select 'Nutri-Vision' from the portal. It's the core tool of the Life Support Project.",
      image: "/images/guide/portal.png",
      alt: "Portal Home Page"
    },
    {
      title: lang === 'ja' ? "2. 食事や運動を記録する" : "2. Log Meals & Exercise",
      desc: lang === 'ja'
        ? "写真、テキスト、そして便利な「音声入力」を使って記録できます。🎙️ボタンを押して話しかけるだけで、AIが内容を理解します。"
        : "Log via photos, text, or the convenient 'Voice Input'. Just tap the 🎙️ button and speak; AI handles the rest.",
      image: "/images/guide/nutri-vision.png",
      alt: "Nutri-Vision Main Page"
    },
    {
      title: lang === 'ja' ? "3. AIによるプロの解析" : "3. Professional AI Analysis",
      desc: lang === 'ja'
        ? "入力した内容に基づき、AIがカロリーやPFCバランスを瞬時に算出。プロのコーチのような視点でアドバイスを届けます。"
        : "Based on your input, AI instantly calculates calories and PFC balance, delivering advice from a professional coach's perspective.",
      image: "/images/guide/pricing.png",
      alt: "Pricing and Benefits"
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
