import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Events data from PDF
const pdfEvents = [
  {
    id: 'mumbai-dharte-fest',
    title: 'Dharte Fest Mumbai - Tune Your Frequency',
    slug: 'mumbai-dharte-fest',
    description: 'A one-day field of resonance where wellness, art, and conscious business meet. Move through an ecosystem of practice and play—reset your nervous system, expand your heart, and build real-world partnerships.',
    longDescription: 'Immerse yourself in a transformative day where wellness, art, and conscious business converge. This unique festival offers an ecosystem of practice and play designed to reset your nervous system, expand your heart, and build meaningful real-world partnerships.',
    date: '2025-09-27',
    time: '12:00 PM - 9:00 PM',
    location: 'Radio Club, Mumbai',
    venue: 'Radio Club',
    city: 'Mumbai',
    image: '/images/dhartefest-mumbai.jpg',
    featured: true,
    published: true,
    host: 'Satyam Zomerdijk',
    hostDescription: 'Tantra expert from the Netherlands. Guides the day with a heart-centred presence, inviting softness, clarity, and embodied truth.',
    categories: ['Alternative Medicine', 'Yoga + Meditation', 'Healing + Therapy', 'Arts', 'Nutrition', 'Sustainability'],
    ticketTypes: [
      {
        id: 'vip-pass',
        name: 'VIP Pass',
        price: 600,
        description: 'VIP Pass - includes Business Networking access (12-6 PM)',
        features: ['Business Networking Access', 'Full Day Access', 'All Workshops', 'Networking Sessions'],
        recommended: true
      },
      {
        id: 'vip-tantra',
        name: 'VIP Pass + Tantra Workshop',
        price: 3000,
        description: 'VIP Pass + Tantra Workshop - Full access with exclusive evening session',
        features: ['Everything in VIP Pass', 'Exclusive Tantra Workshop', 'Evening Session with Satyam', 'Priority Access']
      }
    ],
    stallTypes: [
      {
        id: 'service-stall',
        name: 'Service Stall',
        price: 9000,
        description: 'Perfect for wellness listings and consultations',
        features: ['Prime Location', 'Table & Chairs', 'Power Supply', 'Networking Opportunities']
      },
      {
        id: 'product-stall',
        name: 'Product Stall',
        price: 15000,
        description: 'Ideal for showcasing wellness and sustainable products',
        features: ['Premium Location', 'Display Setup', 'Storage Space', 'Product Showcase Area']
      }
    ],
    marketingAddons: [
      {
        id: 'marketing-campaign',
        name: 'Marketing Campaign',
        price: 24000,
        description: 'Full marketing campaign coverage'
      },
      {
        id: 'flyer-standee',
        name: 'Flyer Distribution + Standee',
        price: 3600,
        description: 'Flyer Distribution + Standee'
      }
    ],
    sponsorshipTiers: [
      {
        id: 'bronze',
        name: 'Bronze Sponsor',
        price: 60000,
        description: 'Bronze Sponsor - Logo placement & recognition'
      },
      {
        id: 'silver',
        name: 'Silver Sponsor',
        price: 150000,
        description: 'Silver Sponsor - Enhanced visibility & benefits'
      },
      {
        id: 'gold',
        name: 'Gold Sponsor',
        price: 450000,
        description: 'Gold Sponsor - Premium branding & partnership'
      }
    ],
    schedule: [
      {
        time: '12:00 PM - 6:00 PM',
        title: 'Expo • Panels & Talks • Business Networking',
        description: '30+ exhibitors, 50+ speakers, curated introductions, buyer–facilitator meetups'
      },
      {
        time: '6:00 PM - 9:00 PM',
        title: 'Tantra Dance with Satyam',
        description: 'Collective coherence: breath, rhythm, and conscious movement—an ecstatic, grounded practice'
      }
    ],
    experienceZones: [
      'Healing Forum - Integrative & energy therapies, live demos',
      'Yoga + Meditation Studio - Techniques, breathwork, micro-practices',
      'Sound & Arts Lab - Music, movement, performance, creative flow',
      'Nutrition Counter - Functional foods, plant-based insights, tastings',
      'Sustainability Hub - Low-impact living, community tools, earth tech',
      'Brand Gallery - Launches, listings, partnerships'
    ]
  },
  {
    id: 'dharamshala-dharte-fest',
    title: 'Dharte Fest Dharamshala - DAWF',
    slug: 'dharamshala-dharte-fest',
    description: 'A three-day mountain retreat festival blending music, healing, movement, and art. Designed to foster community, creativity, and inner well-being.',
    longDescription: 'Experience a transformative three-day mountain retreat in the beautiful Himalayan setting of Dharamshala. This festival blends music, healing, movement, and art to foster community, creativity, and inner well-being.',
    date: '2025-10-31',
    endDate: '2025-11-02',
    time: '9:00 AM - 9:00 PM',
    location: 'Dharamshala, Kuli Road, Dharamkot',
    venue: 'Above Cool Talk Café, near Infinity Stays',
    city: 'Dharamshala',
    image: '/images/dhartefest-dharamshala.jpg',
    featured: true,
    published: true,
    host: 'Johnson (Dzen Den)',
    hostDescription: 'Creative curator bringing together art, wellness, and community in the beautiful Himalayan setting',
    categories: ['Music', 'Healing', 'Movement', 'Art', 'Community'],
    highlights: [
      'Mountain retreat setting in Dharamshala',
      'Three days of immersive experiences',
      'Music, healing, movement, and art',
      'Community building and creative expression',
      'Himalayan wellness practices'
    ],
    stallTypes: [
      {
        id: 'stall',
        name: 'Stall',
        price: 3000,
        serviceFee: 75,
        description: 'Basic stall for exhibitors',
        features: ['3-day access', 'Basic setup', 'Networking opportunities']
      }
    ],
    sponsorshipTiers: [
      {
        id: 'bronze',
        name: 'Bronze Sponsor',
        price: 10000,
        serviceFee: 250,
        description: 'Bronze sponsorship package'
      },
      {
        id: 'silver',
        name: 'Silver Sponsor',
        price: 25000,
        serviceFee: 625,
        description: 'Silver sponsorship package'
      },
      {
        id: 'gold',
        name: 'Gold Sponsor',
        price: 50000,
        serviceFee: 1250,
        description: 'Gold sponsorship package'
      }
    ]
  }
]

