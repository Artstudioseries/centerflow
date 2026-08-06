import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import Stripe from 'stripe';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

// Configured Stripe Products & Price IDs
const STRIPE_PRICES = {
  donation: process.env.STRIPE_PRICE_DONATION || 'price_1U1AzfBravIwY4JjBpO4ebDS',
  supporter: process.env.STRIPE_PRICE_SUPPORTER_MONTHLY || 'price_1U1AziBravIwY4Jj3KbXGnuS',
  guardian: process.env.STRIPE_PRICE_GUARDIAN_MONTHLY || 'price_1U1AzlBravIwY4JjDTC8YQun',
  pass: process.env.STRIPE_PRICE_ANNUAL_PASS || 'price_1U1AzoBravIwY4JjNc3lm5Vl',
  gift: process.env.STRIPE_PRICE_GIFT || 'price_1U1AzrBravIwY4Jjz7fG5lyP',
};

const STRIPE_PRODUCTS = {
  donation: process.env.STRIPE_PRODUCT_DONATION || 'prod_V1DQHkqH7pK4Qj',
  supporter: process.env.STRIPE_PRODUCT_SUPPORTER || 'prod_V1DQNhWNlUFHxd',
  guardian: process.env.STRIPE_PRODUCT_GUARDIAN || 'prod_V1DQNhWNlUFHxd',
  pass: process.env.STRIPE_PRODUCT_ANNUAL_PASS || 'prod_V1DQ9UTdBkTBtl',
  gift: process.env.STRIPE_PRODUCT_GIFT || 'prod_V1DQ51MuvgZOhi',
};

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

// User Membership Account Interface
export interface ServerUserAccount {
  userId: string;
  email: string;
  patronTier: 'friend' | 'supporter' | 'guardian' | null;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  stripeProductId?: string;
  stripePriceId?: string;
  paymentStatus: 'paid' | 'unpaid' | 'failed' | 'canceled' | 'pending' | 'none';
  membershipStatus: 'active' | 'canceled' | 'past_due' | 'unpaid' | 'gift_active' | 'expired' | 'friend' | 'none';
  membershipExpiresAt?: string;
  purchasedGiftCode?: string;
  redeemedGiftCode?: string;
  updatedAt: string;
}

// In-memory backend user accounts database
const userAccountsMap = new Map<string, ServerUserAccount>();

// Helper to look up or initialize user account
function getUserAccount(identifier: string, email?: string): ServerUserAccount {
  const key = identifier.toLowerCase();
  let account = userAccountsMap.get(key);
  if (!account) {
    account = {
      userId: identifier,
      email: email || identifier,
      patronTier: 'friend',
      paymentStatus: 'none',
      membershipStatus: 'friend',
      updatedAt: new Date().toISOString(),
    };
    userAccountsMap.set(key, account);
  }
  return account;
}

// Helper to update user account status by email or ID
function updateUserAccount(
  identifier: string,
  updates: Partial<ServerUserAccount>
): ServerUserAccount {
  const account = getUserAccount(identifier);
  Object.assign(account, updates, { updatedAt: new Date().toISOString() });
  userAccountsMap.set(identifier.toLowerCase(), account);
  if (account.email) {
    userAccountsMap.set(account.email.toLowerCase(), account);
  }
  if (account.stripeCustomerId) {
    userAccountsMap.set(account.stripeCustomerId.toLowerCase(), account);
  }
  if (account.stripeSubscriptionId) {
    userAccountsMap.set(account.stripeSubscriptionId.toLowerCase(), account);
  }
  return account;
}

// Gift codes store
export interface GiftRecord {
  code: string;
  tierId: string;
  recipientEmail: string;
  recipientName?: string;
  purchaserEmail: string;
  purchaserUserId?: string;
  giftNote?: string;
  redeemed: boolean;
  redeemedBy?: string;
  redeemedAt?: string;
  createdAt: string;
}

const mockGiftCodes = new Map<string, GiftRecord>();

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

// Helper to calculate membership expiration date
function calculateExpirationDate(tierId: string): string {
  const d = new Date();
  if (tierId === 'pass' || tierId === 'gift') {
    d.setFullYear(d.getFullYear() + 1);
  } else if (tierId === 'supporter' || tierId === 'guardian') {
    d.setMonth(d.getMonth() + 1);
  } else {
    d.setDate(d.getDate() + 30);
  }
  return d.toISOString();
}

