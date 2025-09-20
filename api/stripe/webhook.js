// Stripe webhook handler for processing payment events
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, stripe-signature')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const sig = req.headers['stripe-signature']
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

  let event

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    res.status(400).json({ error: `Webhook Error: ${err.message}` })
    return
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object
        console.log('Payment succeeded:', paymentIntent.id)
        
        // TODO: Update order status in database
        // TODO: Send confirmation email with tickets
        // TODO: Generate QR codes for tickets
        
        await handlePaymentSuccess(paymentIntent)
        break

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object
        console.log('Payment failed:', failedPayment.id)
        
        // TODO: Update order status to failed
        // TODO: Send payment failure notification
        
        await handlePaymentFailure(failedPayment)
        break

      case 'invoice.payment_succeeded':
        const invoice = event.data.object
        console.log('Invoice payment succeeded:', invoice.id)
        
        // TODO: Handle subscription payments if applicable
        
        break

      case 'customer.subscription.deleted':
        const subscription = event.data.object
        console.log('Subscription cancelled:', subscription.id)
        
        // TODO: Handle subscription cancellation
        
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    res.status(200).json({ received: true })
  } catch (error) {
    console.error('Error processing webhook:', error)
    res.status(500).json({ error: 'Webhook processing failed' })
  }
}

// Helper function to handle successful payments
async function handlePaymentSuccess(paymentIntent) {
  try {
    const { metadata } = paymentIntent
    
    // Extract order information from metadata
    const orderId = metadata.orderId
    const customerEmail = metadata.customerEmail
    const eventIds = metadata.eventIds?.split(',') || []

    console.log('Processing successful payment:', {
      orderId,
      customerEmail,
      eventIds,
      amount: paymentIntent.amount_received
    })

    // TODO: Implement the following:
    // 1. Update order status in database
    // 2. Generate QR codes for tickets
    // 3. Send confirmation email with tickets
    // 4. Update event capacity/availability
    // 5. Log transaction for analytics

    // Placeholder for database update
    // await updateOrderStatus(orderId, 'completed')
    
    // Placeholder for email sending
    // await sendTicketEmail(customerEmail, orderId, tickets)
    
  } catch (error) {
    console.error('Error handling payment success:', error)
    throw error
  }
}

// Helper function to handle failed payments
async function handlePaymentFailure(paymentIntent) {
  try {
    const { metadata } = paymentIntent
    
    const orderId = metadata.orderId
    const customerEmail = metadata.customerEmail

    console.log('Processing failed payment:', {
      orderId,
      customerEmail,
      failureReason: paymentIntent.last_payment_error?.message
    })

    // TODO: Implement the following:
    // 1. Update order status to failed
    // 2. Send payment failure notification
    // 3. Release reserved event capacity
    // 4. Log failure for analytics

    // Placeholder for database update
    // await updateOrderStatus(orderId, 'failed')
    
    // Placeholder for notification
    // await sendPaymentFailureEmail(customerEmail, orderId)
    
  } catch (error) {
    console.error('Error handling payment failure:', error)
    throw error
  }
}
