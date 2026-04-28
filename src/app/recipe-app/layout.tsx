import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RecipeAppHeader from "@/components/recipe-app/Header";

export const metadata: Metadata = {
  title: "スマート・キッチン | 冷蔵庫管理 & 献立提案",
  description: "AIがあなたの冷蔵庫を管理し、最適な献立を提案します。",
};

export default function RecipeAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 公開確認完了のため、一時的にアクセス制限（404）
  if (process.env.NODE_ENV === 'production') {
    notFound();
  }

  return (
    <div className="recipe-app-root">
      <RecipeAppHeader />
      {children}
    </div>
  );
}
