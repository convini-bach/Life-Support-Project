import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

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

    const { mode, prompt, image, model: selectedModel } = await req.json();

    // ユーザー属性の確認 (Premiumかどうか)
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const isPremium = !!user.publicMetadata?.isPremium;

    // TODO: ここで無料ユーザーの回数制限をDB等で逆算するロジック（オプション）
    // 現状はクライアント側での LocalStorage 制限を優先し、サーバーは実行のみ担当

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
