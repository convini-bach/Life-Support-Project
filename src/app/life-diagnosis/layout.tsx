import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Life Diagnosis | 未来への問いかけ診断",
  description: "健康・家計・ライフプランを統合的に診断し、未来への問いかけを行います。",
};

export default function LifeDiagnosisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{
      // @ts-ignore
      "--primary": "#3b82f6",
      "--primary-glow": "rgba(59, 130, 246, 0.3)",
      "--secondary": "#2563eb",
    }}>
      {children}
    </div>
  );
}
