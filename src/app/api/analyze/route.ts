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

/**
 * リトライ処理を行うヘルパー関数 (指数バックオフ)
 */
async function withRetry<T>(fn: () => Promise<T>, retries = 2, delay = 1000): Promise<T> {
  try {
    return await fn();
  } catch (error: any) {
    const status = error.status || (error.message?.includes("503") ? 503 : error.message?.includes("429") ? 429 : 0);
    const isRetryable = status === 503 || status === 429 || error.message?.includes("Service Unavailable") || error.message?.includes("exhausted");

    if (retries > 0 && isRetryable) {
      console.log(`[API Retry] detected retryable error (${status}). Retrying in ${delay}ms... (${retries} left)`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return withRetry(fn, retries - 1, delay * 2);
    }
    throw error;
  }
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

    const counts = privateMetadata.dailyUsageCounts || {};
    const lastDate = privateMetadata.lastUsageDate || "";
    const currentCount = (lastDate === today) ? (counts[appId] || 0) : 0;
    const limit = LIMITS[appId] || LIMITS['default'];

    if (currentCount >= limit) {
      return new NextResponse(`Daily safety limit reached for ${appId} (${limit} requests/day). Please try again tomorrow.`, { status: 429 });
    }
    // --- 上限チェック終了 ---

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: selectedModel || "gemini-1.5-flash" });

    const result = await withRetry(async () => {
      if (mode === "image" && image) {
        const base64Data = image.split(",")[1];
        return await model.generateContent([
          prompt,
          { inlineData: { data: base64Data, mimeType: "image/jpeg" } }
        ]);
      } else {
        return await model.generateContent(prompt);
      }
    });

    const response = await result.response;
    const text = response.text();

    // --- 解析成功後、カウントを更新 ---
    const updatedCounts = (lastDate === today) 
      ? { ...counts, [appId]: currentCount + 1 }
      : { [appId]: 1 };

    await client.users.updateUserMetadata(userId, {
      privateMetadata: {
        dailyUsageCounts: updatedCounts,
        lastUsageDate: today
      }
    });

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("Analysis API Error:", error);
    return new NextResponse(`Internal Server Error: ${error.message}`, { status: 500 });
  }
}
