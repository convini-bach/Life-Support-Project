"use client";

import { useI18n } from "@/lib/i18n";
import TabNavigation from "@/components/TabNavigation";


export default function SCTAPage() {
  const { lang, t } = useI18n();

  const data = [
    { label: "サービス名", value: "Life Support Project / Nutri-Vision / Life Support AI Ecosystem" },
    { label: "運営主体", value: "Life Support Project" },
    { label: "お問い合わせ", value: "convinibach@gmail.com\n（※運営改善のため、下記フォームからのご連絡を優先して承っております）" },
    { label: "問い合わせ窓口", value: "https://docs.google.com/forms/d/e/1FAIpQLScGmzoQL3ZJehCoSVYBoPB0lv9LkrsHAKzi3AjhIb8SE20h3g/viewform?usp=header", linkText: "公式お問い合わせ・ご要望フォーム" },
    { label: "利用料金", value: "無料（アプリ内広告およびアフィリエイト収益によって運営されています）" },
    { label: "広告配信について", value: "本サービスは、Google AdSense等の広告配信サービス、およびAmazonアソシエイト等のアフィリエイトプログラムを利用して収益を得ています。" },
    { label: "免責事項", value: "AIによる解析結果は、あくまで目安であり、医療的な助言に代わるものではありません。本サービスを利用したことにより生じた損害について、運営者は一切の責任を負いかねます。" },
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
