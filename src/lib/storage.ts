/**
 * Local-Firstを実現するためのLocalStorageユーティリティ
 */

export const storage = {
  /**
   * データを保存する
   */
  set: <T>(key: string, value: T): void => {
    if (typeof window === 'undefined') return;
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  },

  /**
   * データを取得する
   */
  get: <T>(key: string): T | null => {
    if (typeof window === 'undefined') return null;
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : null;
    } catch (e) {
      console.error('Error reading from localStorage', e);
      return null;
    }
  },

  /**
   * データを削除する
   */
  remove: (key: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
  },

  /**
   * 全てのデータをクリアする
   */
  clear: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.clear();
  }
};

// データのキー定義
export const STORAGE_KEYS = {
  USER_PROFILE: 'lifesupport_user_profile',
  HEALTH_DATA: 'lifesupport_health_data',
  ANALYSIS_HISTORY: 'lifesupport_analysis_history',
  BIRTH_YEAR: 'lifesupport_birth_year',
  GENDER: 'lifesupport_gender',
  ACTIVITY_LEVEL: 'lifesupport_activity_level',
  API_KEY: 'lifesupport_api_key',
  SELECTED_MODEL: 'lifesupport_selected_model',
  EXERCISE_HISTORY: 'lifesupport_exercise_history',
  WEIGHT_HISTORY: 'lifesupport_weight_history',
  PREMIUM_STATUS: 'lifesupport_is_premium',
  DAILY_USAGE: 'lifesupport_daily_usage_v1', // Date string -> count
} as const;

export interface HealthData {
  height: string;
  weight: string;
  concern: string;
  birthYear?: number;
  gender?: 'male' | 'female';
  activityLevel?: 'low' | 'normal' | 'high';
}

export type MealCategory = '朝食' | '昼食' | '夕食' | '間食';

export interface AnalysisResult {
  id: number;
  date: string;
  name: string;
  calories: number;
  mealSource: 'home' | 'restaurant' | 'takeout';
  mealCategory?: MealCategory;
  nutrients: {
    protein: number;
    fat: number;
    carbs: number;
    salt: number;
    fiber: number;
    vegetablesTotal: number;
    vegetablesGreenYellow: number;
  };
  advice: {
    evaluation: string;
    improvements: string[];
    message: string;
  };
}

export type ExerciseType = 'walking' | 'cycling' | 'gym' | 'swimming';

export interface ExerciseLog {
  id: number;
  date: string;
  type: ExerciseType;
  minutes: number;
  burnedCalories: number;
}

export interface WeightLog {
  id: number;
  date: string;
  weight: number;
}

/**
 * データのエクスポート (JSON)
 */
export const exportDataJSON = () => {
  const data: Record<string, any> = {};
  Object.values(STORAGE_KEYS).forEach(key => {
    data[key] = storage.get(key);
  });
  return JSON.stringify(data, null, 2);
};

/**
 * データのエクスポート (CSV - 食事履歴のみ)
 */
export const exportMealsCSV = () => {
  const history = storage.get<AnalysisResult[]>(STORAGE_KEYS.ANALYSIS_HISTORY) || [];
  if (history.length === 0) return "";

  const headers = ["日付", "タイミング", "料理名", "カロリー(kcal)", "タンパク質(g)", "脂質(g)", "炭水化物(g)", "塩分(g)", "食物繊維(g)", "野菜(g)", "ソース"];
  const rows = history.map(item => [
    new Date(item.date).toLocaleString('ja-JP'),
    item.mealCategory || "",
    item.name,
    item.calories,
    item.nutrients.protein,
    item.nutrients.fat,
    item.nutrients.carbs,
    item.nutrients.salt,
    item.nutrients.fiber,
    item.nutrients.vegetablesTotal,
    item.mealSource
  ]);

  return [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
};

/**
 * データのインポート (JSON)
 */
export const importDataJSON = (jsonStr: string) => {
  try {
    const data = JSON.parse(jsonStr);
    Object.keys(data).forEach(key => {
      if (data[key] !== null) {
        storage.set(key, data[key]);
      }
    });
    return true;
  } catch (e) {
    console.error("Import failed", e);
    return false;
  }
};
/**
 * プレミアム会員かどうかを判定する (旧LocalStorage方式 - 後方互換性のため維持)
 */
export const isPremiumUser = (): boolean => {
  if (typeof window === 'undefined') return false;
  return storage.get<boolean>(STORAGE_KEYS.PREMIUM_STATUS) === true;
};

/**
 * 本日の解析回数を取得・更新する
 */
export const getDailyUsageCount = (): number => {
  const today = new Date().toISOString().split('T')[0];
  const usage = storage.get<Record<string, number>>(STORAGE_KEYS.DAILY_USAGE) || {};
  return usage[today] || 0;
};

export const incrementDailyUsageCount = (): void => {
  const today = new Date().toISOString().split('T')[0];
  const usage = storage.get<Record<string, number>>(STORAGE_KEYS.DAILY_USAGE) || {};
  usage[today] = (usage[today] || 0) + 1;
  storage.set(STORAGE_KEYS.DAILY_USAGE, usage);
};
