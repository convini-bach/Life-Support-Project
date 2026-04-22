"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export default function Day6() {
  const { lang } = useI18n();

  return (
    <div className="dictionary-content animate-fade-in">
      <header style={{ marginBottom: '3rem' }}>
        <div style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '1rem', textTransform: 'uppercase' }}>
          Day 6: Advanced Reasoning
        </div>
        <h1>
          {lang === 'ja' ? "第6日目：壁を越える問いかけ（Advanced Reasoning）" : "Day 6: Advanced Reasoning"}
        </h1>
      </header>

      <section>
        <p>AIがどうしても問題を解決できない、何度指示してもエラーが直らないという「分厚い壁」にぶつかった時、必要なのは指示の量を増やすことではなく、「AIへの問いかけ方（質問の角度）をガラリと変えること」です。</p>
        <p>この章では、行き詰まった現状を打破する高度なプロンプティング手法を学びます。</p>
      </section>

      <hr />

      <section>
        <h2>27. Rubber Ducking（ラバーダック・デバッグ）</h2>
        <p>解決策を「聞く」のではなく、自分が何に悩んでいるのかを「ただひたすら説明する」ことで、自分やAIに矛盾に気づかせる技術です。「あ、もしかしてここが原因か！」と、話しているうちに自ら答えに辿り着くことが目的です。</p>
      </section>

      <section>
        <h2>28. Error Trace（エラーの追跡）</h2>
        <p>「画面に出た表面上のエラー」を直接直そうとせず、そのエラーが「どこから、どういう過程を経て発生したのか」という足跡を辿る作業です。表面的な絆創膏ではなく、抜本的な解決を目指します。</p>
      </section>

      <section>
        <h2>29. Perspective Shift（視点の切り替え）</h2>
        <p>開発者側の目線から「一切パソコンを使えない高齢者」や「意地悪なハッカー」など、AIの立ち位置を強制的に移動させることです。多角的な視点を持つことで、プロダクトの隠れた欠陥を見つけ出します。</p>
      </section>

      <section>
        <h2>30. Alternative Approach（代替案の模索）</h2>
        <p>今の方針（アプローチA）が泥沼化しているとき、その道自体を思い切って捨てる許可をAIに出すことです。「この方法にこだわるのはやめよう。別の道を3つ提案して」と切り替えましょう。</p>
      </section>

      <section>
        <h2>31. Root Cause Analysis（根本原因の分析）</h2>
        <p>バグの表面だけを直すのではなく、「なぜ？」を5回深く掘り下げさせ、設計上の根本的な欠陥を突き止める分析法です。バグは氷山の一角であることを忘れないでください。</p>
      </section>

      <section>
        <h2>32. Hypothetical Question（仮説の提示）</h2>
        <p>「もしかして、昨日アップデートしたソフトが原因だったりしますか？」という人間の直感（仮説）をAIにぶつけ、論理性と掛け合わせて最速の解決を目指します。</p>
      </section>

      <section>
        <h2>33. Devil's Advocate（悪魔の代弁者）</h2>
        <p>AIに「あえて反対意見を言う役割」を演じさせ、プランの弱点やリスクを辛口で指摘させます。身内だけの賞賛に終わらず、客観的な攻撃に耐えうるプロダクトを作ります。</p>
      </section>

      {/* Navigation and CTA */}
      <div style={{ marginTop: '5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
        <Link href="/dictionary/day5" style={{ color: '#64748b', textDecoration: 'none' }}>
          &larr; {lang === 'ja' ? '第5日目へ戻る' : 'Back to Day 5'}
        </Link>
        <Link href="/dictionary/day7" className="btn-primary" style={{ padding: '0.8rem 2rem', borderRadius: '25px', textDecoration: 'none', fontWeight: 'bold' }}>
          {lang === 'ja' ? '第7日目へ進む' : 'Go to Day 7'} &rarr;
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
