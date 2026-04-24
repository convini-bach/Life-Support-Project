"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import AffiliateCard from "@/components/AffiliateCard";
import { ITEMS } from "@/lib/recommendation";

export default function Day4() {
  const { lang } = useI18n();
  const bookRecommendation = ITEMS.find(i => i.id === 'ai-dictionary-book');

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
        <h3>一言でいうと？</h3>
        <p>「作っては直し、作っては直し」というプロセスを、短いサイクルで何度も繰り返す手法のことです。</p>
        
        <h3>なぜ重要なのか？</h3>
        <p>一発で100点を目指そうとすると、プロンプト作りに何時間も悩み、結局ズレた回答が返ってきて絶望します。「60点のものでもまずは出させる」を合言葉に、対話を重ねるほうが圧倒的に早いです。</p>

        <blockquote>
          <strong>事務作業に例えると？</strong><br />
          1週間徹夜して分厚い資料を出すより、まず手書きのメモ（MVP）を見せて「方向性は合ってますか？」とこまめに上司に確認を取りながら進める仕事術と同じです。
        </blockquote>

        <h3>実践プロンプト例</h3>
        <p><code>「一度に完成させず、イテレーション形式で進めます。まずは見出しの構成案だけを出してください。私がOKを出してから、第一章の執筆に入ってください。」</code></p>
      </section>

      <section>
        <h2>17. Actionable Feedback（アクショナブル・フィードバック）</h2>
        <h3>一言でいうと？</h3>
        <p>AIが受け取った瞬間に「次に具体的に何をどう直せばいいか」が明確に理解できる、ノイズのないダメ出しのことです。</p>
        
        <h3>なぜ重要なのか？</h3>
        <p>AIは「なんか違う」「ダサい」といった感情的な不満を推測するのが苦手です。感情を抜きにした、純粋な「事実と現象の報告」を渡すことで、AIは迷わず修正に向かえます。</p>

        <blockquote>
          <strong>生活に例えると？</strong><br />
          後輩の料理に「なんかオイシクない」と言うのではなく、「塩味が強すぎるから、次はお湯を50ml足して薄めてみて」と伝えることです。次にとるべき行動がはっきりしています。
        </blockquote>

        <h3>実践プロンプト例</h3>
        <p><code>「送信ボタンを押した瞬間に、画面が真っ白になりました。コンソールには『SyntaxError』と出ています。先ほど追加したカンマ（,）の位置が間違っているのではないでしょうか。確認してください。」</code></p>
      </section>

      <section>
        <h2>18. Visual Validation（視覚的な検証）</h2>
        <h3>一言でいうと？</h3>
        <p>コードの理論に頼らず、実際の「見た目」や「動き」を人間の目で確かめる最終チェックのことです。</p>
        
        <h3>なぜ重要なのか？</h3>
        <p>AIは文字の世界に住んでいるため、「スマホで見るとボタンが重なっている」といった空間的なミスに気づけません。この人間だけの「視覚と感覚」による検証が、AIには代行できない最重要の砦となります。</p>

        <blockquote>
          <strong>事務作業に例えると？</strong><br />
          エクセルで計算式を組んだ後、「理論上は合っている」と信じるのではなく、試しに数字を入力してみて、合計金額が正しく切り替わるかを実際に目で見て確認する作業です。
        </blockquote>

        <h3>実践プロンプト例</h3>
        <p><code>「実際の画面で確認（Visual Validation）したところ、送信ボタンが右端からはみ出して半分見えなくなっています。スマホ画面でも中央に収まるようにCSSを修正してください。」</code></p>
      </section>

      <section>
        <h2>19. Edge Case（エッジケース）</h2>
        <h3>一言でいうと？</h3>
        <p>普段は滅多に起きないけれど、もし起きたらシステムが壊れてしまうような「想定外の操作パターン」のことです。</p>
        
        <h3>なぜ重要なのか？</h3>
        <p>AIは特に指示がない限り、理想的な使い方しか想定しません。わざと変なボタンを押したり、異常な文字を入力したりするケースを潰しておくことで、アプリの壊れにくさが格段に向上します。</p>

        <blockquote>
          <strong>生活に例えると？</strong><br />
          自動ドアを作るとき、「人が来たら開く」だけでなく、「停電になったら？」「透明なレインコートを着た人が来たらどうする？」まであらかじめ考えておくようなものです。
        </blockquote>

        <h3>実践プロンプト例</h3>
        <p><code>「通常機能は動くようになりました。では、以下のエッジケースでもエラーメッセージが出るように改修してください。1: パスワード欄に絵文字を入力された場合、2: ボタンを連打された場合。」</code></p>
      </section>

      <section>
        <h2>20. Revert（リバート / 巻き戻し）</h2>
        <h3>一言でいうと？</h3>
        <p>修正で迷走し始めた際、安全に動いていた状態まで「勇気を持って撤退」することです。</p>
        
        <h3>なぜ重要なのか？</h3>
        <p>壊れた上からさらにパッチを当てようとすると、コードが複雑化して修復不能になります。迷走を感じたら、素直に「戻る」コマンドを押すことが、最大の防御策であり近道です。</p>

        <blockquote>
          <strong>事務作業に例えると？</strong><br />
          Wordで文章をこねくり回して意味が分からなくなった時、慌てて続きを書くのではなく、一旦「元に戻す（Ctrl + Z）」を連打して、ロジックが通っていた時の状態にタイムスリップするのと同じです。
        </blockquote>

        <h3>実践プロンプト例</h3>
        <p><code>「今回の修正後、画面が起動しなくなりました。このエラーを深追いせず、昨日お願いした『ボタンのデザインを変える前』の安全に動いていた状態までリバート（巻き戻し）してください。」</code></p>
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
        <h4 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.2rem' }}>
          {lang === 'ja' ? '初めてAIに触れる方向けの辞書の完全版を手に入れませんか？' : 'Get the Complete Edition for AI Beginners'}
        </h4>
        <p style={{ fontSize: '0.95rem', color: '#94a3b8', marginBottom: '1.5rem', lineHeight: '1.6' }}>
          {lang === 'ja' 
            ? "導入としてAI、Gemini、Antigravityの難しい技術用語を慣れ親しんだ例で解説をする「概念の翻訳書」をご準備しました。Obsidian用に活用できるmdファイルを購入特典として活用いただけます。" 
            : "We've prepared a 'Translation of Concepts' that explains difficult technical terms of AI, Gemini, and Antigravity using familiar examples."}
        </p>
        
        {bookRecommendation && (
          <AffiliateCard 
            item={bookRecommendation} 
            label={lang === 'ja' ? "購入特典（mdファイル）付き" : "Includes Bonus MD Files"}
          />
        )}
      </div>
    </div>
  );
}
