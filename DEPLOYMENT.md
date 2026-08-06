# CenterFlow Live Web Deployment Guide

CenterFlow is pre-configured for one-click automated deployment on **Netlify** or **Vercel**.

---

## ⚡ Option 1: Deploy on Netlify

1. Log into your [Netlify Console](https://app.netlify.com).
2. Click **Add new site** -> **Import an existing project**.
3. Choose **GitHub** and authorize access to `Artstudioseries/centerflow`.
4. Netlify will automatically detect `netlify.toml`:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Under **Environment variables**, set the following keys:

```env
APP_URL=https://your-site-name.netlify.app
STRIPE_SECRET_KEY=sk_test_... (or live key)
STRIPE_WEBHOOK_SECRET=whsec_...
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

6. Click **Deploy CenterFlow**!

---

## ⚡ Option 2: Deploy on Vercel

1. Log into your [Vercel Dashboard](https://vercel.com).
2. Click **Add New** -> **Project**.
3. Import repository `Artstudioseries/centerflow`.
4. Vercel will automatically detect Vite setup using `vercel.json`:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add environment variables under **Environment Variables**.
6. Click **Deploy**!

---

## 🔒 Webhook Secret Setup (Stripe Test Mode)
To receive live membership activations on Webhook:
1. In your Stripe Dashboard, go to **Developers** -> **Webhooks**.
2. Add endpoint URL: `https://your-domain.netlify.app/api/stripe/webhook`
3. Select event types:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
4. Copy the Signing secret into `STRIPE_WEBHOOK_SECRET`.
