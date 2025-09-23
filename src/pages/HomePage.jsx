import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, MapPin, Users } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Beautiful Hero Section */}
      <section className="hero-section relative min-h-screen flex items-center justify-center overflow-fix" style={{backgroundColor: '#092d1f'}}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full border border-white/20"></div>
          <div className="absolute top-40 right-20 w-24 h-24 rounded-full border border-white/20"></div>
          <div className="absolute bottom-40 left-20 w-20 h-20 rounded-full border border-white/20"></div>
          <div className="absolute bottom-20 right-10 w-28 h-28 rounded-full border border-white/20"></div>
        </div>

        <div className="relative z-10 container-fix text-center">
          <div className="max-w-4xl mx-auto space-responsive">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full mb-8">
              <span className="text-sm font-semibold text-white tracking-wider uppercase">
                ✨ Premium Wellness Events ✨
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="hero-title text-5xl md:text-7xl font-bold text-white mb-6 leading-tight text-responsive-4xl">
              dharte Fest
            </h1>
            
            <h2 className="hero-subtitle text-2xl md:text-3xl text-white/90 mb-8 font-light text-responsive-xl">
              Where wellness, art, and conscious business converge in transformative experiences
            </h2>

            {/* Subtitle */}
            <p className="text-xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              Immerse yourself in transformative wellness experiences across India's most beautiful locations. 
              Join thousands experiencing festivals, workshops, and exclusive gatherings.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 gap-responsive">
              <Link 
                to="/events"
                className="btn-responsive inline-flex items-center px-8 py-4 bg-white text-black font-semibold text-lg rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Calendar className="mr-3 h-6 w-6" />
                Explore All Events
                <ArrowRight className="ml-3 h-6 w-6" />
              </Link>
              
              <Link 
                to="/facilitators"
                className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold text-lg rounded-xl hover:bg-white hover:text-black transition-all duration-300"
              >
                <Users className="mr-3 h-6 w-6" />
                Meet Facilitators
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">30+</div>
                <div className="text-white/70">Exhibitors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">50+</div>
                <div className="text-white/70">Speakers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">2</div>
                <div className="text-white/70">Cities</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Preview */}
      <section className="py-20 bg-white overflow-fix">
        <div className="container-fix">
          <div className="text-center mb-16 space-responsive">
            <h2 className="text-4xl font-bold mb-4 text-responsive-3xl" style={{color: '#092d1f'}}>
              Upcoming dharte Fest
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto text-responsive-lg">
              Immerse yourself in transformative wellness experiences across India's most beautiful locations
            </p>
          </div>

          <div className="card-grid md:grid-cols-2">
            {/* Mumbai Event */}
            <div className="event-card bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                    Mumbai
                  </span>
                  <span className="text-gray-500">Sep 27, 2025</span>
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{color: '#092d1f'}}>
                  Dharte Fest - Tune Your Frequency
                </h3>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-5 w-5 mr-2" />
                  Radio Club, Mumbai
                </div>
                <div className="flex items-center text-gray-600 mb-6">
                  <Calendar className="h-5 w-5 mr-2" />
                  12:00 PM - 9:00 PM
                </div>
                <p className="text-gray-600 mb-6">
                  A one-day field of resonance where wellness, art, and conscious business meet. 
                  Reset your nervous system, expand your heart, and build real-world partnerships.
                </p>
                <Link 
                  to="/events/mumbai-dharte-fest"
                  className="inline-flex items-center px-6 py-3 font-semibold text-white rounded-lg transition-colors"
                  style={{backgroundColor: '#092d1f'}}
                >
                  View Details
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* Dharamshala Event */}
            <div className="event-card bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                    Dharamshala
                  </span>
                  <span className="text-gray-500">Oct 31 - Nov 2, 2025</span>
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{color: '#092d1f'}}>
                  Dharte Fest Dharamshala - DAWF
                </h3>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-5 w-5 mr-2" />
                  Dharamkot, Dharamshala
                </div>
                <div className="flex items-center text-gray-600 mb-6">
                  <Calendar className="h-5 w-5 mr-2" />
                  9:00 AM - 9:00 PM (3 Days)
                </div>
                <p className="text-gray-600 mb-6">
                  A three-day mountain retreat festival blending music, healing, movement, and art. 
                  Foster community, creativity, and inner well-being in the Himalayas.
                </p>
                <Link 
                  to="/events/dharamshala-dharte-fest"
                  className="inline-flex items-center px-6 py-3 font-semibold text-white rounded-lg transition-colors"
                  style={{backgroundColor: '#092d1f'}}
                >
                  View Details
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
