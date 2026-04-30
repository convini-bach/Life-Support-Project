"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import AffiliateCard from "@/components/AffiliateCard";
import { ITEMS } from "@/lib/recommendation";

export default function ExtraNvidia() {
  const { lang } = useI18n();
  const bookRecommendation = ITEMS.find(i => i.id === 'ai-dictionary-book');

  return (
    <div className="dictionary-content animate-fade-in">
      <header style={{ marginBottom: '3rem' }}>
        <div style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '1rem', textTransform: 'uppercase' }}>
          Technical Extra: NVIDIA NIM Integration
        </div>
        <h1>
          {lang === 'ja' ? "技術補足：NVIDIA NIMを活用したトークン削減術" : "Technical Extra: NVIDIA NIM Integration"}
        </h1>
      </header>

      <section>
        <p>
          AIとの開発が進むほど、トークン（コスト）の消費は増大します。特にGeminiのような多機能モデルは便利ですが、単純なコード生成まで担当させると効率が悪くなります。そこで、NVIDIA NIMを活用した「脳の使い分け」という戦略を導入しました。
        </p>
      </section>

      <hr />

      <section>
        <h2>1. 憲法第一条：トークンの効率化</h2>
        <h3>一言でいうと？</h3>
        <p>「高価なAI（思考担当）には難しいことをさせ、安価なAI（作業担当）には定型作業をさせる」という、プロジェクトの基本ルールです。</p>
        
        <h3>なぜNVIDIA NIMなのか？</h3>
        <p>NVIDIA NIM (Inference Microservices) は、世界最高峰のモデル（Qwen2.5-Coderなど）をAPI経由で高速かつ安価に利用できます。思考をGemini、生成をNVIDIAモデルに担当させることで、Geminiのトークン消費を8割以上削減することが可能になりました。</p>

        <blockquote>
          <strong>事務作業に例えると？</strong><br />
          会社のトップ（Gemini）が自らコピー機の前で資料を綴じるのではなく、優秀な事務スタッフ（NVIDIAモデル）に作業を任せ、トップは戦略立案に集中する状態を作ることに似ています。
        </blockquote>
      </section>

      <section>
        <h2>2. Windows環境での実装の壁</h2>
        <h3>一言でいうと？</h3>
        <p>OSごとの仕様（エスケープ、変数展開）の違いという、技術的な細部の格闘です。</p>
        
        <h3>私たちが克服したポイント</h3>
        <p>当初、Windowsのバッチファイル（.bat）でAPIリクエストを送ろうとしましたが、記号や空白の処理でデータが壊れる問題に直面しました。これを以下の工夫で解決しました。</p>
        <ul>
          <li><strong>PowerShellへの移行</strong>: 複雑なJSON作成とAPIリクエストはすべて <code>.ps1</code> スクリプトに任せ、バッチファイルはただの実行ボタン（ラッパー）にする。</li>
          <li><strong>環境変数による橋渡し</strong>: 引数を直接コマンドに渡すのではなく、一度環境変数に格納してPowerShellで読み取ることで、エスケープによる文字化けを完全に防止。</li>
        </ul>
      </section>

      <section>
        <h2>3. 導入手順のサマリー</h2>
        <ol>
          <li><strong>APIキーの取得</strong>: NVIDIA API Catalogでアカウントを作成し、キーを発行。</li>
          <li><strong>エージェントルールの定義</strong>: <code>.agent/rules/nim-routing.md</code> を作成し、AIエージェントに「いつ委託すべきか」を教え込む。</li>
          <li><strong>ローカルスクリプトの配置</strong>: <code>llm_task.bat</code> と <code>llm_task.ps1</code> を配置し、Geminiがいつでも外部の脳を呼び出せるように設定。</li>
        </ol>
      </section>

      <div style={{ marginTop: '5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/dictionary/extra-admob" style={{ color: '#64748b', textDecoration: 'none' }}>
          &larr; {lang === 'ja' ? 'AdMob設置編へ戻る' : 'Back to AdMob Guide'}
        </Link>
        <Link href="/dictionary" className="btn-primary" style={{ padding: '0.8rem 2rem', borderRadius: '25px', textDecoration: 'none', fontWeight: 'bold' }}>
          {lang === 'ja' ? '辞書目次へ戻る' : 'Back to Table of Contents'}
        </Link>
      </div>

      <div style={{ marginTop: '4rem', padding: '2.5rem', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '24px', border: '1px solid rgba(16, 185, 129, 0.2)', textAlign: 'center' }}>
        <h4 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.2rem' }}>
          {lang === 'ja' ? '共創の記録をあなたのObsidianに' : 'Keep Co-creation Records in Your Obsidian'}
        </h4>
        <p style={{ fontSize: '0.95rem', color: '#94a3b8', marginBottom: '1.5rem', lineHeight: '1.6' }}>
          本辞書の内容は、購入特典のMarkdownファイルを通じて、あなたの使い慣れた知識管理ツールに取り込むことができます。
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
