<!-- BEGIN:development-rules -->
# Nutri-Vision 開発ガイドライン (品質向上用)

## 1. ビルドと型チェックの義務化
- **Push前の確認**: 修正を GitHub に push する前に、必ずターミナルで `npm run build` を実行すること。
- **エラーの放置禁止**: 警告（Warning）も可能な限り解消し、ビルドエラーがある状態での push は厳禁とする。

## 2. 日付・時刻の扱い
- **タイムゾーン原則**: `toISOString()` は UTC 基準のため、日本時間の記録では原則使用禁止。
- **日付文字列の作成**: 常に `new Date()` から `getFullYear()`, `getMonth() + 1`, `getDate()` を個別に取得し、`YYYY-MM-DD` 形式の文字列を自作すること。
- **カレンダー同期**: カレンダーの選択値と表示値が 1 日ずれないよう、ローカルタイムでのパースを徹底すること。

## 3. 型安全性の確保
- **型定義の参照**: `src/lib/` フォルダ内の `storage.ts` や `nutrition-calculator.ts` を常に「真実のソース」として参照し、未知のプロパティへのアクセスを避けること。
- **Type Casting の最小化**: `as any` は避け、適切なインターフェースを定義して使用すること。

## 4. UI とコンポーネント
- **JSX の整合性**: タグの閉じ忘れ、不必要なネスト、構文ミスを防ぐため、変更後は必ずコードの全体構造を確認すること。
- **ScrollPicker**: 「タップで展開する」方式を維持し、誤操作防止と視認性を両立させること。
- **スタイリング**: インラインスタイルは最小限にし、可能な限り `globals.css` のクラスを利用すること。

## 5. 日本語対応
- **UI 表示**: ユーザー向けのメッセージ、ボタン、説明文はすべて自然な日本語で記述すること。
- **Clerk**: ローカライズは `@clerk/localizations` の `jaJP` を使用すること。

## 6. AIエージェントのチーム・プロトコル縛り（roles.md）
- **4人の専門家人格**: 実装方針の決定、重要なアーキテクチャ変更、および一日の総括（まとめ）を行う際は、必ず `roles.md` に定義された4人の人格（Strategist, Architect, Engineer, Partner）それぞれの視点で多角的に検討し、その意見をユーザーに明示すること。
- **独断の禁止**: AI単一の視点による性急な判断を避け、ビジネス的な妥当性、データの主権、実装のコスト、ユーザーの感情、これらすべてが調和する地点を探る「協議プロセス」を必ず経由すること。

<!-- END:development-rules -->

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
