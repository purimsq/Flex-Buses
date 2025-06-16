// Authentication functionality
function setupLoginForm() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;

    loginForm.onsubmit = function(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;
        
        if (!email || !password) {
            app.showToast('Please fill all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            app.showToast('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate authentication
        app.showLoading(true);
        
        setTimeout(() => {
            app.showLoading(false);
            
            // Check if user exists in localStorage (for demo)
            const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
            const user = existingUsers.find(u => u.email === email);
            
            if (user && user.password === password) {
                // Remove password from stored user data
                const { password: _, ...userWithoutPassword } = user;
                localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
                app.currentUser = userWithoutPassword;
                app.updateAuthUI(true);
                app.showToast('Login successful!', 'success');
                showPage('home');
            } else {
                app.showToast('Invalid email or password', 'error');
            }
        }, 1500);
    };
}

function setupRegisterForm() {
    const registerForm = document.getElementById('registerForm');
    if (!registerForm) return;

    // Auto-detect country and set phone prefix
    detectUserCountry();

    registerForm.onsubmit = function(e) {
        e.preventDefault();
        
        const firstName = document.getElementById('regFirstName').value.trim();
        const lastName = document.getElementById('regLastName').value.trim();
        const email = document.getElementById('regEmail').value.trim();
        const phone = document.getElementById('regPhone').value.trim();
        const password = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('regConfirmPassword').value;
        
        // Enhanced validation
        if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
            app.showToast('Please fill all fields', 'error');
            return;
        }
        
        // Name validation
        if (!isValidName(firstName)) {
            app.showToast('First name must be at least 2 characters and contain only letters', 'error');
            return;
        }
        
        if (!isValidName(lastName)) {
            app.showToast('Last name must be at least 2 characters and contain only letters', 'error');
            return;
        }
        
        // Email validation
        if (!isValidEmail(email)) {
            app.showToast('Please enter a valid email address', 'error');
            return;
        }
        
        // Check if email already exists
        const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        if (existingUsers.find(u => u.email === email)) {
            app.showToast('An account with this email already exists', 'error');
            return;
        }
        
        // Phone validation
        if (!isValidPhone(phone)) {
            app.showToast('Please enter a valid phone number with country code', 'error');
            return;
        }
        
        // Password validation
        const passwordValidation = validatePassword(password);
        if (!passwordValidation.isValid) {
            app.showToast(passwordValidation.message, 'error');
            return;
        }
        
        if (password !== confirmPassword) {
            app.showToast('Passwords do not match', 'error');
            return;
        }
        
        // Simulate registration
        app.showLoading(true);
        
        setTimeout(() => {
            app.showLoading(false);
            
            const user = {
                id: Date.now(),
                firstName,
                lastName,
                email,
                phone,
                password // Store password for demo (in real app, this would be hashed)
            };
            
            // Store user in registered users list
            existingUsers.push(user);
            localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));
            
            // Set current user (without password)
            const { password: _, ...userWithoutPassword } = user;
            localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
            app.currentUser = userWithoutPassword;
            app.updateAuthUI(true);
            app.showToast('Account created successfully!', 'success');
            showPage('home');
        }, 2000);
    };
}

