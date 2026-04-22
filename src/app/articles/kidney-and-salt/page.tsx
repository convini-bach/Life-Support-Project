"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import TabNavigation from "@/components/TabNavigation";


export default function ArticleKidneyAndSalt() {
  const { lang } = useI18n();

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: '8rem' }}>
      <TabNavigation />
      
      <main className="container" style={{ paddingTop: '8.5rem', maxWidth: '800px' }}>
        <nav style={{ marginBottom: '2rem' }}>
          <Link href="/articles" style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '0.9rem' }}>
            &larr; Knowledge Hub に戻る
          </Link>
        </nav>

        <header style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'inline-block', padding: '0.3rem 0.8rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
            {lang === 'ja' ? "健康管理 / 実体験" : "Health / Case Study"}
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'white', lineHeight: '1.3', marginBottom: '1.5rem' }}>
            {lang === 'ja' ? "37歳、要再検査からの再出発。塩分管理に AI が必要な理由" : "Restarting after a 37-year-old health report. Why AI is needed for salt management"}
          </h1>
          <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Published on April 21, 2026</div>
        </header>

        <article style={{ color: '#cbd5e1', lineHeight: '2', fontSize: '1.1rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <p>
            「再検査が必要です」――。
            37歳の誕生日を過ぎたばかりの頃、健康診断の結果に綴られていたその一言は、これまで大きな病気もせず、健康を自負していた私にとって、地面が揺らぐような衝撃でした。
          </p>

          <section>
            <h2 style={{ color: 'white', fontSize: '1.6rem', fontWeight: 'bold', borderLeft: '4px solid #ef4444', paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
              見えない敵、「塩分」の恐怖
            </h2>
            <p>
              指摘されたのは「腎臓の数値（eGFRなど）」の悪化でした。
              医師から告げられた原因は明確でした。それは日々の「塩分の摂りすぎ」。
              外食やコンビニ弁当、あるいは何気なく口にしている調味料……。私たちは知らず知らずのうちに、身体の処理能力を超える塩分を摂取しています。
            </p>
            <p>
              いざ「今日から減塩しよう」と決意しても、すぐに壁にぶつかりました。
              **「今、この目の前の食事に何グラムの塩分が入っているのか？」** ――それが分からないのです。
              栄養表示のない定食、自宅での料理。正確な数値が分からない状態での努力は、地図のない海を溺れながら泳ぐようなものでした。
            </p>
          </section>

          <section>
            <h2 style={{ color: 'white', fontSize: '1.6rem', fontWeight: 'bold', borderLeft: '4px solid #ef4444', paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
              「大丈夫」という言葉の無力さを超えて
            </h2>
            <p>
              5年前、私の妻が乳がん検診で再検査を告げられた時のことが、鮮烈に蘇りました。
              結果として異状はなく、胸をなでおろしましたが、あの日、不安で震え、涙を流していた妻に対して、私はただ「大丈夫だよ」と根拠のない気休めを言うことしかできませんでした。
            </p>
            <p>
              不安は、無知から生まれます。
              もしあの時、あるいは今の私に、**「現状を正しく把握し、自分たちでコントロールできる手段」** があったなら。
              ただの慰めではなく、具体的な解決策を提示できる「武器」があれば、あんなに震える必要はなかったかもしれません。
            </p>
          </section>

          <section>
            <h2 style={{ color: 'white', fontSize: '1.6rem', fontWeight: 'bold', borderLeft: '4px solid #ef4444', paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
              AI が可能にする、新しい自衛のカタチ
            </h2>
            <p>
              「写真に撮るだけで、栄養素が分かればいいのに。」
              そう考え、最初は Gemini に食事の画像を送ってみました。AI は驚くべき精度で、ざっくりとした栄養素を出してくれました。
              この体験が、Life Support Project の起点となりました。
            </p>
            <p>
              AI は単なるプログラムではありません。
              私たちの生活を 24 時間体制で見守り、客観的なデータという「真実」を教えてくれるパートナーです。
              写真一枚で塩分やカリウム、タンパク質の量を知ることができれば、私たちは「不安」を「対策」へと変えることができます。
            </p>
            <p>
              再検査の通知は、私に「自分の命を、専門家任せにせず、自分で守り抜く」覚悟をくれました。
              この Nutri-Vision を通じて、かつての私と同じように不安を抱える皆様に、自分を、そして大切な人を守るための確かな「武器」を届けていきたいと考えています。
            </p>
          </section>

          <div style={{ marginTop: '4rem', padding: '2.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
            <h3 style={{ color: 'white', fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              あなたの食事、今のうちにチェックしてみませんか？
            </h3>
            <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
              気づきが早ければ、未来は変えられます。
            </p>
            <Link href="/nutri-vision" className="btn-primary" style={{ padding: '1rem 3rem', borderRadius: '30px', textDecoration: 'none', display: 'inline-block', fontWeight: 'bold' }}>
              Nutri-Vision で解析を始める
            </Link>
          </div>
        </article>
      </main>

    </div>
  );
}
