"use client";

import { useI18n } from "@/lib/i18n";
import TabNavigation from "@/components/TabNavigation";

export default function SCTAPage() {
  const { lang, t } = useI18n();

  const data = [
    { label: "販売者", value: "深田　真人" },
    { label: "運営責任者", value: "深田　真人" },
    { label: "所在地", value: "〒6740069 兵庫県明石市大久保町わかば９－１ー３０６" },
    { label: "電話番号", value: "0782197845\n（※お問い合わせはフォームにて承っております）" },
    { label: "メールアドレス", value: "convinibach@gmail.com\n（※お問い合わせはフォームにて承っております）" },
    { label: "問い合わせ先", value: "https://docs.google.com/forms/d/e/1FAIpQLScGmzoQL3ZJehCoSVYBoPB0lv9LkrsHAKzi3AjhIb8SE20h3g/viewform?usp=header", linkText: "お問い合わせフォーム" },
    { label: "サービス名", value: "Nutri-Vision / Life Support AI Ecosystem" },
    { label: "販売価格", value: "各プランの料金ページ（/pricing）に表示された金額" },
    { label: "商品以外の必要料金", value: "インターネット接続料金および通信料" },
    { label: "支払方法", value: "クレジットカード決済（Stripe）" },
    { label: "代金の支払時期", value: "初回購入時、および次回の更新日に課金されます。" },
    { label: "サービス提供時期", value: "購入手続き完了後、直ちにご利用いただけます。" },
    { label: "返品・交換・キャンセル", value: "サービスの性質上、返品・返金は承っておりません。解約は次回の更新日前日までマイページより可能であり、解約後も現在の契約期間終了までご利用いただけます。" },
  ];

  return (
    <main className="container" style={{ paddingTop: '8.5rem', paddingBottom: '8rem', maxWidth: '800px' }}>
      <TabNavigation />
      <h1 className="gradient-text" style={{ fontSize: '2rem', marginBottom: '2rem' }}>{t('nav.scta')}</h1>
      
      <div className="glass-card" style={{ padding: '1.5rem', color: '#cbd5e1', lineHeight: '1.8', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', minWidth: '500px' }}>
          <tbody>
            {data.map((item, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <th style={{ 
                  textAlign: 'left', padding: '1.2rem 1rem', width: '30%', color: 'white', 
                  background: 'rgba(255,255,255,0.02)', verticalAlign: 'top' 
                }}>
                  {item.label}
                </th>
                <td style={{ padding: '1.2rem 1rem', whiteSpace: 'pre-wrap' }}>
                  {item.linkText ? (
                    <a href={item.value} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>
                      {item.linkText}
                    </a>
                  ) : (
                    item.value
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
