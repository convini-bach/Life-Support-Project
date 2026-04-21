"use client";

import { useI18n } from "@/lib/i18n";
import TabNavigation from "@/components/TabNavigation";

export default function PrivacyPage() {
  const { lang, t } = useI18n();

  return (
    <main className="container" style={{ paddingTop: '8.5rem', paddingBottom: '8rem', maxWidth: '800px' }}>
      <TabNavigation />
      <h1 className="gradient-text" style={{ fontSize: '2rem', marginBottom: '2rem' }}>{t('nav.privacy')}</h1>
      
      <div className="glass-card" style={{ padding: '2.5rem', color: '#cbd5e1', lineHeight: '1.8' }}>
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: 'white', fontSize: '1.2rem', marginBottom: '1rem' }}>1. 基本方針</h2>
          <p>当社は、本サービスを提供するにあたり、ユーザーのプライバシー保護を最優先事項としています。本サービスは、ユーザーの機密性の高い健康データを可能な限り当社サーバーに転送・保存しない「Local-First」の設計を採用しています。</p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: 'white', fontSize: '1.2rem', marginBottom: '1rem' }}>2. 取得する情報</h2>
          <p>本サービスでは、以下の情報を取得する場合があります。</p>
          <ul>
            <li><strong>認証情報:</strong> 会員登録、ログインのためのメールアドレス等（Clerkを通じて管理されます）</li>
            <li><strong>決済情報:</strong> サブスクリプション決済のためのカード情報等（Stripeを通じて管理され、当社が保持することはありません）</li>
            <li><strong>アクセスログ:</strong> サービスの改善、不具合調査のための匿名の利用状況</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: 'white', fontSize: '1.2rem', marginBottom: '1rem' }}>3. 健康データの取り扱い</h2>
          <p>食事、運動、体重等の健康データは、ユーザーのブラウザ内（LocalStorage等）にのみ保存されます。AI解析を行う際には一時的にデータが送信されますが、解析終了後にサーバー側でそれらが蓄積・二次利用されることはありません。</p>
        </section>

        <p style={{ marginTop: '3rem', fontSize: '0.8rem', color: '#64748b' }}>
          制定日: 2026年4月17日
        </p>
      </div>
    </main>
  );
}
