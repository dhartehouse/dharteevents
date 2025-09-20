import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react'
import useStore from '../lib/store'
import { formatDate, formatCurrency } from '../lib/utils'

export default function HomePage() {
  const { getFeaturedEvents, taxonomy } = useStore()
  const featuredEvents = getFeaturedEvents().slice(0, 3)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-dharte-surface to-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-playfair font-bold text-dharte-primary mb-6">
              Discover Your Path to
              <span className="text-dharte-accent"> Wellness</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Connect with transformative experiences, conscious communities, and 
              healing practices from around the world. Your journey to wholeness starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/events">
                <Button size="lg" className="bg-dharte-primary hover:bg-dharte-primary/90 text-white px-8 py-3">
                  Explore Events
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="border-dharte-primary text-dharte-primary hover:bg-dharte-primary hover:text-white px-8 py-3">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-dharte-primary mb-4">
              Featured Events
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Handpicked transformative experiences happening soon
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event) => (
              <Card key={event.slug} className="group hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
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
                      {event.city}, {event.country}
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

          <div className="text-center mt-12">
            <Link to="/events">
              <Button variant="outline" size="lg" className="border-dharte-primary text-dharte-primary hover:bg-dharte-primary hover:text-white">
                View All Events
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 lg:py-24 bg-dharte-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-dharte-primary mb-4">
              Explore Categories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find your perfect wellness journey across diverse practices and traditions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {taxonomy.categories.slice(0, 8).map((category) => (
              <Link
                key={category.slug}
                to={`/events?category=${category.slug}`}
                className="group"
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 shadow-sm group-hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-dharte-accent/20 to-dharte-success/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-dharte-accent/30 group-hover:to-dharte-success/30 transition-colors">
                      <div className="w-8 h-8 bg-dharte-accent rounded-full"></div>
                    </div>
                    <h3 className="font-semibold text-dharte-primary mb-2 group-hover:text-dharte-accent transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {category.subcategories.length} subcategories
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-dharte-primary mb-6">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of seekers discovering their path to wellness, growth, and conscious living.
          </p>
          <Link to="/events">
            <Button size="lg" className="bg-dharte-primary hover:bg-dharte-primary/90 text-white px-8 py-3">
              Start Exploring
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
