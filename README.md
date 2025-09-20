# Dharte Events - Wellness Event Ticketing Platform

A modern, full-featured wellness event ticketing platform built with React, featuring real-time Stripe payments, QR code tickets, and comprehensive event management.

## 🌟 Features

### 🎫 Event Management
- **Event Listings** - Browse wellness events with advanced filtering
- **Event Details** - Comprehensive event information with booking
- **Categories** - Organized by wellness practices and event types
- **Search & Filter** - Find events by location, date, price, and category

### 💳 Payment Processing
- **Stripe Integration** - Secure payment processing with live API keys
- **Multiple Payment Methods** - Credit cards, debit cards, and digital wallets
- **Real-time Processing** - Instant payment confirmation
- **Processing Fees** - Transparent fee calculation (2.9% + ₹10)

### 🎟️ Ticketing System
- **QR Code Tickets** - Digital tickets with unique QR codes
- **Email Delivery** - Automatic ticket delivery via email
- **Order Management** - Complete order tracking and history
- **Ticket Verification** - QR code scanning for event entry

### 👤 User Management
- **OTP Authentication** - Secure login with email-based OTP
- **User Dashboard** - Personal account with ticket management
- **Order History** - Complete purchase and attendance tracking
- **Profile Management** - User information and preferences

### 🛠️ Admin Features
- **Admin Panel** - Complete event management interface
- **Event Creation** - Add new events with multiple ticket tiers
- **Content Management** - Update event details and pricing
- **Analytics Dashboard** - Track events and user engagement

## 🚀 Live Demo

**Website:** https://dharte.manus.space/

### Test Accounts
- **Admin Access:** Use `admin@dharte.com` for admin panel access
- **Demo User:** Any email for OTP-based user authentication

## 🛠️ Technology Stack

### Frontend
- **React 19** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/UI** - High-quality React component library
- **React Router** - Client-side routing
- **Zustand** - Lightweight state management

### Payment Processing
- **Stripe** - Complete payment infrastructure
- **@stripe/stripe-js** - Stripe JavaScript SDK
- **@stripe/react-stripe-js** - React components for Stripe

### Additional Libraries
- **Lucide React** - Beautiful icon library
- **React QR Code** - QR code generation
- **Date-fns** - Date manipulation and formatting

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Setup
1. **Clone the repository**
   ```bash
   git clone https://github.com/dhartehouse/dharteevents.git
   cd dharteevents
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment Configuration**
   Copy `.env.example` to `.env` and configure:
   ```env
   VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_publishable_key
   STRIPE_SECRET_KEY=sk_live_your_secret_key
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
   SMTP_HOST=your_smtp_host
   SMTP_USER=your_smtp_user
   SMTP_PASS=your_smtp_password
   ```

4. **Start development server**
   ```bash
   pnpm run dev
   ```

5. **Build for production**
   ```bash
   pnpm run build
   ```

## 🚀 Deployment

### Build Commands
```bash
# Development
pnpm run dev

# Production build
pnpm run build

# Preview production build
pnpm run preview
```

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify
1. Connect repository to Netlify
2. Set build command: `pnpm run build`
3. Set publish directory: `dist`
4. Add environment variables

### Manual Deployment
1. Build the project: `pnpm run build`
2. Upload `dist/` folder to your hosting provider
3. Configure environment variables on your server

## 🔧 Configuration

### Stripe Setup
1. Create a [Stripe account](https://stripe.com)
2. Get your API keys from the Stripe Dashboard
3. Add keys to your `.env` file
4. Configure webhooks for production deployment

### Email Configuration
Configure SMTP settings in your `.env` file for ticket delivery:
- **SMTP_HOST** - Your email provider's SMTP server
- **SMTP_USER** - Your email username
- **SMTP_PASS** - Your email password or app password

### Event Data
Event data is stored in `src/assets/dharte_taxonomy_and_events.json`. Update this file to modify:
- Event listings
- Categories and subcategories
- Event types
- Pricing information

## 📁 Project Structure

```
dharteevents/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Shadcn/UI components
│   │   ├── Header.jsx      # Navigation header
│   │   ├── Footer.jsx      # Site footer
│   │   └── StripePayment.jsx # Payment processing
│   ├── pages/              # Page components
│   │   ├── HomePage.jsx    # Landing page
│   │   ├── EventsPage.jsx  # Event listings
│   │   ├── CheckoutPage.jsx # Payment checkout
│   │   └── AccountPage.jsx # User dashboard
│   ├── lib/                # Utilities and configuration
│   │   ├── store.js        # State management
│   │   ├── utils.js        # Helper functions
│   │   └── stripe.js       # Stripe configuration
│   ├── assets/             # Static assets and data
│   └── App.jsx             # Main application component
├── api/                    # Serverless API functions
│   └── stripe/
│       └── webhook.js      # Stripe webhook handler
├── dist/                   # Built application (generated)
└── public/                 # Static public assets
```

## 🎨 Design System

### Colors
- **Primary:** `#2D5A27` (Deep forest green)
- **Secondary:** `#8FBC8F` (Sage green)
- **Accent:** `#F0F8E8` (Light mint)
- **Success:** `#22C55E` (Green)
- **Surface:** `#F8FAF9` (Off-white)

### Typography
- **Headings:** Playfair Display (serif)
- **Body:** Inter (sans-serif)

## 🔒 Security

- **Environment Variables** - Sensitive data stored securely
- **PCI Compliance** - Stripe handles all payment data
- **HTTPS Only** - Secure data transmission
- **Input Validation** - Form validation and sanitization
- **CORS Configuration** - Proper cross-origin request handling

## 📊 Analytics & Monitoring

- **Payment Tracking** - Monitor successful transactions
- **Error Logging** - Track and resolve issues
- **User Analytics** - Understand user behavior
- **Performance Monitoring** - Optimize load times

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- **Email:** support@dharte.com
- **Documentation:** [GitHub Wiki](https://github.com/dhartehouse/dharteevents/wiki)
- **Issues:** [GitHub Issues](https://github.com/dhartehouse/dharteevents/issues)

## 🙏 Acknowledgments

- **Stripe** - Payment processing infrastructure
- **Shadcn/UI** - Beautiful React components
- **Tailwind CSS** - Utility-first CSS framework
- **React Community** - Amazing ecosystem and tools

---

**Built with ❤️ for the wellness community**
