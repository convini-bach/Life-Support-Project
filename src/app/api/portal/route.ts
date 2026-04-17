import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25.dahlia",
});

export async function POST() {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const stripeCustomerId = user.publicMetadata?.stripeCustomerId as string;

    if (!stripeCustomerId) {
      // If no customer ID, they can't manage anything
      return NextResponse.json({ 
        error: "Customer not found", 
        message: "まだ支払いが完了していないか、顧客情報が見つかりません。先にプランの購入をお願いします。" 
      }, { status: 400 });
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/profile`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("[STRIPE_PORTAL]", error);
    return NextResponse.json({ error: error.message || "Internal Error" }, { status: 500 });
  }
}
