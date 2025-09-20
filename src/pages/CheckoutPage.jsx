import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Trash2, CreditCard, Lock, CheckCircle, AlertCircle } from 'lucide-react'
import StripePayment from '../components/StripePayment'
import useStore from '../lib/store'
import { formatCurrency, formatDate, generateOrderId, validateEmail } from '../lib/utils'
import { validateStripeConfig } from '../lib/stripe'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { cart, removeFromCart, clearCart, addOrder, isAuthenticated, user } = useStore()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentStep, setPaymentStep] = useState('details') // 'details' | 'payment' | 'success'
  const [orderId, setOrderId] = useState(null)
  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: '',
    lastName: '',
    phone: ''
  })
  const [errors, setErrors] = useState({})

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const processingFee = Math.max(10, Math.round(total * 0.029)) // 2.9% + ₹10 minimum
  const finalTotal = total + processingFee

  // Check if Stripe is properly configured
  const stripeConfigured = validateStripeConfig()

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.email || !validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleContinueToPayment = () => {
    if (validateForm()) {
      setPaymentStep('payment')
    }
  }

  const handlePaymentSuccess = (paymentIntent) => {
    const newOrderId = generateOrderId()
    const order = {
      id: newOrderId,
      items: cart.map(item => ({
        eventId: item.eventId,
        eventTitle: item.eventTitle,
        eventDate: item.eventDate,
        tierName: item.tierName,
        price: item.price,
        quantity: item.quantity
      })),
      total: finalTotal,
      subtotal: total,
      processingFee: processingFee,
      customerInfo: formData,
      paymentIntentId: paymentIntent.id,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    }

    addOrder(order)
    clearCart()
    setOrderId(newOrderId)
    setPaymentStep('success')
  }

  const handlePaymentError = (error) => {
    console.error('Payment failed:', error)
    setIsProcessing(false)
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="text-center p-8">
            <div className="w-16 h-16 bg-dharte-surface rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="h-8 w-8 text-dharte-primary" />
            </div>
            <h2 className="text-xl font-semibold text-dharte-primary mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some events to your cart to proceed with checkout.</p>
            <Button 
              onClick={() => navigate('/events')}
              className="bg-dharte-primary hover:bg-dharte-primary/90"
            >
              Browse Events
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (paymentStep === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="text-center p-8">
            <div className="w-16 h-16 bg-dharte-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-dharte-success" />
            </div>
            <h2 className="text-xl font-semibold text-dharte-primary mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-6">
              Your order has been confirmed. You'll receive your tickets via email shortly.
            </p>
            <div className="space-y-3">
              <Button 
                onClick={() => navigate(`/order-success?orderId=${orderId}`)}
                className="w-full bg-dharte-primary hover:bg-dharte-primary/90"
              >
                View Order Details
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/events')}
                className="w-full"
              >
                Continue Browsing
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-playfair font-bold text-dharte-primary">Checkout</h1>
          <p className="text-gray-600">Complete your booking for transformative wellness experiences</p>
        </div>

        {!stripeConfigured && (
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Payment processing is not fully configured. Please contact support if you encounter any issues.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={`${item.eventId}-${item.tierName}`} className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-dharte-primary">{item.eventTitle}</h3>
                        <p className="text-sm text-gray-600">{item.tierName}</p>
                        <p className="text-sm text-gray-500">
                          {formatDate(item.eventDate)} • Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-dharte-primary">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.eventId, item.tierName)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Processing Fee</span>
                    <span>{formatCurrency(processingFee)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-dharte-primary">{formatCurrency(finalTotal)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Details */}
          <div>
            {paymentStep === 'details' ? (
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your@email.com"
                        className={errors.email ? 'border-red-500' : ''}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          placeholder="John"
                          className={errors.firstName ? 'border-red-500' : ''}
                        />
                        {errors.firstName && (
                          <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          placeholder="Doe"
                          className={errors.lastName ? 'border-red-500' : ''}
                        />
                        {errors.lastName && (
                          <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+91 98765 43210"
                        className={errors.phone ? 'border-red-500' : ''}
                      />
                      {errors.phone && (
                        <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
                      )}
                    </div>

                    <Button
                      onClick={handleContinueToPayment}
                      className="w-full bg-dharte-primary hover:bg-dharte-primary/90"
                      size="lg"
                    >
                      Continue to Payment
                    </Button>

                    <div className="flex items-center justify-center text-sm text-gray-500">
                      <Lock className="h-4 w-4 mr-1" />
                      Your information is secure and encrypted
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Order Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Customer:</span>
                        <span>{formData.firstName} {formData.lastName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Email:</span>
                        <span>{formData.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Phone:</span>
                        <span>{formData.phone}</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-semibold">
                        <span>Total Amount:</span>
                        <span className="text-dharte-primary">{formatCurrency(finalTotal)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {stripeConfigured ? (
                  <StripePayment
                    amount={finalTotal}
                    orderData={{
                      id: generateOrderId(),
                      ...formData,
                      items: cart
                    }}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                  />
                ) : (
                  <Card>
                    <CardContent className="p-6">
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          Payment processing is temporarily unavailable. Please try again later or contact support.
                        </AlertDescription>
                      </Alert>
                    </CardContent>
                  </Card>
                )}

                <Button
                  variant="outline"
                  onClick={() => setPaymentStep('details')}
                  className="w-full"
                >
                  Back to Details
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
