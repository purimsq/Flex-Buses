# Flex Bus - Bus Booking Application

## Overview

Flex Bus is a client-side web application for booking bus tickets. It's built as a single-page application (SPA) using vanilla HTML, CSS, and JavaScript with no backend dependencies. The app uses browser localStorage for data persistence and simulates real-world functionality including user authentication, bus search, seat selection, and payment processing.

## System Architecture

### Frontend Architecture
- **Single Page Application (SPA)**: All functionality is contained within a single HTML page with dynamic content loading
- **Vanilla JavaScript**: No frameworks used, pure JavaScript for all functionality
- **Component-based Structure**: JavaScript is organized into separate modules for different features (auth, booking, payment)
- **CSS Custom Properties**: Centralized theming system using CSS variables
- **Responsive Design**: Mobile-first approach with flexible layouts

### Client-side Routing
- Hash-based navigation system
- Dynamic page loading through JavaScript
- State management through class-based application structure

## Key Components

### 1. Application Core (`scripts/app.js`)
- Main `BusBookingApp` class that orchestrates the entire application
- Mock data generation for buses and routes
- Local storage management for user data and bookings
- Navigation and page management

### 2. Authentication System (`scripts/auth.js`)
- User registration and login functionality
- Password validation and email verification
- Session management using localStorage
- No actual backend authentication - simulated for demo purposes

### 3. Booking Engine (`scripts/booking.js`)
- Bus search and filtering capabilities
- Interactive seat selection with visual seat map
- Real-time availability simulation
- Booking summary and pricing calculations

### 4. Payment Processing (`scripts/payment.js`)
- Multiple payment method options (Card, UPI, Net Banking)
- Form validation for payment details
- Simulated payment processing
- Booking confirmation generation

### 5. Static Assets
- **Icons**: SVG sprite system for scalable icons
- **Styling**: Modular CSS with custom properties for theming
- **Pages**: HTML templates loaded dynamically

## Data Flow

1. **User Authentication**: Login/Register → localStorage validation → UI state update
2. **Bus Search**: Search criteria → Mock data filtering → Results display
3. **Seat Selection**: Bus selection → Seat map generation → Availability checking
4. **Passenger Details**: Form validation → Data collection → Booking object creation
5. **Payment**: Payment method selection → Form processing → Confirmation generation
6. **Booking Management**: localStorage persistence → User booking history

## External Dependencies

### Runtime Dependencies
- **Python HTTP Server**: Used for serving static files during development
- **Modern Web Browser**: Requires ES6+ support for class syntax and modern JavaScript features

### No External Libraries
- No JavaScript frameworks or libraries
- No CSS frameworks
- No build tools or bundlers
- No database connections

## Deployment Strategy

### Current Setup
- **Static File Server**: Python's built-in HTTP server on port 5000
- **Replit Configuration**: Configured for Python 3.11 and Node.js 20 modules
- **Port Mapping**: Internal port 5000 mapped to external port 80

### Deployment Characteristics
- **Zero Build Process**: Direct file serving without compilation
- **Client-side Only**: No server-side processing required
- **LocalStorage Persistence**: All data stored in browser storage
- **Cross-platform Compatible**: Runs on any system with Python

### Scalability Considerations
- Ready for conversion to use actual backend APIs
- Mock data structure matches typical REST API responses
- Authentication system designed to easily integrate with real auth services
- Payment integration points prepared for actual payment gateways

## Changelog
- June 16, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.