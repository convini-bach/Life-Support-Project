"use client";

import Link from "next/link";
const APP_VERSION = "2604162248"; // YYMMDDHHMM

export default function Home() {
  const apps = [
    {
      id: "nutri-vision",
      name: "Nutri-Vision",
      description: "食事を「視る」、身体を「知る」。AIによるプロフェッショナルな食事解析ツール。",
      href: "/nutri-vision",
      icon: "🥗",
      color: "#10b981",
    },
    {
      id: "recipe-cart",
      name: "Recipe-Cart",
      description: "解析結果に基づいたレシピ提案と、効率的な買い物管理をサポートします。",
      href: "/recipe-cart",
      icon: "🛒",
      color: "#f59e0b",
    },
    {
      id: "hoken-mirror",
      name: "Hoken-Mirror",
      description: "その保険は、今のあなたを正しく映していますか？AIによるミラーリング診断。",
      href: "/hoken-mirror",
      icon: "🛡️",
      color: "#3b82f6",
    },
    {
      id: "sumai-check",
      name: "Sumai-Check",
      description: "住まいのコストは人生の土台。居住戦略の最適化をサポートします。",
      href: "/sumai-check",
      icon: "🏠",
      color: "#ec4899",
    },
    {
      id: "work-counsel",
      name: "Work-Counsel",
      description: "働くことは生きること。キャリアのリズムとバランスをAIが診断します。",
      href: "/work-counsel",
      icon: "💼",
      color: "#8b5cf6",
    }
  ];

  return (
    <main className="container min-h-screen flex flex-col items-center justify-center">
      <div style={{ position: 'fixed', top: '1rem', left: '1rem', fontSize: '0.65rem', color: '#475569', zIndex: 10, fontFamily: 'monospace' }}>
        ver.{APP_VERSION}
      </div>
      <header className="text-center mb-16 animate-fade-in" style={{ width: '100%', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, right: 0 }}>
          <Link href="/profile" className="glass-card" style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            👤 プロフィール
          </Link>
        </div>
        <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Life Support Project</h1>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>Local-Firstな知恵の集積地。あなたのデータは、あなただけのものです。</p>
      </header>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2rem',
        width: '100%',
        maxWidth: '900px'
      }}>
        {apps.map((app) => (
          <Link key={app.id} href={app.href} style={{ textDecoration: 'none' }}>
            <div className="glass-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div style={{ 
                fontSize: '2.5rem', 
                marginBottom: '1.5rem',
                padding: '1rem',
                background: `rgba(${app.id === 'nutri-vision' ? '16, 185, 129' : '59, 130, 246'}, 0.1)`,
                borderRadius: '16px'
              }}>
                {app.icon}
              </div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.8rem', color: app.color }}>{app.name}</h2>
              <p style={{ color: '#94a3b8', lineHeight: '1.6', fontSize: '0.95rem' }}>{app.description}</p>
              <div style={{ marginTop: 'auto', paddingTop: '2rem', color: 'white', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                アプリを開く <span style={{ marginLeft: '0.5rem' }}>&rarr;</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer Info */}
      <footer style={{ marginTop: '5rem', textAlign: 'center', color: '#475569', fontSize: '0.8rem' }}>
        <p>プロジェクト憲法に基づき、データのプライバシーを最優先に設計されています。</p>
      </footer>

      {/* Background Decor */}
      <div style={{
        position: 'fixed',
        top: '20%',
        left: '10%',
        width: '300px',
        height: '300px',
        background: 'rgba(16, 185, 129, 0.15)',
        filter: 'blur(100px)',
        zIndex: -1,
        borderRadius: '50%'
      }}></div>
      <div style={{
        position: 'fixed',
        bottom: '20%',
        right: '10%',
        width: '400px',
        height: '400px',
        background: 'rgba(59, 130, 246, 0.15)',
        filter: 'blur(120px)',
        zIndex: -1,
        borderRadius: '50%'
      }}></div>
    </main>
  );
}
