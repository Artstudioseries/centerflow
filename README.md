# CenterFlow - Body Relief, Guided Movement & Patron Membership Platform

CenterFlow is a modern web application for desk workers and physical movement advocates, providing guided routines, muscle anatomy relief guidance, and a complete **Patron & Membership System** powered by Stripe Test Mode and Firebase.

## Features

- **Guided Movement Routines**: Desktop relief, daily mobility, and recovery sessions.
- **Relational Muscle Anatomy**: Interactive muscle library and exercise mappings.
- **Patron & Membership System**:
  - **Supporter Membership**: $1 / month
  - **Guardian Membership**: $5 / month
  - **Annual Pass**: $40 / year
  - **Gift Pass**: $40 one-time gift with single-use redemption code locking (`CFGIFT-XXXX-XXXX`).
- **Stripe Integration**: Stripe Checkout flows, Stripe Webhooks (`/api/stripe/webhook`), and Stripe Customer Portal for billing management.
- **Firebase Auth & Firestore**: User sign-in and cloud profile persistence.

## Run Locally

**Prerequisites:** Node.js (v18+)

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables in `.env`:
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `VITE_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_PRICE_SUPPORTER_MONTHLY`
   - `STRIPE_PRICE_GUARDIAN_MONTHLY`
   - `STRIPE_PRICE_ANNUAL_PASS`
   - `STRIPE_PRICE_GIFT`

3. Start the application:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. Run automated test suites:
   ```bash
   npx tsx scripts/test_patron_system.ts
   npx tsx scripts/service_checkup.ts
   ```
