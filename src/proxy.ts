import { clerkMiddleware } from "@clerk/nextjs/server";

// Next.js 16.2.3 では Proxy は Node.js ランタイム固定のため runtime 指定は不要（禁止されています）
// デフォルトエクスポートとして Clerk ミドルウェアを公開
export default clerkMiddleware();

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
