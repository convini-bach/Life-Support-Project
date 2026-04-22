"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export default function Day4() {
  const { lang } = useI18n();

  return (
    <div className="dictionary-content animate-fade-in">
      <header style={{ marginBottom: '3rem' }}>
        <div style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '1rem', textTransform: 'uppercase' }}>
          Day 4: Artifact Feedback
        </div>
        <h1>
          {lang === 'ja' ? "第4日目：成果物を研ぎ澄ます（Artifact Feedback）" : "Day 4: Artifact Feedback"}
        </h1>
      </header>

      <section>
        <p>「AIが作ってくれたものをどう評価し、どう直させるか」。これが第4日目のテーマです。</p>
        <p>AIのアウトプットをそのまま鵜呑みにするのではなく、人間が正しく「ダメ出し（レビュー）」をして磨き上げるプロセスこそが、AIをプロフェッショナルなパートナーに育てるための最も重要な行程となります。</p>
      </section>

      <hr />

      <section>
        <h2>16. Iteration（イテレーション / 反復）</h2>
        <p>「作っては直し」という短いサイクルを何度も繰り返す手法です。初めから一度で100点を目指さず、60点のものから対話を重ねて磨き上げる方が、結果的に納得のいく仕上がりになります。</p>
        <blockquote>
          <strong>事務作業に例えると？</strong><br />
          1週間徹夜して100ページの資料を出すより、まず箇条書きメモを見せて「方向性は合ってますか？」とこまめに確認を取りながら進める仕事術と同じです。
        </blockquote>
      </section>

      <section>
        <h2>17. Actionable Feedback（アクショナブル・フィードバック）</h2>
        <p>AIが次に何をどう直せばいいか明確に理解できる、感情を抜いた「事実と現象の報告」です。「なんか違う」ではなく「塩味が強すぎるからお湯を足して」という具体的な指示が求められます。</p>
        <h3>実践プロンプト例</h3>
        <p><code>「送信ボタンを押すと画面が真っ白になりました。コンソールには『SyntaxError』と出ています。先ほど追加したカンマの位置を確認してください。」</code></p>
      </section>

      <section>
        <h2>18. Visual Validation（視覚的な検証）</h2>
        <p>AIは文字の世界に住んでいるため、「ボタンが重なって押せない」といった空間的なミスに気づけません。実際の「見た目」や「動き」を人間の目で確かめることが、AIには代行できない最重要の砦となります。</p>
      </section>

      <section>
        <h2>19. Edge Case（エッジケース）</h2>
        <p>「普通の人がしないような極端な操作」への対策です。AIに「この機能におけるエッジケースを3つ想定し、対策を提案して」と聞き、アプリの堅牢性を高めましょう。</p>
      </section>

      <section>
        <h2>20. Revert（リバート / 巻き戻し）</h2>
        <p>修正で迷走し始めた際、安全に動いていた状態まで「勇気を持って撤退」することです。壊れた上から直し続けるのではなく、素直に「戻る」ことが最大の防御策です。</p>
      </section>

      {/* Navigation and CTA */}
      <div style={{ marginTop: '5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
        <Link href="/dictionary/day3" style={{ color: '#64748b', textDecoration: 'none' }}>
          &larr; {lang === 'ja' ? '第3日目へ戻る' : 'Back to Day 3'}
        </Link>
        <Link href="/dictionary/day5" className="btn-primary" style={{ padding: '0.8rem 2rem', borderRadius: '25px', textDecoration: 'none', fontWeight: 'bold' }}>
          {lang === 'ja' ? '第5日目へ進む' : 'Go to Day 5'} &rarr;
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
