import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const LIMITS: Record<string, number> = {
  'nutri-vision': 10,
  'recipe-cart': 5,
  'default': 3
};
/**
 * 日本時間 (JST) の日付文字列を取得する (YYYY-MM-DD)
 * ガイドラインに従い、個別の要素を取得して組み立てる
 */
function getJstDateString() {
  const now = new Date();
  // サーバーがUTCの場合を考慮し、JST (+9h) に調整
  const jstOffset = 9 * 60 * 60 * 1000;
  const jstDate = new Date(now.getTime() + jstOffset);
  
  const y = jstDate.getUTCFullYear();
  const m = String(jstDate.getUTCMonth() + 1).padStart(2, '0');
  const d = String(jstDate.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // 環境変数からAPIキーを取得
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return new NextResponse("Server configuration error: GEMINI_API_KEY is missing", { status: 500 });
    }

    const { mode, prompt, image, model: selectedModel, appId = 'default' } = await req.json();

    // ユーザー情報の取得
    const client = await clerkClient();
    const user = await client.users.getUser(userId);

    // --- 利用上限のチェック (アプリ別) ---
    const today = getJstDateString();
    const privateMetadata = user.privateMetadata as { 
      dailyUsageCounts?: Record<string, number>; 
      lastUsageDate?: string;
    };

    let counts = privateMetadata.dailyUsageCounts || {};
    const lastDate = privateMetadata.lastUsageDate || "";

    if (lastDate === today) {
      const currentCount = counts[appId] || 0;
      const limit = LIMITS[appId] || LIMITS['default'];
      
      if (currentCount >= limit) {
        return new NextResponse(`Daily safety limit reached for ${appId} (${limit} requests/day). Please try again tomorrow.`, { status: 429 });
      }
      counts[appId] = currentCount + 1;
    } else {
      counts = { [appId]: 1 };
    }

    // メタデータの更新
    await client.users.updateUserMetadata(userId, {
      privateMetadata: {
        dailyUsageCounts: counts,
        lastUsageDate: today
      }
    });
    // --- 上限チェック終了 ---

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: selectedModel || "gemini-2.5-flash" });

    let result;
    if (mode === "image" && image) {
      const base64Data = image.split(",")[1];
      result = await model.generateContent([
        prompt,
        { inlineData: { data: base64Data, mimeType: "image/jpeg" } }
      ]);
    } else {
      result = await model.generateContent(prompt);
    }

    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("Analysis API Error:", error);
    return new NextResponse(`Internal Server Error: ${error.message}`, { status: 500 });
  }
}
