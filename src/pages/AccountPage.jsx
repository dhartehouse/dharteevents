import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { User, Mail, Phone, Calendar, Ticket, LogOut } from 'lucide-react'
import QRCode from 'react-qr-code'
import useStore from '../lib/store'
import { formatCurrency, formatDate, validateEmail, generateOTP } from '../lib/utils'

export default function AccountPage() {
  const { isAuthenticated, user, setUser, logout, orders } = useStore()
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState('email') // 'email' | 'otp'
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [sentOtp, setSentOtp] = useState('')
  const [error, setError] = useState('')

  const handleSendOTP = async () => {
    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      // Simulate OTP sending
      const generatedOtp = generateOTP()
      setSentOtp(generatedOtp)
      
      // In a real app, you would send this OTP via email
      console.log('OTP sent to', email, ':', generatedOtp)
      
      setStep('otp')
      
      // Show the OTP in the UI for demo purposes
      setTimeout(() => {
        alert(`Demo OTP: ${generatedOtp}`)
      }, 1000)
      
    } catch (error) {
      setError('Failed to send OTP. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP')
      return
    }

    if (otp !== sentOtp) {
      setError('Invalid OTP. Please try again.')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      // Simulate user login
      const userData = {
        email: email,
        id: email.split('@')[0],
        name: email.split('@')[0],
        loginAt: new Date().toISOString()
      }
      
      setUser(userData)
      setStep('email')
      setEmail('')
      setOtp('')
      setSentOtp('')
      
    } catch (error) {
      setError('Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    setStep('email')
    setEmail('')
    setOtp('')
    setSentOtp('')
    setError('')
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-playfair text-dharte-primary">
                Sign In to Your Account
              </CardTitle>
              <p className="text-gray-600">
                Enter your email to receive a secure login code
              </p>
            </CardHeader>
            <CardContent>
              {step === 'email' ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className={error ? 'border-red-500' : ''}
                    />
                  </div>
                  
                  {error && (
                    <p className="text-sm text-red-500">{error}</p>
                  )}
                  
                  <Button
                    onClick={handleSendOTP}
                    disabled={isLoading || !email}
                    className="w-full bg-dharte-primary hover:bg-dharte-primary/90"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending Code...
                      </>
                    ) : (
                      <>
                        <Mail className="h-4 w-4 mr-2" />
                        Send Login Code
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="otp">Enter 6-digit code</Label>
                    <Input
                      id="otp"
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="123456"
                      className={error ? 'border-red-500' : ''}
                      maxLength={6}
                    />
                    <p className="text-sm text-gray-600 mt-1">
                      Code sent to {email}
                    </p>
                  </div>
                  
                  {error && (
                    <p className="text-sm text-red-500">{error}</p>
                  )}
                  
                  <Button
                    onClick={handleVerifyOTP}
                    disabled={isLoading || otp.length !== 6}
                    className="w-full bg-dharte-primary hover:bg-dharte-primary/90"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Verifying...
                      </>
                    ) : (
                      'Verify & Sign In'
                    )}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    onClick={() => setStep('email')}
                    className="w-full"
                  >
                    Back to Email
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-playfair font-bold text-dharte-primary">
              My Account
            </h1>
            <p className="text-gray-600">Welcome back, {user.email}</p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="border-dharte-primary text-dharte-primary hover:bg-dharte-primary hover:text-white"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>

        <Tabs defaultValue="tickets" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="tickets">My Tickets</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="tickets">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Ticket className="h-5 w-5 mr-2" />
                    My Tickets ({orders.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {orders.length === 0 ? (
                    <div className="text-center py-8">
                      <Ticket className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-600 mb-2">No tickets yet</h3>
                      <p className="text-gray-500 mb-4">Book your first wellness event to see your tickets here</p>
                      <Button className="bg-dharte-primary hover:bg-dharte-primary/90">
                        Browse Events
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {orders.map((order) => (
                        <div key={order.id} className="border border-gray-200 rounded-lg p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className="font-semibold text-dharte-primary">Order #{order.id}</h3>
                              <p className="text-sm text-gray-600">
                                Purchased on {formatDate(order.createdAt)}
                              </p>
                            </div>
                            <Badge variant="outline" className="text-dharte-success border-dharte-success">
                              {order.status}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Order Items */}
                            <div className="lg:col-span-2">
                              <h4 className="font-medium mb-3">Event Details</h4>
                              <div className="space-y-3">
                                {order.items.map((item, index) => (
                                  <div key={index} className="bg-dharte-surface rounded-lg p-4">
                                    <div className="flex justify-between items-start mb-2">
                                      <h5 className="font-semibold">{item.eventTitle}</h5>
                                      <span className="font-semibold text-dharte-primary">
                                        {formatCurrency(item.price * item.quantity)}
                                      </span>
                                    </div>
                                    <div className="text-sm text-gray-600 space-y-1">
                                      <p><span className="font-medium">Ticket:</span> {item.tierName}</p>
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

                            {/* QR Code */}
                            <div className="text-center">
                              <h4 className="font-medium mb-3">E-Ticket</h4>
                              <div className="bg-white p-4 rounded-lg border-2 border-dashed border-dharte-accent/30 inline-block">
                                <QRCode
                                  value={`https://dharte.com/verify/${order.id}`}
                                  size={120}
                                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                />
                              </div>
                              <p className="text-xs text-gray-500 mt-2">
                                Show at event entrance
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="profile">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Email Address</Label>
                        <div className="flex items-center mt-1">
                          <Mail className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-gray-900">{user.email}</span>
                        </div>
                      </div>
                      <div>
                        <Label>Member Since</Label>
                        <div className="flex items-center mt-1">
                          <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-gray-900">{formatDate(user.loginAt || new Date().toISOString())}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <h3 className="font-semibold text-dharte-primary mb-3">Account Statistics</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-dharte-surface rounded-lg">
                          <div className="text-2xl font-bold text-dharte-primary">{orders.length}</div>
                          <div className="text-sm text-gray-600">Total Orders</div>
                        </div>
                        <div className="text-center p-4 bg-dharte-surface rounded-lg">
                          <div className="text-2xl font-bold text-dharte-primary">
                            {orders.reduce((sum, order) => sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0)}
                          </div>
                          <div className="text-sm text-gray-600">Events Attended</div>
                        </div>
                        <div className="text-center p-4 bg-dharte-surface rounded-lg">
                          <div className="text-2xl font-bold text-dharte-primary">
                            {formatCurrency(orders.reduce((sum, order) => sum + order.total, 0))}
                          </div>
                          <div className="text-sm text-gray-600">Total Spent</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
