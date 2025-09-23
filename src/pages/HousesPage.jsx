import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Home, MapPin, Users, ArrowRight, Filter, Star, Wifi, Car, Coffee, Mountain, Waves, Trees } from 'lucide-react'

export default function HousesPage() {
  const [selectedLocation, setSelectedLocation] = useState('All')
  
  const locations = ['All', 'Dharamshala', 'Goa', 'Rishikesh', 'Kerala', 'Rajasthan', 'Mumbai']
  
  // Sample houses data
  const houses = [
    {
      id: 1,
      name: 'Himalayan Serenity Retreat',
      location: 'Dharamshala',
      state: 'Himachal Pradesh',
      rating: 4.9,
      reviews: 127,
      price: 3500,
      image: '/images/house-1.jpg',
      description: 'Peaceful mountain retreat with stunning Himalayan views, perfect for meditation and yoga practices.',
      capacity: 20,
      rooms: 8,
      amenities: ['Mountain Views', 'Yoga Studio', 'Meditation Hall', 'Organic Garden', 'WiFi', 'Parking'],
      featured: true,
      type: 'Mountain Retreat',
      icon: Mountain
    },
    {
      id: 2,
      name: 'Goa Beach Wellness Villa',
      location: 'Goa',
      state: 'Goa',
      rating: 4.8,
      reviews: 203,
      price: 4200,
      image: '/images/house-2.jpg',
      description: 'Beachfront villa offering holistic wellness experiences with ocean views and healing therapies.',
      capacity: 15,
      rooms: 6,
      amenities: ['Beach Access', 'Spa Facilities', 'Pool', 'Ayurveda Center', 'WiFi', 'Restaurant'],
      featured: true,
      type: 'Beach Villa',
      icon: Waves
    },
    {
      id: 3,
      name: 'Sacred Ganges Ashram',
      location: 'Rishikesh',
      state: 'Uttarakhand',
      rating: 4.7,
      reviews: 156,
      price: 2800,
      image: '/images/house-3.jpg',
      description: 'Traditional ashram by the Ganges, offering authentic yoga and spiritual practices.',
      capacity: 30,
      rooms: 12,
      amenities: ['River Views', 'Yoga Shalas', 'Meditation Caves', 'Vegetarian Kitchen', 'Library', 'Gardens'],
      featured: false,
      type: 'Spiritual Ashram',
      icon: Trees
    },
    {
      id: 4,
      name: 'Kerala Backwater Sanctuary',
      location: 'Kerala',
      state: 'Kerala',
      rating: 4.8,
      reviews: 89,
      price: 3800,
      image: '/images/house-4.jpg',
      description: 'Tranquil backwater retreat surrounded by lush greenery and traditional Kerala architecture.',
      capacity: 18,
      rooms: 7,
      amenities: ['Backwater Views', 'Ayurveda Treatments', 'Boat Rides', 'Organic Farm', 'WiFi', 'Cultural Programs'],
      featured: true,
      type: 'Backwater Retreat',
      icon: Trees
    },
    {
      id: 5,
      name: 'Rajasthan Desert Oasis',
      location: 'Rajasthan',
      state: 'Rajasthan',
      rating: 4.6,
      reviews: 134,
      price: 4500,
      image: '/images/house-5.jpg',
      description: 'Luxury desert camp offering unique wellness experiences under the starlit Rajashan sky.',
      capacity: 25,
      rooms: 10,
      amenities: ['Desert Views', 'Camel Safaris', 'Star Gazing', 'Cultural Shows', 'Spa Tents', 'Fine Dining'],
      featured: false,
      type: 'Desert Camp',
      icon: Mountain
    },
    {
      id: 6,
      name: 'Mumbai Urban Wellness Hub',
      location: 'Mumbai',
      state: 'Maharashtra',
      rating: 4.5,
      reviews: 178,
      price: 5200,
      image: '/images/house-6.jpg',
      description: 'Modern wellness center in the heart of Mumbai, perfect for corporate retreats and urban escapes.',
      capacity: 40,
      rooms: 15,
      amenities: ['City Views', 'Modern Facilities', 'Conference Rooms', 'Rooftop Garden', 'Gym', 'Restaurant'],
      featured: false,
      type: 'Urban Center',
      icon: Home
    }
  ]
  
  const filteredHouses = selectedLocation === 'All' 
    ? houses 
    : houses.filter(house => house.location === selectedLocation)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20" style={{backgroundColor: '#092d1f'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Retreat Houses & Venues
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Discover beautiful spaces for transformation across India. From mountain retreats 
              to beachfront villas, find the perfect setting for your wellness journey.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold" style={{color: '#092d1f'}}>
              All Houses ({filteredHouses.length})
            </h2>
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <span className="text-gray-500">Filter by location</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {locations.map((location) => (
              <button
                key={location}
                onClick={() => setSelectedLocation(location)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedLocation === location
                    ? 'text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                style={{
                  backgroundColor: selectedLocation === location ? '#092d1f' : undefined
                }}
              >
                {location}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Houses Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredHouses.map((house) => {
              const IconComponent = house.icon
              return (
                <div key={house.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  {/* House Image */}
                  <div className="h-48 bg-gradient-to-br from-green-100 to-green-200 relative overflow-hidden">
                    {house.image ? (
                      <img 
                        src={house.image} 
                        alt={house.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <IconComponent className="h-16 w-16 opacity-50" />
                      </div>
                    )}
                    {house.featured && (
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-sm font-semibold">
                          Featured
                        </span>
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold" style={{color: '#092d1f'}}>
                        {house.type}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="text-sm font-semibold">{house.rating}</span>
                        <span className="text-xs text-gray-500 ml-1">({house.reviews})</span>
                      </div>
                    </div>
                  </div>

                  {/* House Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2" style={{color: '#092d1f'}}>
                      {house.name}
                    </h3>
                    
                    <div className="flex items-center text-gray-500 text-sm mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      {house.location}, {house.state}
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {house.description}
                    </p>

                    {/* Capacity & Rooms */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        Up to {house.capacity} guests
                      </div>
                      <div className="flex items-center">
                        <Home className="h-4 w-4 mr-1" />
                        {house.rooms} rooms
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {house.amenities.slice(0, 3).map((amenity) => (
                        <span 
                          key={amenity}
                          className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium"
                        >
                          {amenity}
                        </span>
                      ))}
                      {house.amenities.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                          +{house.amenities.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Price */}
                    <div className="mb-6">
                      <div className="text-sm text-gray-500 mb-1">Starting from</div>
                      <div className="text-2xl font-bold" style={{color: '#092d1f'}}>
                        ₹{house.price.toLocaleString()}
                        <span className="text-sm text-gray-500 font-normal">/night</span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button 
                      className="w-full inline-flex items-center justify-center px-6 py-3 font-semibold text-white rounded-lg transition-colors hover:opacity-90"
                      style={{backgroundColor: '#092d1f'}}
                    >
                      Book This House
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {filteredHouses.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🏠</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No houses found</h3>
              <p className="text-gray-600">Try selecting a different location or check back later.</p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{color: '#092d1f'}}>
              Why Choose Our Retreat Houses
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Every space is carefully selected to provide the perfect environment for transformation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{backgroundColor: '#092d1f'}}>
                <Mountain className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{color: '#092d1f'}}>
                Sacred Locations
              </h3>
              <p className="text-gray-600">
                Handpicked locations with natural beauty and spiritual significance
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{backgroundColor: '#092d1f'}}>
                <Wifi className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{color: '#092d1f'}}>
                Modern Amenities
              </h3>
              <p className="text-gray-600">
                Comfortable accommodations with all necessary facilities for your stay
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{backgroundColor: '#092d1f'}}>
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{color: '#092d1f'}}>
                Community Spaces
              </h3>
              <p className="text-gray-600">
                Designed for connection, sharing, and building meaningful relationships
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16" style={{backgroundColor: '#092d1f'}}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            List Your Property
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Do you have a beautiful space perfect for wellness retreats? Join our network 
            of retreat houses and welcome conscious travelers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="inline-flex items-center px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              List Your Property
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <Link 
              to="/events"
              className="inline-flex items-center px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition-colors"
            >
              View Upcoming Events
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
