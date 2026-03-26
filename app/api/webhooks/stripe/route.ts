import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import prisma from '@/lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-03-25.dahlia',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;

        // Create order in database
        if (session.metadata?.restaurantId && session.customer_details?.email) {
          const user = await prisma.user.findUnique({
            where: { email: session.customer_details.email }
          });

          if (user) {
            await prisma.order.create({
              data: {
                stripeSessionId: session.id,
                customerId: user.id,
                restaurantId: parseInt(session.metadata.restaurantId),
                total: parseFloat(session.metadata.orderTotal || '0'),
                status: 'completed',
                paymentStatus: 'paid',
                items: JSON.parse(session.metadata.cartItems || '[]'),
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            });
          }
        }
        break;

      case 'checkout.session.expired':
        // Handle expired session if needed
        console.log('Checkout session expired:', event.data.object.id);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
