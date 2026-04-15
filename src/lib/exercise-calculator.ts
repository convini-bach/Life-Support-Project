import { ExerciseType } from "./storage";

/**
 * METs (身体活動の強さの単位) 定義
 */
export const METS_VALUES: Record<ExerciseType, number> = {
  walking: 3.5,  // 普通歩行
  cycling: 7.5,  // サイクリング (16-19km/h程度)
  gym: 6.0,      // ウェイトトレーニング (高強度) / サーキットトレーニング
  swimming: 8.0  // 水泳 (クロール、普通)
};

export const EXERCISE_LABELS: Record<ExerciseType, string> = {
  walking: 'ウォーキング',
  cycling: 'サイクリング',
  gym: 'ジム・筋トレ',
  swimming: 'スイミング'
};

/**
 * 消費カロリー計算 (kcal)
 * 計算式: エネルギー消費量(kcal) = METs × 体重(kg) × 時間(hour) × 1.05
 * 
 * @param type 運動タイプ
 * @param minutes 運動時間 (分)
 * @param weight 体重 (kg)
 * @returns 消費カロリー (小数点以下切り捨て)
 */
export const calculateBurnedCalories = (
  type: ExerciseType,
  minutes: number,
  weight: number
): number => {
  const mets = METS_VALUES[type];
  const hours = minutes / 60;
  return Math.floor(mets * weight * hours * 1.05);
};
