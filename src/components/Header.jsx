import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Menu, X, User, ShoppingCart } from 'lucide-react'
import useStore from '../lib/store'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const { isAuthenticated, user, cart, logout } = useStore()

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Events', href: '/events' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-playfair font-bold text-dharte-primary">
              Dharte
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-dharte-accent ${
                  isActive(item.href)
                    ? 'text-dharte-primary border-b-2 border-dharte-accent'
                    : 'text-gray-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Cart */}
            <Link to="/checkout" className="relative">
              <Button variant="ghost" size="sm" className="p-2">
                <ShoppingCart className="h-5 w-5" />
                {cart.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-dharte-accent">
                    {cart.length}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <Link to="/account">
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span className="text-sm">{user?.email}</span>
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="text-sm"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/account">
                <Button size="sm" className="bg-dharte-primary hover:bg-dharte-primary/90">
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-dharte-primary bg-dharte-surface'
                      : 'text-gray-600 hover:text-dharte-accent'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="border-t border-gray-200 pt-4 pb-3">
                <div className="flex items-center justify-between px-3">
                  <Link to="/checkout" className="relative">
                    <Button variant="ghost" size="sm" className="p-2">
                      <ShoppingCart className="h-5 w-5" />
                      {cart.length > 0 && (
                        <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-dharte-accent">
                          {cart.length}
                        </Badge>
                      )}
                    </Button>
                  </Link>
                  
                  {isAuthenticated ? (
                    <div className="flex flex-col space-y-2">
                      <Link to="/account">
                        <Button variant="ghost" size="sm" className="w-full justify-start">
                          <User className="h-4 w-4 mr-2" />
                          Account
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={logout}
                        className="w-full justify-start"
                      >
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <Link to="/account">
                      <Button size="sm" className="bg-dharte-primary hover:bg-dharte-primary/90">
                        Sign In
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
