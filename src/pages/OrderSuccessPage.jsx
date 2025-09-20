import { useParams, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Download, Mail, Calendar, MapPin } from 'lucide-react'
import QRCode from 'react-qr-code'
import useStore from '../lib/store'
import { formatCurrency, formatDate } from '../lib/utils'

export default function OrderSuccessPage() {
  const { id } = useParams()
  const { orders } = useStore()
  
  const order = orders.find(o => o.id === id)

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h1>
          <p className="text-gray-600 mb-6">The order you're looking for doesn't exist or has been removed.</p>
          <Link to="/events">
            <Button className="bg-dharte-primary hover:bg-dharte-primary/90">
              Browse Events
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleDownloadTicket = () => {
    // In a real app, this would generate and download a PDF ticket
    const ticketData = {
      orderId: order.id,
      customerName: `${order.customerInfo.firstName} ${order.customerInfo.lastName}`,
      email: order.customerInfo.email,
      items: order.items,
      total: order.total
    }
    
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(ticketData, null, 2))
    const downloadAnchorNode = document.createElement('a')
    downloadAnchorNode.setAttribute("href", dataStr)
    downloadAnchorNode.setAttribute("download", `dharte-ticket-${order.id}.json`)
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-dharte-success" />
          </div>
          <h1 className="text-3xl font-playfair font-bold text-dharte-primary mb-2">
            Payment Successful!
          </h1>
          <p className="text-lg text-gray-600">
            Your tickets have been confirmed. Check your email for details.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Details */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
                <Badge variant="outline" className="w-fit">
                  Order #{order.id}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Customer Info */}
                  <div className="bg-dharte-surface rounded-lg p-4">
                    <h3 className="font-semibold text-dharte-primary mb-2">Customer Information</h3>
                    <div className="space-y-1 text-sm">
                      <p><span className="font-medium">Name:</span> {order.customerInfo.firstName} {order.customerInfo.lastName}</p>
                      <p><span className="font-medium">Email:</span> {order.customerInfo.email}</p>
                      <p><span className="font-medium">Phone:</span> {order.customerInfo.phone}</p>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div>
                    <h3 className="font-semibold text-dharte-primary mb-3">Tickets</h3>
                    <div className="space-y-3">
                      {order.items.map((item, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold">{item.eventTitle}</h4>
                            <span className="font-semibold text-dharte-primary">
                              {formatCurrency(item.price * item.quantity)}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <p><span className="font-medium">Ticket Type:</span> {item.tierName}</p>
                            <p><span className="font-medium">Quantity:</span> {item.quantity}</p>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {formatDate(item.eventDate)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Payment Summary */}
                  <div className="bg-dharte-surface rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total Paid</span>
                      <span className="text-lg font-bold text-dharte-primary">
                        {formatCurrency(order.total)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Paid on {formatDate(order.createdAt)} via Stripe
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* E-Ticket */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Your E-Ticket</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-6">
                  {/* QR Code */}
                  <div className="bg-white p-6 rounded-lg border-2 border-dashed border-dharte-accent/30">
                    <QRCode
                      value={`https://dharte.com/verify/${order.id}`}
                      size={200}
                      style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    />
                  </div>

                  <div className="space-y-2">
                    <p className="font-semibold text-dharte-primary">Ticket ID: {order.id}</p>
                    <p className="text-sm text-gray-600">
                      Show this QR code at the event entrance for verification
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button
                      onClick={handleDownloadTicket}
                      className="w-full bg-dharte-primary hover:bg-dharte-primary/90"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Ticket
                    </Button>
                    
                    <Button variant="outline" className="w-full">
                      <Mail className="h-4 w-4 mr-2" />
                      Resend Email
                    </Button>
                  </div>

                  <div className="text-xs text-gray-500 space-y-1">
                    <p>• Keep this ticket safe and accessible on your phone</p>
                    <p>• Arrive 15 minutes early for smooth check-in</p>
                    <p>• Contact support if you have any issues</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>What's Next?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-dharte-accent mt-0.5" />
                    <div>
                      <p className="font-medium">Check Your Email</p>
                      <p className="text-sm text-gray-600">
                        We've sent a confirmation email with your ticket details
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Calendar className="h-5 w-5 text-dharte-accent mt-0.5" />
                    <div>
                      <p className="font-medium">Add to Calendar</p>
                      <p className="text-sm text-gray-600">
                        Don't forget to add the event to your calendar
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-dharte-accent mt-0.5" />
                    <div>
                      <p className="font-medium">Plan Your Journey</p>
                      <p className="text-sm text-gray-600">
                        Check the venue location and plan your travel
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link to="/account">
            <Button variant="outline" className="border-dharte-primary text-dharte-primary hover:bg-dharte-primary hover:text-white">
              View My Account
            </Button>
          </Link>
          <Link to="/events">
            <Button className="bg-dharte-primary hover:bg-dharte-primary/90">
              Browse More Events
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
