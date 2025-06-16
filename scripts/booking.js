// Booking and seat selection functionality
function displaySeatSelection() {
    const seatRouteInfo = document.getElementById('seatRouteInfo');
    const selectedBusName = document.getElementById('selectedBusName');
    const seatMap = document.getElementById('seatMap');
    const bookingSummary = document.getElementById('bookingSummary');
    
    if (!seatRouteInfo || !selectedBusName || !seatMap || !bookingSummary) return;
    
    const bus = app.currentBooking.selectedBus;
    
    seatRouteInfo.textContent = app.currentBooking.route;
    selectedBusName.textContent = `${bus.name} - ${bus.type}`;
    
    // Generate seat map
    generateSeatMap();
    updateBookingSummary();
}

function generateSeatMap() {
    const seatMap = document.getElementById('seatMap');
    if (!seatMap) return;
    
    const totalSeats = 40;
    const bookedSeats = generateRandomBookedSeats(totalSeats);
    
    let seatHTML = '';
    
    for (let i = 1; i <= totalSeats; i++) {
        const isBooked = bookedSeats.includes(i);
        const seatClass = isBooked ? 'seat booked' : 'seat';
        
        seatHTML += `<div class="${seatClass}" data-seat="${i}" onclick="toggleSeat(${i})">${i}</div>`;
        
        // Add aisle after every 4 seats in some rows
        if (i % 4 === 0 && i < totalSeats) {
            seatHTML += '<div class="aisle"></div>';
        }
    }
    
    seatMap.innerHTML = seatHTML;
}

function generateRandomBookedSeats(totalSeats) {
    const numBooked = Math.floor(Math.random() * 15) + 5; // 5-20 booked seats
    const booked = [];
    
    while (booked.length < numBooked) {
        const seat = Math.floor(Math.random() * totalSeats) + 1;
        if (!booked.includes(seat)) {
            booked.push(seat);
        }
    }
    
    return booked;
}

function toggleSeat(seatNumber) {
    const seatElement = document.querySelector(`[data-seat="${seatNumber}"]`);
    if (!seatElement || seatElement.classList.contains('booked')) return;
    
    const selectedSeats = app.currentBooking.selectedSeats || [];
    const maxPassengers = app.currentBooking.passengers;
    
    if (seatElement.classList.contains('selected')) {
        // Deselect seat
        seatElement.classList.remove('selected');
        app.currentBooking.selectedSeats = selectedSeats.filter(seat => seat !== seatNumber);
    } else {
        // Select seat
        if (selectedSeats.length >= maxPassengers) {
            app.showToast(`You can only select ${maxPassengers} seat(s)`, 'error');
            return;
        }
        
        seatElement.classList.add('selected');
        app.currentBooking.selectedSeats = [...selectedSeats, seatNumber];
    }
    
    updateBookingSummary();
}

function updateBookingSummary() {
    const bookingSummary = document.getElementById('bookingSummary');
    if (!bookingSummary) return;
    
    const bus = app.currentBooking.selectedBus;
    const selectedSeats = app.currentBooking.selectedSeats || [];
    const seatPrice = bus.price;
    const subtotal = selectedSeats.length * seatPrice;
    const taxes = Math.round(subtotal * 0.05); // 5% tax
    const total = subtotal + taxes;
    
    app.currentBooking.pricing = {
        seatPrice,
        subtotal,
        taxes,
        total
    };
    
    bookingSummary.innerHTML = `
        <h4>Booking Summary</h4>
        
        <div class="summary-item">
            <span>Route:</span>
            <span>${app.currentBooking.route}</span>
        </div>
        
        <div class="summary-item">
            <span>Date:</span>
            <span>${new Date(app.currentBooking.departureDate).toLocaleDateString()}</span>
        </div>
        
        <div class="summary-item">
            <span>Bus:</span>
            <span>${bus.name}</span>
        </div>
        
        <div class="summary-item">
            <span>Departure:</span>
            <span>${bus.departureTime}</span>
        </div>
        
        <div class="summary-item">
            <span>Selected Seats:</span>
            <span>${selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}</span>
        </div>
        
        <div class="summary-item">
            <span>Seat Price:</span>
            <span>₹${seatPrice}</span>
        </div>
        
        <div class="summary-item">
            <span>Subtotal:</span>
            <span>₹${subtotal}</span>
        </div>
        
        <div class="summary-item">
            <span>Taxes & Fees:</span>
            <span>₹${taxes}</span>
        </div>
        
        <div class="summary-item total">
            <span>Total Amount:</span>
            <span>₹${total}</span>
        </div>
        
        <button class="btn btn-primary btn-large" 
                onclick="proceedToPassengerDetails()" 
                ${selectedSeats.length === 0 ? 'disabled' : ''}
                style="width: 100%; margin-top: 1rem;">
            Continue to Passenger Details
        </button>
    `;
}

