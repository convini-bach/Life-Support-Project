import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hoken-Mirror | あなたの保険をミラーリング",
  description: "現在の保険を可視化し、リスクと将来の安心をプロの視点で映し出します。",
};

export default function HokenMirrorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{
      // @ts-ignore
      "--primary": "#1e40af",
      "--primary-glow": "rgba(30, 64, 175, 0.3)",
      "--secondary": "#1e3a8a",
    }}>
      {children}
    </div>
  );
}
