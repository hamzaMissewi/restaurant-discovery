**To test Stripe webhooks on localhost, you have two main options:**

## Option 1: Stripe CLI (Recommended)

1. **Install Stripe CLI:**
   ```bash
   # macOS
   brew install stripe/stripe-cli/stripe
   
   # Windows
   scoop install stripe
   
   # Or download from https://stripe.com/docs/stripe-cli
   ```

2. **Login to Stripe:**
   ```bash
   stripe login
   ```
   This will open your browser to authenticate.

3. **Forward webhooks to localhost:**
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

4. **Copy the webhook secret** from the CLI output (starts with `whsec_...`) and add it to your `.env.local`:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_1234567890abcdef...
   ```

5. **Test events:**
   ```bash
   # Trigger a test checkout.session.completed event
   stripe trigger checkout.session.completed
   ```

## Option 2: ngrok (Alternative)

1. **Install ngrok:**
   ```bash
   # Download from https://ngrok.com/download
   ```

2. **Start ngrok:**
   ```bash
   ngrok http 3000
   ```

3. **Copy the HTTPS URL** (like `https://abc123.ngrok.io`)

4. **Add webhook endpoint in Stripe Dashboard:**
   - URL: `https://abc123.ngrok.io/api/webhooks/stripe`
   - Events: `checkout.session.completed`

5. **Copy the webhook secret** from Stripe dashboard to your `.env.local`

## Testing Your Checkout Flow

1. Start your Next.js app: `npm run dev`
2. Run Stripe CLI or ngrok in another terminal
3. Go through your checkout process with Stripe test card:
   - Card number: `4242 4242 4242 4242`
   - Expiry: any future date
   - CVC: any 3 digits
   - Name: any name

The webhook will automatically receive the event when the checkout completes!