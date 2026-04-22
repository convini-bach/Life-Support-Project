import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nutri-Vision | AI食事解析・伴走支援",
  description: "写真を撮るだけでAIが食事を解析し、あなたの身体を伴走支援します。",
};

export default function NutriVisionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{
      // @ts-ignore
      "--primary": "#10b981",
      "--primary-glow": "rgba(16, 185, 129, 0.3)",
      "--secondary": "#059669",
    }}>
      {children}
    </div>
  );
}
