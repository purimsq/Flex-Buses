// Main Application JavaScript
class BusBookingApp {
    constructor() {
        this.currentUser = null;
        this.currentBooking = {};
        this.buses = this.generateMockBuses();
        this.bookings = JSON.parse(localStorage.getItem('userBookings')) || [];
        
        this.init();
    }

    init() {
        this.setMinDate();
        this.checkAuthStatus();
        this.loadDynamicPages();
        
        // Add event listeners
        document.addEventListener('DOMContentLoaded', () => {
            this.bindEvents();
        });
    }

    setMinDate() {
        const today = new Date().toISOString().split('T')[0];
        const departureDate = document.getElementById('departureDate');
        if (departureDate) {
            departureDate.min = today;
            departureDate.value = today;
        }
    }

    checkAuthStatus() {
        const user = localStorage.getItem('currentUser');
        if (user) {
            this.currentUser = JSON.parse(user);
            this.updateAuthUI(true);
        }
    }

    updateAuthUI(isLoggedIn) {
        const loginBtn = document.getElementById('loginBtn');
        const registerBtn = document.getElementById('registerBtn');
        const logoutBtn = document.getElementById('logoutBtn');

        if (isLoggedIn) {
            loginBtn.style.display = 'none';
            registerBtn.style.display = 'none';
            logoutBtn.style.display = 'inline-flex';
        } else {
            loginBtn.style.display = 'inline-flex';
            registerBtn.style.display = 'inline-flex';
            logoutBtn.style.display = 'none';
        }
    }