// Process Stripe Webhook / Event Logic
async function handleWebhookEvent(event: Stripe.Event) {
  console.log('Processing Webhook Event:', event.type);

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const tierId = session.metadata?.tierId || 'supporter';
      const isGift = session.metadata?.isGift === 'true' || tierId === 'gift';
      const userId = session.metadata?.userId;
      const userEmail = session.customer_details?.email || session.metadata?.userEmail;
      const recipientEmail = session.metadata?.recipientEmail;
      const recipientName = session.metadata?.recipientName;
      const giftNote = session.metadata?.giftNote;

      const customerId = typeof session.customer === 'string' ? session.customer : session.customer?.id;
      const subscriptionId = typeof session.subscription === 'string' ? session.subscription : session.subscription?.id;

      if (isGift) {
        // Generate single-use gift code
        const giftCode = `CFGIFT-${session.id.slice(-6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
        const giftRecord: GiftRecord = {
          code: giftCode,
          tierId: 'pass',
          recipientEmail: recipientEmail || '',
          recipientName: recipientName || '',
          purchaserEmail: userEmail || 'patron@centerflow.app',
          purchaserUserId: userId,
          giftNote,
          redeemed: false,
          createdAt: new Date().toISOString(),
        };
        mockGiftCodes.set(giftCode, giftRecord);
        console.log(`Generated gift pass ${giftCode} for recipient ${recipientEmail}`);

        if (userEmail) {
          updateUserAccount(userEmail, {
            stripeCustomerId: customerId,
            purchasedGiftCode: giftCode,
            paymentStatus: 'paid',
          });
        }
      } else {
        // Direct Patron membership purchase confirmed by Webhook
        const targetIdentifier = userId || userEmail;
        if (targetIdentifier) {
          const expiration = calculateExpirationDate(tierId);
          const permissionTier = (tierId === 'pass' || tierId === 'gift') ? 'guardian' : tierId;
          updateUserAccount(targetIdentifier, {
            email: userEmail,
            patronTier: permissionTier as any,
            stripeCustomerId: customerId,
            stripeSubscriptionId: subscriptionId,
            stripeProductId: (STRIPE_PRODUCTS as any)[tierId],
            stripePriceId: (STRIPE_PRICES as any)[tierId],
            paymentStatus: 'paid',
            membershipStatus: 'active',
            membershipExpiresAt: expiration,
          });
          console.log(`Activated membership status 'active' for user ${targetIdentifier} (Permission: ${permissionTier}, Billing: ${tierId})`);
        }
      }
      break;
    }

    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = typeof subscription.customer === 'string' ? subscription.customer : subscription.customer?.id;
      const status = subscription.status; // active, past_due, unpaid, canceled

      let membershipStatus: ServerUserAccount['membershipStatus'] = 'active';
      if (status === 'past_due' || status === 'unpaid') {
        membershipStatus = 'past_due';
      } else if (status === 'canceled') {
        membershipStatus = 'friend';
      }

      if (customerId) {
        updateUserAccount(customerId, {
          stripeSubscriptionId: subscription.id,
          membershipStatus,
          ...(status === 'canceled' ? { patronTier: 'friend' } : {}),
        });
        console.log(`Updated subscription ${subscription.id} status to ${membershipStatus}`);
      }
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = typeof subscription.customer === 'string' ? subscription.customer : subscription.customer?.id;

      if (customerId) {
        // Automatically revert canceled/deleted subscription to Friend free membership
        updateUserAccount(customerId, {
          patronTier: 'friend',
          membershipStatus: 'friend',
          paymentStatus: 'canceled',
        });
        console.log(`Canceled subscription ${subscription.id} for customer ${customerId}. Reverted account to CenterFlow Friend tier.`);
      }
      break;
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice;
      const customerId = typeof invoice.customer === 'string' ? invoice.customer : invoice.customer?.id;

      if (customerId) {
        updateUserAccount(customerId, {
          paymentStatus: 'failed',
          membershipStatus: 'past_due',
        });
        console.log(`Payment failed for invoice ${invoice.id}, updated customer ${customerId} status to past_due`);
      }
      break;
    }

    default:
      console.log(`Unhandled webhook event type: ${event.type}`);
  }
}

// Webhook endpoint requires raw body parsing BEFORE standard express.json
app.post('/api/stripe/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const stripe = getStripe();
  const signature = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (stripe && signature && webhookSecret && webhookSecret !== 'whsec_test_mock') {
    try {
      const event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
      await handleWebhookEvent(event);
      res.status(200).json({ received: true });
      return;
    } catch (err: any) {
      console.error('Webhook Error:', err.message);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
  } else {
    // Webhook simulation / test mode fallback
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      if (body && body.type) {
        await handleWebhookEvent(body as Stripe.Event);
        res.status(200).json({ received: true, mode: 'simulation' });
        return;
      }
    } catch (e) {
      // payload not JSON format
    }
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
    prices: STRIPE_PRICES,
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

    const effectiveTierId = isGift ? 'gift' : tierId;
    let mode: 'subscription' | 'payment' = 'subscription';
    let priceId: string = (STRIPE_PRICES as any)[effectiveTierId] || STRIPE_PRICES.supporter;

    if (effectiveTierId === 'donation') {
      mode = 'payment';
    } else if (effectiveTierId === 'pass' || effectiveTierId === 'gift') {
      mode = effectiveTierId === 'pass' ? 'subscription' : 'payment';
    }

    if (stripe) {
      try {
        let lineItem: any;
        if (effectiveTierId === 'donation') {
          const customValue = Math.max(1, Number(amount) || 5);
          lineItem = {
            price_data: {
              currency: 'usd',
              product: STRIPE_PRODUCTS.donation,
              unit_amount: customValue * 100,
            },
            quantity: 1,
          };
        } else {
          lineItem = {
            price: priceId,
            quantity: 1,
          };
        }

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          customer_email: userEmail || undefined,
          line_items: [lineItem],
          mode,
          success_url: `${appUrl}/?session_id={CHECKOUT_SESSION_ID}&tier=${tierId}&success=true`,
          cancel_url: `${appUrl}/?canceled=true`,
          metadata: {
            tierId: effectiveTierId,
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
      } catch (stripeErr: any) {
        console.warn('Stripe checkout API error (falling back to simulation mode):', stripeErr.message);
      }
    }

    // Test Mode Simulation Flow
    const mockSessionId = `cs_test_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    let giftCode: string | undefined;

    if (isGift || effectiveTierId === 'gift') {
      giftCode = `CFGIFT-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
      mockGiftCodes.set(giftCode, {
        code: giftCode,
        tierId: 'pass',
        recipientEmail: recipientEmail || '',
        recipientName: recipientName || '',
        purchaserEmail: userEmail || 'patron@example.com',
        purchaserUserId: userId,
        giftNote,
        redeemed: false,
        createdAt: new Date().toISOString(),
      });
    }

    mockSessions.set(mockSessionId, {
      sessionId: mockSessionId,
      tierId: effectiveTierId,
      amount: Number(amount) || 5,
      userId,
      userEmail,
      isGift,
      recipientEmail,
      recipientName,
      giftNote,
      giftCode,
      status: 'complete',
    });

    // Simulate webhook completion to activate membership or gift
    await handleWebhookEvent({
      id: `evt_sim_${Date.now()}`,
      object: 'event',
      type: 'checkout.session.completed',
      created: Math.floor(Date.now() / 1000),
      livemode: false,
      api_version: '2026-06-24',
      pending_webhooks: 0,
      request: null,
      data: {
        object: {
          id: mockSessionId,
          object: 'checkout.session',
          customer: `cus_sim_${Date.now()}`,
          subscription: mode === 'subscription' ? `sub_sim_${Date.now()}` : null,
          customer_details: { email: userEmail || 'patron@example.com' },
          metadata: {
            tierId: effectiveTierId,
            userId: userId || '',
            userEmail: userEmail || '',
            isGift: isGift ? 'true' : 'false',
            recipientEmail: recipientEmail || '',
            recipientName: recipientName || '',
            giftNote: giftNote || '',
          },
        } as any,
      },
    } as any);

    const redirectUrl = `${appUrl}/?session_id=${mockSessionId}&tier=${tierId}&success=true`;
    res.json({ url: redirectUrl, sessionId: mockSessionId, mode: 'test_simulation' });
    return;
  } catch (err: any) {
    console.error('Error creating checkout session:', err);
    res.status(500).json({ error: err.message || 'Failed to create checkout session' });
  }
});

// Verify Session & Sync Membership Endpoint
app.get('/api/stripe/verify-session', async (req, res) => {
  const sessionId = req.query.session_id as string;
  const userIdentifier = (req.query.user_id as string) || (req.query.email as string);

  if (!sessionId) {
    res.status(400).json({ error: 'Missing session_id' });
    return;
  }

  const stripe = getStripe();
  if (stripe && !sessionId.startsWith('cs_test_')) {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      const tierId = session.metadata?.tierId || 'supporter';
      const isGift = session.metadata?.isGift === 'true' || tierId === 'gift';
      const recipientEmail = session.metadata?.recipientEmail;
      const userEmail = session.customer_details?.email || session.metadata?.userEmail;

      let giftCode: string | undefined;
      if (isGift) {
        const found = Array.from(mockGiftCodes.values()).find(
          (g) => g.purchaserEmail === userEmail || g.recipientEmail === recipientEmail
        );
        giftCode = found ? found.code : `CFGIFT-${sessionId.slice(-6).toUpperCase()}`;
      }

      // Check if Webhook updated user status
      const account = userAccountsMap.get((userIdentifier || userEmail || '').toLowerCase());

      res.json({
        valid: session.payment_status === 'paid',
        tierId,
        isGift,
        recipientEmail,
        giftCode,
        customerEmail: userEmail,
        stripeCustomerId: session.customer as string,
        stripeSubscriptionId: session.subscription as string,
        membershipStatus: account?.membershipStatus || (session.payment_status === 'paid' ? 'active' : 'friend'),
      });
      return;
    } catch (err: any) {
      console.error('Error verifying session with Stripe:', err);
      res.status(500).json({ error: err.message });
      return;
    }
  }

  // Simulation Session lookup
  const mock = mockSessions.get(sessionId);
  const userKey = (userIdentifier || mock?.userEmail || 'patron@example.com').toLowerCase();
  const account = userAccountsMap.get(userKey);

  res.json({
    valid: true,
    tierId: mock?.tierId || (req.query.tier as string) || 'supporter',
    isGift: mock?.isGift,
    recipientEmail: mock?.recipientEmail,
    giftCode: mock?.giftCode,
    customerEmail: mock?.userEmail || 'patron@example.com',
    stripeCustomerId: account?.stripeCustomerId || 'cus_test_mock123',
    stripeSubscriptionId: account?.stripeSubscriptionId || 'sub_test_mock123',
    membershipStatus: account?.membershipStatus || 'active',
  });
});

// Fetch Server Verified User Membership Endpoint
app.get('/api/user/membership', (req, res) => {
  const identifier = (req.query.userId as string) || (req.query.email as string);
  if (!identifier) {
    res.status(400).json({ error: 'Missing userId or email query parameter' });
    return;
  }

  const account = getUserAccount(identifier);
  res.json(account);
});

// Create Stripe Customer Portal Session Endpoint
app.post('/api/stripe/create-portal-session', async (req, res) => {
  try {
    const { customerId } = req.body;
    const stripe = getStripe();
    const appUrl = process.env.APP_URL || `${req.protocol}://${req.get('host')}`;

    if (stripe && customerId && !customerId.startsWith('cus_test_') && !customerId.startsWith('cus_sim_') && !customerId.startsWith('cus_checkup')) {
      try {
        const portalSession = await stripe.billingPortal.sessions.create({
          customer: customerId,
          return_url: `${appUrl}/?portal_return=true`,
        });
        res.json({ url: portalSession.url });
        return;
      } catch (portalErr: any) {
        console.warn('Billing portal API warning (falling back to simulation mode):', portalErr.message);
      }
    }

    // Simulated Billing Portal Endpoint for testing mode
    res.json({
      url: `${appUrl}/?portal_simulated=true`,
      message: 'Simulated Stripe Billing Portal session active.',
    });
  } catch (err: any) {
    console.error('Error creating portal session:', err);
    res.status(500).json({ error: err.message });
  }
});

