import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{backgroundColor: '#092d1f'}} className="text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-6 text-lg">COMPANY</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-white/80 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/80 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/cancellations" className="text-white/80 hover:text-white transition-colors">
                  Cancellations & Refunds
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-white/80 hover:text-white transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-white/80 hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-white/80 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Activities */}
          <div>
            <h3 className="font-semibold text-white mb-6 text-lg">ACTIVITIES</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/events" className="text-white/80 hover:text-white transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/houses" className="text-white/80 hover:text-white transition-colors">
                  Houses
                </Link>
              </li>
              <li>
                <Link to="/facilitators" className="text-white/80 hover:text-white transition-colors">
                  Wellness Consultant
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold text-white mb-6 text-lg">SOCIAL</h3>
            <ul className="space-y-3">
              <li>
                <a href="https://instagram.com/dharte" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://facebook.com/dharte" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://x.com/dharte" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                  X
                </a>
              </li>
              <li>
                <a href="https://youtube.com/dharte" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                  YouTube
                </a>
              </li>
              <li>
                <a href="https://wa.me/dharte" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-6 text-lg">CONTACT</h3>
            <div className="space-y-4">
              <div>
                <p className="text-white font-medium mb-2">Dharte Corporate Office</p>
                <p className="text-white/80">Dharte House Madh Island</p>
                <p className="text-white/80">Dharte House Dharamshala</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="text-center">
            <p className="text-white/60">
              © 2024 Dharte. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
