import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Building, MapPin, Users, ArrowRight, Filter, Star, Globe, Award } from 'lucide-react'

export default function PromotersPage() {
  const [selectedType, setSelectedType] = useState('All')
  
  const types = ['All', 'Event Organizers', 'Wellness Centers', 'Retreat Centers', 'Corporate Partners', 'Media Partners']
  
  // Sample promoters data
  const promoters = [
    {
      id: 1,
      name: 'Dharte Foundation',
      type: 'Event Organizers',
      location: 'Mumbai, India',
      rating: 4.9,
      events: 50,
      image: '/images/promoter-1.jpg',
      description: 'Advancing human potential through disciplined study and practice in the wellness sciences. Established 1941.',
      website: 'dharte.com',
      specialties: ['Wellness Events', 'Conscious Business', 'Community Building'],
      featured: true,
      established: '1941'
    },
    {
      id: 2,
      name: 'Himalayan Wellness Retreats',
      type: 'Retreat Centers',
      location: 'Dharamshala, India',
      rating: 4.8,
      events: 24,
      image: '/images/promoter-2.jpg',
      description: 'Creating transformative mountain retreat experiences in the heart of the Himalayas.',
      website: 'himalayanwellness.com',
      specialties: ['Mountain Retreats', 'Meditation', 'Yoga'],
      featured: true,
      established: '2015'
    },
    {
      id: 3,
      name: 'Conscious Living Media',
      type: 'Media Partners',
      location: 'Bangalore, India',
      rating: 4.7,
      events: 35,
      image: '/images/promoter-3.jpg',
      description: 'Leading wellness media platform connecting conscious communities across India.',
      website: 'consciousliving.in',
      specialties: ['Media Coverage', 'Content Creation', 'Community Outreach'],
      featured: false,
      established: '2018'
    },
    {
      id: 4,
      name: 'Goa Wellness Hub',
      type: 'Wellness Centers',
      location: 'Goa, India',
      rating: 4.8,
      events: 42,
      image: '/images/promoter-4.jpg',
      description: 'Premier wellness destination offering holistic healing and transformative experiences.',
      website: 'goawellnesshub.com',
      specialties: ['Holistic Healing', 'Ayurveda', 'Beach Wellness'],
      featured: true,
      established: '2012'
    },
    {
      id: 5,
      name: 'Mindful Corporate Solutions',
      type: 'Corporate Partners',
      location: 'Delhi, India',
      rating: 4.6,
      events: 18,
      image: '/images/promoter-5.jpg',
      description: 'Bringing wellness and mindfulness practices to corporate environments.',
      website: 'mindfulcorp.in',
      specialties: ['Corporate Wellness', 'Team Building', 'Stress Management'],
      featured: false,
      established: '2019'
    },
    {
      id: 6,
      name: 'Sacred Spaces Events',
      type: 'Event Organizers',
      location: 'Rishikesh, India',
      rating: 4.9,
      events: 31,
      image: '/images/promoter-6.jpg',
      description: 'Curating sacred experiences and spiritual gatherings in the yoga capital of the world.',
      website: 'sacredspaces.in',
      specialties: ['Spiritual Events', 'Sacred Ceremonies', 'Yoga Festivals'],
      featured: false,
      established: '2016'
    }
  ]
  
  const filteredPromoters = selectedType === 'All' 
    ? promoters 
    : promoters.filter(promoter => promoter.type === selectedType)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20" style={{backgroundColor: '#092d1f'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Our Promoters & Partners
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Discover the organizations, venues, and partners who make our transformative 
              wellness experiences possible across India and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold" style={{color: '#092d1f'}}>
              All Partners ({filteredPromoters.length})
            </h2>
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <span className="text-gray-500">Filter by type</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedType === type
                    ? 'text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                style={{
                  backgroundColor: selectedType === type ? '#092d1f' : undefined
                }}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Promoters Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPromoters.map((promoter) => (
              <div key={promoter.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Promoter Image */}
                <div className="h-48 bg-gradient-to-br from-green-100 to-green-200 relative overflow-hidden">
                  {promoter.image ? (
                    <img 
                      src={promoter.image} 
                      alt={promoter.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-6xl opacity-50">🏢</div>
                    </div>
                  )}
                  {promoter.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-sm font-semibold flex items-center">
                        <Award className="h-3 w-3 mr-1" />
                        Featured
                      </span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold" style={{color: '#092d1f'}}>
                      {promoter.type}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-sm font-semibold">{promoter.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Promoter Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2" style={{color: '#092d1f'}}>
                    {promoter.name}
                  </h3>
                  
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    {promoter.location}
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {promoter.description}
                  </p>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {promoter.specialties.slice(0, 2).map((specialty) => (
                      <span 
                        key={specialty}
                        className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                    {promoter.specialties.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                        +{promoter.specialties.length - 2} more
                      </span>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {promoter.events} events
                    </div>
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-1" />
                      Est. {promoter.established}
                    </div>
                  </div>

                  {/* Website & CTA */}
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-500">
                      <Globe className="h-4 w-4 mr-2" />
                      <a 
                        href={`https://${promoter.website}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {promoter.website}
                      </a>
                    </div>
                    
                    <button 
                      className="w-full inline-flex items-center justify-center px-6 py-3 font-semibold text-white rounded-lg transition-colors hover:opacity-90"
                      style={{backgroundColor: '#092d1f'}}
                    >
                      Partner with Us
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPromoters.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🏢</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No partners found</h3>
              <p className="text-gray-600">Try selecting a different type or check back later.</p>
            </div>
          )}
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{color: '#092d1f'}}>
              Partnership Benefits
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join our network and unlock exclusive opportunities to grow your wellness business
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{backgroundColor: '#092d1f'}}>
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{color: '#092d1f'}}>
                Access to Community
              </h3>
              <p className="text-gray-600">
                Connect with thousands of wellness seekers and conscious consumers
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{backgroundColor: '#092d1f'}}>
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{color: '#092d1f'}}>
                Marketing Support
              </h3>
              <p className="text-gray-600">
                Leverage our platform and marketing channels to reach your audience
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{backgroundColor: '#092d1f'}}>
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{color: '#092d1f'}}>
                Brand Recognition
              </h3>
              <p className="text-gray-600">
                Build credibility and trust through association with our established brand
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16" style={{backgroundColor: '#092d1f'}}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Become a Partner
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join our network of wellness organizations and help us create transformative 
            experiences for conscious communities worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="inline-flex items-center px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Apply for Partnership
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <Link 
              to="/events"
              className="inline-flex items-center px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition-colors"
            >
              View Our Events
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
