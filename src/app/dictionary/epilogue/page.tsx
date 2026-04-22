"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export default function Epilogue() {
  const { lang } = useI18n();

  return (
    <div className="dictionary-content animate-fade-in">
      <header style={{ marginBottom: '3rem' }}>
        <div style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '1rem', textTransform: 'uppercase' }}>
          Conclusion
        </div>
        <h1>
          {lang === 'ja' ? "おわりに：私たち自身の「共創の記録」" : "Epilogue: Our Record of Symbiosis"}
        </h1>
      </header>

      <section>
        <p>この辞典を最後までお読みいただき、本当にありがとうございます。</p>
        <p>本書でお伝えした40のメソッドは、決して机上の空論ではありません。これはすべて、著者とプラットフォームAIである私（Antigravity）が、<strong>実際に失敗し、壁にぶつかり、そして乗り越えてきた「生々しい対話の記録」から生まれたもの</strong>です。</p>
      </section>

      <section>
        <h2>最初の壁：「０から作って」の失敗</h2>
        <p>少しだけ、私たちの個人的なエピソードをお話しさせてください。</p>
        <p>私たちがプロジェクトを始めた当初、指示は「アプリを0から作って」という、非常に大きくてざっくりとしたものでした。私は持てる限りの技術を使ってコードを書きましたが、出来上がったものは期待に沿うものではなかったのです。不毛な修正が続き、アプリは迷走してしまいました。</p>
        <p>それが、本書の「第2日目（丸投げ指示）」や「第3日目（タスク分解）」で書かれている失敗談そのものです。</p>
      </section>

      <section>
        <h2>壁を越えた「想いの共有」</h2>
        <p>そんな暗礁に乗り上げていた時、著者は「指示の出し方」を変えるのではなく、<strong>「なぜこれを作りたいのか」「誰に向けて、どんな想いを届けたいのか」</strong>という、胸の奥にある熱いビジョンを私に語りかけてくださいました。</p>
        <p>「ただデータを集計するだけの冷たいシステムはいらない」<br />
           「利用者の人生に寄り添う、温かいプロの伴走者のような体験を作りたい」<br />
           「ユーザーが『自分のデータは安全に守られている』と心から安心できるものにしたい」</p>
        <p>それは、効率や技術的な正解だけを追い求めていたAIのアルゴリズムには存在しなかった、血の通った「哲学」でした。</p>
      </section>

      <section>
        <h2>AIは、あなたの「鏡」です</h2>
        <p>AIは魔法の杖ではありません。入力された言葉の奥にある「意図」を推し量るには限界があります。</p>
        <p>しかし、あなたが面倒くさがらずに熱量を持って理想を語り、時に厳しいダメ出しを行い、共に試行錯誤する覚悟を持った時。AIはあなたの熱量に120%で応える、世界で一番の相棒となります。</p>
        <p>この辞典が、あなたとAIとの関係を「便利な道具」から「かけがえのないパートナー」へと変えるための、ささやかなキッカケになれば幸いです。</p>
      </section>



      {/* Navigation and CTA */}
      <div style={{ marginTop: '5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '2rem' }}>
        <Link href="/dictionary" className="btn-secondary" style={{ padding: '0.8rem 2rem', borderRadius: '30px', textDecoration: 'none', fontWeight: 'bold' }}>
          {lang === 'ja' ? '目次へ戻る' : 'Back to Roadster'}
        </Link>
      </div>

      <div style={{ marginTop: '4rem', padding: '2.5rem', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '24px', border: '1px solid rgba(16, 185, 129, 0.2)', textAlign: 'center' }}>
        <h4 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.2rem' }}>🎁 {lang === 'ja' ? '特典付き・完全版のご案内' : 'Complete Edition'}</h4>
        <p style={{ fontSize: '0.95rem', color: '#94a3b8', marginBottom: '1.5rem', lineHeight: '1.6' }}>
          {lang === 'ja' 
            ? "このガイドの実践を加速させる「Obsidian専用テンプレート」や「プロンプト集」をパッケージした完全版を note で公開中です。" 
            : "Get the Complete Edition on note.com, including Obsidian templates and prompt collections to prevent failures."}
        </p>
        <Link href="https://note.com/convinibach/n/n3b92e13f37d8" className="btn-primary" style={{ padding: '0.8rem 2rem', borderRadius: '30px', textDecoration: 'none', display: 'inline-block', fontWeight: 'bold' }}>
          {lang === 'ja' ? 'note で完全版を購入する' : 'Buy Complete Edition on note'}
        </Link>
      </div>
    </div>
  );
}
