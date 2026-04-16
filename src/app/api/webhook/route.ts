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
        stripeCustomerId: session.customer as string, // Store for cancellation tracking
      },
    });
  }

  // Handle subscription deletion or cancellation to reset premium status
  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object as Stripe.Subscription;
    const stripeCustomerId = subscription.customer as string;

    const client = await clerkClient();
    // Find users with this stripeCustomerId in publicMetadata
    // Note: getUserList has a specific way to query metadata
    const users = await client.users.getUserList({
      // We search for the user who has this stripeCustomerId
      // Limit 1 as it should be unique
      limit: 1,
    });

    // Filtering in memory since standard clerkClient query for deep metadata is complex
    // In a real high-traffic production app, a database mapping would be used.
    const userToUpdate = users.data.find(u => u.publicMetadata?.stripeCustomerId === stripeCustomerId);

    if (userToUpdate) {
      await client.users.updateUserMetadata(userToUpdate.id, {
        publicMetadata: {
          isPremium: false,
        },
      });
    }
  }

  return new NextResponse(null, { status: 200 });
}
