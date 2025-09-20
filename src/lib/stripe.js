import { loadStripe } from '@stripe/stripe-js'

// Initialize Stripe with publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

export { stripePromise }

// Stripe API functions
export const createPaymentIntent = async (amount, currency = 'inr', metadata = {}) => {
  try {
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount * 100, // Convert to smallest currency unit (paise for INR)
        currency,
        metadata
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to create payment intent')
    }

    return await response.json()
  } catch (error) {
    console.error('Error creating payment intent:', error)
    throw error
  }
}

export const confirmPayment = async (stripe, elements, clientSecret, billingDetails) => {
  try {
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        payment_method_data: {
          billing_details: billingDetails
        }
      },
      redirect: 'if_required'
    })

    if (error) {
      throw error
    }

    return paymentIntent
  } catch (error) {
    console.error('Error confirming payment:', error)
    throw error
  }
}

// Format currency for display
export const formatCurrency = (amount, currency = 'INR') => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Validate Stripe configuration
export const validateStripeConfig = () => {
  const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
  
  if (!publishableKey) {
    console.error('Stripe publishable key is missing. Please check your environment variables.')
    return false
  }

  if (!publishableKey.startsWith('pk_')) {
    console.error('Invalid Stripe publishable key format.')
    return false
  }

  return true
}
