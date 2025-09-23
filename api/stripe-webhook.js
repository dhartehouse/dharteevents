const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      
      // Payment was successful
      console.log('Payment successful for session:', session.id);
      
      // Here you would typically:
      // 1. Save the order to your database
      // 2. Send confirmation email to customer
      // 3. Update inventory/availability
      // 4. Generate tickets/receipts
      
      try {
        // Retrieve the session with line items
        const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
          session.id,
          {
            expand: ['line_items']
          }
        );

        // Extract order details
        const orderData = {
          sessionId: session.id,
          customerEmail: session.customer_details.email,
          customerName: session.customer_details.name,
          customerPhone: session.customer_details.phone,
          amount: session.amount_total,
          currency: session.currency,
          paymentStatus: session.payment_status,
          eventSlug: session.metadata.eventSlug,
          orderType: session.metadata.orderType,
          billingAddress: session.customer_details.address,
          shippingAddress: session.shipping_details?.address,
          customFields: session.custom_fields,
          lineItems: sessionWithLineItems.line_items.data,
          createdAt: new Date(session.created * 1000).toISOString()
        };

        // Log the order (in production, save to database)
        console.log('Order created:', orderData);

        // TODO: Implement order saving to database
        // TODO: Send confirmation email
        // TODO: Generate tickets

      } catch (error) {
        console.error('Error processing completed checkout:', error);
      }
      
      break;

    case 'checkout.session.expired':
      const expiredSession = event.data.object;
      console.log('Checkout session expired:', expiredSession.id);
      break;

    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object;
      console.log('Payment failed:', failedPayment.id);
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).json({ received: true });
}
