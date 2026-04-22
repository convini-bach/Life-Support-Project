"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export default function Day7() {
  const { lang } = useI18n();

  return (
    <div className="dictionary-content animate-fade-in">
      <header style={{ marginBottom: '3rem' }}>
        <div style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '1rem', textTransform: 'uppercase' }}>
          Day 7: Symbiosis
        </div>
        <h1>
          {lang === 'ja' ? "第7日目：共創の極意（Symbiosis）" : "Day 7: Symbiosis"}
        </h1>
      </header>

      <section>
        <p>1週間の締めくくりは、AIを「便利な道具」から「かけがえのないパートナー」へと昇華させるための概念です。AIの自律性と人間の判断力のバランスをどう取るか。</p>
        <p>初日は「どうやって指示を出せばいいかわからない」と悩んでいたあなたが、この章を読み終える頃には、プロジェクトの大枠を伝え、細部を信頼して任せられる「指揮官」へと成長しているはずです。</p>
      </section>

      <hr />

      <section>
        <h2>34. Symbiosis（共創 / シンビオシス）</h2>
        <p>人間とAIがどちらが主かという関係ではなく、お互いの弱点を補い合い、一人では到達できない高みを目指す「共生」の関係です。AIの「無限のスピード」に、あなたの「感情的な判断力」を掛け合わせることで最高のプロダクトが生まれます。</p>
      </section>

      <section>
        <h2>35. Trust Boundary（信頼の境界線）</h2>
        <p>「ここまでは自動で実行して良いが、ここから先は絶対に人間の承認を得ること」という安全のための境界線です。AIが自律的に動く中で、絶対に越えてはいけない一線を引くことが指揮官の重要な役目です。</p>
      </section>

      <section>
        <h2>36. Delegation（権限委譲）</h2>
        <p>細切れの作業指示ではなく、ある程度の裁量を持たせた「役割をまるごと」任せることです。信頼が構築された後は、あえて詳細な指示を手放すことで、AIは「自ら考えて提案するリーダー」へと覚醒します。</p>
      </section>

      <section>
        <h2>37. Human-in-the-Loop（人間の介在 / HIL）</h2>
        <p>AIの自動化ループの中に、あえて人間が「監督役」として入り込むシステム設計です。Antigravityのような開発プラットフォームは、まさにこのHILを前提に、AIの暴走を防ぎつつ人間の意図を反映し続けるように作られています。</p>
      </section>

      <section>
        <h2>38. Skill Building（スキルの構築 / 覚えさせる）</h2>
        <p>一度確立した正しい作業手順に「専用の名前」をつけて保存し、次回から一瞬で呼び出せる「必殺技」にすることです。同じ失敗を繰り返さず、チーム（AI）の生産性は指数関数的に向上します。</p>
      </section>

      <section>
        <h2>39. AI Partner（AIパートナー）</h2>
        <p>単なるコード生成機能ではなく、あなたの「想い」や「癖」を理解し、信頼関係を築き上げた世界に一つだけのチームメイト。それが本辞典が目指すAIの究極の姿です。</p>
      </section>

      <section>
        <h2>40. Continuous Learning（継続的学習）</h2>
        <p>AIも人間も「完成」することはありません。失敗して対話を重ねるほどに洗練され、共に学び続けていくプロセスそのものが、新しい時代を生き抜くための最強の武器となります。</p>
      </section>

      <div style={{ marginTop: '3rem', padding: '2rem', border: '1px solid #10b981', borderRadius: '16px', background: 'rgba(16, 185, 129, 0.05)', textAlign: 'center' }}>
        <h3 style={{ margin: 0, color: 'white', marginBottom: '0.5rem' }}>🎊 Congraturations!</h3>
        <p style={{ margin: 0 }}>7日間の実践プログラムを完了しました。</p>
      </div>

      {/* Navigation and CTA */}
      <div style={{ marginTop: '5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
        <Link href="/dictionary/day6" style={{ color: '#64748b', textDecoration: 'none' }}>
          &larr; {lang === 'ja' ? '第6日目へ戻る' : 'Back to Day 6'}
        </Link>
        <Link href="/dictionary/epilogue" className="btn-primary" style={{ padding: '0.8rem 2rem', borderRadius: '25px', textDecoration: 'none', fontWeight: 'bold' }}>
          {lang === 'ja' ? 'おわりに' : 'Epilogue'} &rarr;
        </Link>
      </div>

      <div style={{ marginTop: '4rem', padding: '2.5rem', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '24px', border: '1px solid rgba(16, 185, 129, 0.2)', textAlign: 'center' }}>
        <h4 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.2rem' }}>🎁 {lang === 'ja' ? '特典付き・完全版のご案内' : 'Complete Edition'}</h4>
        <p style={{ fontSize: '0.95rem', color: '#94a3b8', marginBottom: '1.5rem', lineHeight: '1.6' }}>
          {lang === 'ja' 
            ? "このガイドの実践を加速させる「Obsidian専用テンプレート」や「プロンプト集」をパッケージした完全版を note で公開中です。" 
            : "Get the Complete Edition on note.com, including Obsidian templates and prompt collections to prevent failures."}
        </p>
        <Link href="https://note.com/convinibach/n/n3b92e13f37d8" className="btn-primary" style={{ padding: '0.8rem 2rem', borderRadius: '30px', textDecoration: 'none', display: 'inline-block', fontWeight: 'bold' }}>
          {lang === 'ja' ? 'note で完全版を購入する' : 'Buy Complete Edition on note'}
        </Link>
      </div>
    </div>
  );
}
