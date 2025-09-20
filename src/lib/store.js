import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import eventData from '../assets/dharte_taxonomy_and_events.json'

// Initialize events with the imported data
const initialEvents = eventData.events.map(event => ({
  ...event,
  id: event.slug,
  published: true,
  featured: true
}))

const useStore = create(
  persist(
    (set, get) => ({
      // Events
      events: initialEvents,
      taxonomy: eventData.taxonomy,
      
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