function proceedToPassengerDetails() {
    if (!app.currentUser) {
        app.showToast('Please login to continue booking', 'error');
        showPage('login');
        return;
    }
    
    const selectedSeats = app.currentBooking.selectedSeats || [];
    if (selectedSeats.length === 0) {
        app.showToast('Please select at least one seat', 'error');
        return;
    }
    
    app.showLoading(true);
    
    setTimeout(() => {
        app.showLoading(false);
        displayPassengerForm();
        showPage('passenger');
    }, 1000);
}

function displayPassengerForm() {
    const dynamicPages = document.getElementById('dynamicPages');
    if (!dynamicPages) return;
    
    const selectedSeats = app.currentBooking.selectedSeats || [];
    const bus = app.currentBooking.selectedBus;
    
    const passengerPageHTML = `
        <section id="passengerPage" class="page active">
            <div class="container">
                <div style="margin: 2rem 0;">
                    <div class="search-header">
                        <div class="search-summary">
                            <div class="route-info">${app.currentBooking.route} - Passenger Details</div>
                            <button class="btn btn-outline" onclick="showPage('seats')">Back to Seats</button>
                        </div>
                    </div>
                    
                    <div class="row" style="display: grid; grid-template-columns: 1fr 300px; gap: 2rem;">
                        <div class="passenger-form">
                            <h3>Passenger Information</h3>
                            <p style="color: var(--text-secondary); margin-bottom: 2rem;">
                                Please provide details for all passengers. Ensure names match your ID proof.
                            </p>
                            
                            <form id="passengerDetailsForm">
                                <div class="passenger-details">
                                    ${selectedSeats.map((seat, index) => `
                                        <div class="passenger-card">
                                            <h4>Passenger ${index + 1} - Seat ${seat}</h4>
                                            <div class="form-grid">
                                                <div class="form-group">
                                                    <label for="firstName_${index}">First Name *</label>
                                                    <input type="text" id="firstName_${index}" class="form-control" required>
                                                </div>
                                                <div class="form-group">
                                                    <label for="lastName_${index}">Last Name *</label>
                                                    <input type="text" id="lastName_${index}" class="form-control" required>
                                                </div>
                                                <div class="form-group">
                                                    <label for="age_${index}">Age *</label>
                                                    <input type="number" id="age_${index}" class="form-control" min="1" max="120" required>
                                                </div>
                                                <div class="form-group">
                                                    <label for="gender_${index}">Gender *</label>
                                                    <select id="gender_${index}" class="form-control" required>
                                                        <option value="">Select Gender</option>
                                                        <option value="Male">Male</option>
                                                        <option value="Female">Female</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                                
                                <div class="passenger-card">
                                    <h4>Contact Information</h4>
                                    <div class="form-grid">
                                        <div class="form-group">
                                            <label for="contactEmail">Email *</label>
                                            <input type="email" id="contactEmail" class="form-control" value="${app.currentUser.email}" required>
                                        </div>
                                        <div class="form-group">
                                            <label for="contactPhone">Phone Number *</label>
                                            <input type="tel" id="contactPhone" class="form-control" value="${app.currentUser.phone}" required>
                                        </div>
                                    </div>
                                </div>
                                
                                <button type="submit" class="btn btn-primary btn-large" style="width: 100%;">
                                    Proceed to Payment
                                </button>
                            </form>
                        </div>
                        
                        <div class="booking-summary" id="passengerBookingSummary">
                            ${generateBookingSummaryHTML()}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
    
    // Replace existing passenger page or add new one
    const existingPage = document.getElementById('passengerPage');
    if (existingPage) {
        existingPage.outerHTML = passengerPageHTML;
    } else {
        dynamicPages.innerHTML += passengerPageHTML;
    }
    
    // Setup form submission
    const form = document.getElementById('passengerDetailsForm');
    if (form) {
        form.onsubmit = function(e) {
            e.preventDefault();
            validateAndProceedToPayment();
        };
    }
}

