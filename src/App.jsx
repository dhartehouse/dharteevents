import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import EventsPage from './pages/EventsPage'
import EventDetailPage from './pages/EventDetailPage'
import FacilitatorsPage from './pages/FacilitatorsPage'
import PromotersPage from './pages/PromotersPage'
import HousesPage from './pages/HousesPage'
import BrandsPage from './pages/BrandsPage'
import CheckoutPage from './pages/CheckoutPage'
import OrderSuccessPage from './pages/OrderSuccessPage'
import AccountPage from './pages/AccountPage'
import AdminPage from './pages/AdminPage'
import './App.css'
import './components/ResponsiveLayoutFixes.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background flex flex-col overflow-fix">
        <Header />
        <main className="flex-1 overflow-fix">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:slug" element={<EventDetailPage />} />
            <Route path="/facilitators" element={<FacilitatorsPage />} />
            <Route path="/promoters" element={<PromotersPage />} />
            <Route path="/houses" element={<HousesPage />} />
            <Route path="/brands" element={<BrandsPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order/:id" element={<OrderSuccessPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </div>
    </Router>
  )
}

export default App
