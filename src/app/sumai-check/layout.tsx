import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sumai-Check | 居住コストと資産価値の最適化",
  description: "現在の住まいのコストを診断し、ライフプランに最適な居住戦略を提案します。",
};

export default function SumaiLayout({
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
