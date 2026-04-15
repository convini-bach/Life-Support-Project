/**
 * 日本人の食事摂取基準（2025年版 / MHLW）に基づく栄養計算ライブラリ
 */

export interface Profile {
  birthYear: number;
  gender: 'male' | 'female';
  height: number; // cm
  weight: number; // kg
  activityLevel: 'low' | 'normal' | 'high';
}

export interface NutritionTargets {
  energy: number; // kcal
  protein: { min: number; max: number }; // g
  fat: { min: number; max: number }; // g
  carbs: { min: number; max: number }; // g
  salt: number; // g (目標量 < 6.0)
  fiber: number; // g (目標量)
  vegetables: number; // g (目安 350)
}

/**
 * 年齢の計算
 */
const calculateAge = (birthYear: number) => {
  return new Date().getFullYear() - birthYear;
};

/**
 * 基礎代謝量の推定（国立健康・栄養研究所の式 / Ganpuleの式）
 * 日本人に適した式として広く用いられている
 */
const calculateBMR = (profile: Profile) => {
  const age = calculateAge(profile.birthYear);
  if (profile.gender === 'male') {
    return (0.0481 * profile.weight + 0.0234 * profile.height - 0.0138 * age - 0.4235) * 1000 / 4.186;
  } else {
    return (0.0481 * profile.weight + 0.0234 * profile.height - 0.0138 * age - 0.9708) * 1000 / 4.186;
  }
};

/**
 * 身体活動レベル（PAL）の係数
 */
const PAL_COEFFICIENTS = {
  low: 1.5,
  normal: 1.75,
  high: 2.0
};

/**
 * 栄養目標値の算出
 */
export const calculateTargets = (profile: Profile): NutritionTargets => {
  const bmr = calculateBMR(profile);
  const pal = PAL_COEFFICIENTS[profile.activityLevel];
  const energy = Math.round(bmr * pal);

  // PFCバランス (MHLW推奨: P:13-20%, F:20-30%, C:50-65%)
  // ここでは中央値付近を使用
  const proteinEnergy = energy * 0.165; // 16.5%
  const fatEnergy = energy * 0.25;    // 25%
  const carbEnergy = energy * 0.585;  // 58.5%

  const age = calculateAge(profile.birthYear);

  return {
    energy,
    protein: {
      min: Math.round(energy * 0.13 / 4),
      max: Math.round(energy * 0.20 / 4)
    },
    fat: {
      min: Math.round(energy * 0.20 / 9),
      max: Math.round(energy * 0.30 / 9)
    },
    carbs: {
      min: Math.round(energy * 0.50 / 4),
      max: Math.round(energy * 0.65 / 4)
    },
    salt: 6.0, // 男女とも目標量は6.0g未満
    fiber: profile.gender === 'male' ? (age >= 65 ? 20 : 21) : (age >= 65 ? 17 : 18),
    vegetables: 350
  };
};
