import { clerkMiddleware } from "@clerk/nextjs/server";

// Next.js 15.5.15 では 'experimental-edge' を明示
export const runtime = 'experimental-edge';

export default clerkMiddleware();

export const config = {
  matcher: [
    // Next.js の内部パスや、拡張子を持つ静的ファイルを除外
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // API ルート常時実行
    '/(api|trpc)(.*)',
  ],
};
