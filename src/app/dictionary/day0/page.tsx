"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export default function Day0() {
  const { lang } = useI18n();

  return (
    <div className="dictionary-content animate-fade-in">
      <header style={{ marginBottom: '3rem' }}>
        <div style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '1rem', textTransform: 'uppercase' }}>
          Day 0: Preparation
        </div>
        <h1>
          {lang === 'ja' ? "プロンプトとルールの「設定場所」" : "Where to Set Prompts and Rules"}
        </h1>
      </header>

      <section>
        <p>本編（第1日目）に入る前に、最も基本的な「AIへの指示を、そもそもどこに・どうやって設定するのか？」という点について解説します。</p>
        <p>AIにルールを守らせるための方法は、大きく分けて以下の3つのレベルが存在します。用途に合わせて使い分けましょう。</p>
      </section>

      <hr />

      <section>
        <h2>レベル1：チャットボックスに直接書く</h2>
        <p>一番簡単で、誰もがやっている方法です。</p>
        <p>画面下の文字入力欄（チャットボックス）に、「以下のルールを守って文章を書いてください：語尾は『です・ます』調で…」と直接打ち込みます。</p>
        <ul>
          <li><strong>メリット</strong>: 今すぐ簡単にできる。</li>
          <li><strong>デメリット</strong>: 会話が長くなると、AIがすぐにルールを忘れてしまう（コンテキスト・オーバーロード）。「ルール」というよりは「その場のお願い」にすぎません。</li>
        </ul>
      </section>

      <section>
        <h2>レベル2：システムプロンプト（カスタム指示）に設定する</h2>
        <p>GeminiやChatGPTなどの最新AIエージェントツールには、通常のチャット画面とは別に、「<strong>システムプロンプト</strong>」や「<strong>カスタムインストラクション</strong>」、「<strong>ルール設定</strong>」と呼ばれる特別な設定画面が存在します。</p>
        <p>ここに書かれた文章は、あなたがチャットをする前に「事前にAIの脳内にインストールされる絶対の憲法」となります。</p>
        <ul>
          <li><strong>メリット</strong>: AIが絶対に忘れない。本辞典の「Core Value」や「Negative Prompt（絶対にやらないでほしいこと）」など、プロジェクトを通じて絶対に外せないルールは、ここに書いておくのが最も確実です。</li>
          <li><strong>デメリット</strong>: 複数のプロジェクトを並行している場合、いちいち設定画面を開いて書き換えるのが少し面倒です。</li>
        </ul>
      </section>

      <section>
        <h2>レベル3：ルールブック（ファイル）を作って読み込ませる</h2>
        <p>Antigravityのような開発プラットフォームや、ファイル読み込みに対応したAIで一番推奨されるのがこの方法です。</p>
        <p>ご自身のパソコンに <code>project_prompt.md</code> や <code>rules.txt</code> という名前のテキストファイルを作成し、そこにビジョンやルールを書き込んでおきます。</p>
        <p>そして、AIと会話を始める前に、そのファイルをチャット欄に「添付（アップロード）」するか、ワークスペースに置いておき、<strong>「まずはこのファイルを読み込んで、そこに書いてあるルールを適用して」とチャットで指示</strong>します。</p>
        <ul>
          <li><strong>メリット</strong>:
            <ul>
              <li>プロジェクトごとに異なるルールファイルを用意するだけで済む。</li>
              <li>ルールを変更したいときは、テキストファイルを修正して「ファイルを読み直して」と言うだけで一瞬でAIが最新のルールに切り替わる。</li>
            </ul>
          </li>
          <li><strong>デメリット</strong>: 最初にテキストファイルを作るのが少し手間。</li>
        </ul>
      </section>

      <section>
        <h2>本書を読むにあたって</h2>
        <p>まずは「レベル1」のチャットボックスから始めて構いません。そして「これは毎回言わなきゃダメだな」と思ったルールなどを、徐々に「レベル2」の設定画面や、「レベル3」の別ファイルに書き出していくのが、AIをパートナーに育てるコツです。</p>
      </section>

      {/* Navigation and CTA */}
      <div style={{ marginTop: '5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
        <Link href="/dictionary" style={{ color: '#64748b', textDecoration: 'none' }}>
          &larr; {lang === 'ja' ? '目次に戻る' : 'Back to Roadster'}
        </Link>
        <Link href="/dictionary/day1" className="btn-primary" style={{ padding: '0.8rem 2rem', borderRadius: '25px', textDecoration: 'none', fontWeight: 'bold' }}>
          {lang === 'ja' ? '第1日目へ進む' : 'Go to Day 1'} &rarr;
        </Link>
      </div>

      <div style={{ marginTop: '4rem', padding: '2.5rem', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '24px', border: '1px solid rgba(16, 185, 129, 0.2)', textAlign: 'center' }}>
        <h4 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.2rem' }}>🎁 {lang === 'ja' ? '特典付き・完全版のご案内' : 'Complete Edition'}</h4>
        <p style={{ fontSize: '0.95rem', color: '#94a3b8', marginBottom: '1.5rem', lineHeight: '1.6' }}>
          {lang === 'ja'
            ? "このガイドの実践を加速させる「Obsidian専用テンプレート」や「プロンプト集」をパッケージした完全版を note で公開中です。"
            : "Get the Complete Edition on note.com, including Obsidian templates and prompt collections to accelerate your practice."}
        </p>
        <Link href="https://note.com/convinibach/n/ne263d5ef3e45" className="btn-primary" style={{ padding: '0.8rem 2rem', borderRadius: '30px', textDecoration: 'none', display: 'inline-block', fontWeight: 'bold' }}>
          {lang === 'ja' ? 'note で完全版を購入する' : 'Buy Complete Edition on note'}
        </Link>
      </div>
    </div>
  );
}
