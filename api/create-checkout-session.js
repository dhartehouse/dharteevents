const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { items, eventSlug, customerEmail, successUrl, cancelUrl } = req.body;

    // Validate required fields
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Items are required' });
    }

    // Create line items for Stripe
    const lineItems = items.map(item => ({
      price_data: {
        currency: 'inr',
        product_data: {
          name: item.name,
          description: item.description || '',
          metadata: {
            eventSlug: eventSlug || '',
            itemType: item.type || 'ticket',
            itemId: item.id || ''
          }
        },
        unit_amount: Math.round(item.price * 100), // Convert to paise
      },
      quantity: item.quantity || 1,
    }));

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: successUrl || `${req.headers.origin}/order/{CHECKOUT_SESSION_ID}?success=true`,
      cancel_url: cancelUrl || `${req.headers.origin}/events/${eventSlug}?canceled=true`,
      customer_email: customerEmail,
      metadata: {
        eventSlug: eventSlug || '',
        orderType: 'event_booking'
      },
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['IN']
      },
      phone_number_collection: {
        enabled: true
      },
      custom_fields: [
        {
          key: 'dietary_requirements',
          label: {
            type: 'custom',
            custom: 'Dietary Requirements (Optional)'
          },
          type: 'text',
          optional: true
        },
        {
          key: 'special_requests',
          label: {
            type: 'custom', 
            custom: 'Special Requests (Optional)'
          },
          type: 'text',
          optional: true
        }
      ]
    });

    res.status(200).json({ 
      sessionId: session.id,
      url: session.url 
    });

  } catch (error) {
    console.error('Stripe checkout error:', error);
    res.status(500).json({ 
      message: 'Error creating checkout session',
      error: error.message 
    });
  }
}
