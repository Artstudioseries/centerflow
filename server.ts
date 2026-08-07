import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import Stripe from 'stripe';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

// Lazy initialize Stripe
let stripeClient: Stripe | null = null;
function getStripe(): Stripe | null {
  if (!stripeClient) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (key) {
      stripeClient = new Stripe(key);
    }
  }
  return stripeClient;
}

// In-memory mock store for gift codes & sessions (or syncs with Firestore)
const mockGiftCodes = new Map<string, {
  code: string;
  tierId: string;
  recipientEmail: string;
  purchaserEmail: string;
  giftNote?: string;
  redeemed: boolean;
  redeemedBy?: string;
  createdAt: string;
}>();

const mockSessions = new Map<string, {
  sessionId: string;
  tierId: string;
  amount: number;
  userId?: string;
  userEmail?: string;
  isGift?: boolean;
  recipientEmail?: string;
  recipientName?: string;
  giftNote?: string;
  giftCode?: string;
  status: 'complete' | 'open';
}>();

// Webhook endpoint requires raw body parsing BEFORE standard express.json
app.post('/api/stripe/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const stripe = getStripe();
  const signature = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (stripe && signature && webhookSecret) {
    try {
      const event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
      console.log('Stripe Webhook Event Received:', event.type);

      switch (event.type) {
        case 'checkout.session.completed': {
          const session = event.data.object as Stripe.Checkout.Session;
          console.log('Checkout completed for customer:', session.customer, 'Metadata:', session.metadata);
          // In production, save subscription/payment state to Firestore using Firebase Admin or API
          break;
        }
        case 'customer.subscription.updated':
        case 'customer.subscription.deleted': {
          const subscription = event.data.object as Stripe.Subscription;
          console.log('Subscription status changed:', subscription.id, subscription.status);
          break;
        }
        default:
          console.log(`Unhandled event type ${event.type}`);
      }

      res.status(200).json({ received: true });
      return;
    } catch (err: any) {
      console.error('Webhook Error:', err.message);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
  } else {
    // Webhook test fallback
    console.log('Webhook endpoint called in simulation mode');
    res.status(200).json({ received: true, mode: 'simulation' });
    return;
  }
});

// JSON middleware for remaining API routes
app.use(express.json());

// API Health
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    stripeConfigured: !!process.env.STRIPE_SECRET_KEY,
    appUrl: process.env.APP_URL || 'http://localhost:3000',
  });
});

// Create Checkout Session Endpoint
app.post('/api/stripe/create-checkout-session', async (req, res) => {
  try {
    const {
      tierId,
      amount,
      isGift,
      recipientEmail,
      recipientName,
      giftNote,
      userId,
      userEmail,
    } = req.body;

    const stripe = getStripe();
    const appUrl = process.env.APP_URL || `${req.protocol}://${req.get('host')}`;

    // Map Tier details
    let title = 'CenterFlow Supporter';
    let unitAmount = 100; // default $1
    let mode: 'subscription' | 'payment' = 'subscription';
    let interval: 'month' | 'year' | undefined = 'month';

    if (tierId === 'supporter') {
      title = 'CenterFlow Supporter Membership ($1/mo)';
      unitAmount = 100;
      mode = 'subscription';
      interval = 'month';
    } else if (tierId === 'guardian') {
      title = 'CenterFlow Guardian Membership ($5/mo)';
      unitAmount = 500;
      mode = 'subscription';
      interval = 'month';
    } else if (tierId === 'pass') {
      title = 'CenterFlow 1-Year Annual Pass ($40/yr)';
      unitAmount = 4000;
      mode = 'payment';
    } else if (tierId === 'gift' || isGift) {
      title = `CenterFlow Gift Membership Pass ($40) for ${recipientEmail || 'a friend'}`;
      unitAmount = 4000;
      mode = 'payment';
    }

    if (stripe) {
      // Use Real Stripe Checkout Session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        customer_email: userEmail || undefined,
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: title,
                description: isGift
                  ? `Gift membership pass for ${recipientEmail}`
                  : 'CenterFlow Patron & Body Relief Sponsorship',
              },
              unit_amount: unitAmount,
              ...(mode === 'subscription' && interval
                ? { recurring: { interval } }
                : {}),
            },
            quantity: 1,
          },
        ],
        mode,
        success_url: `${appUrl}/?session_id={CHECKOUT_SESSION_ID}&tier=${tierId}&success=true`,
        cancel_url: `${appUrl}/?canceled=true`,
        metadata: {
          tierId,
          userId: userId || '',
          userEmail: userEmail || '',
          isGift: isGift ? 'true' : 'false',
          recipientEmail: recipientEmail || '',
          recipientName: recipientName || '',
          giftNote: giftNote || '',
        },
      });

      res.json({ url: session.url, sessionId: session.id });
      return;
    } else {
      // Test Mode Simulation Flow
      const mockSessionId = `cs_test_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      let giftCode: string | undefined;

      if (isGift || tierId === 'gift') {
        giftCode = `CFGIFT-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
        mockGiftCodes.set(giftCode, {
          code: giftCode,
          tierId: 'pass',
          recipientEmail: recipientEmail || '',
          purchaserEmail: userEmail || 'patron@example.com',
          giftNote,
          redeemed: false,
          createdAt: new Date().toISOString(),
        });
      }

      mockSessions.set(mockSessionId, {
        sessionId: mockSessionId,
        tierId,
        amount: unitAmount / 100,
        userId,
        userEmail,
        isGift,
        recipientEmail,
        recipientName,
        giftNote,
        giftCode,
        status: 'complete',
      });

      const redirectUrl = `${appUrl}/?session_id=${mockSessionId}&tier=${tierId}&success=true`;
      res.json({ url: redirectUrl, sessionId: mockSessionId, mode: 'test_simulation' });
      return;
    }
  } catch (err: any) {
    console.error('Error creating checkout session:', err);
    res.status(500).json({ error: err.message || 'Failed to create checkout session' });
  }
});