function loadUserProfile() {
    const profileContent = document.getElementById('profileContent');
    if (!profileContent) return;
    
    if (!app.currentUser) {
        profileContent.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <h3>Please login to view your profile</h3>
                <button class="btn btn-primary" onclick="showPage('login')">Login</button>
            </div>
        `;
        return;
    }
    
    profileContent.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
            <div>
                <h3>Personal Information</h3>
                <form id="profileForm">
                    <div class="form-grid">
                        <div class="form-group">
                            <label for="profileFirstName">First Name</label>
                            <input type="text" id="profileFirstName" class="form-control" value="${app.currentUser.firstName}" required>
                        </div>
                        <div class="form-group">
                            <label for="profileLastName">Last Name</label>
                            <input type="text" id="profileLastName" class="form-control" value="${app.currentUser.lastName}" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="profileEmail">Email</label>
                        <input type="email" id="profileEmail" class="form-control" value="${app.currentUser.email}" required>
                    </div>
                    <div class="form-group">
                        <label for="profilePhone">Phone Number</label>
                        <input type="tel" id="profilePhone" class="form-control" value="${app.currentUser.phone}" required>
                    </div>
                    <button type="submit" class="btn btn-primary">Update Profile</button>
                </form>
            </div>
            
            <div>
                <h3>Change Password</h3>
                <form id="passwordForm">
                    <div class="form-group">
                        <label for="currentPassword">Current Password</label>
                        <input type="password" id="currentPassword" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="newPassword">New Password</label>
                        <input type="password" id="newPassword" class="form-control" required>
                        <small style="color: var(--text-secondary); font-size: 0.85rem;">
                            Password must be 8+ characters with uppercase, lowercase, number, and special character
                        </small>
                    </div>
                    <div class="form-group">
                        <label for="confirmNewPassword">Confirm New Password</label>
                        <input type="password" id="confirmNewPassword" class="form-control" required>
                    </div>
                    <button type="submit" class="btn btn-secondary">Change Password</button>
                </form>
            </div>
        </div>
    `;
    
    document.getElementById('profileForm').onsubmit = function(e) {
        e.preventDefault();
        updateUserProfile();
    };
}

function updateUserProfile() {
    const firstName = document.getElementById('profileFirstName').value;
    const lastName = document.getElementById('profileLastName').value;
    const email = document.getElementById('profileEmail').value;
    const phone = document.getElementById('profilePhone').value;
    
    if (!firstName || !lastName || !email || !phone) {
        app.showToast('Please fill all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        app.showToast('Please enter a valid email address', 'error');
        return;
    }
    
    if (!isValidPhone(phone)) {
        app.showToast('Please enter a valid phone number', 'error');
        return;
    }
    
    app.showLoading(true);
    
    setTimeout(() => {
        app.showLoading(false);
        
        app.currentUser = {
            ...app.currentUser,
            firstName,
            lastName,
            email,
            phone
        };
        
        localStorage.setItem('currentUser', JSON.stringify(app.currentUser));
        app.showToast('Profile updated successfully!', 'success');
    }, 1000);
}

function loadUserBookings() {
    const bookingsList = document.getElementById('bookingsList');
    if (!bookingsList) return;
    
    if (!app.currentUser) {
        bookingsList.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <h3>Please login to view your bookings</h3>
                <button class="btn btn-primary" onclick="showPage('login')">Login</button>
            </div>
        `;
        return;
    }
    
    const userBookings = app.bookings.filter(booking => booking.userId === app.currentUser.id);
    
    if (userBookings.length === 0) {
        bookingsList.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <h3>No bookings found</h3>
                <p>Start planning your journey!</p>
                <button class="btn btn-primary" onclick="showPage('home')">Book Now</button>
            </div>
        `;
        return;
    }
    
    bookingsList.innerHTML = userBookings.map(booking => `
        <div class="bus-card">
            <div class="bus-header">
                <div class="bus-info">
                    <h3>${booking.route}</h3>
                    <p class="bus-type">Booking ID: ${booking.bookingId}</p>
                </div>
                <div class="price-info">
                    <div class="price">₹${booking.totalAmount}</div>
                    <div style="font-size: 0.9rem; color: var(--text-secondary);">${booking.passengers.length} passenger(s)</div>
                </div>
            </div>
            
            <div class="bus-details">
                <div class="detail-item">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                    </svg>
                    <span>Date: ${booking.travelDate}</span>
                </div>
                <div class="detail-item">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                    </svg>
                    <span>Bus: ${booking.busName}</span>
                </div>
                <div class="detail-item">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-1 16H9V7h9v14z"/>
                    </svg>
                    <span>Seats: ${booking.selectedSeats.join(', ')}</span>
                </div>
                <div class="detail-item">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                    </svg>
                    <span>Status: ${booking.status}</span>
                </div>
            </div>
            
            <div class="bus-actions">
                <div>
                    <span style="color: var(--text-secondary); font-size: 0.9rem;">Booked on: ${new Date(booking.bookingDate).toLocaleDateString()}</span>
                </div>
                <div style="display: flex; gap: 1rem;">
                    <button class="btn btn-outline" onclick="printTicket('${booking.bookingId}')">
                        Print Ticket
                    </button>
                    ${booking.status === 'Confirmed' ? `
                        <button class="btn btn-primary" onclick="cancelBooking('${booking.bookingId}')">
                            Cancel
                        </button>
                    ` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

function printTicket(bookingId) {
    const booking = app.bookings.find(b => b.bookingId === bookingId);
    if (!booking) return;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Bus Ticket - ${booking.bookingId}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                .ticket { border: 2px solid #000; padding: 20px; max-width: 600px; }
                .header { text-align: center; border-bottom: 2px dashed #000; padding-bottom: 10px; margin-bottom: 15px; }
                .details { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
                .detail-row { display: flex; justify-content: space-between; margin: 5px 0; }
                .passengers { margin-top: 15px; }
                .footer { text-align: center; margin-top: 20px; font-size: 12px; }
            </style>
        </head>
        <body>
            <div class="ticket">
                <div class="header">
                    <h2>BusBooking - Bus Ticket</h2>
                    <p>Booking ID: ${booking.bookingId}</p>
                </div>
                <div class="details">
                    <div>
                        <div class="detail-row"><strong>Route:</strong> ${booking.route}</div>
                        <div class="detail-row"><strong>Date:</strong> ${booking.travelDate}</div>
                        <div class="detail-row"><strong>Bus:</strong> ${booking.busName}</div>
                        <div class="detail-row"><strong>Departure:</strong> ${booking.departureTime}</div>
                    </div>
                    <div>
                        <div class="detail-row"><strong>Seats:</strong> ${booking.selectedSeats.join(', ')}</div>
                        <div class="detail-row"><strong>Amount:</strong> ₹${booking.totalAmount}</div>
                        <div class="detail-row"><strong>Status:</strong> ${booking.status}</div>
                        <div class="detail-row"><strong>Booked:</strong> ${new Date(booking.bookingDate).toLocaleDateString()}</div>
                    </div>
                </div>
                <div class="passengers">
                    <h4>Passenger Details:</h4>
                    ${booking.passengers.map((p, i) => `
                        <p><strong>Seat ${booking.selectedSeats[i]}:</strong> ${p.firstName} ${p.lastName} (${p.gender}, ${p.age} years)</p>
                    `).join('')}
                </div>
                <div class="footer">
                    <p>Thank you for choosing BusBooking. Have a safe journey!</p>
                    <p>For support: support@busbooking.com | 1800-123-4567</p>
                </div>
            </div>
        </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}

function cancelBooking(bookingId) {
    if (!confirm('Are you sure you want to cancel this booking?')) return;
    
    app.showLoading(true);
    
    setTimeout(() => {
        app.showLoading(false);
        
        const bookingIndex = app.bookings.findIndex(b => b.bookingId === bookingId);
        if (bookingIndex !== -1) {
            app.bookings[bookingIndex].status = 'Cancelled';
            app.saveToLocalStorage('userBookings', app.bookings);
            app.showToast('Booking cancelled successfully', 'info');
            loadUserBookings();
        }
    }, 1000);
}

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ''));
}
