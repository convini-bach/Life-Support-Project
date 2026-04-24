export type FoodCategory = 'main' | 'vegetable' | 'stock' | 'other';

export const CATEGORY_MAP: Record<FoodCategory, { label: string; icon: string; color: string }> = {
  main: { label: '主菜(肉・魚)', icon: '🥩', color: '#f87171' },
  vegetable: { label: '野菜・果物', icon: '🥗', color: '#4ade80' },
  stock: { label: '常備品', icon: '🥚', color: '#fbbf24' },
  other: { label: 'その他', icon: '🧂', color: '#94a3b8' },
};

export interface FridgeItem {
  id: string;
  name: string;
  quantity: string;
  expiryDate: string;
  category: FoodCategory;
  advice?: string;
  isAnalyzed?: boolean;
}

interface FoodRule {
  days: number;
  category: FoodCategory;
}

const FOOD_RULES: Record<string, FoodRule> = {
  '魚': { days: 2, category: 'main' },
  '刺身': { days: 1, category: 'main' },
  '肉': { days: 3, category: 'main' },
  '豚肉': { days: 3, category: 'main' },
  '牛肉': { days: 3, category: 'main' },
  '鶏肉': { days: 3, category: 'main' },
  'ひき肉': { days: 2, category: 'main' },
  '野菜': { days: 5, category: 'vegetable' },
  'キャベツ': { days: 7, category: 'vegetable' },
  '卵': { days: 14, category: 'stock' },
  '納豆': { days: 7, category: 'stock' },
  '豆腐': { days: 3, category: 'stock' },
};

export function suggestExpiryDate(foodName: string): { date: Date; category: FoodCategory } {
  const today = new Date();
  const ruleKey = Object.keys(FOOD_RULES).find(key => foodName.includes(key));
  
  let days = 7;
  let category: FoodCategory = 'other';

  if (ruleKey) {
    days = FOOD_RULES[ruleKey].days;
    category = FOOD_RULES[ruleKey].category;
  } else {
    if (foodName.match(/肉|魚/)) { days = 3; category = 'main'; }
    else if (foodName.match(/菜|いも|根/)) { days = 5; category = 'vegetable'; }
  }

  const expiryDate = new Date(today);
  expiryDate.setDate(today.getDate() + days);

  return { date: expiryDate, category };
}

export function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * 冷蔵庫データを LocalStorage から取得する
 */
export function loadFridgeData(): FridgeItem[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem('smart-kitchen-fridge-items');
  return data ? JSON.parse(data) : [];
}

/**
 * 冷蔵庫データを LocalStorage に保存する
 */
export function saveFridgeData(items: FridgeItem[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('smart-kitchen-fridge-items', JSON.stringify(items));
}
