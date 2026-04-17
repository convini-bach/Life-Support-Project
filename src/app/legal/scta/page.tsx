"use client";

import { useI18n } from "@/lib/i18n";
import TabNavigation from "@/components/TabNavigation";

export default function SCTAPage() {
  const { lang, t } = useI18n();

  return (
    <main className="container" style={{ paddingTop: '8.5rem', paddingBottom: '8rem', maxWidth: '800px' }}>
      <TabNavigation />
      <h1 className="gradient-text" style={{ fontSize: '2rem', marginBottom: '2rem' }}>{t('nav.scta')}</h1>
      
      <div className="glass-card" style={{ padding: '2.5rem', color: '#cbd5e1', lineHeight: '1.8' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <tbody>
            {[
              { label: "販売業者", value: "[ここに会社名、または個人名を記入してください]" },
              { label: "運営責任者", value: "[ここに責任者名を記入してください]" },
              { label: "所在地", value: "[ここに所在地（住所）を記入してください]" },
              { label: "電話番号", value: "[ここに電話番号を記入してください]\n（※お問い合わせはメールにて承っております）" },
              { label: "メールアドレス", value: "[ここに連絡先メールアドレスを記入してください]" },
              { label: "サービス名", value: "Nutri-Vision / Life Support AI Ecosystem" },
              { label: "販売価格", value: "各プランの料金ページ（/pricing）に表示された金額" },
              { label: "商品以外の必要料金", value: "インターネット接続料金および通信料" },
              { label: "支払方法", value: "クレジットカード決済（Stripe）" },
              { label: "代金の支払時期", value: "初回購入時、および次回の更新日に課金されます。" },
              { label: "サービス提供時期", value: "購入手続き完了後、直ちにご利用いただけます。" },
              { label: "返品・交換・キャンセル", value: "サービスの性質上、返品・返金は承っておりません。解約は次回の更新日前日までマイページより可能であり、解約後も現在の契約期間終了までご利用いただけます。" },
            ].map((item, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <th style={{ textAlign: 'left', padding: '1rem', width: '30%', color: 'white', background: 'rgba(255,255,255,0.02)' }}>{item.label}</th>
                <td style={{ padding: '1rem', whiteSpace: 'pre-wrap' }}>{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <p style={{ marginTop: '2rem', fontSize: '0.8rem', color: '#ef4444', fontWeight: 'bold' }}>
          ※ 注意: Stripe審査通過のためには、上記のプレースホルダ項目 ([...]) を実際の情報に書き換える必要があります。
        </p>
      </div>
    </main>
  );
}
