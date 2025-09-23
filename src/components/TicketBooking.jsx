import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ShoppingCart, CreditCard, Users, Star, Gift } from 'lucide-react'
import { formatCurrency } from '../lib/utils'

export default function TicketBooking({ event }) {
  const [selectedItems, setSelectedItems] = useState([])
  const [customerInfo, setCustomerInfo] = useState({
    email: '',
    name: '',
    phone: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  // Calculate total
  const total = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const handleItemSelect = (item, type, quantity = 1) => {
    const itemId = `${type}-${item.id}`
    const existingIndex = selectedItems.findIndex(selected => selected.itemId === itemId)
    
    if (existingIndex >= 0) {
      if (quantity === 0) {
        // Remove item
        setSelectedItems(prev => prev.filter(selected => selected.itemId !== itemId))
      } else {
        // Update quantity
        setSelectedItems(prev => prev.map((selected, index) => 
          index === existingIndex ? { ...selected, quantity } : selected
        ))
      }
    } else if (quantity > 0) {
      // Add new item
      setSelectedItems(prev => [...prev, {
        itemId,
        type,
        id: item.id,
        name: item.name,
        price: item.price,
        quantity,
        description: item.description
      }])
    }
  }

  const handleCheckout = async () => {
    if (selectedItems.length === 0) return
    if (!customerInfo.email || !customerInfo.name) {
      alert('Please fill in your contact information')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: selectedItems,
          eventSlug: event.slug,
          customerEmail: customerInfo.email,
          successUrl: `${window.location.origin}/order/{CHECKOUT_SESSION_ID}?success=true`,
          cancelUrl: `${window.location.origin}/events/${event.slug}?canceled=true`
        }),
      })

      const { url } = await response.json()
      
      if (url) {
        // Redirect to Stripe Checkout
        window.location.href = url
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Customer Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Contact Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={customerInfo.name}
                onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={customerInfo.email}
                onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={customerInfo.phone}
              onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="Enter your phone number"
            />
          </div>
        </CardContent>
      </Card>

      {/* Booking Options */}
      <Tabs defaultValue="tickets" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="tickets">Tickets</TabsTrigger>
          <TabsTrigger value="stalls">Stalls</TabsTrigger>
          <TabsTrigger value="sponsorship">Sponsorship</TabsTrigger>
          <TabsTrigger value="marketing">Marketing</TabsTrigger>
        </TabsList>

        {/* Tickets */}
        <TabsContent value="tickets">
          <Card>
            <CardHeader>
              <CardTitle>Event Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {event.ticketTypes?.map((ticket) => (
                  <div key={ticket.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold flex items-center space-x-2">
                          <span>{ticket.name}</span>
                          {ticket.recommended && <Badge variant="secondary">Recommended</Badge>}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">{ticket.description}</p>
                        <ul className="text-xs text-gray-500 mt-2 space-y-1">
                          {ticket.features?.map((feature, index) => (
                            <li key={index}>• {feature}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{formatCurrency(ticket.price)}</div>
                        <Select onValueChange={(value) => handleItemSelect(ticket, 'ticket', parseInt(value))}>
                          <SelectTrigger className="w-20 mt-2">
                            <SelectValue placeholder="0" />
                          </SelectTrigger>
                          <SelectContent>
                            {[0, 1, 2, 3, 4, 5].map(num => (
                              <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Stalls */}
        <TabsContent value="stalls">
          <Card>
            <CardHeader>
              <CardTitle>Exhibition Stalls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {event.stallTypes?.map((stall) => (
                  <div key={stall.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{stall.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{stall.description}</p>
                        <ul className="text-xs text-gray-500 mt-2 space-y-1">
                          {stall.features?.map((feature, index) => (
                            <li key={index}>• {feature}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{formatCurrency(stall.price)}</div>
                        <Select onValueChange={(value) => handleItemSelect(stall, 'stall', parseInt(value))}>
                          <SelectTrigger className="w-20 mt-2">
                            <SelectValue placeholder="0" />
                          </SelectTrigger>
                          <SelectContent>
                            {[0, 1, 2, 3].map(num => (
                              <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sponsorship */}
        <TabsContent value="sponsorship">
          <Card>
            <CardHeader>
              <CardTitle>Sponsorship Packages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {event.sponsorshipTiers?.map((sponsor) => (
                  <div key={sponsor.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold flex items-center space-x-2">
                          <span>{sponsor.name}</span>
                          {sponsor.id === 'gold' && <Star className="h-4 w-4 text-yellow-500" />}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">{sponsor.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{formatCurrency(sponsor.price)}</div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() => handleItemSelect(sponsor, 'sponsorship', 1)}
                        >
                          Select
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Marketing */}
        <TabsContent value="marketing">
          <Card>
            <CardHeader>
              <CardTitle>Marketing Add-ons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {event.marketingAddons?.map((addon) => (
                  <div key={addon.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{addon.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{addon.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{formatCurrency(addon.price)}</div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() => handleItemSelect(addon, 'marketing', 1)}
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Cart Summary */}
      {selectedItems.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ShoppingCart className="h-5 w-5" />
              <span>Order Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {selectedItems.map((item) => (
                <div key={item.itemId} className="flex justify-between items-center">
                  <div>
                    <span className="font-medium">{item.name}</span>
                    {item.quantity > 1 && <span className="text-gray-500"> x{item.quantity}</span>}
                  </div>
                  <span className="font-semibold">{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}
              <div className="border-t pt-3">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Checkout Button */}
      <div className="flex justify-center">
        <Button
          onClick={handleCheckout}
          disabled={selectedItems.length === 0 || isLoading || !customerInfo.email || !customerInfo.name}
          size="lg"
          className="w-full md:w-auto px-8"
        >
          <CreditCard className="h-5 w-5 mr-2" />
          {isLoading ? 'Processing...' : `Proceed to Payment - ${formatCurrency(total)}`}
        </Button>
      </div>
    </div>
  )
}
