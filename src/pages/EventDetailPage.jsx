import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar, MapPin, Clock, Users, ArrowLeft, ShoppingCart } from 'lucide-react'
import useStore from '../lib/store'
import { formatDate, formatDateTime, formatCurrency } from '../lib/utils'

export default function EventDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { getEventBySlug, taxonomy, addToCart } = useStore()
  const [selectedTier, setSelectedTier] = useState('')
  const [quantity, setQuantity] = useState(1)

  const event = getEventBySlug(slug)

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h1>
          <Button onClick={() => navigate('/events')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Events
          </Button>
        </div>
      </div>
    )
  }

  const category = taxonomy.categories.find(c => c.slug === event.category_slug)
  const subcategory = category?.subcategories.find(s => s.slug === event.subcategory_slug)
  const eventType = taxonomy.event_types.find(t => t.slug === event.event_type_slug)

  const selectedTierData = event.ticket_tiers.find(tier => tier.name === selectedTier)

  const handleAddToCart = () => {
    if (!selectedTierData) return

    addToCart({
      eventSlug: event.slug,
      eventTitle: event.title,
      tierName: selectedTierData.name,
      price: selectedTierData.price_inr,
      quantity: quantity,
      eventDate: event.start_dt
    })

    navigate('/checkout')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/events')}
          className="mb-6 text-dharte-primary hover:text-dharte-accent"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Events
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Hero Image */}
            <div className="aspect-video bg-gradient-to-br from-dharte-surface to-dharte-accent/10 rounded-lg flex items-center justify-center mb-8">
              <div className="text-center p-8">
                <Calendar className="h-20 w-20 text-dharte-accent mx-auto mb-4" />
                <p className="text-lg text-gray-600">
                  {formatDate(event.start_dt, 'EEEE, MMMM dd, yyyy')}
                </p>
              </div>
            </div>

            {/* Event Info */}
            <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary">
                  {eventType?.name}
                </Badge>
                <Badge variant="outline">
                  {category?.name}
                </Badge>
                {subcategory && (
                  <Badge variant="outline">
                    {subcategory.name}
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-playfair font-bold text-dharte-primary mb-4">
                {event.title}
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-dharte-accent" />
                  <div>
                    <p className="font-medium">Date & Time</p>
                    <p>{formatDateTime(event.start_dt)}</p>
                    {event.end_dt && (
                      <p>to {formatDateTime(event.end_dt)}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-dharte-accent" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p>{event.online_bool ? 'Online Event' : event.venue_text}</p>
                    {!event.online_bool && (
                      <p>{event.city}, {event.country}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-dharte-accent" />
                  <div>
                    <p className="font-medium">Organizer</p>
                    <p>{event.organizer}</p>
                  </div>
                </div>
              </div>

              <div className="prose max-w-none">
                <h2 className="text-xl font-semibold text-dharte-primary mb-3">About This Event</h2>
                <p className="text-gray-600 mb-4">{event.short_desc}</p>
                <p className="text-gray-600">{event.long_desc}</p>
              </div>
            </div>

            {/* Additional Info */}
            {subcategory?.definition && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-dharte-primary mb-3">
                  About {subcategory.name}
                </h3>
                <p className="text-gray-600">{subcategory.definition}</p>
              </div>
            )}
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-24">
              <h3 className="text-xl font-semibold text-dharte-primary mb-6">Book Your Spot</h3>

              {/* Ticket Tiers */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Select Ticket Type
                  </label>
                  <Select value={selectedTier} onValueChange={setSelectedTier}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose ticket type" />
                    </SelectTrigger>
                    <SelectContent>
                      {event.ticket_tiers.map((tier) => (
                        <SelectItem key={tier.name} value={tier.name}>
                          <div className="flex justify-between items-center w-full">
                            <span>{tier.name}</span>
                            <span className="ml-4 font-semibold">
                              {formatCurrency(tier.price_inr)}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedTierData && (
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Quantity
                    </label>
                    <Select value={quantity.toString()} onValueChange={(value) => setQuantity(parseInt(value))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: Math.min(selectedTierData.max_per_order, 10) }, (_, i) => i + 1).map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} ticket{num > 1 ? 's' : ''}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              {/* Ticket Details */}
              {selectedTierData && (
                <div className="bg-dharte-surface rounded-lg p-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Price per ticket</span>
                    <span className="font-semibold">{formatCurrency(selectedTierData.price_inr)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Quantity</span>
                    <span className="font-semibold">{quantity}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total</span>
                      <span className="text-lg font-bold text-dharte-primary">
                        {formatCurrency(selectedTierData.price_inr * quantity)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-xs text-gray-500">
                    <p>• {selectedTierData.qty_total} total spots available</p>
                    <p>• Min {selectedTierData.min_per_order}, Max {selectedTierData.max_per_order} per order</p>
                  </div>
                </div>
              )}

              {/* Book Button */}
              <Button
                onClick={handleAddToCart}
                disabled={!selectedTierData}
                className="w-full bg-dharte-primary hover:bg-dharte-primary/90 text-white py-3"
                size="lg"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Secure checkout with Stripe. You'll receive your e-ticket via email after payment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
