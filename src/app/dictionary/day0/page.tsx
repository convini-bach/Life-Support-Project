"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import AffiliateCard from "@/components/AffiliateCard";
import { ITEMS } from "@/lib/recommendation";

export default function Day0() {
  const { lang } = useI18n();
  const bookRecommendation = ITEMS.find(i => i.id === 'ai-dictionary-book');

  return (
    <div className="dictionary-content animate-fade-in">
      <header style={{ marginBottom: '3rem' }}>
        <div style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '1rem', textTransform: 'uppercase' }}>
          Day 0: Preparation
        </div>
        <h1>
          {lang === 'ja' ? "プロンプトとルールの「設定場所」" : "Where to Set Prompts and Rules"}
        </h1>
      </header>

      <section>
        <h2>プロンプトとルールの「設定場所」</h2>
        
        <h3>一言でいうと？</h3>
        <p>AIという「新入社員」に、あなたの会社の「社外秘マニュアル」や「仕事の進め方のルール」をどこに置いて読ませるか、というインプット場所の決め方のことです。</p>
        
        <h3>なぜ重要なのか？</h3>
        <p>指示を出す場所（レイヤー）を間違えると、AIは会話の途中でルールを忘れたり、他の指示と混同したりしてしまいます。「絶対に守らせたいこと」と「その場限りのお願い」を区別して設定することで、AIの動作が劇的に安定します。</p>

        <blockquote>
          <strong>事務作業に例えると？</strong><br />
          デスクの上の付箋（チャット欄）に書くか、社員研修のテキスト（システム設定）に組み込むか、それとも社内サーバーの共有マニュアル（外部ファイル）として保存しておくか、という「情報の重要度と保存期間」に応じた使い分けと同じです。
        </blockquote>

        <h3>実践プロンプト例（レベル3：外部ファイル化）</h3>
        <p><code>「私のワークスペースにある rules.md を読み込んでください。そこに定義されている『命名規則』と『エラー報告のフォーマット』を、これからの作業の絶対的なルールとして適用してください。」</code></p>
      </section>

      <section>
        <h2>3つの設定レベル</h2>
        <div style={{ display: 'grid', gap: '1.5rem', marginTop: '1.5rem' }}>
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>レベル1：チャットボックス（付箋）</h4>
            <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>その場の会話に直接書く方法。手軽ですが、会話が長くなるとAIが忘れてしまいます。</p>
          </div>
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>レベル2：システムプロンプト（憲法）</h4>
            <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>設定画面に書き込む方法。AIの「性格」や「絶対のルール」として脳に深く刻まれます。</p>
          </div>
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>レベル3：外部ファイル（マニュアル）</h4>
            <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}><code>rules.md</code> などを読み込ませる方法。複数のプロジェクトでルールを使い回すのに最適です。</p>
          </div>
        </div>
      </section>

      {/* Navigation and CTA */}
      <div style={{ marginTop: '5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
        <Link href="/dictionary" style={{ color: '#64748b', textDecoration: 'none' }}>
          &larr; {lang === 'ja' ? '目次に戻る' : 'Back to Roadster'}
        </Link>
        <Link href="/dictionary/day1" className="btn-primary" style={{ padding: '0.8rem 2rem', borderRadius: '25px', textDecoration: 'none', fontWeight: 'bold' }}>
          {lang === 'ja' ? '第1日目へ進む' : 'Go to Day 1'} &rarr;
        </Link>
      </div>

      <div style={{ marginTop: '4rem', padding: '2.5rem', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '24px', border: '1px solid rgba(16, 185, 129, 0.2)', textAlign: 'center' }}>
        <h4 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.2rem' }}>
          {lang === 'ja' ? '初めてAIに触れる方向けの辞書の完全版を手に入れませんか？' : 'Get the Complete Edition for AI Beginners'}
        </h4>
        <p style={{ fontSize: '0.95rem', color: '#94a3b8', marginBottom: '1.5rem', lineHeight: '1.6' }}>
          {lang === 'ja' 
            ? "導入としてAI、Gemini、Antigravityの難しい技術用語を慣れ親しんだ例で解説をする「概念の翻訳書」をご準備しました。Obsidian用に活用できるmdファイルを購入特典として活用いただけます。" 
            : "We've prepared a 'Translation of Concepts' that explains difficult technical terms of AI, Gemini, and Antigravity using familiar examples."}
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
