import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work-Counsel | 働き方と人生のリズムを整える",
  description: "あなたの働き方を診断し、キャリアと人生のバランスを最適化する知恵を提供します。",
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{
      // @ts-ignore
      "--primary": "#8b5cf6",
      "--primary-glow": "rgba(139, 92, 246, 0.3)",
      "--secondary": "#7c3aed",
    }}>
      {children}
    </div>
  );
}
