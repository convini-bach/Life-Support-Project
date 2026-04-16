import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { clerkClient } from "@clerk/nextjs/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25.dahlia",
});

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    const clerkUserId = session.metadata?.clerkUserId;

    if (!clerkUserId) {
      return new NextResponse("Clerk User ID not found in metadata", { status: 400 });
    }

    // Update Clerk User Metadata
    const client = await clerkClient();
    await client.users.updateUserMetadata(clerkUserId, {
      publicMetadata: {
        isPremium: true,
      },
    });
  }

  // Handle subscription deletion or cancellation to reset premium status
  if (event.type === "customer.subscription.deleted") {
      // Note: For simplicity in this MVP, we are using session metadata for checkout.
      // For subscription deletion, we would need to find the user by Stripe Customer ID.
      // This part requires mapping Stripe Customer ID to Clerk User ID.
  }

  return new NextResponse(null, { status: 200 });
}
