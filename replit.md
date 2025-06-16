# Flex Bus - Bus Booking Application

## Overview

Flex Bus is a modern, responsive bus booking web application built with vanilla HTML, CSS, and JavaScript. It provides a complete booking flow including bus search, seat selection, passenger management, and payment processing. The application uses client-side storage and mock data to simulate a full-featured bus booking system.

## System Architecture

### Frontend Architecture
- **Technology Stack**: Pure HTML5, CSS3, and ES6+ JavaScript
- **Design Pattern**: Single Page Application (SPA) with dynamic page rendering
- **Styling**: CSS custom properties for theming, responsive grid layout
- **State Management**: Class-based JavaScript architecture with centralized state

### Client-Side Architecture
- **Main Application Class**: `BusBookingApp` handles core functionality and state
- **Modular Structure**: Separate files for authentication, booking, and payment logic
- **Dynamic Page Loading**: Pages are generated dynamically via JavaScript
- **Local Storage**: Persistent data storage for user sessions and bookings

## Key Components

### Core Application (`scripts/app.js`)
- Central application controller
- User session management
- Navigation and page routing
- Mock data generation for buses and routes

### Authentication System (`scripts/auth.js`)
- User registration and login
- Form validation and security checks
- Session persistence via localStorage
- Password strength validation

### Booking Engine (`scripts/booking.js`)
- Bus search and filtering
- Interactive seat selection with visual seat map
- Real-time availability simulation
- Booking state management

### Payment Processing (`scripts/payment.js`)
- Multiple payment method support (Cards, UPI, Net Banking, Wallets)
- Payment form validation
- Booking confirmation and receipt generation
- Transaction simulation

### User Interface
- **Responsive Design**: Mobile-first approach with flexible grid system
- **Color Scheme**: Red (#dc3545), Blue (#007bff), White (#ffffff) theme
- **Component Library**: Reusable CSS classes for buttons, forms, and layouts
- **Icon System**: SVG sprite-based icons for consistent visual elements

## Data Flow

1. **User Authentication**: Registration/login → localStorage persistence → UI state update
2. **Bus Search**: Search criteria → mock data filtering → results display
3. **Seat Selection**: Bus selection → seat map generation → availability checking
4. **Passenger Details**: Form validation → data collection → booking state update
5. **Payment Processing**: Payment method selection → form validation → booking confirmation
6. **Booking Management**: localStorage retrieval → booking display → modification options

## External Dependencies

### None - Completely Self-Contained
- No external libraries or frameworks
- No API dependencies
- No database connections required
- Fully functional with static file serving

### Development Dependencies
- **Live Server**: For local development (VS Code extension recommended)
- **Modern Web Browser**: Chrome, Firefox, Safari, or Edge

## Deployment Strategy

### Static Hosting Options
- **GitHub Pages**: Direct deployment from repository
- **Netlify**: Drag-and-drop deployment with continuous integration
- **Vercel**: Git-based deployment with automatic builds
- **Local Development**: Python HTTP server or any static file server

### Current Configuration
- **Port**: 5000 (configurable)
- **Server**: Python HTTP server for development
- **Build Process**: None required - direct file serving

### Production Considerations
- Minification of CSS/JS files recommended
- Image optimization for faster loading
- CDN integration for global distribution
- HTTPS enforcement for security

## Changelog

```
Changelog:
- June 16, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```

## Additional Notes

### Security Features
- Client-side form validation with comprehensive checks
- Password strength requirements
- Email format validation
- Data sanitization for user inputs

### Future Enhancement Opportunities
- Backend API integration for real data
- Database integration (PostgreSQL recommended)
- Payment gateway integration
- Push notifications
- Mobile app development
- Admin dashboard for bus operators

### Development Workflow
- Start with `index.html` as the entry point
- Modify styles in `styles/main.css`
- Add functionality in respective JavaScript modules
- Test across different devices and browsers
- Deploy to chosen static hosting platform