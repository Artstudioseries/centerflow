import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3000';

async function runTests() {
  console.log('--- Starting CenterFlow Patron & Membership System Tests ---');

  // Test 1: Health Check and Price IDs
  console.log('\n[Test 1] Verifying server health and Stripe Price ID configuration...');
  const healthRes = await fetch(`${BASE_URL}/api/health`);
  const healthData: any = await healthRes.json();
  console.log('Health Response:', healthData);
  if (!healthData.prices || !healthData.prices.supporter) {
    throw new Error('Health check failed: Stripe price configuration missing');
  }
  console.log('PASSED: Server health and Stripe prices configured.');

  // Test 2: Default Account Initialization (CenterFlow Friend)
  console.log('\n[Test 2] Testing Default Account Initialization (CenterFlow Friend Free Tier)...');
  const defaultMemRes = await fetch(`${BASE_URL}/api/user/membership?userId=new_registered_user_123`);
  const defaultMemData: any = await defaultMemRes.json();
  console.log('Default Account Membership State:', defaultMemData);
  if (defaultMemData.patronTier !== 'friend' || defaultMemData.membershipStatus !== 'friend') {
    throw new Error('Default account registration failed to assign Friend membership tier');
  }
  console.log('PASSED: Default account automatically receives CenterFlow Friend free tier.');

  // Test 3: $1 Monthly Supporter Checkout Session
  console.log('\n[Test 3] Testing $1 Monthly Supporter Checkout Session...');
  const supporterRes = await fetch(`${BASE_URL}/api/stripe/create-checkout-session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      tierId: 'supporter',
      amount: 1,
      userId: 'user_test_supporter',
      userEmail: 'supporter@example.com',
    }),
  });
  const supporterData: any = await supporterRes.json();
  console.log('Supporter Checkout Response:', supporterData);
  if (!supporterData.url) {
    throw new Error('$1 monthly supporter checkout session failed');
  }
  console.log('PASSED: $1 monthly supporter checkout session created.');

  // Test 4: $5 Monthly Guardian Checkout Session
  console.log('\n[Test 4] Testing $5 Monthly Guardian Checkout Session...');
  const guardianRes = await fetch(`${BASE_URL}/api/stripe/create-checkout-session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      tierId: 'guardian',
      amount: 5,
      userId: 'user_test_guardian',
      userEmail: 'guardian@example.com',
    }),
  });
  const guardianData: any = await guardianRes.json();
  console.log('Guardian Checkout Response:', guardianData);
  if (!guardianData.url) {
    throw new Error('$5 monthly guardian checkout session failed');
  }
  console.log('PASSED: $5 monthly guardian checkout session created.');

  // Test 5: $40 Annual Pass Checkout Session & Permission Mapping
  console.log('\n[Test 5] Testing $40 Annual Pass Checkout Session & Permission Mapping...');
  const passRes = await fetch(`${BASE_URL}/api/stripe/create-checkout-session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      tierId: 'pass',
      amount: 40,
      userId: 'user_test_annual',
      userEmail: 'annual@example.com',
    }),
  });
  const passData: any = await passRes.json();
  console.log('Annual Pass Checkout Response:', passData);
  if (!passData.url) {
    throw new Error('$40 annual pass checkout session failed');
  }
  console.log('PASSED: $40 annual pass checkout session created.');

  // Test 6: Gift Membership Purchase & Redemption Flow
  console.log('\n[Test 6] Testing Gift Membership Purchase and Redemption Flow...');
  const giftPurchaseRes = await fetch(`${BASE_URL}/api/stripe/create-checkout-session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      tierId: 'gift',
      isGift: true,
      amount: 40,
      recipientEmail: 'friend@example.com',
      recipientName: 'Friend',
      giftNote: 'Enjoy 1-year of CenterFlow!',
      userId: 'purchaser_123',
      userEmail: 'purchaser@example.com',
    }),
  });
  const giftPurchaseData: any = await giftPurchaseRes.json();
  const verifyGiftRes = await fetch(`${BASE_URL}/api/stripe/verify-session?session_id=${giftPurchaseData.sessionId}`);
  const verifyGiftData: any = await verifyGiftRes.json();
  const giftCode = verifyGiftData.giftCode;

  if (!giftCode) {
    throw new Error('Gift purchase failed to generate a gift code');
  }
  console.log(`Generated Gift Code: ${giftCode}`);

  const redeemRes = await fetch(`${BASE_URL}/api/gifts/redeem`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      code: giftCode,
      userEmail: 'recipient@example.com',
      userId: 'user_recipient_456',
    }),
  });
  const redeemData: any = await redeemRes.json();
  console.log('Gift Redemption Response:', redeemData);
  if (!redeemData.success) {
    throw new Error('Gift redemption failed');
  }
  console.log('PASSED: Gift membership redeemed successfully.');

  // Test 7: Duplicate Gift Code Redemption Lock Check
  console.log('\n[Test 7] Verifying Duplicate Gift Code Redemption Prevention...');
  const dupRedeemRes = await fetch(`${BASE_URL}/api/gifts/redeem`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      code: giftCode,
      userEmail: 'another_user@example.com',
      userId: 'user_attacker_789',
    }),
  });
  const dupRedeemData: any = await dupRedeemRes.json();
  if (dupRedeemRes.status !== 400 || !dupRedeemData.error.includes('already redeemed')) {
    throw new Error('Failed to prevent duplicate gift code redemption');
  }
  console.log('PASSED: Duplicate gift redemption correctly blocked.');

  // Test 8: Webhook Confirmation & User Account Status Verification
  console.log('\n[Test 8] Simulating Webhook event checkout.session.completed for new member...');
  await fetch(`${BASE_URL}/api/stripe/simulate-webhook`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: 'evt_test_checkout',
      object: 'event',
      type: 'checkout.session.completed',
      data: {
        object: {
          id: 'cs_test_webhook_session_999',
          object: 'checkout.session',
          customer: 'cus_test_webhook_user',
          subscription: 'sub_test_webhook_sub',
          customer_details: { email: 'webhookuser@example.com' },
          metadata: {
            tierId: 'guardian',
            userId: 'user_webhook_999',
            userEmail: 'webhookuser@example.com',
            isGift: 'false',
          },
        },
      },
    }),
  });

  const memRes = await fetch(`${BASE_URL}/api/user/membership?userId=user_webhook_999`);
  const memData: any = await memRes.json();
  console.log('User Account Membership State after Webhook:', memData);
  if (memData.membershipStatus !== 'active' || memData.patronTier !== 'guardian') {
    throw new Error('Webhook failed to update user account membership status');
  }
  console.log('PASSED: Webhook confirmed payment and updated account status.');

  // Test 9: Webhook Subscription Cancellation & Automatic Revert to Friend
  console.log('\n[Test 9] Simulating customer.subscription.deleted (reverting to Friend tier)...');
  await fetch(`${BASE_URL}/api/stripe/simulate-webhook`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: 'evt_test_sub_deleted',
      object: 'event',
      type: 'customer.subscription.deleted',
      data: {
        object: {
          id: 'sub_test_webhook_sub',
          object: 'subscription',
          customer: 'cus_test_webhook_user',
          status: 'canceled',
        },
      },
    }),
  });

  const revertedMemRes = await fetch(`${BASE_URL}/api/user/membership?userId=user_webhook_999`);
  const revertedMemData: any = await revertedMemRes.json();
  console.log('User Account State after Subscription Cancellation:', revertedMemData);
  if (revertedMemData.membershipStatus !== 'friend' || revertedMemData.patronTier !== 'friend') {
    throw new Error('Subscription cancellation failed to automatically revert account to Friend tier');
  }
  console.log('PASSED: Subscription cancellation automatically reverted account to CenterFlow Friend tier.');

  // Test 10: Customer Portal Session Creation
  console.log('\n[Test 10] Testing Stripe Customer Portal Session Creation...');
  const portalRes = await fetch(`${BASE_URL}/api/stripe/create-portal-session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ customerId: 'cus_test_webhook_user' }),
  });
  const portalData: any = await portalRes.json();
  console.log('Customer Portal Response:', portalData);
  if (!portalData.url) {
    throw new Error('Customer Portal session creation failed');
  }
  console.log('PASSED: Stripe Customer Portal session created successfully.');

  console.log('\nALL 10 TESTS PASSED SUCCESSFULLY! CenterFlow Membership Architecture Verified.');
}

runTests().catch((err) => {
  console.error('\nTEST FAILURE:', err);
  process.exit(1);
});
