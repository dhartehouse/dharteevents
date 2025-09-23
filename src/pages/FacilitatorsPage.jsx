import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Star, MapPin, Users, ArrowRight, Filter, Heart, Award } from 'lucide-react'

export default function FacilitatorsPage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState('All')
  
  const specialties = ['All', 'Tantra', 'Yoga', 'Meditation', 'Healing', 'Sound Therapy', 'Art Therapy', 'Nutrition', 'Movement']
  
  // Sample facilitators data
  const facilitators = [
    {
      id: 1,
      name: 'Satyam Zomerdijk',
      specialty: 'Tantra',
      location: 'Netherlands',
      rating: 4.9,
      reviews: 127,
      image: '/images/facilitator-1.jpg',
      bio: 'Tantra expert from the Netherlands. Guides with a heart-centred presence, inviting softness, clarity, and embodied truth.',
      experience: '8+ years',
      languages: ['English', 'Dutch'],
      featured: true,
      specialties: ['Tantra', 'Conscious Movement', 'Breathwork']
    },
    {
      id: 2,
      name: 'Johnson (Dzen Den)',
      specialty: 'Art Therapy',
      location: 'Dharamshala, India',
      rating: 4.8,
      reviews: 89,
      image: '/images/facilitator-2.jpg',
      bio: 'Creative curator bringing together art, wellness, and community in beautiful Himalayan settings.',
      experience: '6+ years',
      languages: ['English', 'Hindi'],
      featured: true,
      specialties: ['Art Therapy', 'Community Building', 'Creative Expression']
    },
    {
      id: 3,
      name: 'Priya Sharma',
      specialty: 'Yoga',
      location: 'Rishikesh, India',
      rating: 4.9,
      reviews: 203,
      image: '/images/facilitator-3.jpg',
      bio: 'Traditional Hatha Yoga teacher with deep knowledge of ancient practices and modern wellness.',
      experience: '12+ years',
      languages: ['English', 'Hindi', 'Sanskrit'],
      featured: true,
      specialties: ['Hatha Yoga', 'Pranayama', 'Meditation']
    },
    {
      id: 4,
      name: 'Marcus Thompson',
      specialty: 'Sound Therapy',
      location: 'Goa, India',
      rating: 4.7,
      reviews: 156,
      image: '/images/facilitator-4.jpg',
      bio: 'Sound healing practitioner specializing in crystal bowls, gongs, and vibrational therapy.',
      experience: '5+ years',
      languages: ['English'],
      featured: false,
      specialties: ['Sound Healing', 'Crystal Therapy', 'Vibrational Medicine']
    },
    {
      id: 5,
      name: 'Dr. Anjali Patel',
      specialty: 'Nutrition',
      location: 'Mumbai, India',
      rating: 4.8,
      reviews: 178,
      image: '/images/facilitator-5.jpg',
      bio: 'Ayurvedic nutritionist and wellness consultant with expertise in plant-based healing.',
      experience: '10+ years',
      languages: ['English', 'Hindi', 'Gujarati'],
      featured: false,
      specialties: ['Ayurvedic Nutrition', 'Plant-Based Healing', 'Detox Programs']
    },
    {
      id: 6,
      name: 'Elena Rodriguez',
      specialty: 'Movement',
      location: 'Barcelona, Spain',
      rating: 4.9,
      reviews: 134,
      image: '/images/facilitator-6.jpg',
      bio: 'Ecstatic dance facilitator and movement therapist creating spaces for authentic expression.',
      experience: '7+ years',
      languages: ['English', 'Spanish', 'Catalan'],
      featured: false,
      specialties: ['Ecstatic Dance', 'Movement Therapy', 'Somatic Healing']
    }
  ]
  
  const filteredFacilitators = selectedSpecialty === 'All' 
    ? facilitators 
    : facilitators.filter(facilitator => facilitator.specialties.includes(selectedSpecialty))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20" style={{backgroundColor: '#092d1f'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Meet Our Facilitators
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Connect with world-class wellness practitioners, healers, and teachers who guide 
              transformative experiences across our events and retreats.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold" style={{color: '#092d1f'}}>
              All Facilitators ({filteredFacilitators.length})
            </h2>
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <span className="text-gray-500">Filter by specialty</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {specialties.map((specialty) => (
              <button
                key={specialty}
                onClick={() => setSelectedSpecialty(specialty)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedSpecialty === specialty
                    ? 'text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                style={{
                  backgroundColor: selectedSpecialty === specialty ? '#092d1f' : undefined
                }}
              >
                {specialty}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Facilitators Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFacilitators.map((facilitator) => (
              <div key={facilitator.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Facilitator Image */}
                <div className="h-64 bg-gradient-to-br from-green-100 to-green-200 relative overflow-hidden">
                  {facilitator.image ? (
                    <img 
                      src={facilitator.image} 
                      alt={facilitator.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-6xl opacity-50">👤</div>
                    </div>
                  )}
                  {facilitator.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-sm font-semibold flex items-center">
                        <Award className="h-3 w-3 mr-1" />
                        Featured
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4">
                    <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-sm font-semibold">{facilitator.rating}</span>
                      <span className="text-xs text-gray-500 ml-1">({facilitator.reviews})</span>
                    </div>
                  </div>
                </div>

                {/* Facilitator Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2" style={{color: '#092d1f'}}>
                    {facilitator.name}
                  </h3>
                  
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    {facilitator.location}
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {facilitator.bio}
                  </p>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {facilitator.specialties.slice(0, 2).map((specialty) => (
                      <span 
                        key={specialty}
                        className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                    {facilitator.specialties.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                        +{facilitator.specialties.length - 2} more
                      </span>
                    )}
                  </div>

                  {/* Experience & Languages */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {facilitator.experience}
                    </div>
                    <div>
                      {facilitator.languages.join(', ')}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button 
                    className="w-full inline-flex items-center justify-center px-6 py-3 font-semibold text-white rounded-lg transition-colors hover:opacity-90"
                    style={{backgroundColor: '#092d1f'}}
                  >
                    <Heart className="mr-2 h-5 w-5" />
                    Connect with {facilitator.name.split(' ')[0]}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredFacilitators.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">👥</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No facilitators found</h3>
              <p className="text-gray-600">Try selecting a different specialty or check back later.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16" style={{backgroundColor: '#092d1f'}}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Become a Facilitator
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Share your gifts with our community. Join our network of world-class wellness practitioners 
            and guide transformative experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="inline-flex items-center px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Apply to Facilitate
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
