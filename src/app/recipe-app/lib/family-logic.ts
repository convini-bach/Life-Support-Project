export type Gender = 'male' | 'female' | 'other';

export interface FamilyMember {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  allergies: string[];
  likes: string[];
  dislikes: string[];
}

export const DEFAULT_MEMBER: Partial<FamilyMember> = {
  age: 30,
  gender: 'other',
  allergies: [],
  likes: [],
  dislikes: [],
};

/**
 * 家族データを LocalStorage から取得する
 */
export function loadFamilyData(): FamilyMember[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem('smart-kitchen-family');
  return data ? JSON.parse(data) : [];
}

/**
 * 家族データを LocalStorage に保存する
 */
export function saveFamilyData(family: FamilyMember[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('smart-kitchen-family', JSON.stringify(family));
}
