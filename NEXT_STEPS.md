# Next Steps: Nutri-Vision to Recipe-Cart Integration

## 現在の状態 (Current State)
- **App**: Nutri-Vision
- **Core Engine**: Gemini API (model: storage.SELECTED_MODEL)
- **Data Model**: `AnalysisResult` (calories, salt, fiber, vegetablesTotal, etc.)
- **Storage**: `LocalStorage`
  - `API_KEY`: Gemini API鍵
  - `SELECTED_MODEL`: ユーザー選択の推奨モデル
  - `ANALYSIS_HISTORY`: 修正済みの全食事データ
  - `HEALTH_DATA`: ユーザープロフィール（これがないと統計が表示されません）

## 次回の開発目標 (Next Objective)
### 1. Recipe-Cart アプリの新規作成
- `/recipe-cart` ページの実装。
- Nutri-Vision の `ANALYSIS_HISTORY` から、直近3日間で特に不足している栄養素（例：食物繊維が足りない、等）を特定。

### 2. インテリジェント・レシピ提案
- 不足栄養素を引数として AI に渡し、「今のあなたに必要なレシピ」を提案。
- 提案された材料をワンタップで「買い物リスト」へ追加。

### 3. エコシステムの統合
- 各アプリ（保険診断、仕事診断など）で得られた「ストレス度」や「健康懸念」を Nutri-Vision のアドバイスに反映させるための共通データ基盤の検討。

---
Created on 2026-04-13 by Antigravity
