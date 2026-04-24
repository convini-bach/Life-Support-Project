import type { Metadata } from "next";
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
  return (
    <div className="recipe-app-root">
      <RecipeAppHeader />
      {children}
    </div>
  );
}
