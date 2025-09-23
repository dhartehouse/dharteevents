import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{backgroundColor: '#092d1f'}}>
      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Discover Extraordinary Events
            </h1>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto opacity-90">
              Join thousands of attendees experiencing transformative festivals, immersive workshops, and exclusive gatherings across India
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/events"
                className="inline-flex items-center px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Explore All Events
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
