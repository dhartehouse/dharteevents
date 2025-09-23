import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Package, MapPin, Users, ArrowRight, Filter, Star, Globe, Award, Heart, Leaf } from 'lucide-react'

export default function BrandsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  
  const categories = ['All', 'Wellness Products', 'Organic Foods', 'Sustainable Living', 'Spiritual Tools', 'Natural Beauty', 'Eco Fashion']
  
  // Sample brands data
  const brands = [
    {
      id: 1,
      name: 'Pure Himalayan Herbs',
      category: 'Wellness Products',
      location: 'Dharamshala, India',
      rating: 4.9,
      products: 45,
      image: '/images/brand-1.jpg',
      description: 'Authentic Himalayan herbs and wellness products sourced directly from mountain communities.',
      website: 'purehimalayanherbs.com',
      specialties: ['Herbal Supplements', 'Ayurvedic Products', 'Mountain Herbs'],
      featured: true,
      established: '2018',
      sustainability: 'Fair Trade Certified'
    },
    {
      id: 2,
      name: 'Sacred Geometry Crystals',
      category: 'Spiritual Tools',
      location: 'Rishikesh, India',
      rating: 4.8,
      products: 32,
      image: '/images/brand-2.jpg',
      description: 'Handcrafted crystal jewelry and sacred geometry tools for meditation and healing.',
      website: 'sacredgeometrycrystals.com',
      specialties: ['Crystal Jewelry', 'Meditation Tools', 'Sacred Geometry'],
      featured: true,
      established: '2016',
      sustainability: 'Ethically Sourced'
    },
    {
      id: 3,
      name: 'Goa Organic Kitchen',
      category: 'Organic Foods',
      location: 'Goa, India',
      rating: 4.7,
      products: 28,
      image: '/images/brand-3.jpg',
      description: 'Organic superfoods and plant-based nutrition products from sustainable farms.',
      website: 'goaorganickitchen.com',
      specialties: ['Superfoods', 'Plant-Based Products', 'Organic Snacks'],
      featured: false,
      established: '2019',
      sustainability: 'Organic Certified'
    },
    {
      id: 4,
      name: 'Bamboo Earth',
      category: 'Sustainable Living',
      location: 'Kerala, India',
      rating: 4.8,
      products: 67,
      image: '/images/brand-4.jpg',
      description: 'Eco-friendly bamboo products for sustainable living and zero-waste lifestyle.',
      website: 'bambooearth.in',
      specialties: ['Bamboo Products', 'Zero Waste', 'Eco-Friendly'],
      featured: true,
      established: '2017',
      sustainability: 'Carbon Neutral'
    },
    {
      id: 5,
      name: 'Ayurveda Beauty Co.',
      category: 'Natural Beauty',
      location: 'Mumbai, India',
      rating: 4.6,
      products: 38,
      image: '/images/brand-5.jpg',
      description: 'Natural beauty products based on ancient Ayurvedic formulations and modern science.',
      website: 'ayurvedabeauty.co',
      specialties: ['Natural Skincare', 'Ayurvedic Beauty', 'Herbal Cosmetics'],
      featured: false,
      established: '2020',
      sustainability: 'Cruelty-Free'
    },
    {
      id: 6,
      name: 'Conscious Threads',
      category: 'Eco Fashion',
      location: 'Jaipur, India',
      rating: 4.7,
      products: 52,
      image: '/images/brand-6.jpg',
      description: 'Sustainable fashion made from organic cotton and traditional Indian textiles.',
      website: 'consciousthreads.in',
      specialties: ['Organic Cotton', 'Traditional Textiles', 'Sustainable Fashion'],
      featured: false,
      established: '2015',
      sustainability: 'GOTS Certified'
    }
  ]
  
  const filteredBrands = selectedCategory === 'All' 
    ? brands 
    : brands.filter(brand => brand.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20" style={{backgroundColor: '#092d1f'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Conscious Brands & Products
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Discover ethical brands and sustainable products that align with your values. 
              Support businesses creating positive impact for people and planet.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold" style={{color: '#092d1f'}}>
              All Brands ({filteredBrands.length})
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

      {/* Brands Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBrands.map((brand) => (
              <div key={brand.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Brand Image */}
                <div className="h-48 bg-gradient-to-br from-green-100 to-green-200 relative overflow-hidden">
                  {brand.image ? (
                    <img 
                      src={brand.image} 
                      alt={brand.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-6xl opacity-50">🏪</div>
                    </div>
                  )}
                  {brand.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-sm font-semibold flex items-center">
                        <Award className="h-3 w-3 mr-1" />
                        Featured
                      </span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold" style={{color: '#092d1f'}}>
                      {brand.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-sm font-semibold">{brand.rating}</span>
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <div className="flex items-center bg-green-500/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <Leaf className="h-3 w-3 text-white mr-1" />
                      <span className="text-xs text-white font-semibold">Sustainable</span>
                    </div>
                  </div>
                </div>

                {/* Brand Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2" style={{color: '#092d1f'}}>
                    {brand.name}
                  </h3>
                  
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    {brand.location}
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {brand.description}
                  </p>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {brand.specialties.slice(0, 2).map((specialty) => (
                      <span 
                        key={specialty}
                        className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                    {brand.specialties.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                        +{brand.specialties.length - 2} more
                      </span>
                    )}
                  </div>

                  {/* Sustainability Badge */}
                  <div className="mb-4">
                    <span className="inline-flex items-center px-3 py-1 bg-green-50 border border-green-200 rounded-full text-xs font-medium text-green-800">
                      <Leaf className="h-3 w-3 mr-1" />
                      {brand.sustainability}
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                    <div className="flex items-center">
                      <Package className="h-4 w-4 mr-1" />
                      {brand.products} products
                    </div>
                    <div>
                      Est. {brand.established}
                    </div>
                  </div>

                  {/* Website & CTA */}
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-500">
                      <Globe className="h-4 w-4 mr-2" />
                      <a 
                        href={`https://${brand.website}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {brand.website}
                      </a>
                    </div>
                    
                    <button 
                      className="w-full inline-flex items-center justify-center px-6 py-3 font-semibold text-white rounded-lg transition-colors hover:opacity-90"
                      style={{backgroundColor: '#092d1f'}}
                    >
                      <Heart className="mr-2 h-5 w-5" />
                      Shop Products
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredBrands.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🏪</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No brands found</h3>
              <p className="text-gray-600">Try selecting a different category or check back later.</p>
            </div>
          )}
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{color: '#092d1f'}}>
              Our Brand Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Every brand in our marketplace is carefully curated to ensure they align with our values
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{backgroundColor: '#092d1f'}}>
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{color: '#092d1f'}}>
                Sustainability
              </h3>
              <p className="text-gray-600">
                Committed to environmental responsibility and sustainable practices
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{backgroundColor: '#092d1f'}}>
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{color: '#092d1f'}}>
                Ethical Practices
              </h3>
              <p className="text-gray-600">
                Fair trade, ethical sourcing, and positive impact on communities
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{backgroundColor: '#092d1f'}}>
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{color: '#092d1f'}}>
                Quality Assurance
              </h3>
              <p className="text-gray-600">
                High-quality products that meet our strict standards for wellness
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16" style={{backgroundColor: '#092d1f'}}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Join Our Marketplace
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Are you a conscious brand with products that support wellness and sustainability? 
            Join our curated marketplace and reach conscious consumers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="inline-flex items-center px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Apply to Join
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <Link 
              to="/events"
              className="inline-flex items-center px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition-colors"
            >
              Explore Events
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
