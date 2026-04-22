"use client";

import { useI18n } from "@/lib/i18n";
import TabNavigation from "@/components/TabNavigation";


export default function TOSPage() {
  const { lang, t } = useI18n();

  return (
    <main className="container" style={{ paddingTop: '8.5rem', paddingBottom: '8rem', maxWidth: '800px' }}>
      <TabNavigation />
      <h1 className="gradient-text" style={{ fontSize: '2rem', marginBottom: '2rem' }}>{t('nav.tos')}</h1>
      
      <div className="glass-card" style={{ padding: '2.5rem', color: '#cbd5e1', lineHeight: '1.8' }}>
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: 'white', fontSize: '1.2rem', marginBottom: '1rem' }}>第1条（適用）</h2>
          <p>本規約は、Life Support AI Ecosystem（以下「本サービス」）の提供条件および本サービスの利用に関するユーザーと当社との間の権利義務関係を定めることを目的とします。</p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: 'white', fontSize: '1.2rem', marginBottom: '1rem' }}>第2条（Local-First 原則）</h2>
          <p>本サービスは Local-First の設計思想に基づいています。ユーザーの健康データは原則としてユーザーのデバイス内にのみ保存され、当社がそれらを収集・管理することはありません。データのバックアップや管理はユーザーの責任において行われるものとします。</p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: 'white', fontSize: '1.2rem', marginBottom: '1rem' }}>第3条（禁止事項）</h2>
          <p>ユーザーは、本サービスの利用にあたり、以下の各号のいずれかに該当する行為をしてはなりません。</p>
          <ul>
            <li>法令に違反する行為または犯罪行為に関連する行為</li>
            <li>当社、本サービスの他の利用者またはその他の第三者に対する詐欺または脅迫行為</li>
            <li>本サービスの運営を妨害するおそれのある行為</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: 'white', fontSize: '1.2rem', marginBottom: '1rem' }}>第4条（有料サービス）</h2>
          <p>ユーザーは、本サービスの有料プランを利用する場合、別途定める利用料金を、当社が指定する支払方法により支払うものとします。</p>
        </section>

        <p style={{ marginTop: '3rem', fontSize: '0.8rem', color: '#64748b' }}>
          制定日: 2026年4月17日
        </p>
      </div>

    </main>
  );
}