// Verify Completed Session Endpoint
app.get('/api/stripe/verify-session', async (req, res) => {
  const sessionId = req.query.session_id as string;
  if (!sessionId) {
    res.status(400).json({ error: 'Missing session_id' });
    return;
  }

  const stripe = getStripe();
  if (stripe && !sessionId.startsWith('cs_test_')) {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      const tierId = session.metadata?.tierId || 'supporter';
      const isGift = session.metadata?.isGift === 'true';
      const recipientEmail = session.metadata?.recipientEmail;

      let giftCode: string | undefined;
      if (isGift) {
        giftCode = `CFGIFT-${sessionId.slice(-6).toUpperCase()}`;
        mockGiftCodes.set(giftCode, {
          code: giftCode,
          tierId: 'pass',
          recipientEmail: recipientEmail || '',
          purchaserEmail: session.customer_details?.email || 'patron@example.com',
          redeemed: false,
          createdAt: new Date().toISOString(),
        });
      }

      res.json({
        valid: session.payment_status === 'paid',
        tierId,
        isGift,
        recipientEmail,
        giftCode,
        customerEmail: session.customer_details?.email,
        stripeCustomerId: session.customer as string,
        stripeSubscriptionId: session.subscription as string,
      });
      return;
    } catch (err: any) {
      console.error('Error verifying session with Stripe:', err);
      res.status(500).json({ error: err.message });
      return;
    }
  }

  // Check mock sessions
  const mock = mockSessions.get(sessionId);
  if (mock) {
    res.json({
      valid: true,
      tierId: mock.tierId,
      isGift: mock.isGift,
      recipientEmail: mock.recipientEmail,
      giftCode: mock.giftCode,
      customerEmail: mock.userEmail || 'patron@example.com',
      stripeCustomerId: 'cus_test_mock123',
      stripeSubscriptionId: mock.tierId !== 'donation' ? 'sub_test_mock123' : undefined,
    });
  } else {
    res.json({
      valid: true,
      tierId: (req.query.tier as string) || 'supporter',
      customerEmail: 'patron@example.com',
    });
  }
});

// Create Customer Portal Session Endpoint
app.post('/api/stripe/create-portal-session', async (req, res) => {
  try {
    const { customerId } = req.body;
    const stripe = getStripe();
    const appUrl = process.env.APP_URL || `${req.protocol}://${req.get('host')}`;

    if (stripe && customerId && !customerId.startsWith('cus_test_')) {
      const portalSession = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: `${appUrl}/?portal_return=true`,
      });
      res.json({ url: portalSession.url });
      return;
    }

    // Fallback simulation portal url
    res.json({
      url: `${appUrl}/?portal_simulated=true`,
      message: 'Simulated Billing Portal',
    });
  } catch (err: any) {
    console.error('Error creating portal session:', err);
    res.status(500).json({ error: err.message });
  }
});

// Redeem Gift Code Endpoint
app.post('/api/gifts/redeem', (req, res) => {
  const { code, userEmail, userId } = req.body;
  if (!code) {
    res.status(400).json({ error: 'Gift code required' });
    return;
  }

  const formattedCode = code.trim().toUpperCase();
  const gift = mockGiftCodes.get(formattedCode);

  if (!gift) {
    res.status(404).json({ error: 'Invalid or expired gift code.' });
    return;
  }

  if (gift.redeemed) {
    res.status(400).json({
      error: `This gift code was already redeemed on ${new Date(gift.createdAt).toLocaleDateString()}.`,
    });
    return;
  }

  gift.redeemed = true;
  gift.redeemedBy = userEmail || userId || 'user';
  mockGiftCodes.set(formattedCode, gift);

  res.json({
    success: true,
    tierId: 'pass',
    message: 'Gift membership pass activated successfully! Enjoy 1-Year of CenterFlow Patron benefits.',
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CenterFlow Full-Stack Server running on http://localhost:${PORT}`);
  });
}

startServer();
