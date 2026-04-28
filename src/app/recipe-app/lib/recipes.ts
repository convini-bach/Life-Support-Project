export type RecipeCategory = 'meat' | 'fish' | 'vegetable' | 'noodle' | 'other';

export interface Recipe {
  id: string;
  name: string;
  description: string;
  category: RecipeCategory;
  ingredients: {
    name: string;
    amountPerPerson: number;
    unit: string;
  }[];
  steps: string[];
  url?: string;
  source?: string;
  image: string;
}

export const MOCK_RECIPES: Recipe[] = [
  { id: 'curry', name: '時短！ポークカレー', category: 'meat', description: '余り野菜をたっぷり使った定番メニュー。', ingredients: [{ name: '豚肉', amountPerPerson: 100, unit: 'g' }, { name: 'キャベツ', amountPerPerson: 50, unit: 'g' }], steps: ['材料を切る', '肉と野菜を炒める', '水とルウを加えて煮込む'], image: '🍛' },
  { id: 'stir-fry', name: '肉野菜炒め', category: 'meat', description: '強火でサッと炒めるだけ。', ingredients: [{ name: '豚肉', amountPerPerson: 80, unit: 'g' }, { name: 'キャベツ', amountPerPerson: 100, unit: 'g' }], steps: ['材料を切る', '強火で炒める'], image: '🍳' },
  { id: 'saba-misoni', name: 'さばのみそ煮', category: 'fish', description: '新鮮なさばで作るのが一番。', ingredients: [{ name: 'さば', amountPerPerson: 1, unit: '切れ' }], steps: ['さばを湯通しする', '味噌で煮る'], image: '🐟' },
  { id: 'salad', name: 'キャベツの塩昆布和え', category: 'vegetable', description: 'あと一品に最適。火を使わず完成。', ingredients: [{ name: 'キャベツ', amountPerPerson: 50, unit: 'g' }], steps: ['キャベツを切る', '塩昆布と和える'], image: '🥗' },
  { id: 'soup-miso', name: '具だくさん味噌汁', category: 'other', description: '冷蔵庫の余り野菜を一掃。', ingredients: [{ name: 'キャベツ', amountPerPerson: 30, unit: 'g' }], steps: ['だしをとる', '具材を煮る', '味噌を溶く'], image: '🥣' },
  { id: 'hamburg', name: 'ふっくらハンバーグ', category: 'meat', description: '子供も大好き、肉汁たっぷり。', ingredients: [{ name: 'ひき肉', amountPerPerson: 120, unit: 'g' }], steps: ['玉ねぎを炒める', '肉と混ぜて成形', '焼く'], image: '🍔' },
  { id: 'salmon-foil', name: '鮭のホイル焼き', category: 'fish', description: '片付け簡単、野菜も一緒に。', ingredients: [{ name: '鮭', amountPerPerson: 1, unit: '切れ' }], steps: ['ホイルに並べる', 'バターをのせる', 'トースターで焼く'], image: '🍱' },
  { id: 'kinpira', name: 'きんぴらごぼう', category: 'vegetable', description: '作り置きに便利な定番副菜。', ingredients: [{ name: 'ごぼう', amountPerPerson: 30, unit: 'g' }], steps: ['細切りにする', '炒めて煮る'], image: '🥢' },
  { id: 'tonkatsu', name: 'サクサクとんかつ', category: 'meat', description: '晩ごはんの王様。', ingredients: [{ name: '豚ロース', amountPerPerson: 120, unit: 'g' }], steps: ['衣をつける', '油で揚げる'], image: '🥩' },
  { id: 'yakisoba', name: 'ソース焼きそば', category: 'meat', description: 'ランチにも最適な時短料理。', ingredients: [{ name: '焼きそば麺', amountPerPerson: 1, unit: '玉' }], steps: ['具を炒める', '麺を加えて蒸し焼き'], image: '🍝' },
  { id: 'karaage', name: '鶏の唐揚げ', category: 'meat', description: '秘伝のタレに漬け込んで。', ingredients: [{ name: '鶏もも肉', amountPerPerson: 150, unit: 'g' }], steps: ['タレに漬ける', '粉をまぶす', '揚げる'], image: '🍗' },
  { id: 'niku-jaga', name: '肉じゃが', category: 'meat', description: '家庭の味の代表格。', ingredients: [{ name: '牛肉', amountPerPerson: 80, unit: 'g' }], steps: ['具材を炒める', '煮汁で煮込む'], image: '🥘' },
  { id: 'mapo-tofu', name: '本格麻婆豆腐', category: 'meat', description: 'ピリ辛でご飯が進む。', ingredients: [{ name: '豆腐', amountPerPerson: 150, unit: 'g' }], steps: ['ソースを作る', '豆腐を加える'], image: '🌶️' },
  { id: 'ginger-pork', name: '豚の生姜焼き', category: 'meat', description: 'ご飯のお供に最高。', ingredients: [{ name: '豚肉', amountPerPerson: 120, unit: 'g' }], steps: ['タレを作る', '肉を焼く'], image: '🥓' },
  { id: 'tempura', name: '季節の天ぷら', category: 'vegetable', description: '旬の食材をサクッと。', ingredients: [{ name: '野菜', amountPerPerson: 100, unit: 'g' }], steps: ['衣を作る', '揚げる'], image: '🍤' },
  { id: 'oyakodon', name: 'ふわとろ親子丼', category: 'meat', description: '卵の加減がポイント。', ingredients: [{ name: '鶏肉', amountPerPerson: 100, unit: 'g' }], steps: ['だしで煮る', '卵でとじる'], image: '🍚' },
  { id: 'gyudon', name: '牛丼', category: 'meat', description: '忙しい時の強い味方。', ingredients: [{ name: '牛肉', amountPerPerson: 100, unit: 'g' }], steps: ['煮汁で煮る'], image: '🐮' },
  { id: 'carbonara', name: '濃厚カルボナーラ', category: 'other', description: '本格的な味わい。', ingredients: [{ name: 'パスタ', amountPerPerson: 100, unit: 'g' }], steps: ['パスタを茹でる', 'ソースと和える'], image: '🍝' },
  { id: 'omurice', name: 'オムライス', category: 'other', description: '卵の包み方がコツ。', ingredients: [{ name: '鶏肉', amountPerPerson: 50, unit: 'g' }], steps: ['ケチャップライスを作る', '卵で包む'], image: '🍳' },
  { id: 'gyoza', name: '手作り餃子', category: 'meat', description: 'みんなで包むと楽しい。', ingredients: [{ name: '豚ひき肉', amountPerPerson: 100, unit: 'g' }], steps: ['あんを包む', '蒸し焼きにする'], image: '🥟' },
  { id: 'soup-corn', name: 'コーンポタージュ', category: 'other', description: '甘くて優しいスープ。', ingredients: [{ name: 'コーン', amountPerPerson: 50, unit: 'g' }], steps: ['ミキサーにかける', '温める'], image: '🌽' },
  { id: 'soup-onion', name: 'オニオンスープ', category: 'other', description: '飴色玉ねぎの甘み。', ingredients: [{ name: '玉ねぎ', amountPerPerson: 100, unit: 'g' }], steps: ['玉ねぎを炒める', '煮込む'], image: '🧅' },
  { id: 'side-ohitashi', name: 'ほうれん草のお浸し', category: 'vegetable', description: 'さっぱり副菜。', ingredients: [{ name: 'ほうれん草', amountPerPerson: 50, unit: 'g' }], steps: ['茹でる', 'だしに浸す'], image: '🥬' },
  { id: 'side-namul', name: 'もやしのナムル', category: 'vegetable', description: 'シャキシャキ食感。', ingredients: [{ name: 'もやし', amountPerPerson: 100, unit: 'g' }], steps: ['茹でる', '調味料と和える'], image: '🥢' },
  { id: 'side-hijiki', name: 'ひじきの煮物', category: 'vegetable', description: '栄養満点。', ingredients: [{ name: 'ひじき', amountPerPerson: 20, unit: 'g' }], steps: ['戻す', '煮る'], image: '🖤' },
  { id: 'fish-buri', name: 'ぶりの照り焼き', category: 'fish', description: '甘辛タレが絶品。', ingredients: [{ name: 'ぶり', amountPerPerson: 1, unit: '切れ' }], steps: ['焼く', 'タレを絡める'], image: '🐟' },
  { id: 'fish-shioyaki', name: 'さんまの塩焼き', category: 'fish', description: '秋の味覚。', ingredients: [{ name: 'さんま', amountPerPerson: 1, unit: '尾' }], steps: ['塩を振る', '焼く'], image: '🍢' },
  { id: 'noodle-udon', name: '肉うどん', category: 'meat', description: 'あったまる一杯。', ingredients: [{ name: 'うどん麺', amountPerPerson: 1, unit: '玉' }], steps: ['だしを作る', '肉を煮る'], image: '🍜' },
  { id: 'noodle-ramen', name: '醤油ラーメン', category: 'meat', description: '自家製チャーシューと。', ingredients: [{ name: '中華麺', amountPerPerson: 1, unit: '玉' }], steps: ['スープを作る', '麺を茹でる'], image: '🍜' },
  { id: 'soup-minestrone', name: 'ミネストローネ', category: 'vegetable', description: 'トマトたっぷりのスープ。', ingredients: [{ name: 'トマト', amountPerPerson: 100, unit: 'g' }], steps: ['野菜を切る', '煮込む'], image: '🍅' },
];