const useStore = create(
  persist(
    (set, get) => ({
      // Events
      events: pdfEvents,
      taxonomy: {
        categories: ['Alternative Medicine', 'Yoga + Meditation', 'Healing + Therapy', 'Arts', 'Nutrition', 'Sustainability', 'Music', 'Movement', 'Community']
      },
      
      // User authentication
      user: null,
      isAuthenticated: false,
      
      // Cart
      cart: [],
      
      // Orders
      orders: [],
      
      // Admin
      isAdmin: false,
      
      // Actions
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      logout: () => set({ user: null, isAuthenticated: false, isAdmin: false }),
      
      addToCart: (item) => set((state) => ({
        cart: [...state.cart, { ...item, id: Date.now() }]
      })),
      
      removeFromCart: (id) => set((state) => ({
        cart: state.cart.filter(item => item.id !== id)
      })),
      
      clearCart: () => set({ cart: [] }),
      
      addOrder: (order) => set((state) => ({
        orders: [...state.orders, order]
      })),
      
      addEvent: (event) => set((state) => ({
        events: [...state.events, { ...event, id: event.slug, published: false }]
      })),
      
      updateEvent: (slug, updates) => set((state) => ({
        events: state.events.map(event => 
          event.slug === slug ? { ...event, ...updates } : event
        )
      })),
      
      deleteEvent: (slug) => set((state) => ({
        events: state.events.filter(event => event.slug !== slug)
      })),
      
      // Getters
      getEventBySlug: (slug) => {
        const state = get()
        return state.events.find(event => event.slug === slug)
      },
      
      getPublishedEvents: () => {
        const state = get()
        return state.events.filter(event => event.published)
      },
      
      getFeaturedEvents: () => {
        const state = get()
        return state.events.filter(event => event.published && event.featured)
      },

      getCartTotal: () => {
        return get().cart.reduce((total, item) => total + (item.price || 0), 0)
      }
    }),
    {
      name: 'dharte-store',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        cart: state.cart,
        orders: state.orders,
        events: state.events,
        isAdmin: state.isAdmin
      })
    }
  )
)

export default useStore
