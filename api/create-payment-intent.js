// Vercel serverless function for creating Stripe payment intents
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  try {
    const { amount, currency = 'inr', metadata = {} } = req.body

    if (!amount || amount < 1) {
      res.status(400).json({ error: 'Invalid amount' })
      return
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to smallest currency unit
      currency: currency.toLowerCase(),
      metadata: {
        ...metadata,
        source: 'dharte.com'
      },
      automatic_payment_methods: {
        enabled: true,
      },
    })

    res.status(200).json({
      client_secret: paymentIntent.client_secret,
      payment_intent_id: paymentIntent.id
    })
  } catch (error) {
    console.error('Error creating payment intent:', error)
    res.status(500).json({ 
      error: 'Failed to create payment intent',
      message: error.message 
    })
  }
}
