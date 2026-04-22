/**
 * Contextual Affiliate Recommendation Engine
 * StoreID: banch-22
 */
export interface RecommendationItem {
  id: string;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  affiliateUrl: string;
  category: 'weight' | 'fitness' | 'nutrition' | 'housing' | 'lifeplan' | 'general';
}

const AMAZON_TAG = 'banch-22';

const createAmazonUrl = (asin: string) => `https://www.amazon.co.jp/dp/${asin}/?tag=${AMAZON_TAG}`;
const createAmazonImageUrl = (asin: string) => `https://m.media-amazon.com/images/P/${asin}.01.LZZZZZZZ.jpg`;

const ITEMS: RecommendationItem[] = [
  // --- 健康・ダイエット ---
  {
    id: "tanita-scale",
    title: "タニタ デジタルクッキングスケール",
    description: "食材の重さを正確に測ることで、解析の精度が劇的に向上します。ダイエットの第一歩に。",
    price: "￥2,480",
    imageUrl: createAmazonImageUrl("B072TBYM2K"),
    affiliateUrl: createAmazonUrl("B072TBYM2K"),
    category: "nutrition"
  },
  {
    id: "savas-protein",
    title: "明治 ザバス ホエイプロテイン100",
    description: "解析結果で「タンパク質不足」と出た方へ。運動後や朝食に手軽に補給できます。",
    price: "￥4,500",
    imageUrl: createAmazonImageUrl("B00IEA5210"),
    affiliateUrl: createAmazonUrl("B00IEA5210"),
    category: "nutrition"
  },
  {
    id: "body-composition",
    title: "Anker Eufy Smart Scale P2 Pro",
    description: "体重だけでなく体脂肪・筋肉量など16項目を自動記録。変化が見えるとモチベーションが続きます。",
    price: "￥6,990",
    imageUrl: createAmazonImageUrl("B0BG5FJ33T"),
    affiliateUrl: createAmazonUrl("B0BG5FJ33T"),
    category: "weight"
  },
  // --- 住まい・安全 ---
  {
    id: "emergency-kit",
    title: "山善 防災リュック 30点セット",
    description: "住まいの点検の仕上げに。命を守るための基本セットを玄関に備えておきましょう。",
    price: "￥4,980",
    imageUrl: createAmazonImageUrl("B07RMWHK7J"),
    affiliateUrl: createAmazonUrl("B07RMWHK7J"),
    category: "housing"
  },
  {
    id: "fire-extinguisher",
    title: "初田製作所 住宅用消火器 蓄圧式",
    description: "キッチン周りの安全に。強化液タイプなら、天ぷら油火災でも再燃を防げます。",
    price: "￥5,800",
    imageUrl: createAmazonImageUrl("B00BAM43DM"),
    affiliateUrl: createAmazonUrl("B00BAM43DM"),
    category: "housing"
  },
  // --- ライフプラン・マネー ---
  {
    id: "money-book",
    title: "漫画 バビロン大富豪の教え",
    description: "ライフプランの根本「貯蓄と投資」を学ぶ名著。資産形成の考え方が変わります。",
    price: "￥1,782",
    imageUrl: createAmazonImageUrl("4866511249"),
    affiliateUrl: createAmazonUrl("4866511249"),
    category: "lifeplan"
  }
];

export const getRecommendations = (context: RecommendationItem['category']): RecommendationItem[] => {
  const filtered = context === 'general' ? ITEMS : ITEMS.filter(i => i.category === context);
  if (filtered.length === 0) return [ITEMS[0]];
  
  // ランダムに1件返す
  return [...filtered].sort(() => 0.5 - Math.random()).slice(0, 1);
};
