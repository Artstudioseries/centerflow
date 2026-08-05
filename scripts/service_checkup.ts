import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'http://localhost:3000';

async function performServiceCheckup() {
  console.log('====================================================');
  console.log('   CENTERFLOW GENERAL APP SERVICE HEALTH CHECKUP   ');
  console.log('====================================================\n');

  let passedChecks = 0;
  let totalChecks = 0;

  function logCheck(name: string, success: boolean, details?: string) {
    totalChecks++;
    if (success) {
      passedChecks++;
      console.log(`✅ [PASS] ${name}${details ? `: ${details}` : ''}`);
    } else {
      console.log(`❌ [FAIL] ${name}${details ? `: ${details}` : ''}`);
    }
  }

  // Check 1: Server Connectivity & /api/health
  try {
    const res = await fetch(`${BASE_URL}/api/health`);
    const data: any = await res.json();
    logCheck('Express Server API Health', res.ok && data.status === 'ok', `Stripe configured: ${data.stripeConfigured}`);
  } catch (err: any) {
    logCheck('Express Server API Health', false, err.message);
  }

  // Check 2: Master Muscle Library Data Integrity
  try {
    const libraryPath = path.join(process.cwd(), 'master_muscle_library.json');
    const rawData = fs.readFileSync(libraryPath, 'utf-8');
    const library = JSON.parse(rawData);
    const valid = library.exercises && library.muscles && library.muscles.length > 0;
    logCheck(
      'Master Muscle Library Data',
      valid,
      `Loaded ${library.muscles?.length || 0} muscles and ${library.exercises?.length || 0} exercises`
    );
  } catch (err: any) {
    logCheck('Master Muscle Library Data', false, err.message);
  }

  // Check 3: Firebase Config Integrity
  try {
    const configPath = path.join(process.cwd(), 'firebase-applet-config.json');
    const rawConfig = fs.readFileSync(configPath, 'utf-8');
    const config = JSON.parse(rawConfig);
    const valid = config.projectId && config.apiKey && config.firestoreDatabaseId;
    logCheck('Firebase Configuration', !!valid, `Project ID: ${config.projectId}`);
  } catch (err: any) {
    logCheck('Firebase Configuration', false, err.message);
  }

  // Check 4: Patron Checkout Session API ($1 Supporter Tier)
  try {
    const res = await fetch(`${BASE_URL}/api/stripe/create-checkout-session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tierId: 'supporter',
        amount: 1,
        userId: 'checkup_user_1',
        userEmail: 'checkup@example.com',
      }),
    });
    const data: any = await res.json();
    logCheck('Patron Stripe Checkout Session API', res.ok && !!data.url, `Session ID: ${data.sessionId}`);
  } catch (err: any) {
    logCheck('Patron Stripe Checkout Session API', false, err.message);
  }

  // Check 5: Gift Membership Creation & Single-Use Lock API
  try {
    const giftRes = await fetch(`${BASE_URL}/api/stripe/create-checkout-session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tierId: 'gift',
        isGift: true,
        amount: 40,
        recipientEmail: 'gift_checkup@example.com',
        userEmail: 'purchaser_checkup@example.com',
      }),
    });
    const giftData: any = await giftRes.json();
    const verifyRes = await fetch(`${BASE_URL}/api/stripe/verify-session?session_id=${giftData.sessionId}`);
    const verifyData: any = await verifyRes.json();
    const giftCode = verifyData.giftCode;

    // Redeem gift code
    const redeemRes = await fetch(`${BASE_URL}/api/gifts/redeem`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code: giftCode,
        userEmail: 'gift_checkup@example.com',
        userId: 'recipient_checkup_id',
      }),
    });
    const redeemData: any = await redeemRes.json();
    logCheck('Gift Pass Creation & Redemption Flow', redeemRes.ok && redeemData.success, `Code: ${giftCode}`);
  } catch (err: any) {
    logCheck('Gift Pass Creation & Redemption Flow', false, err.message);
  }

  // Check 6: Webhook Simulation & Membership State Update API
  try {
    const simRes = await fetch(`${BASE_URL}/api/stripe/simulate-webhook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: 'evt_checkup',
        object: 'event',
        type: 'checkout.session.completed',
        data: {
          object: {
            id: 'cs_checkup',
            object: 'checkout.session',
            customer: 'cus_checkup',
            subscription: 'sub_checkup',
            customer_details: { email: 'checkup_member@example.com' },
            metadata: {
              tierId: 'guardian',
              userId: 'user_checkup_guardian',
              userEmail: 'checkup_member@example.com',
              isGift: 'false',
            },
          },
        },
      }),
    });

    const memRes = await fetch(`${BASE_URL}/api/user/membership?userId=user_checkup_guardian`);
    const memData: any = await memRes.json();
    logCheck(
      'Webhook Activation & User Membership Status API',
      memRes.ok && memData.membershipStatus === 'active',
      `Tier: ${memData.patronTier}, Status: ${memData.membershipStatus}`
    );
  } catch (err: any) {
    logCheck('Webhook Activation & User Membership Status API', false, err.message);
  }

  // Check 7: Stripe Customer Portal Session API
  try {
    const portalRes = await fetch(`${BASE_URL}/api/stripe/create-portal-session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customerId: 'cus_checkup' }),
    });
    const portalData: any = await portalRes.json();
    logCheck('Stripe Customer Portal Session API', portalRes.ok && !!portalData.url);
  } catch (err: any) {
    logCheck('Stripe Customer Portal Session API', false, err.message);
  }

  console.log('\n====================================================');
  console.log(`   CHECKUP COMPLETE: ${passedChecks}/${totalChecks} SERVICES OPERATIONAL   `);
  console.log('====================================================');

  if (passedChecks !== totalChecks) {
    process.exit(1);
  }
}

performServiceCheckup();
