/**
 * 分量の文字列（"400g", "3個"など）を解析・計算するためのユーティリティ
 */

export interface ParsedQuantity {
  value: number;
  unit: string;
}

/**
 * 文字列から数値と単位を抽出する
 * 例: "400g" -> { value: 400, unit: "g" }
 * 例: "3本" -> { value: 3, unit: "本" }
 */
export function parseQuantity(qStr: string): ParsedQuantity {
  const match = qStr.match(/^(\d+(?:\.\d+)?)\s*(.*)$/);
  if (match) {
    return {
      value: parseFloat(match[1]),
      unit: match[2] || ''
    };
  }
  return { value: 0, unit: qStr };
}

/**
 * 数値と単位から文字列を構成する
 */
export function formatQuantity(value: number, unit: string): string {
  // 小数点第2位までに丸める
  const roundedValue = Math.round(value * 100) / 100;
  return `${roundedValue}${unit}`;
}

/**
 * 家族人数に基づいた消費量を計算し、在庫から差し引く
 */
export function subtractQuantity(currentStr: string, perPersonValue: number, personCount: number): string {
  const { value, unit } = parseQuantity(currentStr);
  const totalConsumption = perPersonValue * personCount;
  const newValue = Math.max(0, value - totalConsumption);
  
  return formatQuantity(newValue, unit);
}

/**
 * 手動での増減
 */
export function adjustQuantity(currentStr: string, delta: number): string {
  const { value, unit } = parseQuantity(currentStr);
  const newValue = Math.max(0, value + delta);
  return formatQuantity(newValue, unit);
}
