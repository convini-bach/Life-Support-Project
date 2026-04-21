/**
 * Contextual Affiliate Recommendation Engine (Mock)
 */
export interface RecommendationItem {
  id: string;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  affiliateUrl: string;
  category: 'weight' | 'fitness' | 'nutrition';
}

const ITEMS: RecommendationItem[] = [
  {
    id: "item1",
    title: "スマート体組成計 高精度 スマホ連動",
    description: "日々の体重推移を自動でスマホに記録。変化がグラフで見えるとモチベーションがアップします。",
    price: "￥2,980",
    imageUrl: "https://images.unsplash.com/photo-1610419330600-6cb56ec236b2?w=300&q=80",
    affiliateUrl: "https://amazon.co.jp?tag=dummy-22",
    category: "weight"
  },
  {
    id: "item2",
    title: "スマートウォッチ 運動トラッカー搭載",
    description: "消費カロリーや歩数を自動計測。スマホを取り出さずに運動量をチェックできます。",
    price: "￥4,500",
    imageUrl: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=300&q=80",
    affiliateUrl: "https://amazon.co.jp?tag=dummy-22",
    category: "fitness"
  },
  {
    id: "item3",
    title: "低糖質プロテインバーMIX 24本入り",
    description: "小腹が空いた時や運動後のタンパク質補給に。おやつ代わりに美味しく栄養を摂取。",
    price: "￥3,200",
    imageUrl: "https://images.unsplash.com/photo-1622484211148-f124f693240e?w=300&q=80",
    affiliateUrl: "https://amazon.co.jp?tag=dummy-22",
    category: "nutrition"
  }
];

export const getRecommendations = (context: 'weight' | 'fitness' | 'nutrition' | 'general'): RecommendationItem[] => {
  const filtered = context === 'general' ? ITEMS : ITEMS.filter(i => i.category === context);
  if (filtered.length === 0) return [ITEMS[0]];
  
  // ランダムに1件返す
  return [...filtered].sort(() => 0.5 - Math.random()).slice(0, 1);
};
