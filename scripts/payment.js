// Payment processing functionality
function displayPaymentForm() {
    const dynamicPages = document.getElementById('dynamicPages');
    if (!dynamicPages) return;
    
    const bus = app.currentBooking.selectedBus;
    const pricing = app.currentBooking.pricing;
    
    const paymentPageHTML = `
        <section id="paymentPage" class="page active">
            <div class="container">
                <div style="margin: 2rem 0;">
                    <div class="search-header">
                        <div class="search-summary">
                            <div class="route-info">${app.currentBooking.route} - Payment</div>
                            <button class="btn btn-outline" onclick="showPage('passenger')">Back to Passenger Details</button>
                        </div>
                    </div>
                    
                    <div class="row" style="display: grid; grid-template-columns: 1fr 300px; gap: 2rem;">
                        <div class="passenger-form">
                            <h3>Payment Information</h3>
                            <p style="color: var(--text-secondary); margin-bottom: 2rem;">
                                Choose your preferred payment method and complete the booking.
                            </p>
                            
                            <form id="paymentForm">
                                <div class="payment-methods">
                                    <div class="payment-method" data-method="card" onclick="selectPaymentMethod('card')">
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
                                        </svg>
                                        <h4>Credit/Debit Card</h4>
                                        <p>Visa, MasterCard, RuPay</p>
                                    </div>
                                    
                                    <div class="payment-method" data-method="upi" onclick="selectPaymentMethod('upi')">
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                        </svg>
                                        <h4>UPI Payment</h4>
                                        <p>Google Pay, PhonePe, Paytm</p>
                                    </div>
                                    
                                    <div class="payment-method" data-method="netbanking" onclick="selectPaymentMethod('netbanking')">
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M5 4v3h5.5v12h3V7H19V4z"/>
                                        </svg>
                                        <h4>Net Banking</h4>
                                        <p>All major banks supported</p>
                                    </div>
                                    
                                    <div class="payment-method" data-method="wallet" onclick="selectPaymentMethod('wallet')">
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M10 16V8c0-1.11.89-2 2-2h9V4c0-1.11-.89-2-2-2H3c-1.11 0-2 .89-2 2v16c0 1.11.89 2 2 2h18c1.11 0 2-.89 2-2v-2h-9c-1.11 0-2-.89-2-2z"/>
                                        </svg>
                                        <h4>Digital Wallet</h4>
                                        <p>Paytm, PhonePe, Amazon Pay</p>
                                    </div>
                                </div>
                                
                                <!-- Card Payment Details -->
                                <div id="cardDetails" class="payment-details">
                                    <h4>Card Details</h4>
                                    <div class="form-grid">
                                        <div class="form-group" style="grid-column: span 2;">
                                            <label for="cardNumber">Card Number *</label>
                                            <input type="text" id="cardNumber" class="form-control" placeholder="1234 5678 9012 3456" maxlength="19">
                                        </div>
                                        <div class="form-group">
                                            <label for="expiryDate">Expiry Date *</label>
                                            <input type="text" id="expiryDate" class="form-control" placeholder="MM/YY" maxlength="5">
                                        </div>
                                        <div class="form-group">
                                            <label for="cvv">CVV *</label>
                                            <input type="text" id="cvv" class="form-control" placeholder="123" maxlength="3">
                                        </div>
                                        <div class="form-group" style="grid-column: span 2;">
                                            <label for="cardName">Name on Card *</label>
                                            <input type="text" id="cardName" class="form-control" placeholder="John Doe">
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- UPI Payment Details -->
                                <div id="upiDetails" class="payment-details">
                                    <h4>UPI Payment</h4>
                                    <div class="form-group">
                                        <label for="upiId">UPI ID *</label>
                                        <input type="text" id="upiId" class="form-control" placeholder="yourname@paytm">
                                    </div>
                                    <p style="color: var(--text-secondary); font-size: 0.9rem;">
                                        You will receive a payment request on your UPI app.
                                    </p>
                                </div>
                                
                                <!-- Net Banking Details -->
                                <div id="netbankingDetails" class="payment-details">
                                    <h4>Select Your Bank</h4>
                                    <div class="form-group">
                                        <select id="bankSelect" class="form-control">
                                            <option value="">Choose your bank</option>
                                            <option value="sbi">State Bank of India</option>
                                            <option value="hdfc">HDFC Bank</option>
                                            <option value="icici">ICICI Bank</option>
                                            <option value="axis">Axis Bank</option>
                                            <option value="kotak">Kotak Mahindra Bank</option>
                                            <option value="pnb">Punjab National Bank</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <!-- Wallet Payment Details -->
                                <div id="walletDetails" class="payment-details">
                                    <h4>Select Digital Wallet</h4>
                                    <div class="form-group">
                                        <select id="walletSelect" class="form-control">
                                            <option value="">Choose your wallet</option>
                                            <option value="paytm">Paytm</option>
                                            <option value="phonepe">PhonePe</option>
                                            <option value="amazonpay">Amazon Pay</option>
                                            <option value="googlepay">Google Pay</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div style="margin: 2rem 0;">
                                    <label style="display: flex; align-items: center; gap: 0.5rem;">
                                        <input type="checkbox" id="termsAccept" required>
                                        <span>I agree to the <a href="#" style="color: var(--primary-color);">Terms & Conditions</a> and <a href="#" style="color: var(--primary-color);">Privacy Policy</a></span>
                                    </label>
                                </div>
                                
                                <button type="submit" class="btn btn-primary btn-large" style="width: 100%;" id="paymentButton" disabled>
                                    Pay Ksh ${pricing.total}
                                </button>
                            </form>
                        </div>
                        
                        <div class="booking-summary">
                            ${generateBookingSummaryHTML()}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
    
    // Replace existing payment page or add new one
    const existingPage = document.getElementById('paymentPage');
    if (existingPage) {
        existingPage.outerHTML = paymentPageHTML;
    } else {
        dynamicPages.innerHTML += paymentPageHTML;
    }
    
    // Setup payment form
    setupPaymentForm();
}

function setupPaymentForm() {
    const paymentForm = document.getElementById('paymentForm');
    const termsCheckbox = document.getElementById('termsAccept');
    const paymentButton = document.getElementById('paymentButton');
    
    // Format card number input
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
        });
    }
    
    // Format expiry date input
    const expiryInput = document.getElementById('expiryDate');
    if (expiryInput) {
        expiryInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
        });
    }
    
    // CVV input validation
    const cvvInput = document.getElementById('cvv');
    if (cvvInput) {
        cvvInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }
    
    // Enable/disable payment button based on terms acceptance
    if (termsCheckbox && paymentButton) {
        termsCheckbox.addEventListener('change', function() {
            paymentButton.disabled = !this.checked;
        });
    }
    
    // Handle form submission
    if (paymentForm) {
        paymentForm.onsubmit = function(e) {
            e.preventDefault();
            processPayment();
        };
    }
}

function selectPaymentMethod(method) {
    // Remove selected class from all methods
    const paymentMethods = document.querySelectorAll('.payment-method');
    paymentMethods.forEach(pm => pm.classList.remove('selected'));
    
    // Add selected class to clicked method
    const selectedMethod = document.querySelector(`[data-method="${method}"]`);
    if (selectedMethod) {
        selectedMethod.classList.add('selected');
    }
    
    // Hide all payment details
    const paymentDetails = document.querySelectorAll('.payment-details');
    paymentDetails.forEach(pd => pd.classList.remove('active'));
    
    // Show selected payment details
    const selectedDetails = document.getElementById(`${method}Details`);
    if (selectedDetails) {
        selectedDetails.classList.add('active');
    }
    
    // Store selected method
    app.currentBooking.paymentMethod = method;
}

function processPayment() {
    const selectedMethod = app.currentBooking.paymentMethod;
    
    if (!selectedMethod) {
        app.showToast('Please select a payment method', 'error');
        return;
    }
    
    // Validate payment method specific fields
    if (!validatePaymentDetails(selectedMethod)) {
        return;
    }
    
    app.showLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
        app.showLoading(false);
        
        // Simulate payment success (90% success rate)
        const isSuccess = Math.random() > 0.1;
        
        if (isSuccess) {
            completeBooking();
        } else {
            app.showToast('Payment failed. Please try again.', 'error');
        }
    }, 3000);
}

function validatePaymentDetails(method) {
    switch (method) {
        case 'card':
            return validateCardDetails();
        case 'upi':
            return validateUPIDetails();
        case 'netbanking':
            return validateNetBankingDetails();
        case 'wallet':
            return validateWalletDetails();
        default:
            return false;
    }
}

function validateCardDetails() {
    const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;
    const cardName = document.getElementById('cardName').value.trim();
    
    if (!cardNumber || cardNumber.length < 13) {
        app.showToast('Please enter a valid card number', 'error');
        return false;
    }
    
    if (!expiryDate || expiryDate.length !== 5) {
        app.showToast('Please enter a valid expiry date', 'error');
        return false;
    }
    
    if (!cvv || cvv.length < 3) {
        app.showToast('Please enter a valid CVV', 'error');
        return false;
    }
    
    if (!cardName) {
        app.showToast('Please enter the name on card', 'error');
        return false;
    }
    
    return true;
}

function validateUPIDetails() {
    const upiId = document.getElementById('upiId').value.trim();
    
    if (!upiId || !upiId.includes('@')) {
        app.showToast('Please enter a valid UPI ID', 'error');
        return false;
    }
    
    return true;
}

function validateNetBankingDetails() {
    const bankSelect = document.getElementById('bankSelect').value;
    
    if (!bankSelect) {
        app.showToast('Please select your bank', 'error');
        return false;
    }
    
    return true;
}

function validateWalletDetails() {
    const walletSelect = document.getElementById('walletSelect').value;
    
    if (!walletSelect) {
        app.showToast('Please select your digital wallet', 'error');
        return false;
    }
    
    return true;
}

function completeBooking() {
    // Generate booking ID
    const bookingId = 'BB' + Date.now().toString().slice(-8);
    
    // Create booking record
    const booking = {
        bookingId: bookingId,
        userId: app.currentUser.id,
        route: app.currentBooking.route,
        fromCity: app.currentBooking.fromCity,
        toCity: app.currentBooking.toCity,
        travelDate: app.currentBooking.departureDate,
        busName: app.currentBooking.selectedBus.name,
        busType: app.currentBooking.selectedBus.type,
        departureTime: app.currentBooking.selectedBus.departureTime,
        arrivalTime: app.currentBooking.selectedBus.arrivalTime,
        selectedSeats: app.currentBooking.selectedSeats,
        passengers: app.currentBooking.passengers,
        contactEmail: app.currentBooking.contactEmail,
        contactPhone: app.currentBooking.contactPhone,
        paymentMethod: app.currentBooking.paymentMethod,
        totalAmount: app.currentBooking.pricing.total,
        bookingDate: Date.now(),
        status: 'Confirmed'
    };
    
    // Save booking
    app.bookings.push(booking);
    app.saveToLocalStorage('userBookings', app.bookings);
    
    // Store current booking for confirmation page
    app.currentBooking.completedBooking = booking;
    
    // Show confirmation
    displayConfirmationPage();
    showPage('confirmation');
    
    // Send confirmation simulation
    simulateConfirmationMessages(booking);
}

function displayConfirmationPage() {
    const dynamicPages = document.getElementById('dynamicPages');
    if (!dynamicPages) return;
    
    const booking = app.currentBooking.completedBooking;
    
    const confirmationPageHTML = `
        <section id="confirmationPage" class="page active">
            <div class="container">
                <div class="confirmation">
                    <svg class="success-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    
                    <h2>Booking Confirmed!</h2>
                    <p>Your bus ticket has been booked successfully.</p>
                    
                    <div class="ticket">
                        <div class="ticket-header">
                            <h3>BusBooking - E-Ticket</h3>
                            <p><strong>Booking ID:</strong> ${booking.bookingId}</p>
                        </div>
                        
                        <div class="ticket-details">
                            <div>
                                <div class="ticket-item">
                                    <strong>Route:</strong>
                                    <span>${booking.route}</span>
                                </div>
                                <div class="ticket-item">
                                    <strong>Date:</strong>
                                    <span>${new Date(booking.travelDate).toLocaleDateString()}</span>
                                </div>
                                <div class="ticket-item">
                                    <strong>Bus:</strong>
                                    <span>${booking.busName}</span>
                                </div>
                                <div class="ticket-item">
                                    <strong>Type:</strong>
                                    <span>${booking.busType}</span>
                                </div>
                            </div>
                            <div>
                                <div class="ticket-item">
                                    <strong>Departure:</strong>
                                    <span>${booking.departureTime}</span>
                                </div>
                                <div class="ticket-item">
                                    <strong>Arrival:</strong>
                                    <span>${booking.arrivalTime}</span>
                                </div>
                                <div class="ticket-item">
                                    <strong>Seats:</strong>
                                    <span>${booking.selectedSeats.join(', ')}</span>
                                </div>
                                <div class="ticket-item">
                                    <strong>Amount:</strong>
                                    <span>Ksh ${booking.totalAmount}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div style="margin-top: 1.5rem;">
                            <h4>Passenger Details:</h4>
                            <div style="margin-top: 1rem;">
                                ${booking.passengers.map((passenger, index) => `
                                    <div style="display: flex; justify-content: space-between; padding: 0.25rem 0;">
                                        <span><strong>Seat ${booking.selectedSeats[index]}:</strong> ${passenger.firstName} ${passenger.lastName}</span>
                                        <span>${passenger.gender}, ${passenger.age} years</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        
                        <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--border-color);">
                            <div class="ticket-item">
                                <strong>Contact:</strong>
                                <span>${booking.contactEmail} | ${booking.contactPhone}</span>
                            </div>
                            <div class="ticket-item">
                                <strong>Status:</strong>
                                <span style="color: #28a745; font-weight: bold;">${booking.status}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 2rem; flex-wrap: wrap;">
                        <button class="btn btn-outline" onclick="printTicket('${booking.bookingId}')">
                            Print Ticket
                        </button>
                        <button class="btn btn-secondary" onclick="showPage('bookings')">
                            View All Bookings
                        </button>
                        <button class="btn btn-primary" onclick="showPage('home')">
                            Book Another Trip
                        </button>
                    </div>
                    
                    <div style="margin-top: 2rem; padding: 1rem; background: var(--background-light); border-radius: var(--border-radius); text-align: left;">
                        <h4>Important Instructions:</h4>
                        <ul style="margin: 1rem 0; padding-left: 1.5rem;">
                            <li>Please carry a valid government-issued photo ID during travel</li>
                            <li>Report to the boarding point at least 15 minutes before departure</li>
                            <li>Smoking and consumption of alcohol is strictly prohibited</li>
                            <li>For any queries, contact our support at 1800-123-4567</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    `;
    
    // Replace existing confirmation page or add new one
    const existingPage = document.getElementById('confirmationPage');
    if (existingPage) {
        existingPage.outerHTML = confirmationPageHTML;
    } else {
        dynamicPages.innerHTML += confirmationPageHTML;
    }
}

function simulateConfirmationMessages(booking) {
    // Simulate email confirmation
    setTimeout(() => {
        app.showToast('Confirmation email sent to ' + booking.contactEmail, 'success');
    }, 2000);
    
    // Simulate SMS confirmation
    setTimeout(() => {
        app.showToast('Booking details sent via SMS to ' + booking.contactPhone, 'info');
    }, 4000);
}