// Redeem Gift Code Endpoint with Single-Redemption Protection
app.post('/api/gifts/redeem', (req, res) => {
  const { code, userEmail, userId } = req.body;
  if (!code) {
    res.status(400).json({ error: 'Gift code required.' });
    return;
  }

  if (!userEmail && !userId) {
    res.status(400).json({ error: 'User account sign-in required to redeem gift pass.' });
    return;
  }

  const formattedCode = code.trim().toUpperCase();
  const gift = mockGiftCodes.get(formattedCode);

  if (!gift) {
    res.status(404).json({ error: 'Invalid or expired gift code. Please check and try again.' });
    return;
  }

  if (gift.redeemed) {
    res.status(400).json({
      error: `This gift membership pass was already redeemed by ${gift.redeemedBy || 'another user'}. Each gift code can only be redeemed once.`,
    });
    return;
  }

  const targetIdentifier = userId || userEmail;
  const expiration = calculateExpirationDate('pass');

  // Lock gift code redemption
  gift.redeemed = true;
  gift.redeemedBy = userEmail || userId;
  gift.redeemedAt = new Date().toISOString();
  mockGiftCodes.set(formattedCode, gift);

  // Activate 1-Year Pass Membership on Recipient Account
  updateUserAccount(targetIdentifier, {
    email: userEmail,
    patronTier: 'guardian',
    paymentStatus: 'paid',
    membershipStatus: 'gift_active',
    membershipExpiresAt: expiration,
    redeemedGiftCode: formattedCode,
  });

  console.log(`Gift pass ${formattedCode} redeemed by ${targetIdentifier}. 1-Year Pass activated.`);

  res.json({
    success: true,
    tierId: 'pass',
    membershipStatus: 'gift_active',
    membershipExpiresAt: expiration,
    message: 'Gift membership pass activated successfully! Enjoy 1-Year of full CenterFlow Patron access and badge benefits.',
  });
});

// Simulation Webhook Event Endpoint for Automated Test Scripts
app.post('/api/stripe/simulate-webhook', async (req, res) => {
  try {
    const event = req.body;
    await handleWebhookEvent(event);
    res.json({ success: true, eventProcessed: event.type });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
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
