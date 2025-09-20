import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-dharte-surface border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center mb-4">
              <span className="text-2xl font-playfair font-bold text-dharte-primary">
                Dharte
              </span>
            </Link>
            <p className="text-gray-600 text-sm max-w-md">
              Discover and book transformative wellness events, workshops, and retreats. 
              Connect with a global community of conscious practitioners and seekers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-dharte-primary mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/events" className="text-sm text-gray-600 hover:text-dharte-accent transition-colors">
                  All Events
                </Link>
              </li>
              <li>
                <Link to="/events?type=workshops" className="text-sm text-gray-600 hover:text-dharte-accent transition-colors">
                  Workshops
                </Link>
              </li>
              <li>
                <Link to="/events?type=retreats" className="text-sm text-gray-600 hover:text-dharte-accent transition-colors">
                  Retreats
                </Link>
              </li>
              <li>
                <Link to="/events?online=true" className="text-sm text-gray-600 hover:text-dharte-accent transition-colors">
                  Online Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-dharte-primary mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:hello@dharte.com" className="text-sm text-gray-600 hover:text-dharte-accent transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-dharte-accent transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-dharte-accent transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-dharte-accent transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">
            © 2025 Dharte. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="text-gray-400 hover:text-dharte-accent transition-colors">
              <span className="sr-only">Instagram</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.928-.875 2.079-1.365 3.323-1.365s2.395.49 3.323 1.365c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.928.796-2.079 1.297-3.323 1.297zm7.83-9.405c-.49 0-.928-.175-1.297-.525-.368-.35-.525-.787-.525-1.297s.157-.947.525-1.297c.369-.35.807-.525 1.297-.525s.928.175 1.297.525c.368.35.525.787.525 1.297s-.157.947-.525 1.297c-.369.35-.807.525-1.297.525z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-dharte-accent transition-colors">
              <span className="sr-only">Twitter</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
