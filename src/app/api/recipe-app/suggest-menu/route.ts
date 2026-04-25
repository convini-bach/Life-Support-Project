import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { items } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY?.trim();

    if (!apiKey) {
      return NextResponse.json({ error: "API Key is missing" }, { status: 500 });
    }

    // 賞味期限が近い順にソートして、上位5つを重点的に使用するように指示
    const urgentItems = items
      .sort((a: any, b: any) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime())
      .slice(0, 5)
      .map((i: any) => i.name)
      .join(', ');

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
      あなたは一流の料理研究家です。キッコーマンや「おいしい健康」のような、栄養バランスが良く、誰でも失敗なく作れる「監修レシピ」を提案してください。
      
      特に以下の「賞味期限が近い食材」を優先的に使い切る献立を3つ提案してください。
      優先食材: ${urgentItems}
      その他の在庫: ${items.map((i: any) => i.name).join(', ')}
      
      回答は以下のJSON配列形式のみで出力してください（Markdownの装飾は不要）。
      [
        {
          "id": "一意の文字列",
          "name": "料理名",
          "description": "料理の魅力と、なぜこの食材の組み合わせなのかの説明（200文字以内）",
          "ingredients": [
            {"name": "食材名", "amountPerPerson": 数値, "unit": "g|本|個|mlなど"}
          ],
          "steps": [
            "調理手順1（100文字以内）",
            "調理手順2..."
          ],
          "url": "公式レシピサイトのURL（例: キッコーマンの検索結果ページ等）",
          "image": "料理を表す絵文字1つ",
          "source": "キッコーマン ホームクッキング（参考）"
        }
      ]
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    
    if (!jsonMatch) {
      return NextResponse.json({ error: "Invalid AI response", text }, { status: 500 });
    }

    return NextResponse.json(JSON.parse(jsonMatch[0]));
  } catch (error: any) {
    console.error("Menu Suggestion Error:", error);
    return NextResponse.json({ 
      error: "Suggestion failed", 
      message: error.message 
    }, { status: 500 });
  }
}