    bindEvents() {
        // Mobile menu toggle
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navToggle) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle?.contains(e.target) && !navMenu?.contains(e.target)) {
                navToggle?.classList.remove('active');
                navMenu?.classList.remove('active');
            }
        });
    }

    loadDynamicPages() {
        // This would load page templates - for now we'll create them dynamically
        const dynamicPages = document.getElementById('dynamicPages');
        if (dynamicPages) {
            dynamicPages.innerHTML = `
                <section id="searchPage" class="page">
                    <div class="container">
                        <div class="bus-list">
                            <div class="search-header">
                                <div class="search-summary">
                                    <div class="route-info" id="routeInfo"></div>
                                    <div class="results-count" id="resultsCount"></div>
                                    <button class="btn btn-outline" onclick="showPage('home')">Modify Search</button>
                                </div>
                            </div>
                            <div id="busResults"></div>
                        </div>
                    </div>
                </section>

                <section id="seatsPage" class="page">
                    <div class="container">
                        <div class="seat-selection">
                            <div class="search-header">
                                <div class="search-summary">
                                    <div class="route-info" id="seatRouteInfo"></div>
                                    <button class="btn btn-outline" onclick="showPage('search')">Back to Buses</button>
                                </div>
                            </div>
                            <div class="row" style="display: grid; grid-template-columns: 1fr 300px; gap: 2rem;">
                                <div class="bus-layout">
                                    <h3 id="selectedBusName"></h3>
                                    <div class="seat-legend">
                                        <div class="legend-item">
                                            <div class="legend-seat seat-available"></div>
                                            <span>Available</span>
                                        </div>
                                        <div class="legend-item">
                                            <div class="legend-seat seat-selected"></div>
                                            <span>Selected</span>
                                        </div>
                                        <div class="legend-item">
                                            <div class="legend-seat seat-booked"></div>
                                            <span>Booked</span>
                        </div>
                                    </div>
                                    <div class="seat-map">
                                        <div class="bus-seats" id="seatMap"></div>
                                    </div>
                                </div>
                                <div class="booking-summary" id="bookingSummary"></div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="loginPage" class="page">
                    <div class="container" style="max-width: 400px; margin-top: 2rem;">
                        <div class="passenger-form">
                            <h2>Login to Your Account</h2>
                            <form id="loginForm">
                                <div class="form-group">
                                    <label for="loginEmail">Email</label>
                                    <input type="email" id="loginEmail" class="form-control" required>
                                </div>
                                <div class="form-group">
                                    <label for="loginPassword">Password</label>
                                    <input type="password" id="loginPassword" class="form-control" required>
                                </div>
                                <button type="submit" class="btn btn-primary btn-large" style="width: 100%;">
                                    Login
                                </button>
                            </form>
                            <p style="text-align: center; margin-top: 1rem;">
                                Don't have an account? 
                                <a href="#" onclick="showPage('register')" style="color: var(--primary-color);">Sign Up</a>
                            </p>
                        </div>
                    </div>
                </section>

                <section id="registerPage" class="page">
                    <div class="container" style="max-width: 500px; margin-top: 2rem;">
                        <div class="passenger-form">
                            <h2>Create Your Account</h2>
                            <form id="registerForm">
                                <div class="form-grid">
                                    <div class="form-group">
                                        <label for="regFirstName">First Name</label>
                                        <input type="text" id="regFirstName" class="form-control" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="regLastName">Last Name</label>
                                        <input type="text" id="regLastName" class="form-control" required>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="regEmail">Email</label>
                                    <input type="email" id="regEmail" class="form-control" required>
                                </div>
                                <div class="form-group">
                                    <label for="regPhone">Phone Number</label>
                                    <input type="tel" id="regPhone" class="form-control" required>
                                </div>
                                <div class="form-group">
                                    <label for="regPassword">Password</label>
                                    <input type="password" id="regPassword" class="form-control" required>
                                </div>
                                <div class="form-group">
                                    <label for="regConfirmPassword">Confirm Password</label>
                                    <input type="password" id="regConfirmPassword" class="form-control" required>
                                </div>
                                <button type="submit" class="btn btn-primary btn-large" style="width: 100%;">
                                    Create Account
                                </button>
                            </form>
                            <p style="text-align: center; margin-top: 1rem;">
                                Already have an account? 
                                <a href="#" onclick="showPage('login')" style="color: var(--primary-color);">Login</a>
                            </p>
                        </div>
                    </div>
                </section>

                <section id="bookingsPage" class="page">
                    <div class="container">
                        <div style="margin: 2rem 0;">
                            <h2>My Bookings</h2>
                            <div id="bookingsList"></div>
                        </div>
                    </div>
                </section>

                <section id="profilePage" class="page">
                    <div class="container" style="max-width: 600px; margin-top: 2rem;">
                        <div class="passenger-form">
                            <h2>My Profile</h2>
                            <div id="profileContent"></div>
                        </div>
                    </div>
                </section>
            `;
        }
    }

    generateMockBuses() {
        const busTypes = ['AC Sleeper', 'AC Semi Sleeper', 'Non AC Sleeper', 'AC Seater', 'Non AC Seater'];
        const operators = ['RedBus Express', 'BlueLine Travels', 'WhiteRider Transport', 'Royal Journey', 'Fast Track'];
        const amenities = ['WiFi', 'Charging Point', 'Blanket', 'Pillow', 'Water Bottle', 'Snacks', 'Reading Light'];
        
        const buses = [];
        
        for (let i = 0; i < 15; i++) {
            const departureTime = this.getRandomTime();
            const arrivalTime = this.getRandomTime(departureTime);
            const duration = this.calculateDuration(departureTime, arrivalTime);
            
            buses.push({
                id: `bus_${i + 1}`,
                name: `${operators[Math.floor(Math.random() * operators.length)]}`,
                type: busTypes[Math.floor(Math.random() * busTypes.length)],
                departureTime: departureTime,
                arrivalTime: arrivalTime,
                duration: duration,
                price: Math.floor(Math.random() * 1500) + 500,
                rating: (Math.random() * 2 + 3).toFixed(1),
                reviews: Math.floor(Math.random() * 500) + 50,
                seatsAvailable: Math.floor(Math.random() * 20) + 5,
                totalSeats: 40,
                amenities: this.getRandomAmenities(amenities),
                pickupPoints: ['City Center', 'Railway Station', 'Airport'],
                dropPoints: ['Bus Terminal', 'City Mall', 'Metro Station']
            });
        }
        
        return buses;
    }

    getRandomTime(afterTime = null) {
        let hours, minutes;
        
        if (afterTime) {
            const [afterHours, afterMinutes] = afterTime.split(':').map(Number);
            hours = afterHours + Math.floor(Math.random() * 8) + 2; // 2-10 hours later
            if (hours >= 24) hours -= 24;
            minutes = Math.floor(Math.random() * 60);
        } else {
            hours = Math.floor(Math.random() * 24);
            minutes = Math.floor(Math.random() * 60);
        }
        
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }

    calculateDuration(departure, arrival) {
        const [depHours, depMinutes] = departure.split(':').map(Number);
        const [arrHours, arrMinutes] = arrival.split(':').map(Number);
        
        let depTotal = depHours * 60 + depMinutes;
        let arrTotal = arrHours * 60 + arrMinutes;
        
        if (arrTotal < depTotal) {
            arrTotal += 24 * 60; // Add 24 hours if arrival is next day
        }
        
        const diffMinutes = arrTotal - depTotal;
        const hours = Math.floor(diffMinutes / 60);
        const minutes = diffMinutes % 60;
        
        return `${hours}h ${minutes}m`;
    }

    getRandomAmenities(amenities) {
        const count = Math.floor(Math.random() * 4) + 2;
        const shuffled = [...amenities].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    showToast(message, type = 'info') {
        const toastContainer = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <strong>${type.charAt(0).toUpperCase() + type.slice(1)}</strong>
            <p>${message}</p>
        `;
        
        toastContainer.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 5000);
    }

    showLoading(show = true) {
        const overlay = document.getElementById('loadingOverlay');
        if (show) {
            overlay.classList.add('active');
        } else {
            overlay.classList.remove('active');
        }
    }

    saveToLocalStorage(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    getFromLocalStorage(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }
}

// Global functions for HTML onclick events
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    const targetPage = document.getElementById(pageId + 'Page');
    if (targetPage) {
        targetPage.classList.add('active');
        
        // Update navigation
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Close mobile menu
        const navMenu = document.querySelector('.nav-menu');
        const navToggle = document.querySelector('.nav-toggle');
        navMenu?.classList.remove('active');
        navToggle?.classList.remove('active');
        
        // Load page-specific content
        loadPageContent(pageId);
    }
}

function loadPageContent(pageId) {
    switch(pageId) {
        case 'home':
            // Reset home page if needed
            break;
        case 'bookings':
            loadUserBookings();
            break;
        case 'profile':
            loadUserProfile();
            break;
        case 'login':
            setupLoginForm();
            break;
        case 'register':
            setupRegisterForm();
            break;
    }
}

function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
}

function swapCities() {
    const fromCity = document.getElementById('fromCity');
    const toCity = document.getElementById('toCity');
    
    const temp = fromCity.value;
    fromCity.value = toCity.value;
    toCity.value = temp;
}

function searchBuses() {
    const fromCity = document.getElementById('fromCity').value;
    const toCity = document.getElementById('toCity').value;
    const departureDate = document.getElementById('departureDate').value;
    const passengers = document.getElementById('passengers').value;
    
    if (!fromCity || !toCity || !departureDate || fromCity === toCity) {
        app.showToast('Please fill all fields and ensure different cities are selected', 'error');
        return;
    }
    
    // Store search criteria
    app.currentBooking = {
        fromCity,
        toCity,
        departureDate,
        passengers: parseInt(passengers),
        route: `${getCityName(fromCity)} → ${getCityName(toCity)}`
    };
    
    app.showLoading(true);
    
    setTimeout(() => {
        app.showLoading(false);
        displayBusResults();
        showPage('search');
    }, 1500);
}

function getCityName(cityCode) {
    const cities = {
        'mumbai': 'Mumbai',
        'delhi': 'Delhi',
        'bangalore': 'Bangalore',
        'pune': 'Pune',
        'hyderabad': 'Hyderabad',
        'chennai': 'Chennai',
        'kolkata': 'Kolkata',
        'ahmedabad': 'Ahmedabad'
    };
    return cities[cityCode] || cityCode;
}

function displayBusResults() {
    const routeInfo = document.getElementById('routeInfo');
    const resultsCount = document.getElementById('resultsCount');
    const busResults = document.getElementById('busResults');
    
    if (!routeInfo || !resultsCount || !busResults) return;
    
    routeInfo.textContent = app.currentBooking.route;
    resultsCount.textContent = `${app.buses.length} buses found`;
    
    busResults.innerHTML = app.buses.map(bus => `
        <div class="bus-card fade-in">
            <div class="bus-header">
                <div class="bus-info">
                    <h3>${bus.name}</h3>
                    <p class="bus-type">${bus.type}</p>
                </div>
                <div class="price-info">
                    <div class="price">₹${bus.price}</div>
                    <div style="font-size: 0.9rem; color: var(--text-secondary);">per seat</div>
                </div>
            </div>
            
            <div class="bus-details">
                <div class="detail-item">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span>Departure: ${bus.departureTime}</span>
                </div>
                <div class="detail-item">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <span>Arrival: ${bus.arrivalTime}</span>
                </div>
                <div class="detail-item">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
                    </svg>
                    <span>Duration: ${bus.duration}</span>
                </div>
                <div class="detail-item">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-1 16H9V7h9v14z"/>
                    </svg>
                    <span>${bus.seatsAvailable} seats available</span>
                </div>
                <div class="detail-item">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <span>${bus.rating} ★ (${bus.reviews} reviews)</span>
                </div>
            </div>
            
            <div class="bus-actions">
                <div class="amenities">
                    ${bus.amenities.map(amenity => `<span class="amenity-tag">${amenity}</span>`).join('')}
                </div>
                <button class="btn btn-primary" onclick="selectBus('${bus.id}')">
                    View Seats
                </button>
            </div>
        </div>
    `).join('');
}

function selectBus(busId) {
    const selectedBus = app.buses.find(bus => bus.id === busId);
    if (!selectedBus) return;
    
    app.currentBooking.selectedBus = selectedBus;
    app.currentBooking.selectedSeats = [];
    
    app.showLoading(true);
    
    setTimeout(() => {
        app.showLoading(false);
        displaySeatSelection();
        showPage('seats');
    }, 1000);
}

function logout() {
    localStorage.removeItem('currentUser');
    app.currentUser = null;
    app.updateAuthUI(false);
    app.showToast('Logged out successfully', 'info');
    showPage('home');
}

// Initialize the app
const app = new BusBookingApp();

// Make app globally available for debugging
window.app = app;
