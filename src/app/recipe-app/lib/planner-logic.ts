/**
 * 週間献立（ウィークリープランナー）のロジック
 */

export type DayOfWeek = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export const DAYS_JP: Record<DayOfWeek, string> = {
  mon: '月', tue: '火', wed: '水', thu: '木', fri: '金', sat: '土', sun: '日'
};

export interface DayPlan {
  main?: string | null;
  side1?: string | null;
  side2?: string | null;
  side3?: string | null;
  soup?: string | null;
}

export interface WeeklyPlan {
  [key: string]: DayPlan; // day: DayPlan
}

export interface PlannerSettings {
  shoppingDays: DayOfWeek[];
}

/**
 * 週間献立を LocalStorage から取得する
 */
export function loadWeeklyPlan(): WeeklyPlan {
  if (typeof window === 'undefined') return {};
  const data = localStorage.getItem('smart-kitchen-weekly-plan');
  return data ? JSON.parse(data) : {
    mon: {}, tue: {}, wed: {}, thu: {}, fri: {}, sat: {}, sun: {}
  };
}

/**
 * 週間献立を LocalStorage に保存する
 */
export function saveWeeklyPlan(plan: WeeklyPlan) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('smart-kitchen-weekly-plan', JSON.stringify(plan));
}

/**
 * プランナー設定（買い物日など）を取得する
 */
export function loadPlannerSettings(): PlannerSettings {
  if (typeof window === 'undefined') return { shoppingDays: ['mon'] };
  const data = localStorage.getItem('smart-kitchen-planner-settings');
  return data ? JSON.parse(data) : { shoppingDays: ['sun', 'wed'] }; // デフォルトを日・水に設定
}

/**
 * プランナー設定を保存する
 */
export function savePlannerSettings(settings: PlannerSettings) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('smart-kitchen-planner-settings', JSON.stringify(settings));
}
