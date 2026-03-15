import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const PRICE_MAP: Record<string, string> = {
  founders: process.env.STRIPE_FOUNDERS_PRICE_ID || "price_founders",
  founders_featured: process.env.STRIPE_FOUNDERS_FEATURED_PRICE_ID || "price_founders_featured",
  enterprise: process.env.STRIPE_ENTERPRISE_PRICE_ID || "price_enterprise",
};

export async function POST(request: NextRequest) {
  try {
    const { tier, userId, email } = await request.json();

    if (!tier || !PRICE_MAP[tier]) {
      return NextResponse.json(
        { error: "Invalid subscription tier" },
        { status: 400 }
      );
    }

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      return NextResponse.json(
        { error: "Stripe is not configured" },
        { status: 503 }
      );
    }

    const stripe = new Stripe(stripeSecretKey, { apiVersion: "2026-02-25.clover" });

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [
        {
          price: PRICE_MAP[tier],
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard?checkout=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/pricing?checkout=cancelled`,
      metadata: {
        userId,
        tier,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
