"use client";

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { storage, STORAGE_KEYS } from './storage';

export type Language = 'ja' | 'en';

type Dictionary = {
  [key in Language]: {
    [key: string]: string | any;
  };
};

export const dictionary: Dictionary = {
  ja: {
    // Navigation
    'nav.meal': '食事',
    'nav.exercise': '運動',
    'nav.weight': '体重',
    'nav.history': '統計・履歴',
    'nav.profile': '設定',
    'nav.tos': '利用規約',
    'nav.privacy': 'プライバシーポリシー',
    'nav.scta': '特定商取引法に基づく表記',
    'nav.pricing': '料金プラン',

    // NutriVision (Analysis)
    'analysis.title': '栄養解析 (AI)',
    'analysis.mode.image': '📷 写真',
    'analysis.mode.text': '✍️ テキスト',
    'analysis.timing': 'タイミング',
    'analysis.source': '種類',
    'analysis.source.home': '自炊',
    'analysis.source.restaurant': '外食',
    'analysis.source.takeout': '惣菜',
    'analysis.placeholder.image': '補足（大盛、味濃いめ等）...',
    'analysis.placeholder.text': '材料、メニュー、URLなど...',
    'analysis.tap_to_select': 'タップして選択',
    'analysis.button.start': 'AI解析を実行する',
    'analysis.button.analyzing': '解析中...',
    'analysis.error.quota': 'AIの利用制限（クォータ制限）に達しました。しばらく待ってから再度お試しいただくか、APIキーの設定を確認してください。',
    'analysis.toast.success': '解析が完了し、保存しました！',
    'analysis.result.calories': 'kcal',
    'analysis.result.edit': '修正',
    'analysis.result.confirm': '確定',
    'analysis.result.save': '⚡ 確定保存',
    'analysis.result.advice': 'AIアドバイス',
    'analysis.result.evaluation': '【 栄養評価 】',
    'analysis.result.improvement': '【 改善のアクション 】',
    'analysis.result.premium_mask': 'プレミアムでアドバイスを表示',
    'analysis.voice.start': '音声入力',
    'analysis.voice.stop': '停止',
    'analysis.voice.recording': '音声を聞き取り中...',
    'analysis.voice.not_supported': 'お使いのブラウザは音声入力に対応していません',

    // Nutrients
    'nutrient.energy': 'エネルギー',
    'nutrient.protein': 'タンパク質',
    'nutrient.fat': '脂質',
    'nutrient.carbs': '炭水化物',
    'nutrient.salt': '塩分',
    'nutrient.salt_short': '塩',
    'nutrient.fiber': '食物繊維',
    'nutrient.fiber_short': '繊',
    'nutrient.vegetables': '野菜量',
    'nutrient.veg_short': '菜',

    // Exercise
    'exercise.title': '運動を追加する',
    'exercise.time': '実施時間',
    'exercise.minutes': '分',
    'exercise.clear': 'クリア',
    'exercise.button.save': '運動を登録する',
    'exercise.toast.success': '運動を登録しました！',
    'exercise.type.walking': 'ウォーキング',
    'exercise.type.cycling': 'サイクリング',
    'exercise.type.gym': 'ジム・筋トレ',
    'exercise.type.swimming': '水泳',
    'exercise.timing': 'タイミング',
    'exercise.button.calories': '消費カロリー',
    'exercise.button.duration': '実施時間',
    'exercise.cate.breakfast': '朝食',
    'exercise.cate.lunch': '昼食',
    'exercise.cate.dinner': '夕食',
    'exercise.cate.snack': '間食',

    // Weight
    'weight.button.save': '体重を登録する',
    'weight.toast.success': '体重を登録しました！',

    // History
    'history.title': '食事の履歴',
    'history.exercise_title': '運動の履歴',
    'history.weight_title': '体重の履歴',
    'history.calendar.year': '年',
    'history.calendar.month': '月',
    'history.mode.day': '特定日',
    'history.mode.week': '7日間平均',
    'history.mode.month': '30日間平均',
    'history.stats.title': '期間中の分析',
    'history.weight_predict': '1ヶ月後の体重予測',
    'history.stats.no_data': 'データがありません',
    'history.stats.no_profile': 'プロフィールを設定してください',
    'history.modal.title': '記録の編集',
    'history.modal.date': '日付',
    'history.modal.name': '料理名',
    'history.modal.save': '保存する',
    'history.modal.cancel': 'キャンセル',
    'history.delete_confirm': 'この記録を削除しますか？',
    'history.exercise_delete_confirm': 'この運動記録を削除しますか？',
    'history.weight_delete_confirm': 'この記録を削除しますか？',
    'history.modal.timing_source': '食事のタイミング ・ 種類',
    'history.calendar.status': 'の状況',
    'history.stats.period_avg': '日間平均 (遡り)',

    // Profile
    'profile.title': '設定 & データ管理',
    'profile.subtitle': '自分に合わせたカスタマイズと、データのバックアップ。',
    'profile.status.premium': '✨ プレミアムプラン加入中',
    'profile.status.free': '無料プラン',
    'profile.button.upgrade': 'プレミアムにアップグレード',
    'profile.health_data': '身体データ',
    'profile.gender': '性別',
    'profile.gender.male': '男性',
    'profile.gender.female': '女性',
    'profile.activity': '活動レベル',
    'profile.activity.low': '低い（デスクワーク中心）',
    'profile.activity.normal': '普通（立ち仕事や軽い運動）',
    'profile.activity.high': '高い（活発な運動・重労働）',
    'profile.ai_settings': 'AIパートナー設定',
    'profile.api_key': 'Gemini API キー',
    'profile.api_guide': 'APIキーの取得方法',
    'profile.model': '利用するモデル',
    'profile.concern': '分析時の優先事項',
    'profile.button.save_all': 'すべての設定を保存',
    'profile.data_management': 'データ管理・バックアップ',
    'profile.export.json': 'JSON形式で保存 (復元用)',
    'profile.export.csv': 'CSV形式で保存 (閲覧用)',
    'profile.import': 'JSONから復元する',
    'profile.clear_all': 'すべての記録を完全消去',
    'profile.clear_confirm': '【警告】すべての履歴を完全に消去しますか？\nこの操作は取り消せません。',
    'profile.language': '言語 (Language)',
    'profile.no_account': 'アカウント未登録',
    'profile.premium_benefit': 'ログイン後にプレミアムへアップグレードすると、無制限の解析や詳細アドバイスが解放されます。',
    'profile.login': 'ログイン',
    'profile.signup': '新規登録',
    'profile.height': '身長',
    'profile.birth_year': '生まれ年',
    'profile.api_key_placeholder': 'AI Studioから取得したキー',
    'profile.connect': '接続',
    'profile.connecting': 'テスト中',
    'profile.api_guide_step1': '1. Google AI Studio にアクセス',
    'profile.api_guide_step2': '2. 「Create API key」をクリックしてキーをコピー',
    'profile.api_guide_step3': '3. 上の入力欄に貼り付けて「接続」を押してください。',
    'profile.logout': 'ログアウト',

    // Common
    'common.loading': '読み込み中...',
    'common.success': '成功',
    'common.error': 'エラー',
    'common.no_data': '記録がありません',

    // Portal
    'portal.welcome': 'Life Support Project',
    'portal.subtitle': 'Local-Firstな知恵の集積地。あなたのデータは、あなただけのものです。',
    'portal.nutri_vision.desc': '食事を「視る」、身体を「知る」。AIによるプロフェッショナルな食事解析ツール。',
    'portal.recipe_cart.desc': '解析結果に基づいたレシピ提案と、効率的な買い物管理をサポートします。',
    'portal.hoken_mirror.desc': 'その保険は、今のあなたを正しく映していますか？AIによるミラーリング診断。',
    'portal.sumai_check.desc': '住まいのコストは人生の土台。居住戦略の最適化をサポートします。',
    'portal.work_counsel.desc': '働くことは生きること。キャリアのリズムとバランスをAIが診断します。',
    'portal.open_app': 'アプリを開く',
    'portal.footer': 'プロジェクト憲法に基づき、データのプライバシーを最優先に設計されています。',
  },
  en: {
    // Navigation
    'nav.meal': 'Meals',
    'nav.exercise': 'Exercise',
    'nav.weight': 'Weight',
    'nav.history': 'History',
    'nav.profile': 'Settings',
    'nav.tos': 'Terms',
    'nav.privacy': 'Privacy',
    'nav.scta': 'Specified Commercial Transactions',
    'nav.pricing': 'Pricing',

    // NutriVision (Analysis)
    'analysis.title': 'Nutri-Vision AI',
    'analysis.mode.image': '📷 Photo',
    'analysis.mode.text': '✍️ Text',
    'analysis.timing': 'Timing',
    'analysis.source': 'Source',
    'analysis.source.home': 'Home',
    'analysis.source.restaurant': 'Rest.',
    'analysis.source.takeout': 'Takeout',
    'analysis.placeholder.image': 'Notes (extra portion, salty, etc.)...',
    'analysis.placeholder.text': 'Ingredients, menu, URL...',
    'analysis.tap_to_select': 'Tap to select',
    'analysis.button.start': 'Start AI Analysis',
    'analysis.button.analyzing': 'Analyzing...',
    'analysis.error.quota': 'AI quota reached. Please wait or check your API key.',
    'analysis.toast.success': 'Analysis complete and saved!',
    'analysis.result.calories': 'kcal',
    'analysis.result.edit': 'Edit',
    'analysis.result.confirm': 'Done',
    'analysis.result.save': '⚡ Fast Save',
    'analysis.result.advice': 'AI Advice',
    'analysis.result.evaluation': '[ Nutritional Evaluation ]',
    'analysis.result.improvement': '[ Improvement Actions ]',
    'analysis.result.premium_mask': 'View advice with Premium',
    'analysis.voice.start': 'Voice Input',
    'analysis.voice.stop': 'Stop',
    'analysis.voice.recording': 'Listening...',
    'analysis.voice.not_supported': 'Voice input not supported in this browser',

    // Nutrients
    'nutrient.energy': 'Energy',
    'nutrient.protein': 'Protein',
    'nutrient.fat': 'Fat',
    'nutrient.carbs': 'Carbohydrate',
    'nutrient.salt': 'Salt',
    'nutrient.salt_short': 'Salt',
    'nutrient.fiber': 'Fiber',
    'nutrient.fiber_short': 'Fiber',
    'nutrient.vegetables': 'Vegetables',
    'nutrient.veg_short': 'Veg.',

    // Exercise
    'exercise.title': 'Add Exercise',
    'exercise.time': 'Duration',
    'exercise.minutes': 'min',
    'exercise.clear': 'Clear',
    'exercise.button.save': 'Log Exercise',
    'exercise.toast.success': 'Exercise logged!',
    'exercise.type.walking': 'Walking',
    'exercise.type.cycling': 'Cycling',
    'exercise.type.gym': 'Gym/Training',
    'exercise.type.swimming': 'Swimming',
    'exercise.timing': 'Timing',
    'exercise.button.calories': 'Burned Cal.',
    'exercise.button.duration': 'Duration',
    'exercise.cate.breakfast': 'Breakfast',
    'exercise.cate.lunch': 'Lunch',
    'exercise.cate.dinner': 'Dinner',
    'exercise.cate.snack': 'Snack',

    // Weight
    'weight.button.save': 'Log Weight',
    'weight.toast.success': 'Weight logged!',

    // History
    'history.title': 'Meal History',
    'history.exercise_title': 'Exercise History',
    'history.weight_title': 'Weight History',
    'history.calendar.year': '/',
    'history.calendar.month': '',
    'history.mode.day': 'Daily',
    'history.mode.week': '7d Avg',
    'history.mode.month': '30d Avg',
    'history.stats.title': 'Period Analysis',
    'history.weight_predict': 'Weight Forecast (1mo)',
    'history.stats.no_data': 'No data',
    'history.stats.no_profile': 'Please set up profile',
    'history.modal.title': 'Edit Record',
    'history.modal.date': 'Date',
    'history.modal.name': 'Meal Name',
    'history.modal.save': 'Save',
    'history.modal.cancel': 'Cancel',
    'history.delete_confirm': 'Delete this record?',
    'history.exercise_delete_confirm': 'Delete this exercise log?',
    'history.weight_delete_confirm': 'Delete this record?',
    'history.modal.timing_source': 'Meal Timing & Source',
    'history.calendar.status': 'Status',
    'history.stats.period_avg': 'd Average',

    // Profile
    'profile.title': 'Settings & Data',
    'profile.subtitle': 'Customize your experience & backup data.',
    'profile.status.premium': '✨ Premium Plan Active',
    'profile.status.free': 'Free Plan',
    'profile.button.upgrade': 'Upgrade to Premium',
    'profile.health_data': 'Body Data',
    'profile.gender': 'Gender',
    'profile.gender.male': 'Male',
    'profile.gender.female': 'Female',
    'profile.activity': 'Activity Level',
    'profile.activity.low': 'Low (Sedentary)',
    'profile.activity.normal': 'Normal (Light activity)',
    'profile.activity.high': 'High (Active/Heavy)',
    'profile.ai_settings': 'AI Partner Settings',
    'profile.api_key': 'Gemini API Key',
    'profile.api_guide': 'How to get API Key',
    'profile.model': 'AI Model',
    'profile.concern': 'Analysis Priorities',
    'profile.button.save_all': 'Save All Settings',
    'profile.data_management': 'Data Management',
    'profile.export.json': 'Export JSON (Restore)',
    'profile.export.csv': 'Export CSV (View)',
    'profile.import': 'Import from JSON',
    'profile.clear_all': 'Clear All Records',
    'profile.clear_confirm': 'WARNING: Permanent deletion of all history. This cannot be undone.',
    'profile.language': 'Language',
    'profile.no_account': 'Account not registered',
    'profile.premium_benefit': 'Upgrade to premium after logging in for unlimited analysis and advice.',
    'profile.login': 'Login',
    'profile.signup': 'Sign Up',
    'profile.height': 'Height',
    'profile.birth_year': 'Birth Year',
    'profile.api_key_placeholder': 'Key from AI Studio',
    'profile.connect': 'Connect',
    'profile.connecting': 'Testing',
    'profile.api_guide_step1': '1. Access Google AI Studio',
    'profile.api_guide_step2': '2. Click "Create API key" and copy',
    'profile.api_guide_step3': '3. Paste and click "Connect"',
    'profile.logout': 'Logout',

    // Common
    'common.loading': 'Loading...',
    'common.success': 'Success',
    'common.error': 'Error',
    'common.no_data': 'No records found',

    // Portal
    'portal.welcome': 'Life Support Project',
    'portal.subtitle': 'Local-First wisdom hub. Your data belongs to you alone.',
    'portal.nutri_vision.desc': 'Visualize meals, know your body. Professional AI meal analysis.',
    'portal.recipe_cart.desc': 'Recipe suggestions and shopping management based on your data.',
    'portal.hoken_mirror.desc': 'Insurance mirroring diagnosis. Optimized for your real life.',
    'portal.sumai_check.desc': 'Home strategy and cost optimization for your life base.',
    'portal.work_counsel.desc': 'Career rhythm and balance diagnosis powered by AI.',
    'portal.open_app': 'Open App',
    'portal.footer': 'Privacy by design. Data remains local governed by project rules.',
  }
};

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('ja');

  useEffect(() => {
    const saved = localStorage.getItem('app_lang') as Language;
    if (saved && (saved === 'ja' || saved === 'en')) {
      setLangState(saved);
    } else {
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'en') setLangState('en');
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('app_lang', newLang);
  };

  const t = (key: string): string => {
    return dictionary[lang][key] || key;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
