"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import AffiliateCard from "@/components/AffiliateCard";
import { ITEMS } from "@/lib/recommendation";

export default function ExtraAdMob() {
  const { lang } = useI18n();
  const bookRecommendation = ITEMS.find(i => i.id === 'ai-dictionary-book');

  return (
    <div className="dictionary-content animate-fade-in">
      <header style={{ marginBottom: '3rem' }}>
        <div style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '1rem', textTransform: 'uppercase' }}>
          Technical Extra: AdMob Integration
        </div>
        <h1>
          {lang === 'ja' ? "技術補足：AdMobリワード広告の設置と運用" : "Technical Extra: AdMob Integration"}
        </h1>
      </header>

      <section>
        <p>
          収益化の強力な手段であるAdMobリワード広告。しかし、Webアプリ（特にNext.jsやCloudflare環境）への導入には、いくつかの技術的・ポリシー的な落とし穴があります。ここでは、私たちが実際に構築した手順と回避したトラブルを記録します。
        </p>
      </section>

      <hr />

      <section>
        <h2>1. ads.txt と app-ads.txt の配置</h2>
        <h3>一言でいうと？</h3>
        <p>「このサイトの広告枠は正規のものです」と証明するための、いわば「デジタル身分証」です。</p>
        
        <h3>実践のポイント</h3>
        <p>Next.jsでは <code>public</code> フォルダに配置するだけで済みますが、Cloudflare Workers (Wrangler) を使っている場合は注意が必要です。</p>
        <ul>
          <li><strong>設置場所</strong>: <code>public/ads.txt</code> および <code>public/app-ads.txt</code></li>
          <li><strong>デプロイの確認</strong>: <code>wrangler deploy</code> 実行後、ブラウザで <code>/ads.txt</code> に直接アクセスし、中身が表示されるか必ず確認してください。これが機能していないと、広告配信が制限されます。</li>
        </ul>

        <blockquote>
          <strong>事務作業に例えると？</strong><br />
          お店の入り口に「保健所の営業許可証」を掲示するようなものです。これが外から見えないと、正規の営業として認められず、問屋（広告主）が商品を卸してくれません。
        </blockquote>
      </section>

      <section>
        <h2>2. 「有用性の低いコンテンツ」対策</h2>
        <h3>一言でいうと？</h3>
        <p>Googleの審査を通過するための、最低限の「価値の証明」です。</p>
        
        <h3>私たちが学んだ教訓</h3>
        <p>単にツールを置くだけでは「有用性が低い」と判断されることがあります。審査を通過するためには以下の工夫が有効です。</p>
        <ul>
          <li><strong>独自解説の追加</strong>: 解析ツールの結果に対し、「なぜこの数値が重要なのか」「どう活用すべきか」という、著者の経験に基づいた1,500文字〜2,000文字程度の解説テキストを添える。</li>
          <li><strong>未完成ページの排除</strong>: 「Coming Soon」や中身のないページへのリンクは、審査前に一度すべて削除するか、非公開にします。</li>
        </ul>

        <blockquote>
          <strong>事務作業に例えると？</strong><br />
          企画書に「計算結果」だけを載せるのではなく、「この結果から、我が社は〇〇すべきです」という専門家の考察を添えることで、初めて会議（審査）を通る企画書になるのと同じです。
        </blockquote>
      </section>

      <section>
        <h2>3. リワード広告の実装フロー</h2>
        <h3>一言でいうと？</h3>
        <p>ユーザーが広告を見る代わりに、アプリ内での特典（報酬）を受け取る仕組みです。</p>
        
        <h3>技術的な流れ</h3>
        <ol>
          <li><strong>SDKの読み込み</strong>: <code>next/script</code> 等を使用して Google Publisher Tag (GPT) を非同期で読み込みます。</li>
          <li><strong>リワードイベントの監視</strong>: ユーザーが広告を最後まで視聴したことを検知するコールバック関数を実装します。</li>
          <li><strong>特典の付与</strong>: 視聴完了後、フロントエンドまたはバックエンドでユーザーに権限（例：詳細な解析結果の表示）を付与します。</li>
        </ol>
      </section>

      <div style={{ marginTop: '5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/dictionary" style={{ color: '#64748b', textDecoration: 'none' }}>
          &larr; {lang === 'ja' ? '辞書目次へ戻る' : 'Back to Table of Contents'}
        </Link>
        <Link href="/dictionary/extra-nvidia" className="btn-primary" style={{ padding: '0.8rem 2rem', borderRadius: '25px', textDecoration: 'none', fontWeight: 'bold' }}>
          {lang === 'ja' ? 'NVIDIA API活用編へ' : 'NVIDIA API Guide'} &rarr;
        </Link>
      </div>

      <div style={{ marginTop: '4rem', padding: '2.5rem', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '24px', border: '1px solid rgba(16, 185, 129, 0.2)', textAlign: 'center' }}>
        <h4 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.2rem' }}>
          {lang === 'ja' ? 'さらに深いAI共創の知識を' : 'Deeper Knowledge on AI Synergy'}
        </h4>
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
