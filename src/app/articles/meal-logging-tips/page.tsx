"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import TabNavigation from "@/components/TabNavigation";


export default function ArticleMealLoggingTips() {
  const { lang } = useI18n();

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: '8rem' }}>
      <TabNavigation />
      
      <main className="container" style={{ paddingTop: '8.5rem', maxWidth: '800px' }}>
        <nav style={{ marginBottom: '2rem' }}>
          <Link href="/articles" style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '0.9rem' }}>
            &larr; Knowledge Hub に戻る
          </Link>
        </nav>

        <header style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'inline-block', padding: '0.3rem 0.8rem', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
            {lang === 'ja' ? "アプリ活用 / テクニック" : "App Tips / Techniques"}
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'white', lineHeight: '1.3', marginBottom: '1.5rem' }}>
            {lang === 'ja' ? "AI 解析の精度を 2 倍にする！食事写真の撮り方 5 つのコツ" : "Double Your AI Analysis Accuracy! 5 Tips for Taking Food Photos"}
          </h1>
          <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Published on April 20, 2026</div>
        </header>

        <article style={{ color: '#cbd5e1', lineHeight: '2', fontSize: '1.1rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <p>
            Nutri-Vision は、最新の AI 技術を駆使して画像から栄養成分を推定します。
            しかし、AI も人間と同じように「見えにくいもの」の判定は苦手です。
            いくつかの簡単なコツを押さえて撮影するだけで、解析の精度を劇的に向上させることができ、より正確なアドバイスを受け取れるようになります。
          </p>

          <section>
            <h2 style={{ color: 'white', fontSize: '1.6rem', fontWeight: 'bold', marginBottom: '1rem' }}>1. 明るい場所で撮る（自然光がベスト）</h2>
            <p>
              暗い場所で撮影された写真は、料理の色や質感が失われやすく、AI が食材を誤認する原因になります。
              できるだけ窓際の自然光が入る場所で撮影するか、室内の照明が十分に明るい状態で撮影しましょう。影が強く入りすぎないように注意してください。
            </p>
          </section>

          <section>
            <h2 style={{ color: 'white', fontSize: '1.6rem', fontWeight: 'bold', marginBottom: '1rem' }}>2. 斜め上 45 度から全体を収める</h2>
            <p>
              真上（俯瞰）からの撮影は美しく見えますが、料理の「厚み」や「ボリューム」が分かりにくいという欠点があります。
              斜め 45 度くらいの角度から、全ての皿と、できればコップやお箸などが一緒に映るように撮影すると、AI が料理の立体的な量を推測しやすくなります。
            </p>
          </section>

          <section>
            <h2 style={{ color: 'white', fontSize: '1.6rem', fontWeight: 'bold', marginBottom: '1rem' }}>3. 背景はできるだけシンプルに</h2>
            <p>
              テーブルの上に雑誌やリモコン、派手な模様のランチョンマットがあると、AI がどこまでが料理なのか迷うことがあります。
              可能な限り、シンプルで無地のテーブルやトレイの上で撮影するのが理想的です。
            </p>
          </section>

          <section>
            <h2 style={{ color: 'white', fontSize: '1.6rem', fontWeight: 'bold', marginBottom: '1rem' }}>4. サイズの基準になるものと一緒に</h2>
            <p>
              「このハンバーグは大きいのか小さいのか？」AI にとって最も難しいのがサイズ（重量）の判定です。
              標準的なサイズのお箸や、コップ、あるいは自分の手を少し添えて撮影することで、AI はそれらと比較して料理の正確な大きさを把握できます。
            </p>
          </section>

          <section>
            <h2 style={{ color: 'white', fontSize: '1.6rem', fontWeight: 'bold', marginBottom: '1rem' }}>5. 見えない食材はテキストで補足する</h2>
            <p>
              サラダの下に隠れたドレッシングや、カレーの中に溶け込んだ具材、お米の銘柄など、画像だけでは判断が不可能な要素があります。
              Nutri-Vision では解析時にテキストメッセージも送れるので、「オリーブオイル多め」「五穀米」などの一言を添えるだけで、精度は完璧に近づきます。
            </p>
          </section>

          <div style={{ marginTop: '3rem', padding: '2rem', border: '1px dashed #10b981', borderRadius: '16px', background: 'rgba(16, 185, 129, 0.05)' }}>
            <p style={{ fontSize: '1rem', color: 'white', fontWeight: 'bold', marginBottom: '0.5rem' }}>💡 整理整頓も健康の一歩</p>
            <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
              きれいに写真を撮ろうと意識することは、自分の食事と丁寧に向き合うことにも繋がります。
              Nutri-Vision をパートナーに、楽しみながら健康管理の習慣を身につけていきましょう。
            </p>
          </div>

          <div style={{ marginTop: '4rem', textAlign: 'center' }}>
            <Link href="/nutri-vision" className="btn-primary" style={{ padding: '1rem 3rem', borderRadius: '30px', textDecoration: 'none', display: 'inline-block', fontWeight: 'bold' }}>
              さっそく撮影してみる
            </Link>
          </div>
        </article>
      </main>

    </div>
  );
}
