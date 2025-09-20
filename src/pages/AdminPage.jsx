import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react'
import useStore from '../lib/store'
import { formatCurrency, formatDate, generateSlug } from '../lib/utils'

export default function AdminPage() {
  const { events, taxonomy, addEvent, updateEvent, deleteEvent, isAuthenticated, user } = useStore()
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingEvent, setEditingEvent] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    short_desc: '',
    long_desc: '',
    organizer: '',
    start_dt: '',
    end_dt: '',
    city: '',
    country: 'India',
    venue_text: '',
    online_bool: false,
    category_slug: '',
    subcategory_slug: '',
    event_type_slug: '',
    ticket_tiers: [{ name: 'General', price_inr: 0, qty_total: 100, min_per_order: 1, max_per_order: 10 }]
  })

  // Simple admin check - in a real app, this would be more secure
  const isAdmin = isAuthenticated && (user?.email === 'admin@dharte.com' || user?.email?.includes('admin'))

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="text-center p-8">
            <h1 className="text-2xl font-bold text-dharte-primary mb-4">Admin Access Required</h1>
            <p className="text-gray-600 mb-6">Please sign in with an admin account to access this page.</p>
            <Button className="bg-dharte-primary hover:bg-dharte-primary/90">
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="text-center p-8">
            <h1 className="text-2xl font-bold text-dharte-primary mb-4">Access Denied</h1>
            <p className="text-gray-600 mb-6">You don't have permission to access the admin panel.</p>
            <Button onClick={() => window.history.back()}>
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleTierChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      ticket_tiers: prev.ticket_tiers.map((tier, i) => 
        i === index ? { ...tier, [field]: value } : tier
      )
    }))
  }

  const addTier = () => {
    setFormData(prev => ({
      ...prev,
      ticket_tiers: [...prev.ticket_tiers, { 
        name: '', 
        price_inr: 0, 
        qty_total: 100, 
        min_per_order: 1, 
        max_per_order: 10 
      }]
    }))
  }

  const removeTier = (index) => {
    setFormData(prev => ({
      ...prev,
      ticket_tiers: prev.ticket_tiers.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = () => {
    const slug = generateSlug(formData.title)
    const eventData = {
      ...formData,
      slug,
      sales_start_dt: new Date().toISOString(),
      sales_end_dt: formData.start_dt,
      timezone: 'Asia/Kolkata',
      cover_image_url: '',
      ticket_tiers: formData.ticket_tiers.map(tier => ({
        ...tier,
        sales_start_dt: new Date().toISOString(),
        sales_end_dt: formData.start_dt
      }))
    }

    if (editingEvent) {
      updateEvent(editingEvent.slug, eventData)
      setEditingEvent(null)
    } else {
      addEvent(eventData)
    }

    setFormData({
      title: '',
      short_desc: '',
      long_desc: '',
      organizer: '',
      start_dt: '',
      end_dt: '',
      city: '',
      country: 'India',
      venue_text: '',
      online_bool: false,
      category_slug: '',
      subcategory_slug: '',
      event_type_slug: '',
      ticket_tiers: [{ name: 'General', price_inr: 0, qty_total: 100, min_per_order: 1, max_per_order: 10 }]
    })
    setShowAddForm(false)
  }

  const startEdit = (event) => {
    setFormData({
      title: event.title,
      short_desc: event.short_desc,
      long_desc: event.long_desc,
      organizer: event.organizer,
      start_dt: event.start_dt.slice(0, 16),
      end_dt: event.end_dt?.slice(0, 16) || '',
      city: event.city,
      country: event.country,
      venue_text: event.venue_text,
      online_bool: event.online_bool,
      category_slug: event.category_slug,
      subcategory_slug: event.subcategory_slug,
      event_type_slug: event.event_type_slug,
      ticket_tiers: event.ticket_tiers
    })
    setEditingEvent(event)
    setShowAddForm(true)
  }

  const togglePublished = (event) => {
    updateEvent(event.slug, { published: !event.published })
  }

  const subcategories = formData.category_slug 
    ? taxonomy.categories.find(c => c.slug === formData.category_slug)?.subcategories || []
    : []

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-playfair font-bold text-dharte-primary">Admin Panel</h1>
            <p className="text-gray-600">Manage events and content</p>
          </div>
          <Button
            onClick={() => setShowAddForm(true)}
            className="bg-dharte-primary hover:bg-dharte-primary/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        </div>

        <Tabs defaultValue="events" className="space-y-6">
          <TabsList>
            <TabsTrigger value="events">Events ({events.length})</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="events">
            {showAddForm && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>
                    {editingEvent ? 'Edit Event' : 'Add New Event'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <Label htmlFor="title">Event Title</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="Event title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="organizer">Organizer</Label>
                      <Input
                        id="organizer"
                        value={formData.organizer}
                        onChange={(e) => handleInputChange('organizer', e.target.value)}
                        placeholder="Organizer name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="start_dt">Start Date & Time</Label>
                      <Input
                        id="start_dt"
                        type="datetime-local"
                        value={formData.start_dt}
                        onChange={(e) => handleInputChange('start_dt', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="end_dt">End Date & Time</Label>
                      <Input
                        id="end_dt"
                        type="datetime-local"
                        value={formData.end_dt}
                        onChange={(e) => handleInputChange('end_dt', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        placeholder="City name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="venue_text">Venue</Label>
                      <Input
                        id="venue_text"
                        value={formData.venue_text}
                        onChange={(e) => handleInputChange('venue_text', e.target.value)}
                        placeholder="Venue details"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select value={formData.category_slug} onValueChange={(value) => {
                        handleInputChange('category_slug', value)
                        handleInputChange('subcategory_slug', '')
                      }}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {taxonomy.categories.map(category => (
                            <SelectItem key={category.slug} value={category.slug}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="subcategory">Subcategory</Label>
                      <Select value={formData.subcategory_slug} onValueChange={(value) => handleInputChange('subcategory_slug', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select subcategory" />
                        </SelectTrigger>
                        <SelectContent>
                          {subcategories.map(subcategory => (
                            <SelectItem key={subcategory.slug} value={subcategory.slug}>
                              {subcategory.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="event_type">Event Type</Label>
                      <Select value={formData.event_type_slug} onValueChange={(value) => handleInputChange('event_type_slug', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                        <SelectContent>
                          {taxonomy.event_types.map(type => (
                            <SelectItem key={type.slug} value={type.slug}>
                              {type.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="mb-6">
                    <Label htmlFor="short_desc">Short Description</Label>
                    <Textarea
                      id="short_desc"
                      value={formData.short_desc}
                      onChange={(e) => handleInputChange('short_desc', e.target.value)}
                      placeholder="Brief event description"
                      rows={2}
                    />
                  </div>

                  <div className="mb-6">
                    <Label htmlFor="long_desc">Long Description</Label>
                    <Textarea
                      id="long_desc"
                      value={formData.long_desc}
                      onChange={(e) => handleInputChange('long_desc', e.target.value)}
                      placeholder="Detailed event description"
                      rows={4}
                    />
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <Label>Ticket Tiers</Label>
                      <Button onClick={addTier} size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Tier
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {formData.ticket_tiers.map((tier, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-6 gap-2 p-4 border rounded-lg">
                          <Input
                            placeholder="Tier name"
                            value={tier.name}
                            onChange={(e) => handleTierChange(index, 'name', e.target.value)}
                          />
                          <Input
                            type="number"
                            placeholder="Price (₹)"
                            value={tier.price_inr}
                            onChange={(e) => handleTierChange(index, 'price_inr', parseInt(e.target.value) || 0)}
                          />
                          <Input
                            type="number"
                            placeholder="Total qty"
                            value={tier.qty_total}
                            onChange={(e) => handleTierChange(index, 'qty_total', parseInt(e.target.value) || 0)}
                          />
                          <Input
                            type="number"
                            placeholder="Min order"
                            value={tier.min_per_order}
                            onChange={(e) => handleTierChange(index, 'min_per_order', parseInt(e.target.value) || 1)}
                          />
                          <Input
                            type="number"
                            placeholder="Max order"
                            value={tier.max_per_order}
                            onChange={(e) => handleTierChange(index, 'max_per_order', parseInt(e.target.value) || 1)}
                          />
                          <Button
                            onClick={() => removeTier(index)}
                            size="sm"
                            variant="outline"
                            disabled={formData.ticket_tiers.length === 1}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button onClick={handleSubmit} className="bg-dharte-primary hover:bg-dharte-primary/90">
                      {editingEvent ? 'Update Event' : 'Create Event'}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowAddForm(false)
                        setEditingEvent(null)
                        setFormData({
                          title: '',
                          short_desc: '',
                          long_desc: '',
                          organizer: '',
                          start_dt: '',
                          end_dt: '',
                          city: '',
                          country: 'India',
                          venue_text: '',
                          online_bool: false,
                          category_slug: '',
                          subcategory_slug: '',
                          event_type_slug: '',
                          ticket_tiers: [{ name: 'General', price_inr: 0, qty_total: 100, min_per_order: 1, max_per_order: 10 }]
                        })
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 gap-4">
              {events.map((event) => (
                <Card key={event.slug}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-dharte-primary">{event.title}</h3>
                          <Badge variant={event.published ? "default" : "secondary"}>
                            {event.published ? 'Published' : 'Draft'}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{event.short_desc}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{formatDate(event.start_dt)}</span>
                          <span>{event.city}, {event.country}</span>
                          <span>{formatCurrency(event.ticket_tiers[0]?.price_inr || 0)} onwards</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          onClick={() => togglePublished(event)}
                          size="sm"
                          variant="outline"
                        >
                          {event.published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Button
                          onClick={() => startEdit(event)}
                          size="sm"
                          variant="outline"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => deleteEvent(event.slug)}
                          size="sm"
                          variant="outline"
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-dharte-primary mb-2">
                    {events.filter(e => e.published).length}
                  </div>
                  <div className="text-gray-600">Published Events</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-dharte-primary mb-2">
                    {events.filter(e => !e.published).length}
                  </div>
                  <div className="text-gray-600">Draft Events</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-dharte-primary mb-2">
                    {events.length}
                  </div>
                  <div className="text-gray-600">Total Events</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
