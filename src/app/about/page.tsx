"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import TabNavigation from "@/components/TabNavigation";


export default function AboutPage() {
  const { lang, t } = useI18n();

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: '8rem' }}>
      <TabNavigation />
      
      <main className="container" style={{ paddingTop: '8.5rem', maxWidth: '800px' }}>
        <header style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h1 className="gradient-text" style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
            About Life Support Project
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
            {lang === 'ja' ? "自分の健康を自分で守るための、最小で最強の武器をすべての人へ。" : "Providing the smallest yet strongest weapon for everyone to protect their own health."}
          </p>
        </header>

        <section className="glass-card animate-fade-in" style={{ padding: '3rem', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'white', marginBottom: '2rem', borderBottom: '2px solid var(--primary)', paddingBottom: '0.5rem', display: 'inline-block' }}>
            {lang === 'ja' ? "始まりは、一通の診断結果から" : "It began with a single health report"}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: '#cbd5e1', lineHeight: '2', fontSize: '1.1rem' }}>
            <p>
              37歳という若さで、初めて突きつけられた「要再検査」の通知。
              これまで健康を過信していた私にとって、腎臓の数値が悪化しているという現実は、言葉にできないショックでした。
            </p>
            <p>
              原因は「塩分の摂りすぎ」。
              しかし、いざ改善しようとしても、自分が日々何をどれだけ食べているのか、正確な数値が全く分からない現実に気づきました。
            </p>
            <p style={{ background: 'rgba(16, 185, 129, 0.05)', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid var(--primary)', fontStyle: 'italic' }}>
              「不安を解消するには、根拠となるデータが必要だ。」
            </p>
            <p>
              5年前、妻が乳がん検診で再検査を告げられた時のことも思い出しました。結局は異状なしでしたが、あの時、不安に震え、涙を流す妻に、私はただ「大丈夫」と無力な言葉をかけることしかできなかった。
              あの時の無力感を、もう繰り返したくない。自分と家族を守るための、確かな「武器」が欲しかったのです。
            </p>
          </div>
        </section>

        <section className="glass-card animate-fade-in" style={{ padding: '3rem', marginBottom: '4rem', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.03) 0%, transparent 100%)' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'white', marginBottom: '2rem', borderBottom: '2px solid #3b82f6', paddingBottom: '0.5rem', display: 'inline-block' }}>
            {lang === 'ja' ? "AI（Antigravity）との共同開発" : "Co-developing with AI (Antigravity)"}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: '#cbd5e1', lineHeight: '2', fontSize: '1.1rem' }}>
            <p>
              「食事の写真を撮るだけで、瞬時に詳細な栄養成分が分かったら。そして、プロのコーチのような助言がもらえたら。」
              そんなアイデアを最初に試したのは Gemini でした。ざっくりとした数値が出てきた時、可能性を確信しました。
            </p>
            <p>
              ちょうどその頃、AI coding assistant である **Antigravity** の存在を知りました。「AI にアプリ開発を任せられる」という未知の体験に飛び込みました。
            </p>
            <p>
              私は、Antigravity の中に 4 人のスペシャリストを設定しました。
              UI/UX デザイナー、フルスタックエンジニア、QAテスター、そしてプロジェクトマネージャー。
              そこに私を加えた「5人チーム」で、昼夜を問わず対話を重ね、時には議論し、一つ一つの機能を磨き上げてきました。
            </p>
            <p>
              これは、人間一人の力でも、AI だけの力でも到達できなかった、新しい共同創造のカタチです。
            </p>
          </div>
        </section>

        <section className="glass-card animate-fade-in" style={{ padding: '3rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'white', marginBottom: '2rem' }}>
            {lang === 'ja' ? "関わるすべての人を、笑顔に" : "Making Everyone Involved Smile"}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: '#cbd5e1', lineHeight: '2', fontSize: '1.1rem' }}>
            <p>
              私の人生の目標は、私に関わってくれたすべての人に幸せになってもらうことです。
              日常の不便を解消するアイデアを AI と共に形にし、それを公開する。
              それが自分、家族、そして利用してくれる皆様の生活を、ほんの少しでも良くしていく。
            </p>
            <p>
              Life Support Project は、AI の力で「健康の主権」を個人の手に取り戻すための挑戦です。
              あなたが、あなたの大切な人を守るための確かな一歩を、私たちはテクノロジーで支え続けます。
            </p>
          </div>
          
          <div style={{ marginTop: '3rem' }}>
            <Link href="/" className="btn-primary" style={{ padding: '1rem 3rem', borderRadius: '30px', textDecoration: 'none', display: 'inline-block', fontWeight: 'bold' }}>
              {lang === 'ja' ? "メインポータルへ" : "Back to Portal"}
            </Link>
          </div>
        </section>
      </main>

    </div>
  );
}
