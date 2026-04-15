import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recipe-Cart | 栄養をカートに、楽しさを食卓に",
  description: "解析結果に基づいた最適なレシピ提案と、スマートな買い物リスト作成を支援します。",
};

export default function RecipeCartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{
      // @ts-ignore
      "--primary": "#f59e0b",
      "--primary-glow": "rgba(245, 158, 11, 0.3)",
      "--secondary": "#d97706",
    }}>
      {children}
    </div>
  );
}
