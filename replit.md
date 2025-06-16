# Flex Bus App - Replit Configuration

## Overview

Flex Bus is a client-side web application for booking bus tickets. It's built as a single-page application (SPA) using vanilla HTML, CSS, and JavaScript with no backend dependencies. The app provides a complete bus booking experience including search, seat selection, passenger details, and payment processing - all simulated on the frontend with enhanced security validation.

## System Architecture

### Frontend Architecture
- **Pure Client-Side SPA**: No server-side rendering or backend API calls
- **Vanilla JavaScript**: Object-oriented approach with ES6+ features
- **Modular Structure**: Separate JS files for different functionalities (auth, booking, payment)
- **Dynamic Page Loading**: Pages are generated dynamically via JavaScript rather than separate HTML files
- **Local Storage**: Used for data persistence (user sessions, bookings)

### Styling Architecture
- **CSS Custom Properties**: Centralized theme management with CSS variables
- **Responsive Design**: Mobile-first approach with flexible grid systems
- **Component-Based CSS**: Reusable style components for buttons, forms, cards
- **SVG Icons**: Scalable vector graphics for consistent iconography

## Key Components

### 1. Core Application (`scripts/app.js`)
- **BusBookingApp Class**: Main application controller
- **State Management**: Handles current user, booking state, and navigation
- **Mock Data Generation**: Creates realistic bus schedules and availability
- **Page Routing**: Single-page navigation system

### 2. Authentication System (`scripts/auth.js`)
- **Enhanced Registration**: Comprehensive validation with region detection
- **Secure Login**: Email/password authentication with user data persistence
- **Profile Management**: Secure profile editing with password change functionality
- **Advanced Validation**: Email format, phone number with country codes, strong password requirements
- **Session Management**: LocalStorage-based user sessions with security measures

### 3. Booking Engine (`scripts/booking.js`)
- **Seat Selection**: Interactive seat map with availability status
- **Dynamic Pricing**: Calculates fares based on seat selection
- **Booking State**: Manages multi-step booking process

### 4. Payment Processing (`scripts/payment.js`)
- **Mock Payment Gateway**: Simulates various payment methods
- **Payment Validation**: Form validation for payment details
- **Booking Confirmation**: Generates booking confirmations

### 5. Static Assets
- **Responsive CSS**: Mobile-first design system
- **SVG Icon Library**: Scalable vector graphics for UI elements
- **Dynamic HTML**: JavaScript-generated page content

## Data Flow

### 1. User Journey Flow
```
Home → Search → Bus Selection → Seat Selection → Passenger Details → Payment → Confirmation
```

### 2. State Management
- **LocalStorage**: Persistent storage for user data and bookings
- **In-Memory State**: Current booking state and user session
- **Mock Data**: Generated bus schedules and seat availability

### 3. Page Navigation
- **Hash-based Routing**: Uses JavaScript to show/hide page sections
- **Dynamic Content**: Pages generated programmatically
- **State Preservation**: Maintains booking state across page transitions

## External Dependencies

### Development Dependencies
- **Python HTTP Server**: Simple static file server for development
- **No Build Tools**: Pure vanilla JavaScript with no compilation step
- **No Frameworks**: No React, Angular, or Vue.js dependencies

### Runtime Dependencies
- **Modern Browser**: Requires ES6+ support
- **LocalStorage**: For data persistence
- **SVG Support**: For icons and graphics

## Deployment Strategy

### Current Setup
- **Python HTTP Server**: Serves static files on port 5000
- **Simple Deployment**: No build process required
- **Static Hosting**: Compatible with any static hosting service

### Production Considerations
- **CDN Ready**: All assets are static files
- **Mobile Optimized**: Responsive design works on all devices
- **SEO Limitations**: Single-page app with JavaScript-generated content

### Scaling Options
- **Add Backend**: Could integrate with real bus booking APIs
- **Database Integration**: Replace LocalStorage with proper database
- **Payment Gateway**: Integrate real payment processing
- **Authentication**: Add proper user authentication system

## Changelog

```
Changelog:
- June 16, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```

## Development Notes

### File Structure
- `index.html`: Main entry point with navigation and hero section
- `styles/main.css`: Complete styling system with CSS variables
- `scripts/`: Modular JavaScript files for different features
- `pages/`: Placeholder files for dynamic page content
- `assets/`: SVG icons and other static assets

### Key Features Implemented
- Complete booking flow simulation
- Responsive design for all screen sizes
- Local data persistence with secure user management
- Mock payment processing with multiple methods
- Dynamic seat selection with real-time availability
- Enhanced user authentication with validation
- Password security with complexity requirements
- Regional phone number detection and formatting
- Secure profile management with password change

### Technical Decisions
- **No Backend**: Keeps deployment simple and demonstrates frontend capabilities
- **Vanilla JavaScript**: Avoids framework overhead and complexity
- **LocalStorage**: Provides persistence without server requirements
- **CSS Variables**: Enables easy theme customization
- **Modular Structure**: Keeps code organized and maintainable