function generateBookingSummaryHTML() {
    const bus = app.currentBooking.selectedBus;
    const selectedSeats = app.currentBooking.selectedSeats || [];
    const pricing = app.currentBooking.pricing;
    
    return `
        <h4>Booking Summary</h4>
        
        <div class="summary-item">
            <span>Route:</span>
            <span>${app.currentBooking.route}</span>
        </div>
        
        <div class="summary-item">
            <span>Date:</span>
            <span>${new Date(app.currentBooking.departureDate).toLocaleDateString()}</span>
        </div>
        
        <div class="summary-item">
            <span>Bus:</span>
            <span>${bus.name}</span>
        </div>
        
        <div class="summary-item">
            <span>Type:</span>
            <span>${bus.type}</span>
        </div>
        
        <div class="summary-item">
            <span>Departure:</span>
            <span>${bus.departureTime}</span>
        </div>
        
        <div class="summary-item">
            <span>Seats:</span>
            <span>${selectedSeats.join(', ')}</span>
        </div>
        
        <div class="summary-item">
            <span>Passengers:</span>
            <span>${selectedSeats.length}</span>
        </div>
        
        <div class="summary-item">
            <span>Seat Price:</span>
            <span>₹${pricing.seatPrice}</span>
        </div>
        
        <div class="summary-item">
            <span>Subtotal:</span>
            <span>₹${pricing.subtotal}</span>
        </div>
        
        <div class="summary-item">
            <span>Taxes & Fees:</span>
            <span>₹${pricing.taxes}</span>
        </div>
        
        <div class="summary-item total">
            <span>Total Amount:</span>
            <span>₹${pricing.total}</span>
        </div>
    `;
}

function validateAndProceedToPayment() {
    const selectedSeats = app.currentBooking.selectedSeats || [];
    const passengers = [];
    let isValid = true;
    
    // Validate passenger details
    for (let i = 0; i < selectedSeats.length; i++) {
        const firstName = document.getElementById(`firstName_${i}`)?.value.trim();
        const lastName = document.getElementById(`lastName_${i}`)?.value.trim();
        const age = document.getElementById(`age_${i}`)?.value;
        const gender = document.getElementById(`gender_${i}`)?.value;
        
        if (!firstName || !lastName || !age || !gender) {
            app.showToast(`Please fill all details for Passenger ${i + 1}`, 'error');
            isValid = false;
            break;
        }
        
        if (parseInt(age) < 1 || parseInt(age) > 120) {
            app.showToast(`Please enter a valid age for Passenger ${i + 1}`, 'error');
            isValid = false;
            break;
        }
        
        passengers.push({
            firstName,
            lastName,
            age: parseInt(age),
            gender,
            seatNumber: selectedSeats[i]
        });
    }
    
    // Validate contact information
    const contactEmail = document.getElementById('contactEmail')?.value.trim();
    const contactPhone = document.getElementById('contactPhone')?.value.trim();
    
    if (!contactEmail || !contactPhone) {
        app.showToast('Please provide contact information', 'error');
        isValid = false;
    }
    
    if (!isValidEmail(contactEmail)) {
        app.showToast('Please enter a valid email address', 'error');
        isValid = false;
    }
    
    if (!isValidPhone(contactPhone)) {
        app.showToast('Please enter a valid phone number', 'error');
        isValid = false;
    }
    
    if (!isValid) return;
    
    // Store passenger details
    app.currentBooking.passengers = passengers;
    app.currentBooking.contactEmail = contactEmail;
    app.currentBooking.contactPhone = contactPhone;
    
    app.showLoading(true);
    
    setTimeout(() => {
        app.showLoading(false);
        displayPaymentForm();
        showPage('payment');
    }, 1000);
}
