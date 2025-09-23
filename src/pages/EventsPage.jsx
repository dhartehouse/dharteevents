import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, MapPin, Users, ArrowRight, Filter } from 'lucide-react'
import useStore from '../lib/store'

export default function EventsPage() {
  const { events } = useStore()
  const [selectedCategory, setSelectedCategory] = useState('All')
  
  const categories = ['All', 'Alternative Medicine', 'Yoga + Meditation', 'Healing + Therapy', 'Arts', 'Nutrition', 'Sustainability', 'Music', 'Movement', 'Community']
  
  const filteredEvents = selectedCategory === 'All' 
    ? events 
    : events.filter(event => event.categories?.includes(selectedCategory))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20" style={{backgroundColor: '#092d1f'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Discover Extraordinary Events
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Join thousands of attendees experiencing transformative festivals, immersive workshops, 
              and exclusive gatherings across India's most beautiful locations.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold" style={{color: '#092d1f'}}>
              All Events ({filteredEvents.length})
            </h2>
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <span className="text-gray-500">Filter by category</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                style={{
                  backgroundColor: selectedCategory === category ? '#092d1f' : undefined
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Event Image */}
                <div className="h-48 bg-gradient-to-br from-green-100 to-green-200 relative overflow-hidden">
                  {event.image ? (
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-6xl opacity-50">🎪</div>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold" style={{color: '#092d1f'}}>
                      {event.city}
                    </span>
                  </div>
                  {event.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-sm font-semibold">
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                {/* Event Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3" style={{color: '#092d1f'}}>
                    {event.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {event.description}
                  </p>

                  {/* Event Details */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(event.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                      {event.endDate && ` - ${new Date(event.endDate).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric'
                      })}`}
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.location}
                    </div>
                    {event.host && (
                      <div className="flex items-center text-gray-500 text-sm">
                        <Users className="h-4 w-4 mr-2" />
                        Hosted by {event.host}
                      </div>
                    )}
                  </div>

                  {/* Categories */}
                  {event.categories && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {event.categories.slice(0, 3).map((category) => (
                        <span 
                          key={category}
                          className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium"
                        >
                          {category}
                        </span>
                      ))}
                      {event.categories.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                          +{event.categories.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Pricing */}
                  {event.ticketTypes && event.ticketTypes.length > 0 && (
                    <div className="mb-6">
                      <div className="text-sm text-gray-500 mb-1">Starting from</div>
                      <div className="text-2xl font-bold" style={{color: '#092d1f'}}>
                        ₹{Math.min(...event.ticketTypes.map(t => t.price)).toLocaleString()}
                      </div>
                    </div>
                  )}

                  {/* CTA Button */}
                  <Link 
                    to={`/events/${event.slug}`}
                    className="w-full inline-flex items-center justify-center px-6 py-3 font-semibold text-white rounded-lg transition-colors hover:opacity-90"
                    style={{backgroundColor: '#092d1f'}}
                  >
                    View Details & Book
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🎪</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No events found</h3>
              <p className="text-gray-600">Try selecting a different category or check back later for new events.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16" style={{backgroundColor: '#092d1f'}}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Wellness Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of like-minded individuals in extraordinary experiences that nurture mind, body, and spirit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/facilitators"
              className="inline-flex items-center px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Meet Our Facilitators
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              to="/houses"
              className="inline-flex items-center px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition-colors"
            >
              Explore Retreat Houses
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
