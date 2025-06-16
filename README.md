# Flex Bus - Bus Booking Application

A modern, responsive bus booking web application built with vanilla HTML, CSS, and JavaScript. Features a complete booking flow with seat selection, passenger management, and simulated payment processing.

## Features

- **Complete Booking Flow**: Search buses, select seats, enter passenger details, and process payments
- **Responsive Design**: Optimized for both desktop and mobile devices
- **User Authentication**: Secure registration and login with enhanced validation
- **Seat Selection**: Interactive seat map with real-time availability
- **Payment Simulation**: Multiple payment methods including cards, UPI, net banking, and wallets
- **Profile Management**: User profile editing with secure password change
- **Booking Management**: View, print, and cancel bookings
- **Enhanced Security**: Comprehensive form validation and data integrity checks

## Color Scheme

The application uses a clean white, blue, and red color palette:
- Primary Red: #dc3545
- Secondary Blue: #007bff
- Background White: #ffffff

## Getting Started

### Prerequisites

- A modern web browser
- A local web server (optional, for development)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd flex-bus
```

2. Serve the application:

**Option 1: Using Python (recommended)**
```bash
python -m http.server 8000
```

**Option 2: Using Node.js**
```bash
npx serve .
```

**Option 3: Using PHP**
```bash
php -S localhost:8000
```

3. Open your browser and navigate to `http://localhost:8000`

## Project Structure

```
flex-bus/
├── index.html              # Main entry point
├── styles/
│   └── main.css            # Complete styling system
├── scripts/
│   ├── app.js              # Main application logic
│   ├── auth.js             # Authentication & user management
│   ├── booking.js          # Booking flow & seat selection
│   └── payment.js          # Payment processing
├── assets/
│   └── icons.svg           # SVG icon library
└── pages/                  # Dynamic page placeholders
```

## Technical Details

### Architecture
- **Single Page Application (SPA)**: Dynamic content loading without page refreshes
- **Vanilla JavaScript**: No external frameworks or dependencies
- **Local Storage**: Client-side data persistence
- **CSS Custom Properties**: Centralized theme management
- **SVG Icons**: Scalable vector graphics for consistent UI

### Key Components

1. **Search & Results**: Bus search with filtering and sorting
2. **Seat Selection**: Interactive 40-seat bus layout
3. **Passenger Forms**: Comprehensive validation for passenger details
4. **Payment Gateway**: Simulated payment processing
5. **User Profiles**: Secure account management
6. **Booking History**: Complete booking lifecycle management

### Validation Features

- **Email Validation**: RFC-compliant email format checking
- **Phone Numbers**: International format with country codes
- **Password Security**: 8+ characters with complexity requirements
- **Name Validation**: 2+ characters, letters only
- **Age Restrictions**: Reasonable age limits with special handling
- **Duplicate Detection**: Prevents accidental duplicate entries

## Usage

### For Users
1. **Search**: Select departure/destination cities and travel date
2. **Select Bus**: Choose from available buses with different amenities
3. **Pick Seats**: Interactive seat selection with availability status
4. **Enter Details**: Provide passenger information and contact details
5. **Payment**: Choose payment method and complete booking
6. **Manage**: View, print, or cancel bookings from your profile

### For Developers
The application is built with modularity in mind:
- Each major feature is in its own JavaScript file
- CSS uses custom properties for easy theming
- HTML structure supports dynamic content injection
- All data operations use localStorage for persistence

## Browser Compatibility

- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test across different browsers
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Demo

The application includes realistic demo data for testing:
- 15 different bus operators
- Various bus types (AC/Non-AC, Sleeper/Seater)
- Random seat availability
- Multiple payment options
- Complete booking flow simulation

## Support

For issues or questions, please create an issue in the GitHub repository.