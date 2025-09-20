import { useState, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Calendar, MapPin, Users, Search, Filter, X } from 'lucide-react'
import useStore from '../lib/store'
import { formatDate, formatCurrency, isEventToday, isEventThisWeekend, isEventNext7Days } from '../lib/utils'

export default function EventsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { getPublishedEvents, taxonomy } = useStore()
  const events = getPublishedEvents()

  // Filter states
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [selectedCity, setSelectedCity] = useState(searchParams.get('city') || 'all')
  const [isOnline, setIsOnline] = useState(searchParams.get('online') === 'true')
  const [dateFilter, setDateFilter] = useState(searchParams.get('date') || 'all')
  const [priceFilter, setPriceFilter] = useState(searchParams.get('price') || 'all')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all')
  const [selectedSubcategory, setSelectedSubcategory] = useState(searchParams.get('subcategory') || 'all')
  const [selectedEventType, setSelectedEventType] = useState(searchParams.get('type') || 'all')
  const [showFilters, setShowFilters] = useState(false)

  // Get unique cities
  const cities = useMemo(() => {
    const citySet = new Set(events.filter(e => !e.online_bool).map(e => e.city))
    return Array.from(citySet).sort()
  }, [events])

  // Get subcategories for selected category
  const subcategories = useMemo(() => {
    if (selectedCategory === 'all') return []
    const category = taxonomy.categories.find(c => c.slug === selectedCategory)
    return category?.subcategories || []
  }, [selectedCategory, taxonomy])

  // Filter events
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      // Search query
      if (searchQuery && !event.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !event.short_desc.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }

      // City/Online filter
      if (isOnline && !event.online_bool) return false
      if (selectedCity !== 'all' && event.city !== selectedCity) return false

      // Date filter
      if (dateFilter === 'today' && !isEventToday(event.start_dt)) return false
      if (dateFilter === 'weekend' && !isEventThisWeekend(event.start_dt)) return false
      if (dateFilter === 'next7' && !isEventNext7Days(event.start_dt)) return false

      // Price filter
      const minPrice = Math.min(...event.ticket_tiers.map(t => t.price_inr))
      if (priceFilter === 'free' && minPrice > 0) return false
      if (priceFilter === 'paid' && minPrice === 0) return false

      // Category filter
      if (selectedCategory !== 'all' && event.category_slug !== selectedCategory) return false

      // Subcategory filter
      if (selectedSubcategory !== 'all' && event.subcategory_slug !== selectedSubcategory) return false

      // Event type filter
      if (selectedEventType !== 'all' && event.event_type_slug !== selectedEventType) return false

      return true
    })
  }, [events, searchQuery, selectedCity, isOnline, dateFilter, priceFilter, selectedCategory, selectedSubcategory, selectedEventType])

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCity('all')
    setIsOnline(false)
    setDateFilter('all')
    setPriceFilter('all')
    setSelectedCategory('all')
    setSelectedSubcategory('all')
    setSelectedEventType('all')
    setSearchParams({})
  }

  const hasActiveFilters = searchQuery || selectedCity !== 'all' || isOnline || 
    dateFilter !== 'all' || priceFilter !== 'all' || selectedCategory !== 'all' || 
    selectedSubcategory !== 'all' || selectedEventType !== 'all'

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-playfair font-bold text-dharte-primary mb-4">
            All Events
          </h1>
          <p className="text-lg text-gray-600">
            Discover transformative wellness experiences from around the world
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-dharte-primary flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </h2>
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-dharte-accent hover:text-dharte-accent/80"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Clear
                  </Button>
                )}
              </div>

              <div className="space-y-6">
                {/* Search */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Search Events
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search by title or description..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Location
                  </label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="online"
                        checked={isOnline}
                        onCheckedChange={setIsOnline}
                      />
                      <label htmlFor="online" className="text-sm">Online Events</label>
                    </div>
                    <Select value={selectedCity} onValueChange={setSelectedCity}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Cities</SelectItem>
                        {cities.map(city => (
                          <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Date
                  </label>
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Dates</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="weekend">This Weekend</SelectItem>
                      <SelectItem value="next7">Next 7 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Price */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Price
                  </label>
                  <Select value={priceFilter} onValueChange={setPriceFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Prices</SelectItem>
                      <SelectItem value="free">Free</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Category */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Category
                  </label>
                  <Select value={selectedCategory} onValueChange={(value) => {
                    setSelectedCategory(value)
                    setSelectedSubcategory('all')
                  }}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {taxonomy.categories.map(category => (
                        <SelectItem key={category.slug} value={category.slug}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Subcategory */}
                {subcategories.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Subcategory
                    </label>
                    <Select value={selectedSubcategory} onValueChange={setSelectedSubcategory}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Subcategories</SelectItem>
                        {subcategories.map(subcategory => (
                          <SelectItem key={subcategory.slug} value={subcategory.slug}>
                            {subcategory.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Event Type */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Event Type
                  </label>
                  <Select value={selectedEventType} onValueChange={setSelectedEventType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      {taxonomy.event_types.map(type => (
                        <SelectItem key={type.slug} value={type.slug}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Events Grid */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600">
                {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} found
              </p>
            </div>

            {filteredEvents.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No events found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your filters to see more results</p>
                <Button onClick={clearFilters} variant="outline">
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                  <Card key={event.slug} className="group hover:shadow-lg transition-shadow duration-300 border-0 shadow-sm">
                    <CardHeader className="p-0">
                      <div className="aspect-video bg-gradient-to-br from-dharte-surface to-dharte-accent/10 rounded-t-lg flex items-center justify-center">
                        <div className="text-center p-6">
                          <Calendar className="h-12 w-12 text-dharte-accent mx-auto mb-2" />
                          <p className="text-sm text-gray-600">
                            {formatDate(event.start_dt, 'MMM dd')}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary" className="text-xs">
                          {taxonomy.event_types.find(t => t.slug === event.event_type_slug)?.name}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {taxonomy.categories.find(c => c.slug === event.category_slug)?.name}
                        </Badge>
                      </div>
                      
                      <CardTitle className="text-xl font-playfair mb-2 group-hover:text-dharte-accent transition-colors">
                        {event.title}
                      </CardTitle>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {event.short_desc}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {event.online_bool ? 'Online' : `${event.city}, ${event.country}`}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {event.ticket_tiers[0]?.qty_total || 0} spots
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-semibold text-dharte-primary">
                            {formatCurrency(event.ticket_tiers[0]?.price_inr || 0)}
                          </span>
                          <span className="text-sm text-gray-500 ml-1">onwards</span>
                        </div>
                        <Link to={`/events/${event.slug}`}>
                          <Button size="sm" variant="outline" className="border-dharte-primary text-dharte-primary hover:bg-dharte-primary hover:text-white">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
