"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { useUser, SignInButton, SignUpButton } from "@clerk/nextjs";
import AffiliateCard from "@/components/AffiliateCard";
import { ITEMS } from "@/lib/recommendation";


const APP_VERSION = "2604162400"; // YYMMDDHHMM

export default function Home() {
  const { t, lang } = useI18n();
  const { isSignedIn, isLoaded } = useUser();

  const apps = [
    {
      id: "nutri-vision",
      name: "Nutri-Vision",
      description: t('portal.nutri_vision.desc'),
      href: "/nutri-vision",
      icon: "🥗",
      color: "#10b981",
    },
    {
      id: "dictionary",
      name: lang === 'ja' ? "AI実践辞典" : "AI Dictionary",
      description: lang === 'ja' 
        ? "AIをただの道具で終わらせない。想いを同期し、最高のパートナーへと育て上げるための実践ガイド。" 
        : "Transform AI from a tool to a partner. A practical guide to synchronizing vision and building synergy.",
      href: "/dictionary",
      icon: "🎨",
      color: "#10b981", 
    },
    {
      id: "recipe-app",
      name: "Smart Kitchen",
      description: "冷蔵庫管理 ＋ 賞味期限通知。家族の好みに合わせた献立をAIがプランニングします。",
      href: "/recipe-app/fridge",
      icon: "🍳",
      color: "#4ade80",
    }
  ];

  return (
    <main className="container min-h-screen flex flex-col items-center justify-center" style={{ paddingTop: 'clamp(2rem, 5vh, 4rem)' }}>
      <div style={{ position: 'fixed', top: '1.5rem', left: '1.5rem', fontSize: '0.65rem', color: '#475569', zIndex: 10, fontFamily: 'monospace' }}>
        ver.{APP_VERSION}
      </div>
      <header className="text-center mb-16 animate-fade-in" style={{ width: '100%', position: 'relative' }}>
        <div className="header-profile-wrap">
          <Link href="/profile" className="glass-card" style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            👤 {t('nav.profile')}
          </Link>
        </div>
        <h1 className="gradient-text" style={{ marginBottom: '1rem' }}>{t('portal.welcome')}</h1>
        <p style={{ color: '#94a3b8', fontSize: 'clamp(1rem, 3vw, 1.1rem)' }}>{t('portal.subtitle')}</p>
      </header>

      <div className="portal-apps-grid" style={{ maxWidth: '1000px' }}>
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
                {t('portal.open_app')} <span style={{ marginLeft: '0.5rem' }}>&rarr;</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {isLoaded && !isSignedIn && (
        <section className="glass-card animate-fade-in" style={{ 
          marginTop: 'clamp(3rem, 10vw, 6rem)', 
          width: '100%', 
          maxWidth: '900px', 
          textAlign: 'center', 
          padding: 'clamp(2rem, 8vw, 3rem) clamp(1rem, 5vw, 2rem)',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)',
          border: '1px solid rgba(16, 185, 129, 0.2)'
        }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1.2rem' }}>
            {t('portal.welcome')} へようこそ
          </h2>
          <p style={{ color: '#94a3b8', lineHeight: '1.7', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
            健康の主権を取り戻す旅には、あなた専用のデータスペースが必要です。
            ログインすることで、解析履歴の保存、身体データに基づいたパーソナライズ、そして安全なデータ管理が可能になります。
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <SignInButton mode="modal">
              <button className="btn-primary" style={{ padding: '0.8rem 2rem' }}>ログイン</button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="btn-secondary" style={{ padding: '0.8rem 2rem', border: '1px solid #334155' }}>新規登録</button>
            </SignUpButton>
          </div>
        </section>
      )}

      {/* SECTION: Founder's Message (Vision) */}
      <section className="vision-section animate-fade-in" style={{ 
        marginTop: 'clamp(4rem, 10vw, 8rem)', 
        background: 'rgba(255, 255, 255, 0.02)', 
        borderRadius: '40px', 
        border: '1px solid rgba(255, 255, 255, 0.05)',
        maxWidth: '900px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative Background for Section */}
        <div style={{ position: 'absolute', top: '-50%', left: '-20%', width: '140%', height: '200%', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%)', zIndex: 0 }}></div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
            <div style={{ width: '40px', height: '1px', background: 'var(--primary)' }}></div>
            <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--primary)', fontWeight: 'bold' }}>Our Vision & Story</span>
          </div>
          
          <h2 style={{ fontWeight: 'bold', marginBottom: '3rem' }} className="gradient-text">
            大切な人を守るための、<br />確かな「武器」を手に。
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', color: '#cbd5e1', lineHeight: '1.9', fontSize: '1.05rem' }}>
            <div className="vision-content" style={{ borderLeft: '2px solid rgba(16, 185, 129, 0.4)', paddingLeft: 'min(2rem, 4vw)' }}>
              <h3 style={{ color: 'white', fontSize: '1.4rem', marginBottom: '1.2rem', fontWeight: 'bold' }}>制作のきっかけ</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p>
                  37歳の時の健康診断。これまで健康だった私に届いた初めての「要再検査」通知。腎臓の数値悪化の原因が塩分の摂りすぎであることは、自分でも薄々気づいていました。しかし、いざ改善しようとしても、自分が日々どれだけの栄養素を摂取しているのか、客観的な数値が全く分からない現実に直面し、ショックを受けたのです。
                </p>
                <p>
                  思い出したのは5年前、妻が乳がん検診で再検査になった時のことです。結果は異状なしでしたが、あの時、不安で泣いていた妻に、私はただ「大丈夫」と慰めることしかできませんでした。
                </p>
                <p>
                  「客観的な数値がわかれば、自分も家族ももっと守れるのではないか」。妻の助言で始めた食事写真の記録。これを単なる画像で終わらせず、AIの力で瞬時に解析できれば、それは自分だけでなく、多くの人の役に立つ「武器」になると確信しました。
                </p>
                <p>
                  ちょうどその頃に出会ったAntigravity（AI開発チーム）と共に、5人のスペシャリストからなるチームを組み、対話を重ねることで、このアプリは形になりました。
                </p>
              </div>
            </div>

            <div className="vision-content" style={{ borderLeft: '2px solid rgba(59, 130, 246, 0.4)', paddingLeft: 'min(2rem, 4vw)' }}>
              <h3 style={{ color: 'white', fontSize: '1.4rem', marginBottom: '1.2rem', fontWeight: 'bold' }}>描く未来</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p>
                  このアプリは、自分の切実な悩みから生まれましたが、「自分が本当に使い勝手がいいと思うものは、必ず誰かの役に立つ」と信じています。日々の生活で感じる「不便」や「理想」をAIへ投げかけ、形にしていく。そのプロセスこそが、自分自身、家族、そして利用者の皆様の生活をより良く変えていく力になると信じています。
                </p>
                <p>
                  私の人生の目標は、私に関わってくれたすべての人に幸せになってもらうこと、そしてそのために少しでも役立つことです。幼い頃から抱き続けてきた「人の役に立ちたい」という願いを、このアプリを通じて実現していきたいと考えています。
                </p>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', padding: 'min(2rem, 5vw)', background: 'rgba(255,255,255,0.03)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)', fontStyle: 'italic' }}>
              <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: '1.7' }}>
                Life Support Projectは、単なるツールではありません。AIと共に自分の人生の主導権を取り戻し、自分と大切な人を守るための、新しい挑戦の場です。
              </p>
            </div>
          </div>
          
          <div style={{ marginTop: '4rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'linear-gradient(135deg, #10b981, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', boxShadow: '0 10px 20px rgba(16, 185, 129, 0.2)' }}>🥗</div>
            <div>
              <div style={{ color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}>Project Founder</div>
              <div style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.2rem' }}>Life Support Project 代表</div>
            </div>
          </div>
        </div>
      </section>

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

      {/* SECTION: Featured Books */}
      <section className="books-section animate-fade-in" style={{ 
        marginTop: 'clamp(4rem, 10vw, 8rem)', 
        width: '100%',
        maxWidth: '900px',
        paddingBottom: '8rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ width: '40px', height: '1px', background: 'var(--primary)' }}></div>
          <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--primary)', fontWeight: 'bold' }}>Featured Books</span>
        </div>
        <h2 className="gradient-text" style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '2.5rem' }}>
          AIと共に歩むための、<br />著者の知見を凝縮。
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {ITEMS.filter(item => ["ai-dictionary-v1", "ai-dictionary-v2", "second-brain-guide"].includes(item.id)).map(book => (
            <AffiliateCard key={book.id} item={book} label="著書" />
          ))}
        </div>
      </section>
    </main>
  );
}
