import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25.dahlia", // 期待されている最新バージョンに更新
});

export async function POST(req: Request) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { plan } = await req.json();
    const isDevMode = plan === "devmode";

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: isDevMode ? "payment" : "subscription",
      customer_email: user.emailAddresses[0].emailAddress,
      line_items: [
        {
          price: isDevMode ? process.env.STRIPE_DEV_MODE_PRICE_ID : process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/profile?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/profile?canceled=true`,
      metadata: {
        clerkUserId: user.id,
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error: any) {
    console.error("[STRIPE_CHECKOUT]", error);
    return NextResponse.json({ error: error.message || "Internal Error" }, { status: 500 });
  }
}
