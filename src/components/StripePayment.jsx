import { useState, useEffect } from 'react'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, CreditCard, Shield } from 'lucide-react'
import { stripePromise, createPaymentIntent, confirmPayment } from '../lib/stripe'
import useStore from '../lib/store'

// Payment form component
function PaymentForm({ amount, orderData, onSuccess, onError }) {
  const stripe = useStripe()
  const elements = useElements()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [clientSecret, setClientSecret] = useState('')

  useEffect(() => {
    // Create payment intent when component mounts
    const initializePayment = async () => {
      try {
        const { client_secret } = await createPaymentIntent(amount, 'inr', {
          orderId: orderData.id,
          customerEmail: orderData.email,
          eventIds: orderData.items.map(item => item.eventId).join(',')
        })
        setClientSecret(client_secret)
      } catch (err) {
        setError('Failed to initialize payment. Please try again.')
        onError?.(err)
      }
    }

    if (amount > 0) {
      initializePayment()
    }
  }, [amount, orderData])

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!stripe || !elements || !clientSecret) {
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const billingDetails = {
        name: `${orderData.firstName} ${orderData.lastName}`,
        email: orderData.email,
        phone: orderData.phone,
      }

      const paymentIntent = await confirmPayment(
        stripe, 
        elements, 
        clientSecret, 
        billingDetails
      )

      if (paymentIntent.status === 'succeeded') {
        onSuccess?.(paymentIntent)
      } else {
        throw new Error('Payment was not successful')
      }
    } catch (err) {
      setError(err.message || 'Payment failed. Please try again.')
      onError?.(err)
    } finally {
      setIsLoading(false)
    }
  }

  if (!clientSecret) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-dharte-primary" />
        <span className="ml-2 text-gray-600">Initializing payment...</span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-dharte-surface rounded-lg p-4">
        <div className="flex items-center mb-3">
          <Shield className="h-5 w-5 text-dharte-primary mr-2" />
          <span className="font-medium text-dharte-primary">Secure Payment</span>
        </div>
        <PaymentElement 
          options={{
            layout: 'tabs',
            defaultValues: {
              billingDetails: {
                name: `${orderData.firstName} ${orderData.lastName}`,
                email: orderData.email,
                phone: orderData.phone,
              }
            }
          }}
        />
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Button
        type="submit"
        disabled={!stripe || isLoading}
        className="w-full bg-dharte-primary hover:bg-dharte-primary/90 text-white py-3"
        size="lg"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            Processing Payment...
          </>
        ) : (
          <>
            <CreditCard className="h-4 w-4 mr-2" />
            Pay ₹{amount.toLocaleString('en-IN')}
          </>
        )}
      </Button>

      <div className="text-center text-sm text-gray-500">
        <p>Your payment is secured by Stripe</p>
        <p>We accept all major credit and debit cards</p>
      </div>
    </form>
  )
}

// Main Stripe payment wrapper component
export default function StripePayment({ amount, orderData, onSuccess, onError }) {
  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#2D5A27', // dharte-primary
      colorBackground: '#ffffff',
      colorText: '#1f2937',
      colorDanger: '#ef4444',
      fontFamily: 'Inter, system-ui, sans-serif',
      spacingUnit: '4px',
      borderRadius: '8px',
    },
    rules: {
      '.Input': {
        border: '1px solid #d1d5db',
        boxShadow: 'none',
      },
      '.Input:focus': {
        border: '1px solid #2D5A27',
        boxShadow: '0 0 0 2px rgba(45, 90, 39, 0.1)',
      },
      '.Label': {
        fontWeight: '500',
        marginBottom: '8px',
      }
    }
  }

  const options = {
    clientSecret: null, // Will be set by PaymentForm
    appearance,
    loader: 'auto',
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-dharte-primary">
          <CreditCard className="h-5 w-5 mr-2" />
          Payment Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Elements stripe={stripePromise} options={options}>
          <PaymentForm
            amount={amount}
            orderData={orderData}
            onSuccess={onSuccess}
            onError={onError}
          />
        </Elements>
      </CardContent>
    </Card>
  )
}
