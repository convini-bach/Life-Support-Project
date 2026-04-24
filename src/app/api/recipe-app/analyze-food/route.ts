import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { foods } = await req.json();
    // 前後の空白や改行を確実に除去
    const apiKey = process.env.GEMINI_API_KEY?.trim();

    if (!apiKey) {
      return NextResponse.json({ error: "API Key is missing" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
      以下の食材リストを解析し、JSON配列で回答してください。
      リスト: ${foods.map((f: any) => f.name).join(', ')}
      形式: [{"id":"ID", "days":数字, "category":"main|vegetable|stock|other", "advice":"文字"}]
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
    console.error("Detailed API Error:", error);
    return NextResponse.json({ 
      error: "Analysis failed", 
      message: error.message 
    }, { status: 500 });
  }
}
